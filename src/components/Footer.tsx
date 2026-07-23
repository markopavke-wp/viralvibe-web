import Link from "next/link";
import { Logo } from "./Logo";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/#about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/case-studies`, label: dict.nav.cases },
    { href: `/${locale}/works`, label: dict.nav.works },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="relative mt-20 border-t border-[rgba(250,250,249,0.1)] pb-10 pt-14">
      <div className="container-vv grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href={`/${locale}`} aria-label="Viral Vibe">
            <Logo className="h-9 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-paper/65">{dict.footer.tagline}</p>
          <Link href={`/${locale}/contact`} className="btn-lime mt-6 inline-flex text-sm">
            {dict.cta.primary}
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-[0.08em] text-paper/70 transition hover:text-lime"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="container-vv mt-10 flex flex-col gap-3 border-t border-[rgba(250,250,249,0.08)] pt-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} Viral Vibe. {dict.footer.rights}
        </span>
        <div className="flex flex-wrap gap-4">
          <Link href={`/${locale}/privacy`} className="hover:text-lime">
            {dict.legal.privacyTitle}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-lime">
            {dict.legal.termsTitle}
          </Link>
          <span className="text-lime/70">Niš · Serbia</span>
        </div>
      </div>
    </footer>
  );
}
