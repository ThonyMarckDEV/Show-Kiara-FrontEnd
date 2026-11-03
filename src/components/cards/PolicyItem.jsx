import { motion } from "framer-motion";
import IconBadge from "../ui/IconBadge";
import "./PolicyItem.css";

const item = {
  hidden: (i) => ({ opacity: 0, x: i % 2 ? 40 : -40, scale: 0.95 }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 18, delay: (i % 2) * 0.08 },
  }),
};

export default function PolicyItem({ policy, index = 0 }) {
  const { icon, title, text, note } = policy;
  return (
    <motion.li
      className="policy-item"
      custom={index}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <IconBadge icon={icon} size={46} />
      <div className="policy-body">
        <h3>{title}</h3>
        <p>{text}</p>
        {note && <p className="policy-note">{note}</p>}
      </div>
    </motion.li>
  );
}
