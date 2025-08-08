/*
  Warnings:

  - Added the required column `timeAlloted` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "timeAlloted" INTEGER NOT NULL;
