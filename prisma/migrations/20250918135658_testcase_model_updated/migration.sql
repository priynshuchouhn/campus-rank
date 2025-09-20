/*
  Warnings:

  - You are about to drop the column `executionTime` on the `QuestionSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `memoryUsed` on the `QuestionSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `QuestionSubmission` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `QuestionSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `results` to the `QuestionSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuestionSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verdict` to the `QuestionSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionSubmission" DROP CONSTRAINT "QuestionSubmission_userId_fkey";

-- AlterTable
ALTER TABLE "QuestionSubmission" DROP COLUMN "executionTime",
DROP COLUMN "memoryUsed",
DROP COLUMN "status",
ADD COLUMN     "languageId" INTEGER NOT NULL,
ADD COLUMN     "passedCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "results" JSONB NOT NULL,
ADD COLUMN     "totalCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verdict" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSample" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "explanation" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionSubmission" ADD CONSTRAINT "QuestionSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
