import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const diff = Math.floor(diffInSeconds / seconds);
    if (diff >= 1) {
      if (unit === 'day') {
        return `${diff} day${diff === 1 ? '' : 's'} ago`;
      }
      if (unit === 'week') {
        return `${diff} week${diff === 1 ? '' : 's'} ago`;
      }
      return `${diff} ${unit}${diff === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function unslugify(slug: any): string {
  return slug
    .replace(/-/g, ' ')                       // Replace - with space
    .replace(/\b\w/g, (char: any) => char.toUpperCase()); // Capitalize first letter of each word
}

export function getTimeLeft(startedAt: Date, timeAllotted: number): number {
  const startTime = new Date(startedAt).getTime(); // in ms
  const currentTime = Date.now(); // in ms

  const timeLeft = (startTime + timeAllotted) - currentTime;

  return Math.max(0, Math.floor(timeLeft)); // return time left in seconds
}





