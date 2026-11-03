import { motion, useReducedMotion } from "framer-motion";

// Destellos de 4 puntas. x, y en % | s = tamaño px | c = color
const DEFAULT_SPARKLES = [
  { x: 24, y: 18, s: 18, c: "var(--gold)" },
  { x: 46, y: 28, s: 12, c: "var(--white)" },
  { x: 30, y: 72, s: 14, c: "var(--gold-light)" },
  { x: 54, y: 62, s: 10, c: "var(--white)" },
  { x: 70, y: 16, s: 16, c: "var(--white)" },
  { x: 86, y: 44, s: 12, c: "var(--gold)" },
  { x: 16, y: 48, s: 10, c: "var(--white)" },
  { x: 78, y: 80, s: 14, c: "var(--gold-light)" },
];

export default function Sparkles({ items = DEFAULT_SPARKLES, className = "" }) {
  const reduce = useReducedMotion();

  return (
    <div className={className} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((sp, i) => (
        <motion.svg
          key={i}
          width={sp.s}
          height={sp.s}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            filter: "drop-shadow(0 0 4px rgba(255, 224, 138, 0.8))",
          }}
          animate={reduce ? undefined : { scale: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3], rotate: [0, 45, 0] }}
          transition={{ duration: 2.4 + (i % 3) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={sp.c} />
        </motion.svg>
      ))}
    </div>
  );
}
