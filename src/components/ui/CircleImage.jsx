import { useState } from "react";
import Crown from "../decorations/Crown";
import "./CircleImage.css";

/**
 * Foto circular con borde blanco y anillo dorado.
 * srcs: lista de rutas; si una no existe, prueba la siguiente.
 */
export default function CircleImage({ srcs = [], alt = "", position = "center", className = "" }) {
  const [index, setIndex] = useState(0);
  const src = srcs[index];

  return (
    <div className={`circle-image ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ objectPosition: position }}
          onError={() => setIndex((i) => i + 1)}
        />
      ) : (
        <div className="circle-image-placeholder">
          <Crown size={40} color="var(--pink-400)" />
          <span>Foto</span>
        </div>
      )}
    </div>
  );
}
