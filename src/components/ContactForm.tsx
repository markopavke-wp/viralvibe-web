"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/i18n/get-dictionary";

const cards = [
  {
    href: "tel:+381641112104",
    image: "/images/1_1.png",
    name: "+381 64 111 2104",
  },
  {
    href: "tel:+381691420822",
    image: "/images/2_1.png",
    name: "+381 69 142 0822",
  },
] as const;

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="space-y-10">
      <Reveal>
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.14em] text-lime">
            {dict.contact.cardsTitle}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group relative block overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-2 hover:border-[rgba(203,255,77,0.4)] hover:shadow-[0_28px_70px_rgba(203,255,77,0.12)]"
              >
                <div className="relative aspect-[1050/600] w-full">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-lime">Viral Vibe</p>
                  <p className="mt-1 font-[family-name:var(--font-syne)] text-lg font-bold md:text-xl">
                    {card.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8">
          {sent ? (
            <p className="py-10 text-center text-lg text-lime">{dict.contact.success}</p>
          ) : (
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-paper/60">{dict.contact.name}</span>
                <input
                  required
                  name="name"
                  placeholder={dict.contact.namePlaceholder}
                  className="w-full rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-4 py-3 outline-none transition placeholder:text-paper/30 focus:border-lime"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-paper/60">{dict.contact.email}</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={dict.contact.emailPlaceholder}
                  className="w-full rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-4 py-3 outline-none transition placeholder:text-paper/30 focus:border-lime"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-paper/60">{dict.contact.phone}</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder={dict.contact.phonePlaceholder}
                  className="w-full rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-4 py-3 outline-none transition placeholder:text-paper/30 focus:border-lime"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-paper/60">{dict.contact.message}</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder={dict.contact.messagePlaceholder}
                  className="w-full resize-y rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-4 py-3 outline-none transition placeholder:text-paper/30 focus:border-lime"
                />
              </label>
              <button type="submit" className="btn-lime w-full sm:w-auto">
                {dict.contact.send}
              </button>
            </div>
          )}
        </form>
      </Reveal>
    </div>
  );
}
