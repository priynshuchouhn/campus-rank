-- CreateEnum
CREATE TYPE "TopicLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "PredefinedTopic" ADD COLUMN     "level" "TopicLevel" NOT NULL DEFAULT 'BEGINNER',
ADD COLUMN     "preRequisites" TEXT[],
ADD COLUMN     "subTopics" TEXT[];
