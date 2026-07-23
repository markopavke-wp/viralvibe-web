"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const routes = [
  { key: "home", path: "" },
  { key: "services", path: "/services" },
  { key: "cases", path: "/case-studies" },
  { key: "works", path: "/works" },
  { key: "pricing", path: "/pricing" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
] as const;

function Flag({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <Image
      src={locale === "en" ? "/flags/gb.svg" : "/flags/rs.svg"}
      alt=""
      width={22}
      height={14}
      className={`rounded-[2px] object-cover shadow-sm ${className}`}
    />
  );
}

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const otherLocale: Locale = locale === "en" ? "sr" : "en";
  const rest = pathname.replace(/^\/(en|sr)/, "") || "";
  const switchHref = `/${otherLocale}${rest}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-400 ${
          scrolled || open
            ? "glass-strong border-b border-[rgba(203,255,77,0.2)]"
            : "border-b border-transparent bg-[rgba(11,12,14,0.35)] backdrop-blur-2xl"
        }`}
      >
        <div className="container-vv flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
          <Link
            href={`/${locale}`}
            className="relative z-[110] shrink-0 text-[1.35rem] md:text-[1.55rem]"
            aria-label="Viral Vibe home"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {routes.map((item) => {
              const href = `/${locale}${item.path}`;
              const active =
                item.path === ""
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`rounded-full px-3.5 py-2 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-colors ${
                    active ? "text-lime" : "text-paper/80 hover:text-lime"
                  }`}
                >
                  {dict.nav[item.key]}
                </Link>
              );
            })}

            <div className="ml-3 flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] p-1 backdrop-blur-xl">
              <Link
                href={`/${locale}${rest}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-ink"
                aria-current="true"
              >
                <Flag locale={locale} />
                {locale.toUpperCase()}
              </Link>
              <Link
                href={switchHref}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-paper/75 transition hover:text-lime"
              >
                <Flag locale={otherLocale} />
                {otherLocale.toUpperCase()}
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className="relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.08)] text-lime backdrop-blur-xl lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`block h-0.5 w-full origin-center bg-current transition duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition duration-300 ${
                  open ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full origin-center bg-current transition duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-[rgba(11,12,14,0.72)] backdrop-blur-md"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="glass-strong absolute inset-x-4 top-[4.75rem] max-h-[calc(100svh-5.5rem)] overflow-y-auto rounded-3xl p-3 sm:inset-x-6"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-1">
                {routes.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={`/${locale}${item.path}`}
                      className="block rounded-2xl px-4 py-3.5 text-base font-medium uppercase tracking-[0.08em] text-paper transition hover:bg-[rgba(203,255,77,0.1)] hover:text-lime"
                      onClick={() => setOpen(false)}
                    >
                      {dict.nav[item.key]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[rgba(255,255,255,0.12)] pt-3">
                <Link
                  href={`/${locale}${rest}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-3 py-3 text-sm font-bold uppercase tracking-wider text-ink"
                  onClick={() => setOpen(false)}
                >
                  <Flag locale={locale} />
                  {locale.toUpperCase()}
                </Link>
                <Link
                  href={switchHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] px-3 py-3 text-sm font-semibold uppercase tracking-wider text-paper"
                  onClick={() => setOpen(false)}
                >
                  <Flag locale={otherLocale} />
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
