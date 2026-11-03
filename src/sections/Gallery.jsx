import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import SectionSheet from "../components/layout/SectionSheet";
import SectionTitle from "../components/ui/SectionTitle";
import GalleryItem from "../components/cards/GalleryItem";
import Lightbox from "../components/ui/Lightbox";
import "./Gallery.css";

// Lee TODAS las fotos de src/assets/carrusel automáticamente.
// Solo agrega o quita fotos de esa carpeta, no hay que tocar código.
const files = import.meta.glob("../assets/carrusel/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
});

const photos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], i) => ({ src, alt: `Foto ${i + 1} de la galería` }));

const MIN_PER_ROW = 8; // si hay pocas fotos se repiten para llenar la cinta

// Arma una fila con al menos MIN_PER_ROW fotos, guardando el índice original
function buildRow(list) {
  if (!list.length) return [];
  const row = [];
  while (row.length < MIN_PER_ROW || row.length < list.length) {
    row.push(...list.map((p, i) => ({ ...p, original: i })));
  }
  return row;
}

const rowA = buildRow(photos);
const rowB = buildRow([...photos].reverse()).map((p) => ({
  ...p,
  original: photos.length - 1 - p.original,
}));

function Marquee({ items, reverse = false, onOpen, rowIndex }) {
  // La lista va duplicada: cuando la primera mitad sale, la segunda ocupa su lugar
  const loop = [...items, ...items];
  const duration = items.length * 6; // segundos por vuelta

  return (
    <motion.div
      className="gallery-row"
      initial={{ opacity: 0, x: reverse ? 200 : -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, delay: rowIndex * 0.2 }}
    >
      <div
        className={`gallery-track ${reverse ? "is-reverse" : ""}`}
        style={{ "--duration": `${duration}s` }}
      >
        {loop.map((p, i) => (
          <GalleryItem
            key={i}
            item={p}
            index={i}
            hidden={i >= items.length}
            onOpen={() => onOpen(p.original)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  if (!photos.length) return null;

  return (
    <SectionSheet id="galeria" className="gallery">
      <div className="gallery-inner">
        <SectionTitle eyebrow="Momentos mágicos" title="Galería" />
      </div>

      <div className="gallery-rows">
        <Marquee items={rowA} onOpen={setOpenIndex} rowIndex={0} />
        <Marquee items={rowB} reverse onOpen={setOpenIndex} rowIndex={1} />
      </div>

      <Lightbox items={photos} index={openIndex} onClose={closeLightbox} onChange={setOpenIndex} showCaption={false} />
    </SectionSheet>
  );
}
