import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/config";

type BuildMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  keywords,
  image = "/images/service-websites.png",
  noIndex = false,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(`/${locale}${path === "/" ? "" : path}`);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);
  const languages = {
    en: absoluteUrl(`/en${path === "/" ? "" : path}`),
    sr: absoluteUrl(`/sr${path === "/" ? "" : path}`),
    "x-default": absoluteUrl(`/en${path === "/" ? "" : path}`),
  };

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "sr" ? "sr_RS" : "en_US",
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
