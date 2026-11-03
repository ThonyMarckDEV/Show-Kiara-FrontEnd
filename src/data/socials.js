// Número de WhatsApp (Perú +51)
export const WHATSAPP_NUMBER = "51901062809";
export const WHATSAPP_DISPLAY = "901 062 809";

export function whatsappLink(message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

// Redes sociales: pega el enlace de cada una.
// Las que queden vacías ("") no se muestran en la página.
export const socials = [
  { id: "facebook", label: "Facebook", url: "" },
  { id: "instagram", label: "Instagram", url: "" },
  { id: "tiktok", label: "TikTok", url: "" },
];
