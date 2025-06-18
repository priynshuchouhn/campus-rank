/*
  Warnings:

  - Made the column `subjectId` on table `PredefinedSection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PredefinedSection" ALTER COLUMN "subjectId" SET NOT NULL;
