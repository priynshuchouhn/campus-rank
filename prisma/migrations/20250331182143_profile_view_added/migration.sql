-- CreateTable
CREATE TABLE "ProfileView" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operatingSystem" TEXT,
    "browser" TEXT,
    "device" TEXT,

    CONSTRAINT "ProfileView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationStats" (
    "id" TEXT NOT NULL,
    "lastLeaderboardUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalProfileViews" INTEGER NOT NULL DEFAULT 0,
    "totalQuestionsSolved" INTEGER NOT NULL DEFAULT 0,
    "profileViewsSinceLastUpdate" INTEGER NOT NULL DEFAULT 0,
    "questionsSolvedSinceLastUpdate" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileView" ADD CONSTRAINT "ProfileView_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
