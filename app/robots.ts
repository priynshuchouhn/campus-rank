import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" , },
    sitemap: "https://campus-rank.priynshuchouhn.engineer/sitemap.xml",
    
  };
}
