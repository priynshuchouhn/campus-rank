import EmailTemplate from '@/components/ui/email-template';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const {name,email} = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'Campus Rank <no-reply@campusrank.org>',
      to: [email],
      subject: '🎉 Welcome to Campus Rank - Your Coding Journey Begins!',
      react: await EmailTemplate({ type: 'welcome', data: { name: name } }), // Added required prop
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] email/welcome/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
        forUser: email
      }
    });
    return Response.json({ error }, { status: 500 });
  }
}