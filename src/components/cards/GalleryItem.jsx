import "./GalleryItem.css";

// Inclinaciones de polaroid para que se vean como recuerdos sueltos
const TILT = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5];

/**
 * hidden: copia usada solo para el bucle infinito (no se anuncia a lectores
 * de pantalla ni recibe foco con Tab).
 */
export default function GalleryItem({ item, index = 0, hidden = false, onOpen }) {
  return (
    <figure
      className="gallery-item"
      style={{ "--tilt": `${TILT[index % TILT.length]}deg` }}
      aria-hidden={hidden || undefined}
    >
      <button
        type="button"
        className="gallery-item-btn"
        onClick={onOpen}
        tabIndex={hidden ? -1 : 0}
        aria-label="Ver foto en grande"
      >
        <img src={item.src} alt={hidden ? "" : item.alt} decoding="async" draggable="false" />
      </button>
    </figure>
  );
}
