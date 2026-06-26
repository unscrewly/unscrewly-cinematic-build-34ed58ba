import { useEffect, useRef } from "react";

/**
 * FluidCursorTrail
 * - Canvas 2D bezier streak (indigo → violet → cyan fade)
 * - SVG `goo` filter applied to a secondary canvas of merging blobs
 * - Spring-physics trail of 20 points
 * - Disabled on touch devices
 */
const POINTS = 20;
const STIFFNESS = 0.15;
const DAMPING = 0.75;

type Pt = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
};

export function FluidCursorTrail() {
  const streakRef = useRef<HTMLCanvasElement | null>(null);
  const gooRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const streak = streakRef.current;
    const goo = gooRef.current;
    if (!streak || !goo) return;

    const sctx = streak.getContext("2d");
    const gctx = goo.getContext("2d");
    if (!sctx || !gctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      for (const c of [streak, goo]) {
        c.width = width * dpr;
        c.height = height * dpr;
        c.style.width = width + "px";
        c.style.height = height + "px";
      }
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Init points off-screen
    const points: Pt[] = Array.from({ length: POINTS }, (_, i) => {
      const baseSize = 18 - (i / (POINTS - 1)) * 16; // 18 → 2
      return {
        x: -100,
        y: -100,
        vx: 0,
        vy: 0,
        size: baseSize,
        baseSize,
      };
    });

    let mouseX = -100;
    let mouseY = -100;
    let inside = false;
    let lastMove = performance.now();
    let burstUntil = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMove = performance.now();
    };
    const onEnter = () => {
      inside = true;
      document.body.style.cursor = "none";
    };
    const onLeave = () => {
      inside = false;
      document.body.style.cursor = "";
    };
    const onDown = () => {
      burstUntil = performance.now() + 200;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    // initial state assumes pointer not in window
    onLeave();

    const tick = () => {
      const now = performance.now();
      const idle = now - lastMove > 300;

      // Update head to follow mouse with spring
      const head = points[0];
      const dxh = mouseX - head.x;
      const dyh = mouseY - head.y;
      head.vx += dxh * STIFFNESS - head.vx * DAMPING;
      head.vy += dyh * STIFFNESS - head.vy * DAMPING;
      head.x += head.vx;
      head.y += head.vy;

      // Burst the head
      const burstActive = now < burstUntil;
      const headTargetSize = burstActive ? 28 : head.baseSize;
      head.size += (headTargetSize - head.size) * 0.25;

      // Each subsequent point chases the one ahead
      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const t = points[i - 1];
        const dx = t.x - p.x;
        const dy = t.y - p.y;
        p.vx += dx * STIFFNESS - p.vx * DAMPING;
        p.vy += dy * STIFFNESS - p.vy * DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        const target = idle ? 0 : p.baseSize;
        p.size += (target - p.size) * 0.12;
      }
      if (idle) head.size += (0 - head.size) * 0.12;

      // ---- Streak canvas (bezier trail + head glow) ----
      sctx.clearRect(0, 0, width, height);
      if (inside) {
        // Bezier trail segments — taper width
        for (let i = 1; i < points.length - 1; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const p2 = points[i + 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          const tNorm = i / (points.length - 1);
          const lw = 8 * (1 - tNorm) + 0.5 * tNorm;

          // gradient color stops along the trail
          let color: string;
          if (tNorm < 0.5) {
            const k = tNorm / 0.5;
            color = `rgba(${lerp(99, 139, k)}, ${lerp(102, 92, k)}, ${lerp(241, 246, k)}, ${0.9 - k * 0.3})`;
          } else {
            const k = (tNorm - 0.5) / 0.5;
            color = `rgba(${lerp(139, 6, k)}, ${lerp(92, 182, k)}, ${lerp(246, 212, k)}, ${0.6 * (1 - k)})`;
          }

          sctx.strokeStyle = color;
          sctx.lineWidth = lw;
          sctx.lineCap = "round";
          sctx.lineJoin = "round";
          sctx.beginPath();
          sctx.moveTo(p0.x, p0.y);
          sctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
          sctx.stroke();
        }

        // Radial glow at head
        if (head.size > 0.5) {
          const r = head.size + 4;
          const grad = sctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, r);
          grad.addColorStop(0, "rgba(129, 140, 248, 0.9)");
          grad.addColorStop(0.5, "rgba(129, 140, 248, 0.35)");
          grad.addColorStop(1, "rgba(129, 140, 248, 0)");
          sctx.fillStyle = grad;
          sctx.beginPath();
          sctx.arc(head.x, head.y, r, 0, Math.PI * 2);
          sctx.fill();
        }
      }

      // ---- Goo canvas (merged blobs under SVG filter) ----
      gctx.clearRect(0, 0, width, height);
      if (inside) {
        gctx.fillStyle = "rgba(99, 102, 241, 0.35)";
        for (const p of points) {
          if (p.size < 0.5) continue;
          gctx.beginPath();
          gctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          gctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      document.body.style.cursor = "";
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: 9999,
  };

  return (
    <>
      {/* SVG goo filter */}
      <svg
        aria-hidden
        style={{ position: "fixed", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id="fluid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Goo-filtered blob layer (under streak) */}
      <div style={{ ...baseStyle, filter: "url(#fluid-goo)" }}>
        <canvas ref={gooRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </div>

      {/* Streak + head glow */}
      <canvas
        ref={streakRef}
        style={{ ...baseStyle, mixBlendMode: "screen" }}
      />
    </>
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
