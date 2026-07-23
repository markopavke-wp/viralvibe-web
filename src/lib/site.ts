export const siteConfig = {
  name: "Viral Vibe",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://viralvibe.rs",
  localeDefault: "en" as const,
  phone: ["+381641112104", "+381691420822"],
  email: "info@viralvibe.rs",
  city: "Niš",
  country: "RS",
  social: {
    instagram: "https://www.instagram.com/",
  },
};

export function absoluteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p === "/" ? "" : p}`;
}
