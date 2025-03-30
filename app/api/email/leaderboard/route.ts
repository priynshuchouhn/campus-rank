import EmailTemplate from '@/components/ui/email-template';
import { getLeaderboard } from '@/lib/actions/leaderboard';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    const users = await prisma.user.findMany({});
    const leaderboards = await getLeaderboard();

    const topThree = leaderboards.slice(0, 3);
    const topThreeUsers = topThree.map((el) => {
        return {
            name: el.user.name,
            rank: el.globalRank || 0,
            score: el.overallScore,
        }
    })

  try {
    const datas = []
    const errors = []
    for (const user of users) {
        const { data, error } = await resend.emails.send({
            from: 'Campus Rank <no-reply@campus-rank.priynshuchouhn.engineer>',
            to: [user.email],
            subject: '🎉 Campus Rank Leaderboard Update!',
            react: await EmailTemplate({ type: 'leaderboard', data: { name: user.name, topUsers: topThreeUsers } }),
        });
        if (error) {
            errors.push(error);
        }
        datas.push(data);
    }

    if (errors.length > 0) {
      return Response.json({ errors }, { status: 500 });
    }
    return Response.json(datas);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}