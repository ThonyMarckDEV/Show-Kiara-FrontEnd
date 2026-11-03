import { motion, useReducedMotion } from "framer-motion";
import "./Balloons.css";

// x, y en % del contenedor | s = tamaño (en vmax) | c = color | b = desenfoque (profundidad)
// PC: pocos globos, separados entre sí para que no se vean amontonados
const DESKTOP = [
  { x: -4, y: -5, s: 7, c: "pink", b: 0 },
  { x: 8, y: 20, s: 3.5, c: "white", b: 1 },
  { x: -5, y: 36, s: 6, c: "light", b: 0 },
  { x: 9, y: 60, s: 3, c: "gold", b: 2 },
  { x: -4, y: 74, s: 6.5, c: "white", b: 0 },
];

// Móvil (así se queda, ya se ve bien)
const MOBILE = [
  { x: -6, y: -6, s: 9, c: "pink", b: 0 },
  { x: 3, y: 4, s: 6.5, c: "white", b: 0 },
  { x: -4, y: 22, s: 7.5, c: "light", b: 0 },
  { x: -7, y: 42, s: 8.5, c: "pink", b: 0 },
  { x: -6, y: 84, s: 8, c: "white", b: 0 },
];

const ALL = [
  ...DESKTOP.map((b) => ({ ...b, only: "desktop" })),
  ...MOBILE.map((b) => ({ ...b, only: "mobile" })),
];

export default function Balloons({ side = "left" }) {
  const reduce = useReducedMotion();

  return (
    <div className={`balloons balloons--${side}`} aria-hidden="true">
      {ALL.map((bl, i) => (
        <motion.span
          key={i}
          className={`balloon balloon--${bl.c} balloon--${bl.only}`}
          style={{
            [side]: `${bl.x}%`,
            top: `${bl.y}%`,
            "--s": bl.s,
            filter: bl.b ? `blur(${bl.b}px)` : undefined,
            zIndex: bl.b ? 0 : 1,
          }}
          animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-3, 3, -3] }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        />
      ))}
    </div>
  );
}
