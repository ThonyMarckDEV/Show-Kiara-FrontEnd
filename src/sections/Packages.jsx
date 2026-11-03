import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionSheet from "../components/layout/SectionSheet";
import SectionTitle from "../components/ui/SectionTitle";
import PackageCard from "../components/cards/PackageCard";
import PackageModal from "../components/ui/PackageModal";
import { packages, packageThemes, filterLabels } from "../data/packages";
import "./Packages.css";

const FILTERS = [{ id: "all", label: "Todos" }].concat(
  Object.entries(filterLabels).map(([id, label]) => ({ id, label }))
);

function Arrow({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default function Packages() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const visible = filter === "all" ? packages : packages.filter((p) => p.theme === filter);

  // Paso = ancho de una tarjeta + espacio
  const getStep = () => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!first) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  };

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < max - 4);
    const idx = track.scrollLeft >= max - 4 ? visible.length - 1 : Math.round(track.scrollLeft / getStep());
    setActiveIndex(Math.max(0, Math.min(visible.length - 1, idx)));
  }, [visible.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0 });
    updateState();
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [filter, updateState]);

  const scrollByCards = (dir) => {
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  const scrollToIndex = (i) => {
    trackRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  };

  // Arrastrar con el mouse en PC (en celular se desliza con el dedo de forma nativa)
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6 && !d.moved) {
      d.moved = true;
      trackRef.current.classList.add("is-dragging");
    }
    if (d.moved) trackRef.current.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (d.moved) {
      const track = trackRef.current;
      track.classList.remove("is-dragging");
      scrollToIndex(Math.round(track.scrollLeft / getStep()));
    }
  };

  // Si fue arrastre, no abrir el modal
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <SectionSheet id="paquetes" className="packages">
      <motion.div
        className="packages-awning"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      />

      <div className="packages-inner">
        <SectionTitle eyebrow="Elige tu show" title="Paquetes" />

        <motion.p
          className="packages-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Desliza para ver todos los paquetes y toca uno para ver todo lo que incluye.
        </motion.p>

        <motion.div
          className="packages-filters"
          role="group"
          aria-label="Filtrar paquetes"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.4 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`packages-filter ${filter === f.id ? "is-active" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="packages-slider">
        <button
          type="button"
          className="packages-arrow packages-arrow--prev"
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          aria-label="Paquete anterior"
        >
          <Arrow dir="prev" />
        </button>

        <div
          ref={trackRef}
          className="packages-track"
          role="region"
          aria-label="Paquetes disponibles"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") scrollByCards(1);
            if (e.key === "ArrowLeft") scrollByCards(-1);
          }}
        >
          {visible.map((pkg, i) => (
            <div className="packages-slide" key={pkg.id}>
              <PackageCard pkg={pkg} index={i} onOpen={setSelected} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="packages-arrow packages-arrow--next"
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          aria-label="Paquete siguiente"
        >
          <Arrow dir="next" />
        </button>
      </div>

      <div className="packages-dots" role="tablist" aria-label="Ir a paquete">
        {visible.map((pkg, i) => (
          <button
            key={pkg.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`${packageThemes[pkg.theme]} ${pkg.name}`}
            className={`packages-dot ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>

      <PackageModal pkg={selected} onClose={closeModal} />
    </SectionSheet>
  );
}
