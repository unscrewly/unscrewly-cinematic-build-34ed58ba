import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal, stagger, staggerItem } from "./Reveal";

const tiers = [
  {
    name: "Basic",
    price: "₹9,999",
    priceSuffix: "starting at",
    desc: "Landing page / brochure website",
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Contact form",
      "1-week delivery",
      "Post-launch support: 7 days",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹29,999",
    priceSuffix: "starting at",
    desc: "Business website or web app",
    features: [
      "Up to 15 pages / full features",
      "Admin panel, database, auth",
      "AI or automation integration",
      "2–3 week delivery",
      "Post-launch support: 30 days",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "let's talk",
    desc: "Full SaaS product / complex platform",
    features: [
      "Custom integrations, AI pipelines",
      "Scalable infra setup",
      "Dedicated support",
      "Timeline based on scope",
      "SLAs available",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-[#06b6d4]" /> Pricing
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-neutral-400">
            No hidden fees. No vague hourly rates. Just clear scopes and predictable delivery.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                t.highlight
                  ? "shimmer-border border border-transparent bg-gradient-to-b from-[#1a0f2e] to-[#0a0a0a] shadow-[0_0_60px_-10px_rgba(124,58,237,0.45)]"
                  : "border border-white/[0.07] bg-[#0c0c0c] hover:border-white/20"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  ⭐ Most Popular
                </span>
              )}
              <div>
                <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{t.desc}</p>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-white">
                  {t.price}
                </span>
                <span className="text-xs uppercase tracking-wider text-neutral-500">
                  {t.priceSuffix}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                      t.highlight ? "bg-gradient-to-br from-[#7c3aed] to-[#06b6d4]" : "bg-white/10"
                    }`}>
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href="mailto:unscrewly@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  t.highlight
                    ? "bg-white text-black hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.6)]"
                    : "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/30"
                }`}
              >
                {t.cta} <span>→</span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
