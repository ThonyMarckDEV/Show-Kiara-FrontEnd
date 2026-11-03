import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { whatsappLink } from "../../data/socials";
import { getIntroBounds } from "../../utils/scrollToSection";
import "./WhatsAppButton.css";

/**
 * Botón flotante de WhatsApp.
 * Aparece cuando el telón ya se abrió y se oculta al llegar al contacto
 * (ahí ya está el botón grande).
 */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const { introEnd } = getIntroBounds();
      const contact = document.querySelector("#contacto");
      const contactVisible = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.7;
      setShow(window.scrollY > introEnd && !contactVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="wa-float"
          href={whatsappLink("¡Hola! Quiero información para reservar un show.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 90 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="wa-float-pulse" aria-hidden="true" />
          <WhatsAppIcon size={30} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
