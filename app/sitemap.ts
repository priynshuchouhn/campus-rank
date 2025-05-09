import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all published blog posts
  const blogPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      isApproved: true,
      isDeleted: false,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Get all users
  const users = await prisma.user.findMany({
    where: {
      isDeleted: false,
      role: "USER",
    },
    select: {
      username: true,
      updatedAt: true,
    },
  });

  // Base URLs
  const baseUrls = [
    { url: "https://campusrank.org/", lastModified: new Date() },
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

  return [...baseUrls, ...blogUrls, ...userUrls];
}
  