/*
  Warnings:

  - You are about to drop the column `subjectid` on the `PredefinedSection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PredefinedSection" DROP CONSTRAINT "PredefinedSection_subjectid_fkey";

-- AlterTable
ALTER TABLE "PredefinedSection" DROP COLUMN "subjectid",
ADD COLUMN     "subjectId" TEXT;

-- AddForeignKey
ALTER TABLE "PredefinedSection" ADD CONSTRAINT "PredefinedSection_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
