// File: /app/api/fetch-profiles/route.js
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '@/lib/prisma';


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
    return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 });
  }
}

async function fetchLeetCodeProfile(username:string, userId:string): Promise<LeetCodeProfile | null> {
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
    
    return response.data.data.matchedUser;
  } catch (error) {
    console.error('LeetCode API error:', error);
    return null;
  }
}

async function fetchHackerRankProfile(username:string, userId:string): Promise<HackerRankProfile | null> {
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
    return null;
  }
}

async function fetchGFGProfile(username:string, userId:string): Promise<GFGProfile | null> {
  try {
    // GeeksForGeeks doesn't have a public API, so we'll need to scrape the profile page
    const response = await axios.get(`https://www.geeksforgeeks.org/user/${username}`);
    const $ = cheerio.load(response.data);
    
    const profileData: GFGProfile = {
      username,
      name: $('.header_user_profile h1').text().trim(),
      institution: $('.educationDetails_head_left--text__tgi9I').text().trim(),
      rank: $('.educationDetails_head_left_userRankContainer--text__wt81s').text().trim(),
      solvedProblems: $('.scoreCard_head_left--score__oSi_x').eq(0).text().trim(),
      codingScore: $('.scoreCard_head_left--score__oSi_x').eq(1).text().trim(),
    };
    
    await prisma.gFGProfile.upsert ({
      where: {
        userId
      },
      update: {
        ...profileData
      },
      create: {
        userId,
        ...profileData
      },
    });
    return profileData;
  } catch (error) {
    console.error('GeeksForGeeks scraping error:', error);
    return null;
  }
}