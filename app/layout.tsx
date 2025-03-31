import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/nav-bar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusRank - College Coding Leaderboard",
  description: "Track coding progress of students on LeetCode & HackerRank with CampusRank. Compete, learn, and rank up!",
  keywords: "coding leaderboard, leetcode ranking, hackerrank leaderboard, college coding, campus rank, coding contests",
  authors: [{ name: "CampusRank Team", url: "https://campus-rank.priynshuchouhn.engineer" }],
  metadataBase: new URL("https://campus-rank.priynshuchouhn.engineer"),
  openGraph: {
    title: "CampusRank - College Coding Leaderboard",
    description: "Join CampusRank to monitor your coding progress on LeetCode & HackerRank.",
    url: "https://campus-rank.priynshuchouhn.engineer",
    siteName: "CampusRank",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CampusRank Leaderboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusRank - College Coding Leaderboard",
    description: "Track coding progress of students from LeetCode & HackerRank with CampusRank.",
    images: ["/og-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
              <Navbar />
              {children}
            </div>
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
