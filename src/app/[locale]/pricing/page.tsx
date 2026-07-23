import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PricingPlans } from "@/components/PricingPlans";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: `${dict.nav.pricing} | Viral Vibe`,
    description: dict.pricing.subtitle,
    path: "/pricing",
    keywords: dict.seo.keywords,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="pb-10 pt-28 md:pt-32">
        <div className="container-vv">
          <Reveal>
            <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold md:text-6xl">
              {dict.pricing.title}
            </h1>
            <p className="mt-4 max-w-2xl text-paper/65">{dict.pricing.subtitle}</p>
          </Reveal>
          <div className="mt-10">
            <PricingPlans locale={locale} dict={dict} />
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
