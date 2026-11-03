import { MotionConfig } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import CurtainIntro from "./sections/CurtainIntro/CurtainIntro";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Packages from "./sections/Packages";
import ExtraServices from "./sections/ExtraServices";
import Gallery from "./sections/Gallery";

export default function App() {
  return (
    // Respeta "reducir movimiento" del sistema
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <CurtainIntro>
          <Hero />
        </CurtainIntro>

        <About />
        <Packages />
        <ExtraServices />
        <Gallery />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  );
}
