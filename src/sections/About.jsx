import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionSheet from "../components/layout/SectionSheet";
import SectionTitle from "../components/ui/SectionTitle";
import CircleImage from "../components/ui/CircleImage";
import HeartList from "../components/ui/HeartList";
import HeartIcon from "../components/ui/HeartIcon";
import IconBadge from "../components/ui/IconBadge";
import Button from "../components/ui/Button";
import ServiceItem from "../components/cards/ServiceItem";
import Sparkles from "../components/decorations/Sparkles";
import { services } from "../data/services";
import "./About.css";

// Foto de "Sobre Mí". Si no existe la primera, usa la del hero.
const ABOUT_PHOTOS = ["/images/kiara/sobre-mi.jpg", "/images/kiara-hero.png"];

const HIGHLIGHTS = [
  "Shows personalizados según la temática de tu fiesta",
  "Trato cariñoso y profesional con los niños",
  "Puntualidad y compromiso en cada evento",
];

const SPARKLES = [
  { x: 6, y: 12, s: 16, c: "var(--gold)" },
  { x: 92, y: 8, s: 12, c: "var(--gold-light)" },
  { x: 48, y: 46, s: 10, c: "var(--gold)" },
  { x: 95, y: 60, s: 14, c: "var(--gold)" },
  { x: 3, y: 70, s: 12, c: "var(--gold-light)" },
];

const VIEW = { once: true, amount: 0.35 };

export default function About() {
  const mediaRef = useRef(null);

  // Parallax suave de la foto y sus adornos mientras bajas
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blobY = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <SectionSheet id="sobre-mi" className="about">
      <Sparkles items={SPARKLES} />

      <div className="about-inner">
        <SectionTitle eyebrow="Conóceme" title="Sobre Mí" />

        <div className="about-grid">
          {/* ===== FOTO ===== */}
          <div className="about-media" ref={mediaRef}>
            <motion.div className="about-blob" style={{ y: blobY }} aria-hidden="true">
              <motion.div
                className="about-blob-shape"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>

            <motion.div className="about-ring" style={{ rotate: ringRotate }} aria-hidden="true">
              <motion.svg
                viewBox="0 0 100 100"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={VIEW}
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={VIEW}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
                />
              </motion.svg>
            </motion.div>

            <motion.div style={{ y: photoY }} className="about-photo-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={VIEW}
                transition={{ type: "spring", stiffness: 110, damping: 15 }}
              >
                <CircleImage
                  srcs={ABOUT_PHOTOS}
                  alt="Kiara, animadora de eventos infantiles"
                  position="center 20%"
                />
              </motion.div>
            </motion.div>

            {/* Insignias que vuelan a su lugar */}
            <motion.div
              className="about-badge about-badge--top"
              initial={{ opacity: 0, x: 140, y: -60, rotate: 25 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4 }}
              viewport={VIEW}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.5 }}
            >
              <IconBadge icon="star" size={38} />
              <span>Shows mágicos</span>
            </motion.div>

            <motion.div
              className="about-badge about-badge--bottom"
              initial={{ opacity: 0, x: -140, y: 60, rotate: -25 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
              viewport={VIEW}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.7 }}
            >
              <IconBadge icon="smile" size={38} />
              <span>Diversión garantizada</span>
            </motion.div>

            <motion.span
              className="about-heart"
              initial={{ scale: 0, rotate: -60 }}
              whileInView={{ scale: 1, rotate: -12 }}
              viewport={VIEW}
              transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.9 }}
              aria-hidden="true"
            >
              <HeartIcon size={40} color="var(--pink-400)" />
            </motion.span>
          </div>

          {/* ===== TEXTO ===== */}
          <div className="about-text">
            <motion.h3
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              ¡Hola! Soy <span>Kiara</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Soy animadora de eventos infantiles y mi pasión es llenar cada fiesta de
              magia, risas y fantasía. Cada show está pensado para que los niños sean los
              protagonistas y vivan una experiencia que nunca van a olvidar.
            </motion.p>

            <HeartList items={HIGHLIGHTS} />

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEW}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.3 }}
              className="about-cta"
            >
              <Button href="#paquetes" size="md">
                Ver Paquetes
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ===== TARJETAS ===== */}
        <div className="about-services">
          {services.map((s, i) => (
            <ServiceItem key={s.title} index={i} {...s} />
          ))}
        </div>
      </div>
    </SectionSheet>
  );
}
