import Link from "next/link";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export function CtaBanner({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="pb-20">
      <div className="container-vv">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 text-center md:px-12 md:py-16">
            <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[rgba(203,255,77,0.22)] blur-3xl" />
            <div className="pointer-events-none absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-[rgba(203,255,77,0.16)] blur-3xl" />
            <h2 className="relative font-[family-name:var(--font-syne)] text-3xl font-bold md:text-5xl">
              {dict.cta.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm text-paper/70 md:text-base">
              {dict.cta.subtitle}
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/contact`} className="btn-lime">
                {dict.cta.primary}
              </Link>
              <Link href={`/${locale}/pricing`} className="btn-ghost">
                {dict.cta.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
