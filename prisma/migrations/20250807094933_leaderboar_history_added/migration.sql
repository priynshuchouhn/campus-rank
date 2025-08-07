-- CreateTable
CREATE TABLE "LeaderboardHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "snapshotAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardHistory_userId_snapshotAt_key" ON "LeaderboardHistory"("userId", "snapshotAt");

-- AddForeignKey
ALTER TABLE "LeaderboardHistory" ADD CONSTRAINT "LeaderboardHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
