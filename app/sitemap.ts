import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://campus-track.prinshuchouhn.engineer/", lastModified: new Date() },
    { url: "https://campus-track.prinshuchouhn.engineer/profile", lastModified: new Date() },
  ];
}
