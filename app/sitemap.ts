import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://campus-rank.priynshuchouhn.engineer/", lastModified: new Date() },
    { url: "https://campus-rank.priynshuchouhn.engineer/profile", lastModified: new Date() },
  ];
}
