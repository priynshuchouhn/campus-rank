-- AlterTable
ALTER TABLE "ApplicationStats" ADD COLUMN     "lastLeaderboardEmailAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalQuestionSolvedOnPlatform" INTEGER NOT NULL DEFAULT 0;
