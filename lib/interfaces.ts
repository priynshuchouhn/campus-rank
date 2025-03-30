export interface User {
    id: number;
    name: string;
    email: string;
    leetcode_username: string;
    hackerrank_username: string;
    gfg_username: string;
    total_solved: number;
    easy: number;
    medium: number;
    hard: number;
    image?: string;
  }
  
  export interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
  }