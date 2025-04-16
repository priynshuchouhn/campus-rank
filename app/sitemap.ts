import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://campusrank.org/", lastModified: new Date() },
    { url: "https://campusrank.org/about-us", lastModified: new Date() },
    { url: "https://campusrank.org/code-of-conduct", lastModified: new Date() },
    { url: "https://campusrank.org/terms-of-service", lastModified: new Date() },
    { url: "https://campusrank.org/privacy-policy", lastModified: new Date() },
    { url: "https://campusrank.org/dashboard", lastModified: new Date() },
    { url: "https://campusrank.org/profile", lastModified: new Date() },
    { url: "https://campusrank.org/goals", lastModified: new Date() },
    { url: "https://campusrank.org/roadmap", lastModified: new Date() },
    { url: "https://campusrank.org/roadmap/topics", lastModified: new Date() },
    { url: "https://campusrank.org/blogs", lastModified: new Date() },
  ];
}
  