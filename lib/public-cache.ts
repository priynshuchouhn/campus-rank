import "server-only";

import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getCachedLeaderboard = unstable_cache(
  async () =>
    prisma.leaderboardStats.findMany({
      orderBy: { globalRank: "asc" },
      where: {
        isActive: true,
        isDeleted: false,
      },
      include: {
        user: {
          include: {
            gfgProfile: true,
            hackerrankProfile: {
              include: {
                badges: true,
              },
            },
            leetcodeProfile: true,
          },
        },
      },
    }),
  ["leaderboard"],
  { revalidate: 300, tags: ["leaderboard"] }
);

export const getCachedBlogPosts = unstable_cache(
  async () =>
    prisma.blogPost.findMany({
      where: {
        isPublished: true,
        isApproved: true,
        isDeleted: false,
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
  ["published-blog-posts"],
  { revalidate: 3600, tags: ["blogs"] }
);

export async function getCachedBlogPost(slug: string) {
  return unstable_cache(
    async () =>
      prisma.blogPost.findFirst({
        where: {
          slug,
          isPublished: true,
          isApproved: true,
          isDeleted: false,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
    ["published-blog-post", slug],
    { revalidate: 3600, tags: ["blogs", `blog:${slug}`] }
  )();
}

export const getCachedSitemapData = unstable_cache(
  async () => {
    const [blogPosts, users, institutes] = await Promise.all([
      prisma.blogPost.findMany({
        where: {
          isPublished: true,
          isApproved: true,
          isDeleted: false,
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      prisma.user.findMany({
        where: {
          isDeleted: false,
          role: "USER",
        },
        select: {
          username: true,
          updatedAt: true,
        },
      }),
      prisma.institution.findMany({
        where: {
          isActive: true,
        },
        select: {
          code: true,
          updatedAt: true,
        },
      }),
    ]);

    return { blogPosts, users, institutes };
  },
  ["sitemap-data"],
  { revalidate: 86400, tags: ["sitemap"] }
);

export const getCachedInstitutes = unstable_cache(
  async () => {
    const institutes = await prisma.institution.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    return institutes
      .map((inst) => ({
        ...inst,
        userCount: inst._count.users,
      }))
      .sort((a, b) => b.userCount - a.userCount);
  },
  ["institutes"],
  { revalidate: 3600, tags: ["institutes"] }
);

export async function getCachedInstituteByCode(code: string) {
  return unstable_cache(
    async () => {
      const institute = await prisma.institution.findUnique({
        where: {
          code,
        },
        include: {
          _count: {
            select: {
              users: true,
            },
          },
        },
      });

      return institute ? { ...institute, userCount: institute._count.users } : null;
    },
    ["institute", code],
    { revalidate: 3600, tags: ["institutes", `institute:${code}`] }
  )();
}

export const getCachedFlashcardDecks = unstable_cache(
  async () =>
    prisma.flashcardDeck.findMany({
      include: {
        _count: {
          select: {
            flashcards: true,
          },
        },
      },
    }),
  ["flashcard-decks"],
  { revalidate: 3600, tags: ["flashcards"] }
);

export async function getCachedFlashcardsByDeckId(deckId: string) {
  return unstable_cache(
    async () =>
      prisma.flashcard.findMany({
        where: {
          deckId,
        },
        include: {
          deck: true,
        },
      }),
    ["flashcards", deckId],
    { revalidate: 3600, tags: ["flashcards", `flashcard-deck:${deckId}`] }
  )();
}

export const getCachedPracticeSubjects = unstable_cache(
  async () =>
    prisma.subject.findMany({
      where: {
        isCoreSubject: false,
      },
      include: {
        sections: {
          where: {
            topics: {
              some: {
                questions: {
                  some: {},
                },
              },
            },
          },
          include: {
            topics: {
              where: {
                questions: {
                  some: {},
                },
              },
              include: {
                questions: true,
              },
            },
          },
        },
      },
    }),
  ["practice-subjects"],
  { revalidate: 3600, tags: ["practice-subjects"] }
);
