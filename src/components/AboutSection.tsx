import { Reveal } from "./Reveal";
import type { Dictionary } from "@/i18n/get-dictionary";

export function AboutSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container-vv">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-lime">
            {dict.about.eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-bold md:text-5xl">
            {dict.about.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-paper/75 md:text-xl">
            {dict.about.lead}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {dict.about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="glass rounded-3xl px-6 py-7 text-center md:py-8">
                <p className="font-[family-name:var(--font-logo)] text-[2rem] font-semibold leading-none tracking-[-0.02em] text-lime md:text-[2.35rem]">
                  {s.value}
                </p>
                <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-paper/55">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="glass mt-10 space-y-5 rounded-3xl p-6 text-base leading-relaxed text-paper/75 md:p-10 md:text-lg">
            {dict.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold md:text-3xl">
              {dict.about.teamTitle}
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {dict.about.team.map((member, i) => (
              <Reveal key={member.role} delay={i * 0.05}>
                <div className="glass h-full rounded-3xl p-6 md:p-7">
                  <p className="text-xs uppercase tracking-[0.14em] text-lime">
                    {member.role}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-syne)] text-lg font-bold md:text-xl">
                    {member.title}
                  </p>
                  <p className="mt-3 text-sm text-paper/65">{member.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
