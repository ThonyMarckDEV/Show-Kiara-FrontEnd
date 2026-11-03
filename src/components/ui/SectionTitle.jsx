import { motion } from "framer-motion";
import Crown from "../decorations/Crown";
import "./SectionTitle.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Cada letra cae y rebota a su lugar
const letter = {
  hidden: { opacity: 0, y: 50, rotate: -18, scale: 0.4 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 16 },
  },
};

const lineLeft = {
  hidden: { scaleX: 0, originX: 1 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const lineRight = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const crownPop = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

export default function SectionTitle({ eyebrow, title, className = "" }) {
  return (
    <motion.div
      className={`section-title ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
    >
      {eyebrow && (
        <motion.span className="section-eyebrow" variants={fadeDown}>
          {eyebrow}
        </motion.span>
      )}

      <h2 className="section-heading" aria-label={title}>
        {Array.from(title).map((ch, i) => (
          <motion.span key={i} className="section-letter" variants={letter} aria-hidden="true">
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </h2>

      <div className="section-divider" aria-hidden="true">
        <motion.span className="section-line" variants={lineLeft} />
        <motion.span variants={crownPop}>
          <Crown size={30} color="var(--gold)" />
        </motion.span>
        <motion.span className="section-line" variants={lineRight} />
      </div>
    </motion.div>
  );
}
