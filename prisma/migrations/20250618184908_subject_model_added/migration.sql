/*
  Warnings:

  - You are about to drop the column `section` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `topicId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `topicName` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_topicId_fkey";

-- AlterTable
ALTER TABLE "PredefinedSection" ADD COLUMN     "subjectid" TEXT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "section",
DROP COLUMN "topicId",
DROP COLUMN "topicName",
ALTER COLUMN "timeComplexity" DROP NOT NULL,
ALTER COLUMN "spaceComplexity" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "isCoreSubject" BOOLEAN NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PredefinedSection" ADD CONSTRAINT "PredefinedSection_subjectid_fkey" FOREIGN KEY ("subjectid") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
