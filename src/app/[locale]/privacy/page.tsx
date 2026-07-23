import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
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
    title: `${dict.legal.privacyTitle} | Viral Vibe`,
    description: dict.legal.privacy[0]?.p ?? dict.meta.description,
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <section className="pb-20 pt-28 md:pt-32">
      <div className="container-vv max-w-3xl">
        <Reveal>
          <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold md:text-5xl">
            {dict.legal.privacyTitle}
          </h1>
          <p className="mt-3 text-sm text-paper/45">
            {dict.legal.updated}: 23 Jul 2026
          </p>
        </Reveal>
        <div className="mt-10 space-y-6">
          {dict.legal.privacy.map((block, i) => (
            <Reveal key={block.h} delay={i * 0.04}>
              <div className="glass rounded-3xl p-6 md:p-7">
                <h2 className="font-[family-name:var(--font-syne)] text-xl font-bold">
                  {block.h}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-paper/70 md:text-base">
                  {block.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
