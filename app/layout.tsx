import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Rank - College Coding Leaderboard",
  description: "Track coding progress of students on GFG, LeetCode & HackerRank with Campus Rank. Compete, learn, and rank up!",
  keywords: "coding leaderboard, gfg ranking, leetcode ranking, hackerrank leaderboard, college coding, campus rank, coding contests",
  authors: [{ name: "CampusRank Team", url: "https://campus-rank.priynshuchouhn.engineer" }],
  metadataBase: new URL("https://campus-rank.priynshuchouhn.engineer"),
  openGraph: {
    title: "Campus Rank - College Coding Leaderboard",
    description: "Join CampusRank to monitor your coding progress on GFG, LeetCode & HackerRank.",
    url: "https://campus-rank.priynshuchouhn.engineer",
    siteName: "Campus Rank",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Campus Rank Leaderboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Rank - College Coding Leaderboard",
    description: "Track coding progress of students from GFG, LeetCode & HackerRank with Campus Rank.",
    images: ["/logo.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T9Q4SX9S');`}
        </Script>
        {/* <!-- End Google Tag Manager --> */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445216269913649" crossOrigin="anonymous"></script>
      </head>
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
          {children}
          <Toaster />
        </ThemeProvider>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9Q4SX9S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  );
}
