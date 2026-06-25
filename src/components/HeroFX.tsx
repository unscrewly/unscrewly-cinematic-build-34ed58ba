import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Cinematic interactive backdrop:
 * - Cursor-following radial spotlight (CSS vars updated on pointermove)
 * - SVG goo-filtered liquid blobs that drift + lerp toward the cursor
 * - Animated perspective grid that tilts with the mouse
 * - Subtle parallax on scroll handled by the parent
 */
export function HeroFX() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  // motion values for grid tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 80,
    damping: 20,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 80,
    damping: 20,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Target & current positions for each blob (smooth lerp)
    const targets = [
      { x: 0.3, y: 0.4 },
      { x: 0.7, y: 0.55 },
      { x: 0.5, y: 0.3 },
    ];
    const current = targets.map((t) => ({ ...t }));
    const blobs = [blob1.current, blob2.current, blob3.current];

    let raf = 0;
    let cursor = { x: 0.5, y: 0.5, active: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      cursor.x = nx;
      cursor.y = ny;
      cursor.active = 1;
      el.style.setProperty("--mx", `${nx * 100}%`);
      el.style.setProperty("--my", `${ny * 100}%`);
      mx.set(nx - 0.5);
      my.set(ny - 0.5);
    };
    const onLeave = () => {
      cursor.active = 0;
      el.style.setProperty("--active", "0");
    };
    const onEnter = () => {
      el.style.setProperty("--active", "1");
    };

    const baseFloat = (i: number, t: number) => ({
      x: 0.5 + Math.cos(t / 3500 + i * 1.7) * 0.28,
      y: 0.5 + Math.sin(t / 4200 + i * 2.1) * 0.22,
    });

    const tick = (t: number) => {
      for (let i = 0; i < blobs.length; i++) {
        const node = blobs[i];
        if (!node) continue;
        const drift = baseFloat(i, t);
        // pull each blob toward cursor with varying strength
        const pull = cursor.active ? 0.35 + i * 0.1 : 0;
        const tx = drift.x * (1 - pull) + cursor.x * pull;
        const ty = drift.y * (1 - pull) + cursor.y * pull;
        // lerp
        current[i].x += (tx - current[i].x) * 0.06;
        current[i].y += (ty - current[i].y) * 0.06;
        const r = el.getBoundingClientRect();
        node.style.transform = `translate3d(${current[i].x * r.width - 160}px, ${
          current[i].y * r.height - 160
        }px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerenter", onEnter);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-auto absolute inset-0 -z-10 overflow-hidden"
      style={
        {
          ["--mx" as any]: "50%",
          ["--my" as any]: "40%",
          ["--active" as any]: "0",
        } as React.CSSProperties
      }
    >
      {/* SVG goo filter */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="hero-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Perspective animated grid */}
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-x-[-20%] top-[35%] h-[140%]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(62deg)",
            transformOrigin: "center top",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Liquid blobs (gooified) */}
      <div
        className="absolute inset-0"
        style={{ filter: "url(#hero-goo)" }}
      >
        <div
          ref={blob1}
          className="absolute h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #a855f7 0%, #7c3aed 45%, transparent 70%)",
            opacity: 0.55,
          }}
        />
        <div
          ref={blob2}
          className="absolute h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, #06b6d4 0%, #0891b2 45%, transparent 70%)",
            opacity: 0.5,
          }}
        />
        <div
          ref={blob3}
          className="absolute h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ec4899 0%, #be185d 45%, transparent 70%)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Cursor spotlight (glass highlight) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--active)",
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.10), rgba(124,58,237,0.08) 30%, transparent 60%)",
        }}
      />

      {/* Aurora wash + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0a0a0a_72%)]" />

      {/* Cursor refractive ring */}
      <div
        className="pointer-events-none absolute h-[180px] w-[180px] rounded-full transition-opacity duration-300"
        style={{
          opacity: "var(--active)",
          left: "var(--mx)",
          top: "var(--my)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 55%)",
          boxShadow:
            "inset 0 0 60px rgba(255,255,255,0.06), 0 0 60px rgba(124,58,237,0.18)",
          backdropFilter: "blur(2px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
