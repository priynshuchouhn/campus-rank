import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import webpush from 'web-push';
import { auth } from '@/auth';

// Initialize web-push with VAPID keys
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { title, body, url, targetAudience } = await req.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get users based on target audience
    let users;
    switch (targetAudience) {
      case 'active':
        users = await prisma.user.findMany({
          where: {
            lastLogin: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        });
        break;
      case 'inactive':
        users = await prisma.user.findMany({
          where: {
            lastLogin: {
              lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // More than 30 days ago
            },
          },
        });
        break;
      default:
        users = await prisma.user.findMany();
    }

    // Get push subscriptions for all target users
    const subscriptions = await prisma.pushSubscription.findMany({
      where: {
        userId: {
          in: users.map(user => user.id)
        }
      }
    });

    // Send notifications to all subscriptions
    const notifications = subscriptions.map(async (subscription) => {
      const payload = JSON.stringify({
        title,
        body,
        url: url || '/',
      });

      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          payload
        );
      } catch (error: any) {
        console.error('Error sending push notification:', error);
        // If the subscription is no longer valid, delete it
        if (error.statusCode === 410) {
          await prisma.pushSubscription.delete({
            where: { id: subscription.id },
          });
        }
      }
    });

    await Promise.all(notifications);

    return NextResponse.json({ 
      success: true,
      message: `Notification sent to ${subscriptions.length} users`
    });
  } catch (error) {
    console.error('Error sending push notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send push notifications' },
      { status: 500 }
    );
  }
} 