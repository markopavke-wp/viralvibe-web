import type { Locale } from "@/i18n/config";

export type CaseStudy = {
  slug: string;
  image: string;
  href: string;
  client: string;
  title: Record<Locale, string>;
  industry: Record<Locale, string>;
  challenge: Record<Locale, string>;
  solution: Record<Locale, string>;
  results: Record<Locale, string[]>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "djokic-gradnja",
    client: "Djokic Gradnja",
    image: "/images/djokic-pocetna.jpg",
    href: "https://djokicgradnja.rs/",
    title: {
      en: "Apartment sales through a clearer project website",
      sr: "Prodaja stanova kroz jasniji sajt projekata",
    },
    industry: { en: "Construction / Real estate", sr: "Građevinarstvo / nekretnine" },
    challenge: {
      en: "Buyers struggled to understand which buildings were finished, which were new, and how to inquire about apartments — the brand needed a sales-ready digital structure.",
      sr: "Kupcima je bilo teško da razumeju koji su objekti završeni, koji su novi i kako da se jave za stan — brendu je trebala prodajno spremna digitalna struktura.",
    },
    solution: {
      en: "We built a conversion-focused site with a clear split between completed and new projects, strong project pages and a direct path from browsing to inquiry.",
      sr: "Napravili smo konverzioni sajt sa jasnom podelom završenih i novih projekata, jakim stranicama objekata i direktnim putem od pregleda do upita.",
    },
    results: {
      en: [
        "Clear structure: completed projects vs. new developments",
        "Higher apartment sales driven through the website",
        "Faster buyer understanding of inventory and availability",
        "Stronger inquiry flow from project pages to contact",
      ],
      sr: [
        "Jasna struktura: završeni projekti vs. novi objekti",
        "Povećana prodaja stanova preko sajta",
        "Kupci brže razumeju ponudu i dostupnost",
        "Jači tok upita sa stranica projekata do kontakta",
      ],
    },
  },
  {
    slug: "gradsko-dvd-nis",
    client: "Gradsko DVD Niš",
    image: "/images/gdvd.jpg",
    href: "https://www.gradskodvdnis.com/",
    title: {
      en: "Better Google visibility for an institutional brand",
      sr: "Bolja Google vidljivost za institucionalni brend",
    },
    industry: { en: "Public / Community", sr: "Javni / zajednica" },
    challenge: {
      en: "Important information was hard to find, and the organization needed a trustworthy site that people and search engines could actually understand.",
      sr: "Važne informacije je bilo teško naći, a organizaciji je trebao pouzdan sajt koji i ljudi i Google mogu jasno da razumeju.",
    },
    solution: {
      en: "We rebuilt information architecture, improved on-page SEO structure and delivered a modern institutional design that keeps content findable and updatable.",
      sr: "Obnovili smo informacionu arhitekturu, poboljšali on-page SEO strukturu i isporučili moderan institucionalni dizajn koji sadržaj čini pronađivim i ažurnim.",
    },
    results: {
      en: [
        "Improved Google visibility for key pages",
        "Easier navigation for visitors and members",
        "More professional digital identity",
        "Cleaner structure for news and future content",
      ],
      sr: [
        "Bolja vidljivost na Google-u za ključne stranice",
        "Lakša navigacija za posetioce i članove",
        "Profesionalniji digitalni identitet",
        "Čistija struktura za vesti i budući sadržaj",
      ],
    },
  },
  {
    slug: "magnet-medic",
    client: "Magnet Medic",
    image: "/images/Untitled-design-50.png",
    href: "https://magnetmedic.rs/",
    title: {
      en: "More inquiries and stronger local search presence",
      sr: "Više upita i jača lokalna Google pozicija",
    },
    industry: { en: "Healthcare", sr: "Zdravstvo" },
    challenge: {
      en: "The clinic needed a trust-first website that explains services clearly and helps patients find them when searching online.",
      sr: "Klinici je trebao sajt zasnovan na poverenju koji jasno objašnjava usluge i pomaže pacijentima da ih pronađu kada traže online.",
    },
    solution: {
      en: "We delivered a clean healthcare site with clear service pages, SEO-ready structure and a simple path from search intent to contact.",
      sr: "Isporučili smo čist zdravstveni sajt sa jasnim stranicama usluga, SEO-spremnom strukturom i jednostavnim putem od pretrage do kontakta.",
    },
    results: {
      en: [
        "Better Google visibility for service-related searches",
        "Increased patient inquiries through the website",
        "Higher perceived trust and professionalism",
        "Clearer service communication that converts visitors",
      ],
      sr: [
        "Bolja Google vidljivost za pretrage vezane za usluge",
        "Više upita pacijenata preko sajta",
        "Veće poverenje i profesionalniji utisak",
        "Jasnija komunikacija usluga koja konvertuje posetioce",
      ],
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
