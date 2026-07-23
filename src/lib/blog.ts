import type { Locale } from "@/i18n/config";

export type BlogPost = {
  slug: string;
  date: string;
  readMinutes: number;
  image: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  content: Record<Locale, string[]>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "website-that-converts",
    date: "2026-07-10",
    readMinutes: 4,
    image: "/images/service-websites.png",
    title: {
      en: "What makes a website actually convert",
      sr: "Šta čini sajt koji zaista konvertuje",
    },
    excerpt: {
      en: "Pretty is not enough. Structure, speed and clear offers decide whether visitors become clients.",
      sr: "Lepo nije dovoljno. Struktura, brzina i jasna ponuda odlučuju da li posetilac postaje klijent.",
    },
    content: {
      en: [
        "A modern website has one job: make the next step obvious. If people land and still wonder what you do, they leave.",
        "Start with a sharp hero — brand, one promise, one CTA. Then support that promise with proof: work, process and a simple contact path.",
        "Speed and mobile experience matter as much as visuals. Slow pages kill trust before your offer even loads.",
        "At Viral Vibe we build sites that look premium and are built to convert — not just to impress for a moment.",
      ],
      sr: [
        "Moderan sajt ima jedan posao: da sledeći korak bude očigledan. Ako neko dođe i i dalje ne zna šta radite — odlazi.",
        "Počnite od jasnog hero dela — brend, jedno obećanje, jedan CTA. Zatim to potvrdite dokazima: radovi, proces i jednostavan kontakt.",
        "Brzina i mobilno iskustvo važe koliko i vizuel. Spor sajt gubi poverenje pre nego što se ponuda učita.",
        "U Viral Vibe-u gradimo sajtove koji izgledaju premium i rade za konverziju — ne samo da impresioniraju trenutno.",
      ],
    },
  },
  {
    slug: "why-brands-need-web-apps",
    date: "2026-07-02",
    readMinutes: 5,
    image: "/images/service-webapps.png",
    title: {
      en: "When a website is not enough: web apps",
      sr: "Kad sajt nije dovoljan: web aplikacije",
    },
    excerpt: {
      en: "Portals, bookings and internal tools need custom logic. That is where web applications create real business leverage.",
      sr: "Portali, rezervacije i interni alati traže custom logiku. Tu web aplikacije stvaraju pravu poslovnu prednost.",
    },
    content: {
      en: [
        "A classic website presents your brand. A web application runs part of your business — users, data, workflows and permissions.",
        "Think booking systems, client dashboards, admin panels or tools that replace spreadsheets and messy manual processes.",
        "The right web app reduces friction for your team and your customers at the same time.",
        "If your process no longer fits into pages and forms, it is probably time for a custom application.",
      ],
      sr: [
        "Klasičan sajt predstavlja brend. Web aplikacija pokreće deo poslovanja — korisnike, podatke, tokove i dozvole.",
        "Tu spadaju sistemi rezervacija, klijentski dashboardi, admin paneli ili alati koji zamenjuju tabele i ručne procese.",
        "Prava web app smanjuje trenje i timu i klijentima u isto vreme.",
        "Ako vam proces više ne staje u stranice i forme, verovatno je vreme za custom aplikaciju.",
      ],
    },
  },
  {
    slug: "social-content-that-grows",
    date: "2026-06-20",
    readMinutes: 3,
    image: "/images/service-social.png",
    title: {
      en: "Social content that grows (without posting randomly)",
      sr: "Društveni sadržaj koji raste (bez nasumičnog postovanja)",
    },
    excerpt: {
      en: "Consistency beats intensity. A clear calendar and brand voice outperform random daily posts.",
      sr: "Konzistentnost pobeđuje intenzitet. Jasan kalendar i glas brenda bolji su od nasumičnih dnevnih objava.",
    },
    content: {
      en: [
        "Growth on social comes from rhythm, not chaos. Audiences follow brands that show up with a clear identity.",
        "Plan themes for the month, batch create content, then publish with intention. Measure what works and double down.",
        "Video and short-form formats still win attention — but only when the message is sharp.",
        "We help brands stay visible with systems, not last-minute posts.",
      ],
      sr: [
        "Rast na mrežama dolazi iz ritma, ne iz haosa. Publika prati brendove koji se pojavljuju sa jasnim identitetom.",
        "Planirajte teme za mesec, pripremite sadržaj u serijama, pa objavljujte namerno. Merite šta radi i pojačajte to.",
        "Video i short-form i dalje pobeduju pažnju — ali samo kad je poruka oštra.",
        "Mi pomažemo brendovima da ostanu vidljivi sistemom, ne objavama u poslednji tren.",
      ],
    },
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sr" ? "sr-RS" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
