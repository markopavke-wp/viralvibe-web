import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

function ScriptLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  return (
    <ScriptLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/service-websites.png`,
        description:
          locale === "sr"
            ? "Digitalna agencija iz Niša za sajtove, web aplikacije, e-commerce, SEO i marketing."
            : "Digital agency from Niš for websites, web apps, e-commerce, SEO and marketing.",
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          addressCountry: siteConfig.country,
        },
        telephone: siteConfig.phone[0],
        email: siteConfig.email,
        areaServed: "RS",
        availableLanguage: ["en", "sr"],
      }}
    />
  );
}

export function WebsiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <ScriptLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: `${siteConfig.url}/${locale}`,
        inLanguage: locale === "sr" ? "sr-RS" : "en-US",
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }}
    />
  );
}

export function FaqJsonLd({ dict }: { dict: Dictionary }) {
  return (
    <ScriptLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }}
    />
  );
}
