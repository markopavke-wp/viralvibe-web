import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { FaqSection } from "@/components/FaqSection";
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
    title: `${dict.nav.contact} | Viral Vibe`,
    description: dict.contact.subtitle,
    path: "/contact",
    keywords: dict.seo.keywords,
  });
}

export default async function ContactPage({
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
            <p className="text-sm uppercase tracking-[0.2em] text-lime">
              {dict.contact.getIn} {dict.contact.touch}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-bold md:text-6xl">
              {dict.contact.title}
            </h1>
            <p className="mt-4 max-w-xl text-paper/65">{dict.contact.subtitle}</p>
          </Reveal>
          <div className="mt-10">
            <ContactForm dict={dict} />
          </div>
        </div>
      </section>
      <FaqSection dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
