import { motion } from "framer-motion";
import SectionSheet from "../components/layout/SectionSheet";
import SectionTitle from "../components/ui/SectionTitle";
import PolicyItem from "../components/cards/PolicyItem";
import Sparkles from "../components/decorations/Sparkles";
import { policies, policiesClosing } from "../data/policies";
import "./Policies.css";

const SPARKLES = [
  { x: 6, y: 12, s: 14, c: "var(--gold)" },
  { x: 92, y: 18, s: 16, c: "var(--gold-light)" },
  { x: 5, y: 78, s: 12, c: "var(--gold)" },
  { x: 95, y: 64, s: 12, c: "var(--gold)" },
];

export default function Policies() {
  return (
    <SectionSheet id="politicas" className="policies">
      <Sparkles items={SPARKLES} />

      <div className="policies-inner">
        <SectionTitle eyebrow="Antes de reservar" title="Políticas del Evento" />

        <ul className="policies-grid">
          {policies.map((p, i) => (
            <PolicyItem key={p.id} policy={p} index={i} />
          ))}
        </ul>

        <motion.p
          className="policies-closing"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          “{policiesClosing}”
        </motion.p>
      </div>
    </SectionSheet>
  );
}
