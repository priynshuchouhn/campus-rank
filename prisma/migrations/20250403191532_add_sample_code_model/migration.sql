/*
  Warnings:

  - You are about to drop the column `sampleCode` on the `Question` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProgrammingLanguage" AS ENUM ('JAVASCRIPT', 'TYPESCRIPT', 'PYTHON', 'JAVA', 'CPP');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sampleCode";

-- CreateTable
CREATE TABLE "SampleCode" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SampleCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SampleCode" ADD CONSTRAINT "SampleCode_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
