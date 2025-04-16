import { prisma } from './prisma';

export async function sendLeaderboardUpdateNotification() {
  try {
    // Get all users who have push notifications enabled
    const subscriptions = await prisma.pushSubscription.findMany({
      select: {
        userId: true,
      },
    });

    // Send notification to each user
    for (const subscription of subscriptions) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/push/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Leaderboard Updated!',
          body: 'Check out the latest rankings on the leaderboard',
          url: '/',
          userId: subscription.userId,
        }),
      });
    }
  } catch (error) {
    console.error('Error sending leaderboard update notification:', error);
  }
}

export async function sendNewBlogPostNotification(postTitle: string, postSlug: string) {
  try {
    // Get all users who have push notifications enabled
    const subscriptions = await prisma.pushSubscription.findMany({
      select: {
        userId: true,
      },
    });

    // Send notification to each user
    for (const subscription of subscriptions) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/push/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Blog Post',
          body: `Check out our latest post: ${postTitle}`,
          url: `${process.env.NEXT_PUBLIC_API_URL}/blogs/${postSlug}`,
          userId: subscription.userId,
        }),
      });
    }
  } catch (error) {
    console.error('Error sending blog post notification:', error);
  }
}