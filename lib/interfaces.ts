export interface User {
    id: string;
    name: string;
    email: string;
    leetcodeUsername: string | null;
    hackerrankUsername: string | null;
    gfgUsername: string | null;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    image: string | null;
  }
  
  export interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
  }