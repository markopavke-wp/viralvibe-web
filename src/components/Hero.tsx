"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

function SplitWord({
  text,
  accent,
  delay = 0,
}: {
  text: string;
  accent?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const letters = text.split("");

  return (
    <span className={`inline-flex ${accent ? "text-lime" : ""}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={reduce ? false : { y: "110%", opacity: 0, rotateX: 40 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.045,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="float-orb absolute left-[8%] top-[18%] h-[38vmin] w-[38vmin] rounded-full bg-[radial-gradient(circle,rgba(203,255,77,0.28),transparent_68%)] blur-3xl" />
        <div className="float-orb-delay absolute bottom-[12%] right-[6%] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,rgba(203,255,77,0.18),transparent_70%)] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(250,250,249,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,249,0.9) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
          }}
        />

        <svg
          viewBox="0 0 56 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1/2 top-[46%] h-[min(52vmin,420px)] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
          aria-hidden
        >
          <path
            d="M2 36 L16 28 L16 50 L2 50 Z"
            stroke="#CBFF4D"
            strokeWidth="1.25"
            fill="none"
          />
          <path
            d="M20 22 L34 12 L34 50 L20 50 Z"
            stroke="#CBFF4D"
            strokeWidth="1.25"
            fill="none"
          />
          <path
            d="M38 8 L52 0 L52 50 L38 50 Z"
            stroke="#CBFF4D"
            strokeWidth="1.25"
            fill="none"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-vv relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="glass mb-7 rounded-full px-4 py-2"
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-lime md:text-sm">
            {dict.hero.eyebrow}
          </p>
        </motion.div>

        <h1 className="overflow-hidden font-[family-name:var(--font-syne)] text-[clamp(3.2rem,12vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          <SplitWord text={dict.hero.title} delay={0.15} />
          <span className="mx-2 inline-block md:mx-4" />
          <SplitWord text={dict.hero.titleAccent} accent delay={0.35} />
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-base text-paper/75 md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.9 }}
        >
          <Link href={`/${locale}/contact`} className="btn-lime">
            {dict.nav.contact}
          </Link>
          <Link href={`/${locale}/works`} className="btn-ghost">
            {dict.nav.works}
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-paper/40"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
        >
          <span>{dict.common.scroll}</span>
          <motion.span
            className="h-10 w-px origin-top bg-gradient-to-b from-lime to-transparent"
            animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
