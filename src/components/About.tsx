import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const tags = ["React", "TanStack", "Firebase", "Supabase", "Framer", "AI/LLMs", "PWA"];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-[#7c3aed]" /> About
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            The Person <span className="text-gradient">Behind It</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[420px_1fr]">
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#7c3aed,#06b6d4,#7c3aed)] opacity-30 blur-2xl"
              />
              <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f0f0f] to-[#050505]">
                <div className="grain" />
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[220px] font-black leading-none text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
                    background: "linear-gradient(180deg, rgba(124,58,237,0.4), rgba(6,182,212,0.2))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  N
                </motion.span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  <span>founder.001</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    online
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.15}>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                Narain Suresh Chawla
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
                I'm Narain — a solo developer and founder of Unscrewly. I build
                fast, modern digital products for businesses that want to stand
                out. No bloat, no outsourcing, no BS. Just clean code, sharp
                design, and products that ship.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-7 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-neutral-300 transition-colors hover:border-[#7c3aed]/50 hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
