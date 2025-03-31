import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://campus-rank.prinshuchouhn.engineer/", lastModified: new Date() },
    { url: "https://campus-rank.prinshuchouhn.engineer/profile", lastModified: new Date() },
  ];
}
