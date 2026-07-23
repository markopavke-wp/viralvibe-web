import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { blogPosts, formatPostDate, getPost } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";
import { CtaBanner } from "@/components/CtaBanner";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const post = getPost(slug);
  if (!post) return {};
  return buildPageMetadata({
    locale: raw,
    title: `${post.title[raw]} | Viral Vibe`,
    description: post.excerpt[raw],
    path: `/blog/${slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="pb-10 pt-28 md:pt-32">
        <div className="container-vv max-w-3xl">
          <Reveal>
            <Link
              href={`/${locale}/blog`}
              className="text-sm uppercase tracking-[0.12em] text-lime transition hover:opacity-80"
            >
              ← {dict.blog.back}
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.12em] text-paper/45">
              {formatPostDate(post.date, locale)} · {post.readMinutes} min
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold leading-tight md:text-5xl">
              {post.title[locale]}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.12)]">
              <Image
                src={post.image}
                alt={post.title[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass mt-8 space-y-5 rounded-3xl p-6 text-base leading-relaxed text-paper/75 md:p-10 md:text-lg">
              {post.content[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn-lime">
                {dict.nav.contact}
              </Link>
              <Link href={`/${locale}/blog`} className="btn-ghost">
                {dict.blog.back}
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
