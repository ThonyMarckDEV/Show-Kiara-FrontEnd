import { motion } from "framer-motion";
import SectionSheet from "../components/layout/SectionSheet";
import SectionTitle from "../components/ui/SectionTitle";
import ExtraServiceCard from "../components/cards/ExtraServiceCard";
import Sparkles from "../components/decorations/Sparkles";
import { extraServices } from "../data/extraServices";
import "./ExtraServices.css";

const SPARKLES = [
  { x: 8, y: 10, s: 14, c: "var(--gold)" },
  { x: 90, y: 14, s: 16, c: "var(--gold-light)" },
  { x: 4, y: 60, s: 12, c: "var(--gold)" },
  { x: 94, y: 70, s: 12, c: "var(--gold)" },
];

const steps = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const step = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 18 } },
};

export default function ExtraServices() {
  return (
    <SectionSheet id="servicios-extra" className="extras">
      <Sparkles items={SPARKLES} />

      <div className="extras-inner">
        <SectionTitle eyebrow="Hazlo aún más especial" title="Servicios Extra" />

        {/* Aviso: cómo funcionan los extras */}
        <motion.ul
          className="extras-notice"
          variants={steps}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.li variants={step}>
            <span className="extras-notice-num">1</span>
            <p>
              <strong>Se suman a tu paquete</strong>
              Puedes incluirlos en cualquier paquete previa coordinación.
            </p>
          </motion.li>
          <motion.li variants={step}>
            <span className="extras-notice-num">2</span>
            <p>
              <strong>Tienen pago extra</strong>
              Su precio es adicional al del paquete.
            </p>
          </motion.li>
          <motion.li variants={step}>
            <span className="extras-notice-num">3</span>
            <p>
              <strong>Cotiza por WhatsApp</strong>
              Escríbenos y te damos el precio para tu evento.
            </p>
          </motion.li>
        </motion.ul>

        <div className="extras-grid">
          {extraServices.map((s, i) => (
            <ExtraServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

      </div>
    </SectionSheet>
  );
}
