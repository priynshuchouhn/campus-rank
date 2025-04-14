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

export type Difficulty = "Easy" | "Medium" | "Hard";
export type ProgrammingLanguage = "javascript" | "typescript" | "python" | "java" | "cpp";

export interface TestCase {
    id?: string;
    input: string;
    output: string;
    explanation: string;
}

export interface Constraint {
    id?: string;
    value: string;
}

export interface SampleCode {
    id?: string;
    language: ProgrammingLanguage;
    code: string;
}

export interface Question {
    id?: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    timeComplexity: string;
    spaceComplexity: string;
    section: string;
    topic: string;
    testCases: TestCase[];
    constraints: string[];
    sampleCodes: SampleCode[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface QuestionSubmission {
    id?: string;
    questionId: string;
    userId: string;
    code: string;
    status: SubmissionStatus;
    executionTime?: number;
    memoryUsed?: number;
    createdAt?: Date;
}

export type SubmissionStatus = 
    | "ACCEPTED" 
    | "WRONG_ANSWER" 
    | "TIME_LIMIT_EXCEEDED" 
    | "MEMORY_LIMIT_EXCEEDED" 
    | "RUNTIME_ERROR" 
    | "COMPILATION_ERROR" 
    | "PENDING";

export interface TopicFormData {
    title: string;
    description: string;
    section: string;
  }
  
export interface ResourceFormData {
    type: "article" | "video";
    title: string;
    url: string;
}

export interface Section {
    id: string;
    name: string;
    description: string;
    topicsCount: number;
    isPredefined?: boolean;
    topics: Topic[];
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    sectionId: string;
}

export interface Resource {
    id: number;
    title: string;
    url: string;
    type: "article" | "video";
}

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    author: {
        name: string;
        image: string;
    };
    publishedAt: string;
    createdAt: string;
    category: string;
    featuredImage: string;
    tags: string[];
    content: string;
  }
  