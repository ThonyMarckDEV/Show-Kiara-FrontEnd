// Servicios extra: se pueden sumar a cualquier paquete previa coordinación.
// Tienen pago adicional y se cotizan por WhatsApp.
// image: foto opcional en public/images/servicios/ (si no existe, se muestra un diseño con ícono)
export const extraServices = [
  {
    id: "caritas-pintadas",
    icon: "palette",
    title: "Caritas Pintadas",
    text: "Diseños de fantasía en el rostro para que cada niño se sienta parte del show.",
    image: "/images/servicios/caritas-pintadas.jpg",
    conditions: [
      "Solo se trabaja la cantidad de niños contratados.",
      "Llegamos 1 hora antes del evento o de acuerdo a la cantidad de niños contratados.",
      "Duración del servicio: según la cantidad de niños contratados.",
      "Se necesita un espacio con buena iluminación y sillas para los niños.",
      "El servicio no incluye limpieza de los niños.",
      "En caso de niños adicionales, se evaluará el tiempo disponible y se cobrará un adicional.",
      "No se realiza el servicio en condiciones climáticas extremas (lluvia intensa) en espacios sin techo.",
    ],
  },
  {
    id: "pinatas",
    icon: "party",
    title: "Piñatas",
    text: "Piñatas 100% personalizadas, el diseño se realiza de acuerdo a tu temática o idea.",
    image: "/images/servicios/pinatas.jpg",
    conditions: [
      "Se trabaja con el 50% de adelanto para confirmar el pedido.",
      "El pedido debe realizarse con mínimo 1 semana de anticipación.",
      "Todas nuestras piñatas son 100% personalizadas, el diseño se realiza de acuerdo a tu tema o idea.",
      "El saldo restante se cancela antes de la entrega.",
      "El cliente se encarga del recojo o recepción en el lugar acordado.",
      "No nos hacemos responsables por daños ocasionados después de la entrega de la piñata.",
    ],
  },
];
