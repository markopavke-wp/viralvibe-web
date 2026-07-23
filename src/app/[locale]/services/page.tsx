import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesSection } from "@/components/ServicesSection";
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
    title: `${dict.nav.services} | Viral Vibe`,
    description: dict.meta.description,
    path: "/services",
    keywords: dict.seo.keywords,
  });
}

export default async function ServicesPage({
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
      <div className="pt-10">
        <ServicesSection locale={locale} dict={dict} />
      </div>
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
