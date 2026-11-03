import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
} from "framer-motion";
import Crown from "../../components/decorations/Crown";
import CurtainSide from "./CurtainSide";
import "./CurtainIntro.css";

export default function CurtainIntro({
  eyebrow = "Presentamos",
  title = "El Show de Kiara",
  tagline = "Fantasía y Diversión",
  children,
}) {
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Flameo de la tela según la velocidad del scroll
  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 18, mass: 0.6 });
  const flutter = useTransform(smoothVelocity, [-1.5, 0, 1.5], [-3, 0, 3]);

  // Indicador
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Título
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.38, 0.5], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0.05, 0.2, 0.5], [0.7, 1, 1.2]);
  const titleY = useTransform(scrollYProgress, [0.05, 0.2], [60, 0]);
  const titleBlur = useTransform(scrollYProgress, [0.05, 0.2, 0.38, 0.5], [10, 0, 0, 12]);
  const titleFilter = useTransform(titleBlur, (b) => `blur(${b}px)`);

  // Luz
  const lightOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  // Contenido que se revela
  const stageScale = useTransform(scrollYProgress, [0.5, 1], [0.9, 1]);
  const stageOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0.3, 1]);

  return (
    <section ref={wrapperRef} className="curtain-wrapper">
      <div className="curtain-sticky">
        <motion.div
          className="curtain-stage"
          style={{ scale: stageScale, opacity: stageOpacity }}
        >
          {children}
        </motion.div>

        <CurtainSide side="left" progress={scrollYProgress} flutter={flutter} />
        <CurtainSide side="right" progress={scrollYProgress} flutter={flutter} />

        <motion.div className="curtain-light" style={{ opacity: lightOpacity }} />

        <motion.div
          className="curtain-title"
          style={{
            opacity: titleOpacity,
            scale: titleScale,
            y: titleY,
            filter: titleFilter,
          }}
        >
          <span className="curtain-eyebrow">{eyebrow}</span>
          <Crown size={64} color="var(--gold)" className="curtain-crown" />
          <h1>{title}</h1>
          <span className="curtain-tagline">{tagline}</span>
        </motion.div>

        <motion.div className="curtain-hint" style={{ opacity: hintOpacity }}>
          <span>Desliza</span>
          <div className="curtain-mouse">
            <div className="curtain-wheel" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}