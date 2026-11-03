import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import HeartIcon from "./HeartIcon";
import Crown from "../decorations/Crown";
import { packageThemes } from "../../data/packages";
import { whatsappLink } from "../../data/socials";
import WhatsAppIcon from "./WhatsAppIcon";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./PackageModal.css";


const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const listItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

function Flyer({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <figure className="pkg-modal-flyer">
      <img src={src} alt={alt} onError={() => setFailed(true)} />
    </figure>
  );
}

export default function PackageModal({ pkg, onClose }) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  // Bloquea el scroll de la página, cierra con Esc y mantiene el foco dentro
  useEffect(() => {
    if (!pkg) return;

    const previousFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [pkg, onClose]);

  // En móvil sube desde abajo; en PC aparece al centro
  const panelMotion = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : {
        initial: { opacity: 0, scale: 0.88, y: 40 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.92, y: 30 },
      };

  return createPortal(
    <AnimatePresence>
      {pkg && (
        <motion.div
          className="pkg-modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={panelRef}
            className={`pkg-modal pkg--${pkg.theme}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pkg-modal-title"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            {...panelMotion}
          >
            {isMobile && <span className="pkg-modal-grabber" aria-hidden="true" />}

            <button
              ref={closeRef}
              type="button"
              className="pkg-modal-close"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <header className="pkg-modal-head">
              <span className="pkg-awning" aria-hidden="true" />
              <span className="pkg-theme">{packageThemes[pkg.theme]}</span>
              <h3 id="pkg-modal-title" className="pkg-modal-title">
                {pkg.name}
              </h3>
              {pkg.tagline && <p className="pkg-modal-tagline">{pkg.tagline}</p>}
              <div className="pkg-modal-meta">
                <p className="pkg-price">
                  <small>S/</small>
                  {pkg.price}
                </p>
                {pkg.badge && (
                  <span className="pkg-badge">
                    <Crown size={14} color="currentColor" />
                    {pkg.badge}
                  </span>
                )}
              </div>
            </header>

            <div className="pkg-modal-body">
              <div className="pkg-modal-main">
                <h4 className="pkg-modal-subtitle">¿Qué incluye?</h4>
                <motion.ul className="pkg-modal-list" variants={list} initial="hidden" animate="show">
                  {pkg.items.map((item) => (
                    <motion.li
                      key={item.title}
                      variants={listItem}
                      className={item.lines?.length ? "" : "is-simple"}
                    >
                      <h5>
                        <HeartIcon size={16} className="pkg-heart" />
                        {item.title}
                      </h5>
                      {item.lines?.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </motion.li>
                  ))}
                </motion.ul>

                {pkg.extra && (
                  <div className="pkg-modal-extra">
                    <h4 className="pkg-modal-subtitle">{pkg.extra.title}</h4>
                    <ul>
                      {pkg.extra.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.conditions && (
                  <div className="pkg-modal-conditions">
                    <h4 className="pkg-modal-subtitle">Condiciones del servicio</h4>
                    <ul>
                      {pkg.conditions.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Flyer key={pkg.id} src={pkg.flyer} alt={`Flyer ${packageThemes[pkg.theme]} ${pkg.name}`} />
            </div>

            <footer className="pkg-modal-foot">
              <a
                href={whatsappLink(
                  `¡Hola! Quiero reservar el ${pkg.name} de ${packageThemes[pkg.theme]} (S/ ${pkg.price}). ¿Tienen fecha disponible?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="pkg-btn pkg-modal-cta"
              >
                <WhatsAppIcon />
                Reservar por WhatsApp
              </a>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
