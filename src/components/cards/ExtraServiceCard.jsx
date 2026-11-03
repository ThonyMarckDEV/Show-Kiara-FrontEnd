import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IconBadge from "../ui/IconBadge";
import HeartIcon from "../ui/HeartIcon";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { whatsappLink } from "../../data/socials";
import "./ExtraServiceCard.css";

const card = {
  hidden: (i) => ({ opacity: 0, rotateY: i % 2 ? -35 : 35, x: i % 2 ? 120 : -120, scale: 0.85 }),
  show: (i) => ({
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 15, delay: i * 0.15 },
  }),
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

function Media({ service }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="extra-media">
      {!failed && service.image ? (
        <img src={service.image} alt={service.title} onError={() => setFailed(true)} />
      ) : (
        <div className="extra-media-fallback" aria-hidden="true">
          <IconBadge icon={service.icon} size={96} />
        </div>
      )}
    </div>
  );
}

export default function ExtraServiceCard({ service, index = 0 }) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <motion.article
      className="extra-card"
      custom={index}
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="extra-top">
        <Media service={service} />
        <motion.span
          className="extra-icon"
          initial={{ scale: 0, rotate: -120 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 13, delay: 0.4 + index * 0.15 }}
        >
          <IconBadge icon={service.icon} size={60} />
        </motion.span>
      </div>

      <div className="extra-body">
        <span className="extra-tag">Servicio extra</span>
        <h3 className="extra-title">{service.title}</h3>
        <p className="extra-text">{service.text}</p>

        <span className="extra-price">Precio a cotizar</span>

        <button
          type="button"
          className={`extra-toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        >
          Condiciones del servicio
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={listId}
              className="extra-conditions"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <motion.ul variants={list} initial="hidden" animate="show">
                {service.conditions.map((c) => (
                  <motion.li key={c} variants={listItem}>
                    <HeartIcon size={14} className="extra-heart" />
                    {c}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          className="extra-cta"
          href={whatsappLink(
            `¡Hola! Quiero cotizar el servicio de ${service.title} para mi evento. ¿Me podrían dar más información?`
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Cotizar por WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
