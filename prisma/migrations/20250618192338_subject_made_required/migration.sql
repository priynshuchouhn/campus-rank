/*
  Warnings:

  - Made the column `subjectid` on table `PredefinedSection` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PredefinedSection" DROP CONSTRAINT "PredefinedSection_subjectid_fkey";

-- AlterTable
ALTER TABLE "PredefinedSection" ALTER COLUMN "subjectid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PredefinedSection" ADD CONSTRAINT "PredefinedSection_subjectid_fkey" FOREIGN KEY ("subjectid") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
