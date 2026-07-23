import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildPageMetadata({
    locale: raw,
    title: `${study.title[raw]} | Viral Vibe`,
    description: study.challenge[raw],
    path: `/case-studies/${slug}`,
    image: study.image,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <article className="pb-10 pt-28 md:pt-32">
        <div className="container-vv">
          <Reveal>
            <Link
              href={`/${locale}/case-studies`}
              className="text-sm uppercase tracking-[0.12em] text-lime"
            >
              ← {dict.cases.back}
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.14em] text-paper/45">
              {study.client} · {dict.cases.industry}: {study.industry[locale]}
            </p>
            <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-syne)] text-3xl font-bold md:text-5xl">
              {study.title[locale]}
            </h1>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.12)]">
              <Image
                src={study.image}
                alt={study.title[locale]}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="glass h-full rounded-3xl p-6 md:p-8">
                <h2 className="text-sm uppercase tracking-[0.14em] text-lime">
                  {dict.cases.challenge}
                </h2>
                <p className="mt-4 text-paper/75">{study.challenge[locale]}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="glass h-full rounded-3xl p-6 md:p-8">
                <h2 className="text-sm uppercase tracking-[0.14em] text-lime">
                  {dict.cases.solution}
                </h2>
                <p className="mt-4 text-paper/75">{study.solution[locale]}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="glass mt-4 rounded-3xl p-6 md:p-8">
              <h2 className="text-sm uppercase tracking-[0.14em] text-lime">
                {dict.cases.results}
              </h2>
              <ul className="mt-4 space-y-3">
                {study.results[locale].map((r) => (
                  <li key={r} className="flex gap-3 text-paper/75">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" />
                    {r}
                  </li>
                ))}
              </ul>
              <a
                href={study.href}
                target="_blank"
                rel="noreferrer"
                className="btn-lime mt-8 inline-flex"
              >
                {dict.cases.visit}
              </a>
            </div>
          </Reveal>
        </div>
      </article>
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
