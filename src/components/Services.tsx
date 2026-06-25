import { motion } from "framer-motion";
import { Globe, Layers, Sparkles, Workflow, Wand2, WifiOff } from "lucide-react";
import { Reveal, stagger, staggerItem } from "./Reveal";

const services = [
  {
    icon: Globe,
    title: "Websites & Landing Pages",
    desc: "Pixel-perfect, conversion-focused sites that load fast and look stunning.",
    tag: null,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Layers,
    title: "SaaS & Web Apps",
    desc: "Full-stack web applications built to scale, from MVP to production.",
    tag: "Most Popular",
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "AI Tools & Chatbots",
    desc: "Custom AI-powered tools, assistants, and integrations using the latest models.",
    tag: "New",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Workflow,
    title: "Automation & Integrations",
    desc: "Connect your tools, eliminate manual work, and run on autopilot.",
    tag: null,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Wand2,
    title: "No-Code Builds",
    desc: "Framer, Webflow, and no-code platforms — ship fast without compromising quality.",
    tag: null,
    gradient: "from-orange-400 to-pink-500",
  },
  {
    icon: WifiOff,
    title: "PWA / Offline Apps",
    desc: "Offline-first progressive web apps that work even without internet.",
    tag: null,
    gradient: "from-indigo-400 to-purple-500",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-[#7c3aed]" /> Services
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            What We <span className="text-gradient">Build</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-neutral-400">
            Six core capabilities. Zero filler. Everything we ship is engineered
            to be fast, scalable, and unmistakably premium.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent p-7 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_50px_-10px_rgba(124,58,237,0.35)]"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7c3aed]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                {s.tag && (
                  <span className="rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#a78bfa]">
                    {s.tag}
                  </span>
                )}
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-neutral-400">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
