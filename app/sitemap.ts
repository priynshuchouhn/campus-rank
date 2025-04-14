import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://campus-rank.priynshuchouhn.engineer/", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/about-us", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/code-of-conduct", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/terms-of-service", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/privacy-policy", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/dashboard", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/profile", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/goals", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/roadmap", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/roadmap/topics", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/blogs", lastModified: new Date() },
  ];
}
  