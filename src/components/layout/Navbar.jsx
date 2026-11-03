import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { navLinks } from "../../data/navLinks";
import { getIntroBounds, scrollToSection } from "../../utils/scrollToSection";
import "./Navbar.css";

export default function Navbar() {
  const [active, setActive] = useState(navLinks[0].href);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const { revealAt, introEnd } = getIntroBounds();
      const isVisible = y >= revealAt;
      setVisible(isVisible);
      if (!isVisible) setOpen(false); // cierra el menú móvil si se oculta
      setSolid(y > introEnd + 40);

      // Resalta la sección que se está viendo
      let current = navLinks[0].href;
      for (const link of navLinks.slice(1)) {
        const el = document.querySelector(link.href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = link.href;
        }
      }
      // al llegar al final de la página, se marca la última sección (Contacto)
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = navLinks[navLinks.length - 1].href;
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (e, href) => {
    setOpen(false);
    scrollToSection(e, href);
  };

  return (
    <header
      className={`navbar ${visible ? "is-visible" : ""} ${solid ? "is-solid" : ""}`}
      aria-hidden={!visible}
    >
      <div className="navbar-inner">
        <Logo onClick={(e) => goTo(e, "#inicio")} tabIndex={visible ? 0 : -1} />

        <nav className="navbar-links" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar-link ${active === link.href ? "is-active" : ""}`}
              aria-current={active === link.href ? "page" : undefined}
              tabIndex={visible ? 0 : -1}
              onClick={(e) => goTo(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          href="#contacto"
          size="sm"
          className="navbar-cta"
          tabIndex={visible ? 0 : -1}
          onClick={(e) => goTo(e, "#contacto")}
        >
          Reservar Show
        </Button>

        <button
          type="button"
          className={`navbar-burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          tabIndex={visible ? 0 : -1}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <AnimatePresence>
          {open && (
            <motion.nav
              className="navbar-mobile"
              aria-label="Menú móvil"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`navbar-link ${active === link.href ? "is-active" : ""}`}
                  onClick={(e) => goTo(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <Button href="#contacto" onClick={(e) => goTo(e, "#contacto")}>
                Reservar Show
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
