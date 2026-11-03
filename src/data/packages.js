// Paquetes de shows.
// theme: "navidad" (rojo / verde) | "kiara" (rosa / caramelo) | "kpop" (morado)
// tagline, extra, conditions: opcionales (se ven en el modal)
// highlights: lo poquito que se ve en la tarjeta
// items: todo lo que incluye (se ve en el modal)
// flyer: imagen opcional del flyer en public/images/paquetes/ (si no existe, no se muestra)

const BASE_KIARA = [
  {
    title: "Dalina animadora principal",
    lines: [
      "Animación dinámica y divertida durante todo el evento",
      "Acompañamiento permanente a los niños y la familia",
    ],
  },
  {
    title: "DJ / Programación musical",
    lines: ["Música infantil y variada", "Presentaciones animadas y ambientación musical"],
  },
  {
    title: "Inicio del evento",
    lines: [
      "Presentación animada / Presentación del o la cumpleañero(a)",
      "Baile con los papitos",
      "3 juegos recreativos (primer tiempo)",
    ],
  },
  {
    title: "Receso",
    lines: ["Tiempo para que la mamá comparta los caramelos con los invitados"],
  },
  {
    title: "Segundo tiempo de animación",
    lines: ["Baile con los pequeños", "1 juego especial para mamá"],
  },
  {
    title: "Hora loca",
    lines: ["Animada por Dalina", "Baile, alegría y mucha energía antes del momento central"],
  },
  {
    title: "Momento especial",
    lines: ["Canción del Happy Birthday", "Acompañamiento en la rompida de piñata"],
  },
];

const BOTARGA = {
  title: "Botarga de acuerdo a la temática",
  lines: ["Persona vestida del muñeco que acompañará dependiendo al inicio o final"],
};

const BAILARINA = {
  title: "Una bailarina / Pistola de burbujas",
  lines: ["Una bella bailarina y una pistola burbujera para el show de inicio a final"],
};

// ===== NAVIDAD =====
const NAVIDAD_BASE = [
  { title: "Animadora infantil" },
  { title: "DJ con música divertida" },
  { title: "Juegos y dinámicas" },
  { title: "Conducción del show" },
  { title: "Ambientación musical durante todo el evento" },
];

const PAPA_NOEL = { title: "Papa Noel o Bailarina" };

const NAVIDAD_CONDITIONS = [
  "Tienes 15 minutos de tolerancia una vez que la animadora llegue al evento.",
  "El precio no incluye la movilidad al evento.",
  "No incluimos parlante ni equipo de sonido.",
  "Separa tu fecha con anticipación. ¡No te quedes sin fecha!",
  "Servicio dirigido a la cantidad de niños contratados.",
];

const CHOCOLATADAS = {
  title: "Chocolatadas",
  lines: ["Para colegio", "Salones", "Empresas", "Y más"],
};

// Nombre completo de cada temática (tarjetas y modal)
export const packageThemes = {
  navidad: "Navidad",
  kiara: "Show de Kiara",
  kpop: "Guerreras K-Pop",
};

// Nombre corto para los filtros
export const filterLabels = {
  navidad: "Navidad",
  kiara: "Kiara",
  kpop: "K-Pop",
};

export const packages = [
  {
    id: "navidad-basico",
    theme: "navidad",
    name: "Paquete Básico",
    price: 180,
    tagline: "Diversión garantizada para los más pequeños",
    highlights: ["Animadora infantil", "DJ con música divertida", "Juegos y dinámicas"],
    items: NAVIDAD_BASE,
    extra: CHOCOLATADAS,
    conditions: NAVIDAD_CONDITIONS,
    flyer: "/images/paquetes/navidad-basico.jpg",
  },
  {
    id: "navidad-especial",
    theme: "navidad",
    name: "Paquete Especial",
    price: 220,
    tagline: "Diversión completa para momentos inolvidables",
    highlights: ["Animadora infantil", "DJ con música divertida", "Papa Noel o Bailarina"],
    items: [NAVIDAD_BASE[0], NAVIDAD_BASE[1], PAPA_NOEL, ...NAVIDAD_BASE.slice(2)],
    extra: CHOCOLATADAS,
    conditions: NAVIDAD_CONDITIONS,
    flyer: "/images/paquetes/navidad-especial.jpg",
  },
  {
    id: "navidad-premium",
    theme: "navidad",
    name: "Paquete Premium",
    price: 280,
    badge: "El más completo",
    tagline: "Diversión completa para momentos inolvidables",
    highlights: ["Animadora infantil", "DJ con música divertida", "Papa Noel o Bailarina"],
    items: [NAVIDAD_BASE[0], NAVIDAD_BASE[1], PAPA_NOEL, ...NAVIDAD_BASE.slice(2)],
    extra: CHOCOLATADAS,
    conditions: NAVIDAD_CONDITIONS,
    flyer: "/images/paquetes/navidad-premium.jpg",
  },
  {
    id: "kiara-1",
    theme: "kiara",
    name: "Paquete N°1",
    price: 160,
    highlights: ["Dalina animadora principal", "DJ y música infantil", "Juegos, hora loca y piñata"],
    items: BASE_KIARA,
    flyer: "/images/paquetes/kiara-1.jpg",
  },
  {
    id: "kiara-2",
    theme: "kiara",
    name: "Paquete N°2",
    price: 260,
    highlights: ["Todo lo del Paquete N°1", "Botarga de acuerdo a la temática", "Juegos, hora loca y piñata"],
    items: [...BASE_KIARA, BOTARGA],
    flyer: "/images/paquetes/kiara-2.jpg",
  },
  {
    id: "kiara-3",
    theme: "kiara",
    name: "Paquete N°3",
    price: 310,
    badge: "El más completo",
    highlights: ["Todo lo del Paquete N°2", "Una bailarina", "Pistola de burbujas"],
    items: [...BASE_KIARA, BOTARGA, BAILARINA],
    flyer: "/images/paquetes/kiara-3.jpg",
  },
  {
    id: "kpop-1",
    theme: "kpop",
    name: "Paquete N°1",
    price: 180,
    highlights: ["Dalina vestida de Rumi", "DJ y música infantil", "Juegos, hora loca y piñata"],
    items: [
      {
        title: "Dalina animadora principal",
        lines: [
          "Animación dinámica y divertida durante todo el evento",
          "Acompañamiento permanente a los niños y la familia",
          "(Dalina vestida de Rumi)",
        ],
      },
      BASE_KIARA[1],
      BASE_KIARA[2],
      BASE_KIARA[3],
      BASE_KIARA[4],
      {
        title: "Hora loca",
        lines: [
          "Animada por Dalina (vestida de Rumi)",
          "Baile, alegría y mucha energía antes del momento central",
        ],
      },
      {
        title: "Momento especial",
        lines: ["Canción del Happy Birthday", "Acompañamiento y animación en la piñata"],
      },
    ],
    flyer: "/images/paquetes/kpop-1.jpg",
  },
  {
    id: "kpop-2",
    theme: "kpop",
    name: "Paquete N°2",
    price: 300,
    badge: "Dalina, Mira y Zoey",
    highlights: ["Dalina, Mira y Zoey toda la fiesta", "Gran baile con la cumpleañera", "DJ, juegos y hora loca"],
    items: [
      {
        title: "Dalina animadora principal",
        lines: [
          "Animación dinámica y divertida durante todo el evento",
          "Acompañamiento permanente a los niños y la familia",
          "(Dalina vestida de Rumi)",
          "¡Dalina, Mira y Zoey están presentes durante toda la fiesta!",
        ],
      },
      BASE_KIARA[1],
      {
        title: "Inicio del evento",
        lines: [
          "Presentación animada / Presentación de la cumpleañera",
          "Baile con los papitos",
          "3 juegos recreativos (primer tiempo)",
        ],
      },
      BASE_KIARA[3],
      BASE_KIARA[4],
      {
        title: "Después del segundo tiempo",
        lines: [
          "Gran baile con Dalina, Mira y Zoey junto a la cumpleañera",
          "(Momento especial del show)",
        ],
      },
      {
        title: "Hora loca",
        lines: [
          "Animada por Dalina (vestida de Rumi)",
          "Baile, alegría y mucha energía antes del momento central",
        ],
      },
      {
        title: "Momento especial",
        lines: ["Canción del Happy Birthday", "Acompañamiento y animación en la piñata"],
      },
    ],
    flyer: "/images/paquetes/kpop-2.jpg",
  },
];
