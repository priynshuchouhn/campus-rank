export interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
    leetcodeUsername: string | null;
    hackerrankUsername: string | null;
    gfgUsername: string | null;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    lastLeetcodeFetch: Date | null;
    lastHackerrankFetch: Date | null;
    lastGfgFetch: Date | null;
    leetcodeProfile: {
        id: string;
        userId: string;
        username: string;
        githubUrl: string | null;
        twitterUrl: string | null;
        linkedinUrl: string | null;
        realName: string | null;
        userAvatar: string | null;
        ranking: number | null;
        totalSolved: number;
        totalSubmissions: number;
        easySolved: number;
        easySubmissions: number;
        mediumSolved: number;
        mediumSubmissions: number;
        hardSolved: number;
        hardSubmissions: number;
        updatedAt: Date;
    } | null;
    hackerrankProfile: {
        id: string;
        userId: string;
        username: string;
        name: string | null;
        about: string | null;
        skills: string[];
        badges: { id: string; name: string; stars: string }[];
        updatedAt: Date;
    } | null;
    gfgProfile: {
        id: string;
        userId: string;
        username: string;
        name: string | null;
        institution: string | null;
        rank: string | null;
        solvedProblems: string | null;
        codingScore: string | null;
        updatedAt: Date;
    } | null;
    leaderboardStats: {
        id: string;
        userId: string;
        overallScore: number;
        leetcodeScore: number;
        hackerrankScore: number;
        gfgScore: number;
        globalRank: number | null;
        leetcodeRank: number | null;
        hackerrankRank: number | null;
        gfgRank: number | null;
        lastUpdated: Date;
    } | null;
}

export interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
}