import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";
import { blogPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";

const staticPaths = [
  "",
  "/services",
  "/case-studies",
  "/works",
  "/pricing",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        lastModified: new Date(),
        changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/contact" || path === "/services" ? 0.9 : 0.7,
      });
    }

    for (const post of blogPosts) {
      entries.push({
        url: absoluteUrl(`/${locale}/blog/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const study of caseStudies) {
      entries.push({
        url: absoluteUrl(`/${locale}/case-studies/${study.slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return entries;
}
