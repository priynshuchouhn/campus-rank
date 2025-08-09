import { BlogPost, MenuSection } from "./interfaces";
import { Home, BookOpen, Code, User, Settings, LogOut, Notebook, Target, Info, Shield, FileText, HelpCircle, Trophy } from 'lucide-react';


export const categories = [
    'DSA',
    'Placements',
    'LeetCode Tips',
    'Success Stories',
    'Interview Prep',
];

export const authMenuItems: MenuSection[] = [
  {
    section: "Dashboard",
    items: [
      { href: "/dashboard", icon: Home, title: "Home" },
      { href: "/leaderboard", icon: Trophy, title: "Leaderboard" },
    ]
  },
  {
    section: "Learning",
    items: [
      { href: "/roadmap", icon: BookOpen, title: "Roadmap", exact: true },
      { href: "/roadmap/topics", icon: Notebook, title: "Topics" },
      { href: "/practice", icon: Code, title: "Practice", badge: "New" },
      { href: "/goals", icon: Target, title: "Weekly Goals" },
    ]
  },
  {
    section: "Account",
    items: [
      { href: "/profile", icon: User, title: "Profile" },
      { href: "/settings", icon: Settings, title: "Settings" },
      { href: "/reports", icon: HelpCircle, title: "Reports" },
    ]
  }
];

export const guestMenuItems:MenuSection[] = [
  {
    section: "Explore",
    items: [
      { href: "/leaderboard", icon: Trophy, title: "Leaderboard" },
    ]
  },
  {
    section: "Information",
    items: [
      { href: "/about-us", icon: Info, title: "About Us" },
      { href: "/privacy-policy", icon: Shield, title: "Privacy Policy" },
      { href: "/terms-of-service", icon: FileText, title: "Terms of Service" },
    ]
  },
  {
    section: "Get Started",
    items: [
      { href: "/dashboard", icon: LogOut, title: "Login" },
    ]
  }
];
