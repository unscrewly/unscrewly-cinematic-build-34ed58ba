import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest('a, button, [data-cursor-hover]'));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            width: hovering ? 44 : 10,
            height: hovering ? 44 : 10,
            backgroundColor: hovering ? "rgba(124,58,237,0.15)" : "rgba(245,245,245,0.9)",
            border: hovering ? "1px solid rgba(124,58,237,0.8)" : "1px solid transparent",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ x: "-50%", y: "-50%", borderRadius: "50%" }}
        />
      </motion.div>
    </>
  );
}
