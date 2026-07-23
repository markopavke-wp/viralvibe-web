"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export function PricingPlans({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState(dict.pricing.plans[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ left: 0, size: 35 });
  const [canScroll, setCanScroll] = useState(false);

  const plan = dict.pricing.plans.find((p) => p.id === active) ?? dict.pricing.plans[0];

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll(max > 8);
    const size = el.scrollWidth > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 35;
    const left = max > 0 ? (el.scrollLeft / max) * (100 - size) : 0;
    setProgress({ left, size: Math.max(18, size) });
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(240, el.clientWidth * 0.6), behavior: "smooth" });
  }

  return (
    <div>
      <div className={`flex items-center gap-2 ${canScroll ? "sm:gap-3" : ""}`}>
        {canScroll && (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByDir(-1)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(11,12,14,0.85)] text-lg text-lime backdrop-blur-md sm:flex"
          >
            ‹
          </button>
        )}

        <div
          ref={scrollerRef}
          className="glass pricing-tabs-scroll min-w-0 flex-1 flex snap-x gap-2 overflow-x-auto rounded-[1.6rem] p-2"
        >
          {dict.pricing.plans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={`snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.06em] transition md:text-[0.7rem] ${
                active === p.id
                  ? "bg-lime text-ink"
                  : "text-paper/70 hover:bg-[rgba(250,250,249,0.06)] hover:text-paper"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {canScroll && (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByDir(1)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(11,12,14,0.85)] text-lg text-lime backdrop-blur-md sm:flex"
          >
            ›
          </button>
        )}
      </div>

      {canScroll && (
        <div className="mt-3 flex items-center gap-3 px-1">
          <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.14em] text-paper/45">
            {dict.pricing.scrollHint}
          </p>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
            <div
              className="h-full rounded-full bg-lime transition-[margin,width] duration-150"
              style={{ width: `${progress.size}%`, marginLeft: `${progress.left}%` }}
            />
          </div>
        </div>
      )}

      {plan && (
        <Reveal key={plan.id}>
          <div className="glass mt-6 rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-lime">{plan.label}</p>
                <p className="mt-2 font-[family-name:var(--font-syne)] text-5xl font-extrabold tracking-tight md:text-6xl">
                  {plan.price}
                  <span className="ml-2 text-lg font-medium text-paper/55">{plan.period}</span>
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70 md:text-base">
                  {plan.desc}
                </p>
              </div>
              <Link href={`/${locale}/contact`} className="btn-lime shrink-0">
                {dict.pricing.cta}
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-paper/75"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </div>
  );
}
