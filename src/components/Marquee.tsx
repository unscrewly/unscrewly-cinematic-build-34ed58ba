const items = [
  "Websites",
  "SaaS Apps",
  "AI Chatbots",
  "Automations",
  "PWAs",
  "No-Code",
  "Fast Delivery",
  "Post-launch Support",
  "Direct Founder Access",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="relative border-y border-white/[0.06] bg-[#070707] py-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#070707] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#070707] to-transparent" />
      <div className="flex w-max animate-marquee gap-10 font-mono text-sm uppercase tracking-[0.18em] text-neutral-500">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span>{t}</span>
            <span className="text-neutral-700">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
