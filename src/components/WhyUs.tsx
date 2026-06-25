import { motion } from "framer-motion";
import { Zap, RefreshCw, Handshake, ShieldCheck } from "lucide-react";
import { Reveal, stagger, staggerItem } from "./Reveal";

const blocks = [
  {
    icon: Zap,
    title: "Built with latest tech stack",
    desc: "React, TanStack, Supabase, Firebase, Framer & more",
  },
  {
    icon: RefreshCw,
    title: "Unlimited revisions",
    desc: "Until you love it, we iterate — no nickel-and-diming",
  },
  {
    icon: Handshake,
    title: "Direct founder access",
    desc: "You work with Narain, not an account manager",
  },
  {
    icon: ShieldCheck,
    title: "Post-launch support",
    desc: "We don't ghost after delivery — we stick around",
  },
];

export function WhyUs() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-[#06b6d4]" /> Why us
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Why Clients <span className="text-gradient">Choose Us</span>
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4"
        >
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              variants={staggerItem}
              className="group relative bg-[#0a0a0a] p-7 transition-colors duration-300 hover:bg-[#0d0d0d]"
            >
              <div className="absolute left-7 top-7 font-mono text-xs text-neutral-600">
                0{i + 1}
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-6 inline-grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20"
              >
                <b.icon className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
