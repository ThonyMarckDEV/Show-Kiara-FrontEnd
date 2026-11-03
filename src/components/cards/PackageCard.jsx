import { motion } from "framer-motion";
import HeartIcon from "../ui/HeartIcon";
import Crown from "../decorations/Crown";
import { packageThemes } from "../../data/packages";
import "./PackageCard.css";

const card = {
  hidden: (i) => ({ opacity: 0, y: 80, rotate: i % 2 ? 6 : -6, scale: 0.85 }),
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 16, delay: Math.min(i, 4) * 0.1 },
  }),
};

export default function PackageCard({ pkg, index = 0, onOpen }) {
  const extra = pkg.items.length - pkg.highlights.length;

  return (
    <motion.article
      className={`pkg-card pkg--${pkg.theme}`}
      custom={index}
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(pkg)}
    >
      <div className="pkg-head">
        <span className="pkg-awning" aria-hidden="true" />
        <span className="pkg-theme">{packageThemes[pkg.theme]}</span>
        <h3 className="pkg-name">{pkg.name}</h3>
        {pkg.badge && (
          <span className="pkg-badge">
            <Crown size={14} color="currentColor" />
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="pkg-body">
        <p className="pkg-price">
          <small>S/</small>
          {pkg.price}
        </p>

        <ul className="pkg-highlights">
          {pkg.highlights.map((h) => (
            <li key={h}>
              <HeartIcon size={14} className="pkg-heart" />
              {h}
            </li>
          ))}
        </ul>

        {extra > 0 && <p className="pkg-more">+ {extra} momentos más incluidos</p>}

        <button
          type="button"
          className="pkg-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(pkg);
          }}
        >
          Ver detalles
        </button>
      </div>
    </motion.article>
  );
}
