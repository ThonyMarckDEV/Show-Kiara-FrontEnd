import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";

// Ancho de cada pliegue en vw
const DESKTOP_FOLDS = [4.6, 5.6, 4.3, 5.9, 4.8, 5.2, 4.4, 6.0, 4.7, 5.3];
const MOBILE_FOLDS = [10, 12, 9.5, 11.5, 10];

// Variación de tono por pliegue (solo en el centro del pliegue,
// los bordes quedan iguales para que las uniones no se noten)
const TONES = [
  "rgba(70, 20, 40, 0.08)",
  "rgba(255, 255, 255, 0.05)",
  "rgba(70, 20, 40, 0.05)",
  "rgba(255, 255, 255, 0.07)",
  "rgba(70, 20, 40, 0.09)",
  "rgba(255, 255, 255, 0.03)",
  "rgba(70, 20, 40, 0.04)",
  "rgba(255, 255, 255, 0.06)",
  "rgba(70, 20, 40, 0.06)",
  "rgba(255, 255, 255, 0)",
];

const GATHER = 0.28;   // cuánto se juntan al recogerse
const SIDE_WIDTH = 50; // cada lado ocupa exactamente media pantalla (vw)
const SEAM = 0.15;     // mínima superposición solo para evitar rendijas de 1px

function buildFolds(widths) {
  // Normaliza para que los pliegues sumen exactamente 50vw y cierren en el centro
  const sum = widths.reduce((a, b) => a + b, 0);
  const scale = SIDE_WIDTH / sum;
  let acc = 0;
  const folds = widths.map((raw, i) => {
    const w = raw * scale;
    const isLast = i === widths.length - 1;
    const fold = { left: acc, width: isLast ? w : w + SEAM };
    acc += w;
    return fold;
  });
  return { folds, total: acc };
}

function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}

function Fold({ progress, index, left, width, total, isEdge }) {
  const gathered = -left * (1 - GATHER);
  const exit = gathered - (total * GATHER + width + 4);

  // 0.50 → 0.82 se recoge | 0.82 → 1 sale de pantalla
  const xValue = useTransform(progress, [0.5, 0.82, 1], [0, gathered, exit]);
  const x = useTransform(xValue, (v) => `${v}vw`);
  const scaleX = useTransform(progress, [0.5, 0.82], [1, 0.55]);
  const shade = useTransform(progress, [0.5, 0.82], [0, 0.35]);

  return (
    <motion.div
      className={`fold ${isEdge ? "fold--edge" : ""}`}
      style={{
        left: `${left}vw`,
        width: `${width}vw`,
        x,
        scaleX,
        zIndex: index + 1,
      }}
    >
      <div
        className="fold-cloth"
        style={{ "--fold-tone": TONES[index % TONES.length] }}
      >
        <motion.div className="fold-shade" style={{ opacity: shade }} />
      </div>
    </motion.div>
  );
}

export default function CurtainSide({ side = "left", progress, flutter }) {
  const isMobile = useIsMobile();
  const { folds, total } = buildFolds(isMobile ? MOBILE_FOLDS : DESKTOP_FOLDS);

  // Tapa rendijas mientras está cerrado
  const backingOpacity = useTransform(progress, [0.5, 0.56], [1, 0]);

  return (
    <motion.div
      className={`curtain-side curtain-side--${side}`}
      style={{ scaleX: side === "right" ? -1 : 1, skewX: flutter }}
    >
      <motion.div className="curtain-backing" style={{ opacity: backingOpacity }} />

      {folds.map((f, i) => (
        <Fold
          key={`${isMobile ? "m" : "d"}-${i}`}
          index={i}
          left={f.left}
          width={f.width}
          total={total}
          isEdge={i === folds.length - 1}
          progress={progress}
        />
      ))}
    </motion.div>
  );
}