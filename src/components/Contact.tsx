import { motion } from "framer-motion";
import { Mail, Instagram } from "lucide-react";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_60%)]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2),transparent_60%)]" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_70%)] blur-3xl"
        />
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Ready to <span className="text-gradient">Unscrew</span>
            <br />
            the Boring?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400 sm:text-lg">
            Drop a message and let's talk about your idea.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:unscrewly@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_50px_-8px_rgba(255,255,255,0.7)]"
            >
              <Mail className="h-4 w-4" /> Email Us
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://instagram.com/unscrewly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/10"
            >
              <Instagram className="h-4 w-4" /> DM on Instagram
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
