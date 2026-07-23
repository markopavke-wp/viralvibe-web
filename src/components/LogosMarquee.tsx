"use client";

import Image from "next/image";

const logos = [
  "/images/Untitled-design-49.png",
  "/images/djokiclogo.png",
  "/images/1.png",
  "/images/3.png",
  "/images/4.png",
  "/images/66f826d930eb7fe2c22987ae_Untitled-design-3.png",
];

export function LogosMarquee() {
  const loop = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-28" />

      <div className="marquee-track flex items-center gap-4 px-4 md:gap-5">
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="logo-tile glass relative flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl px-4 md:h-24 md:w-44"
          >
            <Image
              src={src}
              alt=""
              width={140}
              height={56}
              className="max-h-12 w-auto object-contain md:max-h-14"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
