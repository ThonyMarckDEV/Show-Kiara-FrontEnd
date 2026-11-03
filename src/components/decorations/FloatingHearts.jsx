import { motion, useReducedMotion } from "framer-motion";
import HeartIcon from "../ui/HeartIcon";

// x, y en % | s = tamaño px | r = rotación
const DEFAULT_HEARTS = [
  { x: 8, y: 30, s: 22, r: -15, c: "var(--pink-400)" },
  { x: 88, y: 12, s: 16, r: 12, c: "var(--pink-300)" },
  { x: 92, y: 58, s: 20, r: 18, c: "var(--pink-400)" },
  { x: 4, y: 74, s: 14, r: -8, c: "var(--pink-300)" },
];

export default function FloatingHearts({ items = DEFAULT_HEARTS, className = "" }) {
  const reduce = useReducedMotion();

  return (
    <div className={className} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((h, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            left: `${h.x}%`,
            top: `${h.y}%`,
            rotate: h.r,
            filter: "drop-shadow(0 3px 6px rgba(233, 30, 140, 0.25))",
          }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          <HeartIcon size={h.s} color={h.c} />
        </motion.span>
      ))}
    </div>
  );
}
