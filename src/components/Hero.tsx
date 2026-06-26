import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      {/* Animated mesh background */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed] opacity-30 blur-[120px] animate-mesh" />
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#06b6d4] opacity-20 blur-[120px] animate-mesh" style={{ animationDelay: "-6s" }} />
        <div className="absolute left-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[#a855f7] opacity-15 blur-[120px] animate-mesh" style={{ animationDelay: "-12s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0a0a0a_70%)]" />
        <div className="grain" />
      </motion.div>

      {/* Floating UI mockup cards */}
      <motion.div style={{ y: yFg, opacity }} className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute left-[6%] top-[28%] w-64 rotate-[-8deg] rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-xl"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#7c3aed]" />
            <div className="h-2 w-16 rounded bg-white/20" />
          </div>
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="mt-2 h-2 w-3/4 rounded bg-white/10" />
          <div className="mt-4 h-16 rounded-md bg-gradient-to-br from-[#7c3aed]/40 to-[#06b6d4]/30" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="absolute right-[6%] top-[35%] w-72 rotate-[6deg] rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono text-[10px] text-neutral-400">build.log</div>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-1.5 font-mono text-[10px] leading-relaxed text-neutral-400">
            <div>→ deploying unscrewly...</div>
            <div className="text-[#06b6d4]">✓ build complete (2.3s)</div>
            <div className="text-[#a78bfa]">✓ live at unscrewly.app</div>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-5xl text-center font-display text-[44px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[96px]"
        >
          <span className="text-gradient">We UNSCREW</span>
          <br />
          <span className="text-white">the Boring.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Automation-first web agency. We build websites, SaaS apps, AI tools,
          and digital products that actually work — fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#portfolio"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.6)]"
          >
            See Our Work
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:unscrewly@gmail.com"
            className="group relative inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/10 hover:shadow-[0_0_30px_-8px_rgba(124,58,237,0.6)]"
          >
            Get a Quote
            <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
