// File: /app/api/fetch-profiles/route.js
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';


interface LeetCodeProfile {
  username: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  profile: {
    realName: string;
    userAvatar: string;
    ranking: number;
  };
  submitStats: {
    acSubmissionNum: Array<{
      difficulty: string;
      count: number;
      submissions: number;
    }>;
  };
}

interface HackerRankProfile {
  username: string;
  name: string;
  about: string;
  skills: string[];
  badges: Array<{
    name: string;
    stars: string;
  }>;
}

interface GFGProfile {
  username: string;
  name: string;
  institution: string;
  rank: string;
  solvedProblems: string;
  codingScore: string;
}

interface ProfileResults {
  leetcode: LeetCodeProfile | null;
  hackerrank: HackerRankProfile | null;
  gfg: GFGProfile | null;
}

export async function POST(request:NextRequest) {
  try {
    const { leetcodeUsername, hackerrankUsername, gfgUsername, userId } = await request.json();

    if(!userId){
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const secret = process.env.CRON_SECRET_TOKEN || process.env.CRON_SECRET;
    const authHeader = request.headers.get('authorization');
    const hasInternalAccess = !!secret && authHeader === `Bearer ${secret}`;

    if (!hasInternalAccess) {
      if (!secret && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Internal secret is not configured' }, { status: 503 });
      }

      const session = await auth();
      if (!session?.user || (session.user.id !== userId && session.user.role !== 'ADMIN')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    
    const results: ProfileResults = {
      leetcode: null,
      hackerrank: null,
      gfg: null
    };
    
    // Fetch LeetCode data if username provided
    if (leetcodeUsername) {
      results.leetcode = await fetchLeetCodeProfile(leetcodeUsername, userId);
    }
    
    // Fetch HackerRank data if username provided
    if (hackerrankUsername) {
      results.hackerrank = await fetchHackerRankProfile(hackerrankUsername, userId);
    }
    
    // Fetch GeeksForGeeks data if username provided
    if (gfgUsername) {
      results.gfg = await fetchGFGProfile(gfgUsername, userId);
    }
    
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] fetch-profile/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 });
  }
}

async function fetchLeetCodeProfile(username:string, userId:string): Promise<LeetCodeProfile | null> {
  if(!username){
    return null;
  }
  try {
    // LeetCode GraphQL API
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            username
            githubUrl
            twitterUrl
            linkedinUrl
            profile {
              realName
              userAvatar
              ranking
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: {
        username
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.data.data.matchedUser){
    await prisma.leetCodeProfile.upsert ({
      where: {
        userId:userId
      },
      update: {
        username:response.data.data.matchedUser.username,
        githubUrl:response.data.data.matchedUser.githubUrl,
        twitterUrl:response.data.data.matchedUser.twitterUrl,
        linkedinUrl:response.data.data.matchedUser.linkedinUrl,
        realName:response.data.data.matchedUser.profile.realName,
        userAvatar:response.data.data.matchedUser.profile.userAvatar,
        ranking:response.data.data.matchedUser.profile.ranking,
        totalSolved:response.data.data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions:response.data.data.matchedUser.submitStats.acSubmissionNum[0].submissions,
        easySolved:response.data.data.matchedUser.submitStats.acSubmissionNum[1].count,
        easySubmissions:response.data.data.matchedUser.submitStats.acSubmissionNum[1].submissions,
        mediumSolved:response.data.data.matchedUser.submitStats.acSubmissionNum[2].count,
        mediumSubmissions:response.data.data.matchedUser.submitStats.acSubmissionNum[2].submissions,
        
      },
      create: {
        userId,
        username:response.data.data.matchedUser.username,
        githubUrl:response.data.data.matchedUser.githubUrl,
        twitterUrl:response.data.data.matchedUser.twitterUrl,
        linkedinUrl:response.data.data.matchedUser.linkedinUrl,
        ranking:response.data.data.matchedUser.profile.ranking,
        realName:response.data.data.matchedUser.profile.realName,
        userAvatar:response.data.data.matchedUser.profile.userAvatar,
        totalSolved:response.data.data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions:response.data.data.matchedUser.submitStats.acSubmissionNum[0].submissions,
        easySolved:response.data.data.matchedUser.submitStats.acSubmissionNum[1].count,
        easySubmissions:response.data.data.matchedUser.submitStats.acSubmissionNum[1].submissions,
        mediumSolved:response.data.data.matchedUser.submitStats.acSubmissionNum[2].count,
        mediumSubmissions:response.data.data.matchedUser.submitStats.acSubmissionNum[2].submissions,
      }
    });
    }
    
    return response.data.data.matchedUser;
  } catch (error) {
    console.error('LeetCode API error:', error);
    await prisma.errorLog.create({
      data: {
        errorAt: 'fetchLeetCodeProfile - fetch-profile/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
        forUser: username
      }
    });
    return null;
  }
}

async function fetchHackerRankProfile(username:string, userId:string): Promise<HackerRankProfile | null> {
  if(!username){
    return null;
  }
  try {
    // HackerRank doesn't have a public API, so we'll need to scrape the profile page
    const response = await axios.get(`https://www.hackerrank.com/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      },
      timeout: 10000,
      validateStatus: (status) => status < 500 // Accept any status code less than 500
    });

    if (response.status === 403) {
      console.error('Access to HackerRank profile is forbidden. The website might be blocking automated requests.');
      return null;
    }

    if (response.status !== 200) {
      console.error(`Failed to fetch HackerRank profile. Status code: ${response.status}`);
      return null;
    }

    const $ = cheerio.load(response.data);
    
    // Check if we got a valid profile page
    if ($('.profile-title').length === 0) {
      console.error('Could not find profile data on the page');
      return null;
    }

    const profileData: HackerRankProfile = {
      username,
      name: $('.profile-title').text().trim() || username,
      about: $('.profile-about').text().trim() || '',
      skills: [],
      badges: [],
    };
    
    // Extract skills
    $('.badge-title').each((i, el) => {
      profileData.skills.push($(el).text().trim());
    });
    
    // Extract badges
    $('.hacker-badge').each((i, el) => {
      profileData.badges.push({
        name: $(el).find('.badge-title').text().trim(),
        stars: $(el).find('.star-section .badge-star').length.toString()
      });
    });

    await prisma.hackerRankProfile.upsert ({
      where: {
        userId
      },
      update: {
        ...profileData,
        badges: {
          deleteMany: {},
          create: profileData.badges
        }
      },
      create: {
        userId,
        ...profileData,
        badges: {
          create: profileData.badges
        }
      },
    });
    return profileData;
  } catch (error) {
    console.error('HackerRank scraping error:', error);
    await prisma.errorLog.create({
      data: {
        errorAt: 'fetchHackerRankProfile - fetch-profile/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
        forUser: username
      }
    });
    return null;
  }
}

// async function fetchGFGProfile(username:string, userId:string): Promise<GFGProfile | null> {
//   if(!username){
//     return null;
//   }
//   try {
//     // GeeksForGeeks doesn't have a public API, so we'll need to scrape the profile page
//     const response = await axios.get(`https://www.geeksforgeeks.org/user/${username}`);
//     const $ = cheerio.load(response.data);
    
//     const profileData: GFGProfile = {
//       username,
//       name: $('.header_user_profile h1').text().trim(),
//       institution: $('.educationDetails_head_left--text__tgi9I').text().trim(),
//       rank: $('.educationDetails_head_left_userRankContainer--text__wt81s').text().trim(),
//       solvedProblems: $('.scoreCard_head_left--score__oSi_x').eq(1).text().trim(),
//       codingScore: $('.scoreCard_head_left--score__oSi_x').eq(0).text().trim(),
//     };
    
//     await prisma.gFGProfile.upsert ({
//       where: {
//         userId
//       },
//       update: {
//         ...profileData
//       },
//       create: {
//         userId,
//         ...profileData
//       },
//     });
//     return profileData;
//   } catch (error) {
//     console.error('GeeksForGeeks scraping error:', error);
//     await prisma.errorLog.create({
//       data: {
//         errorAt: 'fetchGFGProfile - fetch-profile/route.ts',
//         error: error instanceof Error ? error.message : 'Unknown error',
//         forUser: username
//       }
//     });
//     return null;
//   }
// }
async function fetchGFGProfile(username: string, userId: string): Promise<GFGProfile | null> {
  if (!username) return null;

  try {
    const url = `https://www.geeksforgeeks.org/profile/${username}?tab=activity`;
    
    // 1. Fetch the raw page content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    const rawHtml = response.data as string;

    // 2. The stats live in an escaped JSON object inside the Next.js RSC payload, e.g.
    //    \"articleCount\":{\"name\":\"...\",\"score\":330,\"total_problems_solved\":126,...}
    //    The parent key has changed before (userData -> articleCount), so anchor on a
    //    field inside the object instead and parse the whole enclosing object.
    const stats = extractGFGStats(rawHtml);
    if (!stats) {
      // Don't overwrite stored data with zeros when the page layout changes.
      throw new Error('Could not find GFG stats object (total_problems_solved) in profile page');
    }

    const asString = (v: unknown) => (v === null || v === undefined ? null : String(v));

    const finalProfile: GFGProfile = {
      username,
      name: asString(stats.name) || username,
      institution: asString(stats.institute_name) || 'N/A',
      rank: asString(stats.institute_rank) || '0',
      solvedProblems: asString(stats.total_problems_solved) || '0',
      codingScore: asString(stats.score) || '0',
    };

    // 5. Database Sync
    await prisma.gFGProfile.upsert({
      where: { userId },
      update: { ...finalProfile },
      create: { userId, ...finalProfile },
    });

    return finalProfile;

  } catch (error) {
    console.error('GeeksForGeeks parsing error:', error);
    await prisma.errorLog.create({
      data: {
        errorAt: 'fetchGFGProfile - Regex Strategy',
        error: error instanceof Error ? error.message : 'Unknown error',
        forUser: username
      }
    });
    return null;
  }
}

// Finds the escaped JSON object containing `total_problems_solved` in the GFG profile
// page's RSC payload and returns it parsed. Returns null if it can't be found or parsed.
function extractGFGStats(rawHtml: string): Record<string, unknown> | null {
  const anchor = rawHtml.indexOf('\\"total_problems_solved\\"');
  if (anchor === -1) return null;

  // Walk back to the opening brace of the enclosing object.
  let depth = 0;
  let start = -1;
  for (let i = anchor; i >= 0; i--) {
    const ch = rawHtml[i];
    if (ch === '}') depth++;
    else if (ch === '{') {
      if (depth === 0) { start = i; break; }
      depth--;
    }
  }
  if (start === -1) return null;

  // Walk forward to the matching closing brace.
  depth = 0;
  let end = -1;
  for (let i = start; i < rawHtml.length; i++) {
    const ch = rawHtml[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return null;

  try {
    // The object is embedded in a JS string literal, so unescape it first (\" -> ", \u0026 -> &).
    const unescaped = JSON.parse(`"${rawHtml.slice(start, end + 1)}"`) as string;
    return JSON.parse(unescaped);
  } catch {
    return null;
  }
}
