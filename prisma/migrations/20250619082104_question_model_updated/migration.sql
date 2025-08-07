/*
  Warnings:

  - Added the required column `questionType` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ', 'CODE');

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_predefinedTopicId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctOption" TEXT,
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "questionType" "QuestionType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_predefinedTopicId_fkey" FOREIGN KEY ("predefinedTopicId") REFERENCES "PredefinedTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
