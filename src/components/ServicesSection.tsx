"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { serviceImages } from "@/lib/content";

function StackCard({
  item,
  index,
  total,
  locale,
  cta,
  image,
  progress,
}: {
  item: Dictionary["services"]["items"][number];
  index: number;
  total: number;
  locale: Locale;
  cta: string;
  image: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // n cards need (n - 1) transitions — using `total` skips/clips the last card
  const steps = Math.max(total - 1, 1);
  const enterStart = index === 0 ? 0 : (index - 1) / steps;
  const enterEnd = index === 0 ? 0 : index / steps;
  const isLast = index === total - 1;
  const exitStart = isLast ? 1 : index / steps;
  const exitEnd = isLast ? 1 : (index + 1) / steps;

  const y = useTransform(
    progress,
    index === 0 ? [0, 1] : [enterStart, enterEnd],
    index === 0 ? ["0%", "0%"] : ["108%", "0%"]
  );
  // Covered cards fade out fast so previous text doesn't linger over the next card
  const opacity = useTransform(
    progress,
    isLast
      ? [0, 1]
      : [
          exitStart,
          exitStart + (exitEnd - exitStart) * 0.15,
          exitStart + (exitEnd - exitStart) * 0.28,
          exitEnd,
        ],
    isLast ? [1, 1] : [1, 0.2, 0, 0]
  );
  const scale = useTransform(
    progress,
    isLast
      ? [0, 1]
      : [exitStart, exitStart + (exitEnd - exitStart) * 0.25, exitEnd],
    isLast ? [1, 1] : [1, 0.97, 0.95]
  );

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className="absolute inset-0 origin-top will-change-transform"
    >
      {/* Solid surface (no backdrop-filter) — glass stacks create visual noise */}
      <div className="relative grid h-full overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.14)] bg-[#12141a] shadow-[0_28px_90px_rgba(0,0,0,0.55)] md:grid-cols-[1.1fr_0.9fr] md:rounded-[2rem]">
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,transparent_42%,rgba(203,255,77,0.04)_100%)]" />

        <div className="relative z-[1] order-1 aspect-[16/10] overflow-hidden md:order-2 md:aspect-auto md:min-h-full">
          <Image
            src={image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-[#12141a]/25 to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-[#12141a]/75" />
        </div>

        <div className="relative z-[1] order-2 flex flex-col justify-between p-5 md:order-1 md:p-8 lg:p-10">
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="font-[family-name:var(--font-logo)] text-3xl font-semibold text-lime md:text-5xl">
                {item.id}
              </p>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-paper/40">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </p>
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-bold leading-tight md:mt-4 md:text-3xl lg:text-4xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/70 md:mt-4 md:text-base lg:text-lg">
              {item.body}
            </p>
            {"points" in item && item.points && (
              <ul className="mt-4 hidden space-y-2 text-sm text-paper/65 md:block">
                {item.points.slice(0, 3).map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href={`/${locale}/contact`} className="btn-lime mt-5 w-fit md:mt-8">
            {cta}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const items = dict.services.items;
  const total = items.length;
  const steps = Math.max(total - 1, 1);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ height: `${Math.max(steps * 105 + 80, 420)}vh` }}
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center py-20 md:py-24">
        <div className="container-vv">
          <div className="mb-5 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <h2 className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight md:text-6xl">
              {dict.services.title}
            </h2>
            <div className="h-1 w-full max-w-[12rem] overflow-hidden rounded-full bg-[rgba(250,250,249,0.12)]">
              <motion.div
                style={{ scaleX: barScale }}
                className="h-full origin-left rounded-full bg-lime"
              />
            </div>
          </div>

          <div className="relative h-[min(680px,78svh)] overflow-hidden md:h-[min(560px,70svh)] lg:h-[min(600px,72svh)]">
            {items.map((item, i) => (
              <StackCard
                key={item.id}
                item={item}
                index={i}
                total={total}
                locale={locale}
                cta={dict.services.cta}
                image={serviceImages[i] ?? serviceImages[0]}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
