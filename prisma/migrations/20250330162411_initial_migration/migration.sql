-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "leetcodeUsername" TEXT,
    "hackerrankUsername" TEXT,
    "gfgUsername" TEXT,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,
    "easySolved" INTEGER NOT NULL DEFAULT 0,
    "mediumSolved" INTEGER NOT NULL DEFAULT 0,
    "hardSolved" INTEGER NOT NULL DEFAULT 0,
    "lastLeetcodeFetch" TIMESTAMP(3),
    "lastHackerrankFetch" TIMESTAMP(3),
    "lastGfgFetch" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeetCodeProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "githubUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,
    "realName" TEXT,
    "userAvatar" TEXT,
    "ranking" INTEGER,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,
    "totalSubmissions" INTEGER NOT NULL DEFAULT 0,
    "easySolved" INTEGER NOT NULL DEFAULT 0,
    "easySubmissions" INTEGER NOT NULL DEFAULT 0,
    "mediumSolved" INTEGER NOT NULL DEFAULT 0,
    "mediumSubmissions" INTEGER NOT NULL DEFAULT 0,
    "hardSolved" INTEGER NOT NULL DEFAULT 0,
    "hardSubmissions" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeetCodeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackerRankProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "about" TEXT,
    "skills" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HackerRankProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackerRankBadge" (
    "id" TEXT NOT NULL,
    "hackerrankProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stars" TEXT NOT NULL,

    CONSTRAINT "HackerRankBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GFGProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "institution" TEXT,
    "rank" TEXT,
    "solvedProblems" TEXT,
    "codingScore" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GFGProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "leetcodeScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hackerrankScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gfgScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "globalRank" INTEGER,
    "leetcodeRank" INTEGER,
    "hackerrankRank" INTEGER,
    "gfgRank" INTEGER,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeProfile_userId_key" ON "LeetCodeProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeProfile_username_key" ON "LeetCodeProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "HackerRankProfile_userId_key" ON "HackerRankProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HackerRankProfile_username_key" ON "HackerRankProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "HackerRankBadge_hackerrankProfileId_name_key" ON "HackerRankBadge"("hackerrankProfileId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "GFGProfile_userId_key" ON "GFGProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GFGProfile_username_key" ON "GFGProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardStats_userId_key" ON "LeaderboardStats"("userId");

-- AddForeignKey
ALTER TABLE "LeetCodeProfile" ADD CONSTRAINT "LeetCodeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackerRankProfile" ADD CONSTRAINT "HackerRankProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackerRankBadge" ADD CONSTRAINT "HackerRankBadge_hackerrankProfileId_fkey" FOREIGN KEY ("hackerrankProfileId") REFERENCES "HackerRankProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GFGProfile" ADD CONSTRAINT "GFGProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardStats" ADD CONSTRAINT "LeaderboardStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
