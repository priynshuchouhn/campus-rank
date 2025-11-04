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

  // Get all active institutes
  const institutes = await prisma.institution.findMany({
    where: {
      isActive: true,
    },
    select: {
      code: true,
      updatedAt: true,
    },
  });

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
    lastModified: new Date(),
  }));

  // Add user profile URLs
  const userUrls = users.map((user) => ({
    url: `https://campusrank.org/user/${user.username}`,
    lastModified: new Date(),
  }));

  // Add institute URLs
  const instituteUrls = institutes.map((inst) => ({
    url: `https://campusrank.org/institute/${inst.code.toLowerCase()}`,
    lastModified: new Date(),
  }));

  return [...baseUrls, ...blogUrls, ...userUrls, ...instituteUrls];
}
  