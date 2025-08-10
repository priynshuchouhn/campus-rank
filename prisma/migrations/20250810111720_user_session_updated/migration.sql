/*
  Warnings:

  - You are about to drop the column `duration_seconds` on the `UserSession` table. All the data in the column will be lost.
  - Added the required column `duration` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "duration_seconds",
ADD COLUMN     "duration" INTEGER NOT NULL;
