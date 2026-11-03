import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../components/ui/Button";
import HeartIcon from "../components/ui/HeartIcon";
import Crown from "../components/decorations/Crown";
import Balloons from "../components/decorations/Balloons";
import Sparkles from "../components/decorations/Sparkles";
import FloatingHearts from "../components/decorations/FloatingHearts";
import "./Hero.css";

// Pon la foto de Kiara (PNG recortado, fondo transparente) en:
// frontend/public/images/kiara-hero.png
const KIARA_IMG = "/images/kiara-hero.png";

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <Balloons side="left" />
      <Balloons side="right" />
      <Sparkles />

      <div className="hero-content">
        <div className="hero-text">
          <FloatingHearts />

          <Crown size={56} color="var(--gold)" className="hero-crown" />
          <h2 className="hero-name">
            <span className="hero-name-pre">El Show de</span>
            Kiara
          </h2>
          <p className="hero-subtitle">Fantasía y Diversión</p>
          <p className="hero-claim">
            ¡Hacemos de tu evento
            <br />
            un momento mágico!
          </p>
          <Button href="#contacto" size="lg">
            Reservar Show Ahora
          </Button>
        </div>

        <div className="hero-photo">
          <div className="hero-photo-glow" aria-hidden="true" />

          <motion.div
            className="hero-photo-frame"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero-photo-arch">
              {imgError ? (
                <div className="hero-photo-placeholder">
                  <Crown size={48} color="var(--pink-400)" />
                  <span>Foto de Kiara</span>
                  <small>public/images/kiara-hero.png</small>
                </div>
              ) : (
                <img
                  src={KIARA_IMG}
                  alt="Kiara con su vestido de fantasía"
                  className="hero-photo-img"
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            <Crown size={64} color="var(--gold)" className="hero-photo-crown" />
            <span className="hero-photo-heart hero-photo-heart--a" aria-hidden="true">
              <HeartIcon size={34} color="var(--pink-400)" />
            </span>
            <span className="hero-photo-heart hero-photo-heart--b" aria-hidden="true">
              <HeartIcon size={22} color="var(--pink-300)" />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
