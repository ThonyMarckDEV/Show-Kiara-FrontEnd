import Crown from "../decorations/Crown";
import "./Logo.css";

export default function Logo({ href = "#inicio", className = "", ...rest }) {
  return (
    <a
      href={href}
      className={`logo ${className}`}
      aria-label="El Show de Kiara, Fantasía y Diversión, ir al inicio"
      {...rest}
    >
      <Crown size={26} color="var(--gold)" className="logo-crown" />
      <span className="logo-pre">El Show de</span>
      <span className="logo-name">Kiara</span>
      <span className="logo-tag">Fantasía y Diversión</span>
    </a>
  );
}
