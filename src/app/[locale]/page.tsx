import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WorksGrid } from "@/components/WorksGrid";
import { LogosMarquee } from "@/components/LogosMarquee";
import { Reveal } from "@/components/Reveal";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqJsonLd } from "@/components/JsonLd";
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
    title: dict.meta.title,
    description: dict.meta.description,
    path: "/",
    keywords: dict.seo.keywords,
  });
}

export default async function HomePage({
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
      <FaqJsonLd dict={dict} />
      <Hero locale={locale} dict={dict} />
      <AboutSection dict={dict} />
      <ServicesSection locale={locale} dict={dict} />
      <LogosMarquee />

      <section className="py-16 md:py-24">
        <div className="container-vv">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-syne)] text-4xl font-bold md:text-5xl">
                  {dict.portfolio.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm text-paper/65 md:text-base">
                  {dict.portfolio.intro}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/case-studies`} className="btn-lime">
                  {dict.nav.cases}
                </Link>
                <Link href={`/${locale}/works`} className="btn-ghost">
                  {dict.nav.works}
                </Link>
              </div>
            </div>
          </Reveal>
          <WorksGrid dict={dict} />
        </div>
      </section>

      <FaqSection dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
