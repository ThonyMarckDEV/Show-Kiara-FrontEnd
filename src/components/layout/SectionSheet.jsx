import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./SectionSheet.css";

/**
 * Sección que entra como una "hoja" que sube sobre la anterior:
 * empieza con esquinas redondeadas y un poco más chica, y se
 * acomoda a pantalla completa mientras bajas.
 * as: etiqueta HTML ("section" por defecto, "footer" para el pie)
 */
export default function SectionSheet({ id, as = "section", className = "", children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const radius = useTransform(scrollYProgress, [0, 0.85], [72, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.94, 1]);
  const radiusPx = useTransform(radius, (r) => `${r}px ${r}px 0 0`);

  const Tag = as === "footer" ? motion.footer : motion.section;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`section-sheet ${className}`}
      style={{ borderRadius: radiusPx, scale }}
    >
      {children}
    </Tag>
  );
}
