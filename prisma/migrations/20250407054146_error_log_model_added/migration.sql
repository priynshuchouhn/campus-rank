-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "errorAt" TEXT NOT NULL,
    "forUser" TEXT,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);
