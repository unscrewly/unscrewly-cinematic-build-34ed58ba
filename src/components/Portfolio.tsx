import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, stagger, staggerItem } from "./Reveal";

const projects = [
  {
    name: "Heart Writing by K",
    desc: "Luxury brand site with GSAP animations, Supabase backend, and booking flows.",
    tags: ["Website"],
    gradient: "from-rose-500/40 via-fuchsia-500/30 to-purple-600/40",
    mock: "calligraphy",
  },
  {
    name: "Bhavika's Kitchen Classes",
    desc: "Firebase Firestore, WhatsApp enrollment, PIN-protected admin panel.",
    tags: ["Website", "App"],
    gradient: "from-amber-500/40 via-orange-500/30 to-red-500/40",
    mock: "kitchen",
  },
  {
    name: "HomeSync Kitchen",
    desc: "Offline-first PWA with Gemini AI image scanning and IndexedDB.",
    tags: ["SaaS", "PWA"],
    gradient: "from-cyan-400/40 via-blue-500/30 to-purple-600/40",
    mock: "homesync",
  },
];

function Mockup({ kind, gradient }: { kind: string; gradient: string }) {
  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-[75%] rounded-lg border border-white/15 bg-black/40 p-3 backdrop-blur-xl">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2.5 w-1/2 rounded bg-white/30" />
            <div className="h-1.5 w-3/4 rounded bg-white/15" />
            <div className="h-1.5 w-2/3 rounded bg-white/15" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="h-10 rounded bg-white/10" />
            <div className="h-10 rounded bg-white/20" />
            <div className="h-10 rounded bg-white/10" />
          </div>
          <div className="mt-2 font-mono text-[8px] uppercase tracking-widest text-white/50">
            {kind}
          </div>
        </div>
      </div>
      <div className="grain" />
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-[#7c3aed]" /> Portfolio
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Work We're <span className="text-gradient">Proud Of</span>
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.a
              key={p.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              href="#contact"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c0c] p-5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_30px_80px_-20px_rgba(124,58,237,0.5)]"
            >
              <div className="relative overflow-hidden rounded-xl">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mockup kind={p.mock} gradient={p.gradient} />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black">
                    View Project <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {p.name}
                </h3>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {p.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
