import { motion } from "framer-motion";
import IconBadge from "../ui/IconBadge";
import "./ServiceItem.css";

// Cada tarjeta llega desde una dirección distinta y "encaja" en su lugar
const FROM = [
  { x: -120, y: 60, rotate: -14 },
  { x: 0, y: 140, rotate: 8 },
  { x: 0, y: 140, rotate: -8 },
  { x: 120, y: 60, rotate: 14 },
];

const card = {
  hidden: (i) => ({ opacity: 0, scale: 0.7, ...FROM[i % FROM.length] }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16, delay: i * 0.12 },
  }),
};

const badge = {
  hidden: { scale: 0, rotate: -120 },
  show: (i) => ({
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 14, delay: 0.35 + i * 0.12 },
  }),
};

export default function ServiceItem({ icon, title, text, index = 0 }) {
  return (
    <motion.article
      className="service-item"
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={card}
      whileHover={{ y: -6 }}
    >
      <motion.span custom={index} variants={badge}>
        <IconBadge icon={icon} />
      </motion.span>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}
