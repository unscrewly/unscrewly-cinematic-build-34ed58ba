import { useEffect, useRef } from "react";

/**
 * FluidCursorTrail — wide fluid paint effect.
 * Large colorful radial splats with mix-blend-mode: screen so colors
 * glow through text on the dark #0a0a0a background.
 */
type Splat = {
  x: number;
  y: number;
  radius: number;
  hue: number;
  alpha: number;
  born: number;
  lifetime: number;
};

const MAX_SPLATS = 120;
const SPAWN_THROTTLE_MS = 12;

export function FluidCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splatsRef = useRef<Splat[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let prevX = -1;
    let prevY = -1;
    let currentHue = 240;
    let lastSpawn = 0;
    let visible = !document.hidden;

    const pushSplat = (
      x: number,
      y: number,
      radius: number,
      hue: number,
      alpha = 0.9,
      lifetime?: number,
    ) => {
      const splats = splatsRef.current;
      splats.push({
        x,
        y,
        radius,
        hue: ((hue % 360) + 360) % 360,
        alpha,
        born: performance.now(),
        lifetime: lifetime ?? 3000 + Math.random() * 2000,
      });
      if (splats.length > MAX_SPLATS) {
        splats.splice(0, splats.length - MAX_SPLATS);
      }
    };

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (prevX < 0) {
        prevX = x;
        prevY = y;
        return;
      }
      const vx = x - prevX;
      const vy = y - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      currentHue = (currentHue + speed * 1.5) % 360;

      const now = performance.now();
      if (speed > 1.5 && now - lastSpawn >= SPAWN_THROTTLE_MS) {
        const radius = Math.max(40, Math.min(160, 40 + speed * 4));
        pushSplat(x, y, radius, currentHue);
        lastSpawn = now;
      }
      prevX = x;
      prevY = y;
    };

    const onDown = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        const radius = 120 + Math.random() * 40;
        const hue = currentHue + (Math.random() * 60 - 30);
        pushSplat(e.clientX, e.clientY, radius, hue, 1, 3500 + Math.random() * 2000);
      }
    };

    const onVis = () => {
      visible = !document.hidden;
      if (visible && rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      // Additive blending inside the canvas so overlapping splats build up
      // brightness; the canvas itself uses mix-blend-mode: screen against
      // the dark page background.
      ctx.globalCompositeOperation = "lighter";

      const splats = splatsRef.current;
      for (let i = splats.length - 1; i >= 0; i--) {
        const s = splats[i];
        const t = (now - s.born) / s.lifetime;
        if (t >= 1) {
          splats.splice(i, 1);
          continue;
        }
        const fade = (1 - t) * (1 - t);
        const alpha = s.alpha * fade;
        const r = s.radius * (1 + t * 0.8);

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
        grad.addColorStop(0, `hsla(${s.hue}, 100%, 72%, ${alpha})`);
        grad.addColorStop(0.3, `hsla(${(s.hue + 25) % 360}, 95%, 65%, ${alpha * 0.7})`);
        grad.addColorStop(0.65, `hsla(${(s.hue + 55) % 360}, 90%, 58%, ${alpha * 0.35})`);
        grad.addColorStop(1, `hsla(${(s.hue + 80) % 360}, 85%, 50%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      if (!visible) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    document.addEventListener("visibilitychange", onVis);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("visibilitychange", onVis);
      splatsRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}
