import Crown from "../decorations/Crown";
import HeartIcon from "../ui/HeartIcon";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import SocialIcon from "../ui/SocialIcon";
import { socials, whatsappLink } from "../../data/socials";
import { scrollToSection } from "../../utils/scrollToSection";
import "./Footer.css";

export default function Footer() {
  const activeSocials = socials.filter((s) => s.url);
  const year = new Date().getFullYear();
  const waLink = whatsappLink("¡Hola! Quiero información para reservar un show.");

  return (
    <footer id="contacto" className="footer">
      {/* onda superior */}
      <svg className="footer-wave" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40V18C180 0 360 0 540 14s360 28 540 14S1260 0 1440 14v26z" />
      </svg>

      <div className="footer-inner">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => scrollToSection(e, "#inicio")}
          className="footer-logo"
          aria-label="El Show de Kiara, ir al inicio"
        >
          <Crown size={20} color="var(--gold)" />
          <span className="footer-logo-pre">El Show de</span>
          <span className="footer-logo-name">Kiara</span>
          <span className="footer-logo-tag">Fantasía y Diversión</span>
        </a>

        {/* Redes + derechos */}
        <div className="footer-center">
          <p className="footer-follow">Síguenos en nuestras redes</p>
          <div className="footer-socials">
            {activeSocials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social"
              >
                <SocialIcon id={s.id} size={16} />
              </a>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer-social"
            >
              <WhatsAppIcon size={16} />
            </a>
          </div>
          <p className="footer-copy">© {year} El Show de Kiara. Todos los derechos reservados.</p>
        </div>

        {/* Frase + botón */}
        <div className="footer-right">
          <p className="footer-quote">
            Porque los sueños
            <br />
            también se celebran <HeartIcon size={14} color="var(--pink-200)" />
          </p>
          <a className="footer-btn" href={waLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={16} />
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
