import { motion } from "framer-motion";
import HeartIcon from "./HeartIcon";
import "./HeartList.css";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
};

const heart = {
  hidden: { scale: 0, rotate: -45 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 12, delay: 0.15 } },
};

export default function HeartList({ items = [], className = "" }) {
  return (
    <motion.ul
      className={`heart-list ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={list}
    >
      {items.map((text) => (
        <motion.li key={text} variants={item}>
          <motion.span className="heart-list-icon" variants={heart}>
            <HeartIcon size={18} color="var(--pink-500)" />
          </motion.span>
          <span>{text}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
