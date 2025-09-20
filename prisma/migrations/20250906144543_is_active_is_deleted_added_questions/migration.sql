/*
  Warnings:

  - Made the column `subjectId` on table `FlashcardDeck` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FlashcardDeck" DROP CONSTRAINT "FlashcardDeck_subjectId_fkey";

-- AlterTable
ALTER TABLE "FlashcardDeck" ALTER COLUMN "subjectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "FlashcardDeck" ADD CONSTRAINT "FlashcardDeck_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
