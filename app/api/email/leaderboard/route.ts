import EmailTemplate from '@/components/ui/email-template';
import { getLeaderboard } from '@/lib/actions/leaderboard';
import { prisma } from '@/lib/prisma';
import { delay } from '@/lib/utils';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    const users = await prisma.user.findMany({
      where: {
        isActive: true,
        isDeleted: false,
        role: 'USER',
      }
    });
    const applicationStats = await prisma.applicationStats.findFirst();
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
      const appstats = await prisma.applicationStats.update({
        where: {
          id: applicationStats?.id
        },data: {
          lastLeaderboardEmailAt : new Date() 
        }
      })
      const datas:any[] = []
      const errors:any[] = []
      for (const user of users) {
        await delay(2000);
        const { data, error } = await resend.emails.send({
          from: 'Campus Rank <no-reply@campusrank.org>',
          to: [user.email],
          subject: '🎉 Campus Rank Leaderboard Update!',
          react: await EmailTemplate({ type: 'leaderboard', data: { name: user.name, topUsers: topThreeUsers, userCount: users.length, problemSolved: applicationStats?.totalQuestionSolvedOnPlatform ?? 0 } }),
        });
        if (error) {
          errors.push(error);
        }
        datas.push(data);
      }
      
      
      console.log(appstats)
      
      if (errors.length > 0) {
        await prisma.errorLog.create({
          data: {
            errorAt: '[API] email/leaderboard/route.ts',
            error: errors.join("##"),
          }
        });
      }
    return Response.json({datas, appstats});
  } catch (error:any) {
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] email/leaderboard/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return Response.json({ error }, { status: 500 });
  }
}