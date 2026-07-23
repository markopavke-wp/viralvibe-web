"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/i18n/get-dictionary";
import { works } from "@/lib/content";

export function WorksGrid({
  dict,
  limit,
}: {
  dict: Dictionary;
  limit?: number;
}) {
  const items = limit ? works.slice(0, limit) : works;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((work, i) => (
        <Reveal key={work.href} delay={i * 0.06}>
          <motion.a
            href={work.href}
            target="_blank"
            rel="noreferrer"
            className="glass group relative block overflow-hidden rounded-3xl"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent opacity-90 transition group-hover:opacity-100" />
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(203,255,77,0.25),transparent_45%)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="font-[family-name:var(--font-syne)] text-lg font-bold md:text-xl">
                    {work.title}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-lime">
                    {dict.portfolio.view} →
                  </p>
                </div>
              </div>
            </div>
          </motion.a>
        </Reveal>
      ))}
    </div>
  );
}
