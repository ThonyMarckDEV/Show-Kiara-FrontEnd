import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Lightbox.css";

const slide = {
  enter: (dir) => ({ x: dir > 0 ? 260 : -260, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -260 : 260, opacity: 0, scale: 0.95 }),
};

function Chevron({ dir }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

/**
 * Visor de fotos a pantalla completa.
 * index = null → cerrado
 */
export default function Lightbox({ items, index, onClose, onChange, showCaption = true }) {
  const [dir, setDir] = useState(0);
  const closeRef = useRef(null);
  const open = index !== null && items[index];
  const total = items.length;

  const go = (step) => {
    setDir(step);
    onChange((index + step + total) % total);
  };

  // Bloquea scroll, teclado (Esc, ←, →) y foco
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setDir(1);
        onChange((i) => (i + 1) % total);
      }
      if (e.key === "ArrowLeft") {
        setDir(-1);
        onChange((i) => (i - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, total, onClose, onChange]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-count">
              {index + 1} / {total}
            </span>
            <button ref={closeRef} type="button" className="lightbox-btn" onClick={onClose} aria-label="Cerrar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="lightbox-stage">
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={items[index].src}
                src={items[index].src}
                alt={items[index].alt}
                className="lightbox-img"
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                // deslizar con el dedo
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              />
            </AnimatePresence>
          </div>

          {showCaption && (
            <p className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              {items[index].alt}
            </p>
          )}

          {total > 1 && (
            <>
              <button
                type="button"
                className="lightbox-btn lightbox-nav lightbox-nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Foto anterior"
              >
                <Chevron dir="prev" />
              </button>
              <button
                type="button"
                className="lightbox-btn lightbox-nav lightbox-nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Foto siguiente"
              >
                <Chevron dir="next" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
