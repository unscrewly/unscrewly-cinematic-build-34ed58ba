import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unscrewly — We UNSCREW the Boring" },
      {
        name: "description",
        content:
          "Automation-first web agency by Narain Suresh Chawla. Websites, SaaS apps, AI tools, PWAs — shipped fast, built right.",
      },
      { property: "og:title", content: "Unscrewly — We UNSCREW the Boring" },
      {
        property: "og:description",
        content:
          "Automation-first web agency. Websites, SaaS, AI tools and PWAs that actually work.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WhyUs />
        <Portfolio />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
