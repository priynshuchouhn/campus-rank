-- AlterTable
ALTER TABLE "WeeklyGoal" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
