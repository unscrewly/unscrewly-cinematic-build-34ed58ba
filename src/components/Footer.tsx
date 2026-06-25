import { Mail, Instagram } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#070707]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] text-sm font-black text-white">
                U
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Unscrewly
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">
              We UNSCREW the Boring. Automation-first web agency for products
              that actually ship.
            </p>
          </div>

          <nav className="flex flex-wrap items-start gap-x-6 gap-y-2 md:justify-center">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-start gap-3 md:justify-end">
            <a
              href="mailto:unscrewly@gmail.com"
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300 transition-all hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/10 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/unscrewly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300 transition-all hover:border-[#06b6d4]/60 hover:bg-[#06b6d4]/10 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <span>© 2025 Unscrewly. Built by Narain with ☕ and zero shortcuts.</span>
          <span className="font-mono text-neutral-600">v1.0 · live</span>
        </div>
      </div>
    </footer>
  );
}
