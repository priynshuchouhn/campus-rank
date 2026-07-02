import { MetadataRoute } from "next";
import { getCachedSitemapData } from "@/lib/public-cache";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogPosts, users, institutes } = await getCachedSitemapData();

  // Base URLs
  const baseUrls = [
    { url: "https://campusrank.org/", lastModified: new Date() },
    { url: "https://campusrank.org/leaderboard", lastModified: new Date() },
    { url: "https://campusrank.org/about-us", lastModified: new Date() },
    { url: "https://campusrank.org/code-of-conduct", lastModified: new Date() },
    { url: "https://campusrank.org/terms-of-service", lastModified: new Date() },
    { url: "https://campusrank.org/privacy-policy", lastModified: new Date() },
    { url: "https://campusrank.org/blogs", lastModified: new Date() },
    { url: "https://campusrank.org/get-started", lastModified: new Date() },
    { url: "https://campusrank.org/contact-us", lastModified: new Date() },
    { url: "https://campusrank.org/frequently-asked-questions", lastModified: new Date() },
  ];

  // Add blog post URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `https://campusrank.org/blogs/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  // Add user profile URLs
  const userUrls = users.map((user) => ({
    url: `https://campusrank.org/user/${user.username}`,
    lastModified: user.updatedAt,
  }));

  // Add institute URLs
  const instituteUrls = institutes.map((inst) => ({
    url: `https://campusrank.org/institute/${inst.code.toLowerCase()}`,
    lastModified: inst.updatedAt,
  }));

  return [...baseUrls, ...blogUrls, ...userUrls, ...instituteUrls];
}

