import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { caseStudies } from "@/lib/case-studies";
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
    title: `${dict.cases.title} | Viral Vibe`,
    description: dict.cases.subtitle,
    path: "/case-studies",
    keywords: dict.seo.keywords,
  });
}

export default async function CaseStudiesPage({
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
              {dict.cases.title}
            </h1>
            <p className="mt-4 max-w-2xl text-paper/65">{dict.cases.subtitle}</p>
          </Reveal>

          <div className="mt-12 space-y-8">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <article className="glass grid overflow-hidden rounded-3xl md:grid-cols-[1fr_1.1fr]">
                  <div className="relative min-h-[220px]">
                    <Image
                      src={c.image}
                      alt={c.title[locale]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-lime">
                        {c.client} · {c.industry[locale]}
                      </p>
                      <h2 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-bold md:text-3xl">
                        {c.title[locale]}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-paper/65 md:text-base">
                        {c.challenge[locale]}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/case-studies/${c.slug}`}
                        className="btn-lime"
                      >
                        {dict.cases.read}
                      </Link>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost"
                      >
                        {dict.cases.visit}
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
