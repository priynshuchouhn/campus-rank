-- CreateTable
CREATE TABLE "LanguageWrapper" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "functionName" TEXT,
    "className" TEXT,
    "methodSignature" TEXT,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageWrapper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LanguageWrapper_questionId_language_key" ON "LanguageWrapper"("questionId", "language");

-- AddForeignKey
ALTER TABLE "LanguageWrapper" ADD CONSTRAINT "LanguageWrapper_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
