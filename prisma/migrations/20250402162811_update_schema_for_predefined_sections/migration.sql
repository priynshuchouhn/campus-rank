/*
  Warnings:

  - You are about to drop the column `codingQuestionId` on the `SolvedQuestion` table. All the data in the column will be lost.
  - You are about to drop the `CodingQuestion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `predefinedSectionId` to the `PredefinedTopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `QuestionId` to the `SolvedQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodingQuestion" DROP CONSTRAINT "CodingQuestion_topicId_fkey";

-- DropForeignKey
ALTER TABLE "SolvedQuestion" DROP CONSTRAINT "SolvedQuestion_codingQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_predefinedTopicId_fkey";

-- AlterTable
ALTER TABLE "PredefinedTopic" ADD COLUMN     "predefinedSectionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "predefinedTopicId" TEXT;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "description" TEXT,
ADD COLUMN     "predefinedSectionId" TEXT;

-- AlterTable
ALTER TABLE "SolvedQuestion" DROP COLUMN "codingQuestionId",
ADD COLUMN     "QuestionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CodingQuestion";

-- CreateTable
CREATE TABLE "PredefinedSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PredefinedSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PredefinedTopic" ADD CONSTRAINT "PredefinedTopic_predefinedSectionId_fkey" FOREIGN KEY ("predefinedSectionId") REFERENCES "PredefinedSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_predefinedTopicId_fkey" FOREIGN KEY ("predefinedTopicId") REFERENCES "PredefinedTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolvedQuestion" ADD CONSTRAINT "SolvedQuestion_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_predefinedTopicId_fkey" FOREIGN KEY ("predefinedTopicId") REFERENCES "PredefinedTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
