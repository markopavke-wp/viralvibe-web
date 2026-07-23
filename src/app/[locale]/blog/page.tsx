import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { blogPosts, formatPostDate } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";
import { CtaBanner } from "@/components/CtaBanner";

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
    title: `${dict.blog.title} | Viral Vibe`,
    description: dict.blog.subtitle,
    path: "/blog",
    keywords: dict.seo.keywords,
  });
}

export default async function BlogPage({
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
              {dict.blog.title}
            </h1>
            <p className="mt-4 max-w-2xl text-paper/65">{dict.blog.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1 hover:border-[rgba(203,255,77,0.35)]">
                  <Link href={`/${locale}/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={post.image}
                        alt={post.title[locale]}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="text-xs uppercase tracking-[0.12em] text-paper/45">
                      {formatPostDate(post.date, locale)} · {post.readMinutes} min
                    </p>
                    <h2 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-bold leading-snug">
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="transition hover:text-lime"
                      >
                        {post.title[locale]}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/65">
                      {post.excerpt[locale]}
                    </p>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-lime"
                    >
                      {dict.blog.readMore} →
                    </Link>
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
