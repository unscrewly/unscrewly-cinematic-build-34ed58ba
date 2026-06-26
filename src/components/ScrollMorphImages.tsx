import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

/**
 * ScrollMorphImages
 * A cinematic background of 20 floating image cards that animate through:
 *   intro:  scatter -> horizontal line -> circle
 *   scroll: circle -> bottom "rainbow" arc (with parallax on mouse move)
 *
 * Designed to sit behind the Hero copy. Uses page scroll (not wheel-capture)
 * so it never blocks the user from scrolling the page.
 */

const IMG_W = 60;
const IMG_H = 85;
const TOTAL = 20;

const IMAGES = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=90", // circuit board macro
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=90", // code on dark screen
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=90", // dark code editor
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=90", // code closeup
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=90", // woman at glowing laptop dark
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=90", // matrix code lines
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=90", // retro tech dark
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=90", // laptop dark
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90", // dark workspace laptop
  "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=800&q=90", // dark setup
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=90", // dev code dark
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=90", // neon keyboard
  "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=90", // RGB keyboard dark
  "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=90", // RGB gaming setup
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=90", // dark monitors setup
  "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&q=90", // neon tech
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=90", // chip macro
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=90", // abstract tech blue
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=90", // AI neural abstract
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=90", // dark laptop code
];


const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

type Phase = "scatter" | "line" | "circle";

export function ScrollMorphImages({ scrollTargetRef }: { scrollTargetRef: RefObject<HTMLElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("scatter");
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Intro: scatter -> line -> circle
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 500);
    const t2 = setTimeout(() => setPhase("circle"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Drive morph from page scroll over the hero section (not wheel-capture)
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end start"],
  });
  const morph = useSpring(useTransform(scrollYProgress, [0, 0.6], [0, 1]), {
    stiffness: 60,
    damping: 22,
  });
  const shuffle = useSpring(useTransform(scrollYProgress, [0.3, 1], [0, 1]), {
    stiffness: 60,
    damping: 22,
  });

  const [morphV, setMorphV] = useState(0);
  const [shuffleV, setShuffleV] = useState(0);
  useEffect(() => {
    const u1 = morph.on("change", setMorphV);
    const u2 = shuffle.on("change", setShuffleV);
    return () => {
      u1();
      u2();
    };
  }, [morph, shuffle]);

  // Mouse parallax + per-card tilt tracking
  const mx = useMotionValue(0);
  const cxMv = useMotionValue(0);
  const cyMv = useMotionValue(0);
  const smoothMx = useSpring(mx, { stiffness: 30, damping: 20 });
  const smoothCx = useSpring(cxMv, { stiffness: 90, damping: 18 });
  const smoothCy = useSpring(cyMv, { stiffness: 90, damping: 18 });
  const [parallax, setParallax] = useState(0);
  const [cursor, setCursor] = useState({ x: 99999, y: 99999, active: false });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const n = ((e.clientX - r.left) / r.width) * 2 - 1;
      mx.set(n * 80);
      cxMv.set(e.clientX - r.left - r.width / 2);
      cyMv.set(e.clientY - r.top - r.height / 2);
      setCursor((c) => (c.active ? c : { ...c, active: true }));
    };
    const onLeave = () => setCursor({ x: 99999, y: 99999, active: false });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, cxMv, cyMv]);
  useEffect(() => smoothMx.on("change", setParallax), [smoothMx]);
  useEffect(() => {
    const u1 = smoothCx.on("change", (v) => setCursor((c) => ({ ...c, x: v })));
    const u2 = smoothCy.on("change", (v) => setCursor((c) => ({ ...c, y: v })));
    return () => {
      u1();
      u2();
    };
  }, [smoothCx, smoothCy]);

  const scatter = useMemo(
    () =>
      IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 900,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    [],
  );

  const isMobile = size.w < 768;
  const minDim = Math.min(size.w, size.h || 1);
  const circleRadius = Math.min(minDim * 0.38, 360);

  const baseRadius = Math.min(size.w, (size.h || 1) * 1.5);
  const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
  const arcApexY = (size.h || 0) * (isMobile ? 0.35 : 0.22);
  const arcCenterY = arcApexY + arcRadius;
  const spread = isMobile ? 100 : 130;
  const startAngle = -90 - spread / 2;
  const step = spread / (TOTAL - 1);
  const maxRotation = spread * 0.8;
  const boundedRotation = -shuffleV * maxRotation;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute right-[10%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25),transparent_60%)] blur-3xl" />
      </div>

      {/* origin: center of container */}
      <div className="absolute left-1/2 top-1/2">
        {IMAGES.slice(0, TOTAL).map((src, i) => {
          let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

          if (phase === "scatter") {
            target = scatter[i];
          } else if (phase === "line") {
            const spacing = 70;
            const totalW = TOTAL * spacing;
            target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
          } else {
            // circle
            const angle = (i / TOTAL) * 360;
            const rad = (angle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(rad) * circleRadius,
              y: Math.sin(rad) * circleRadius,
              rotation: angle + 90,
            };
            // arc
            const a = startAngle + i * step + boundedRotation;
            const arad = (a * Math.PI) / 180;
            const arcPos = {
              x: Math.cos(arad) * arcRadius + parallax,
              y: Math.sin(arad) * arcRadius + arcCenterY,
              rotation: a + 90,
              scale: isMobile ? 1.25 : 1.55,
            };

            target = {
              x: lerp(circlePos.x, arcPos.x, morphV),
              y: lerp(circlePos.y, arcPos.y, morphV),
              rotation: lerp(circlePos.rotation, arcPos.rotation, morphV),
              scale: lerp(1, arcPos.scale, morphV),
              opacity: 1,
            };
          }

          // Per-card cursor tilt
          const dx = cursor.x - target.x;
          const dy = cursor.y - target.y;
          const dist = Math.hypot(dx, dy);
          const influence = cursor.active ? Math.max(0, 1 - dist / 260) : 0;
          const tiltX = Math.max(-18, Math.min(18, -dy * 0.12 * influence));
          const tiltY = Math.max(-18, Math.min(18, dx * 0.12 * influence));
          const nudgeX = dx * 0.05 * influence;
          const nudgeY = dy * 0.05 * influence;
          const liftScale = 1 + 0.08 * influence;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: IMG_W,
                height: IMG_H,
                marginLeft: -IMG_W / 2,
                marginTop: -IMG_H / 2,
                transformPerspective: 800,
                transformStyle: "preserve-3d",
              }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 0.5, opacity: 0 }}
              animate={{
                x: target.x + nudgeX,
                y: target.y + nudgeY,
                rotate: target.rotation,
                rotateX: tiltX,
                rotateY: tiltY,
                scale: target.scale * liftScale,
                opacity: target.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                delay: phase === "line" ? i * 0.025 : phase === "circle" ? i * 0.02 : 0,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-md border border-white/10 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity"
                  style={{
                    background: `radial-gradient(circle at ${50 + tiltY * 2}% ${50 - tiltX * 2}%, rgba(255,255,255,${0.15 + influence * 0.25}), transparent 60%)`,
                    opacity: 0.4 + influence * 0.6,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#06b6d4]/10 mix-blend-overlay" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* vignette so the copy stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.7)_75%,#0a0a0a_100%)]" />
    </div>
  );
}
