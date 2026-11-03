// Políticas del evento (sección Políticas).
// icon: "calendar" | "wallet" | "clock" | "users" | "refresh" | "car" | "home"
export const policies = [
  {
    id: "reserva",
    icon: "calendar",
    title: "Reserva del servicio",
    text: "Para confirmar la fecha del evento, se deberá realizar un adelanto del 50% del costo total. Sin este pago, la fecha no será considerada como reservada.",
  },
  {
    id: "pago-final",
    icon: "wallet",
    title: "Pago final",
    text: "El 50% restante deberá ser cancelado al finalizar el show.",
  },
  {
    id: "tolerancia",
    icon: "clock",
    title: "Tolerancia de inicio",
    text: "El show cuenta con una tolerancia máxima de 15 minutos para su inicio, contados desde la llegada de la animadora o equipo al lugar del evento.",
  },
  {
    id: "puntualidad",
    icon: "users",
    title: "Puntualidad",
    text: "Se recomienda que todos los invitados estén presentes a la hora acordada para aprovechar al máximo el tiempo del show.",
  },
  {
    id: "reprogramaciones",
    icon: "refresh",
    title: "Reprogramaciones",
    text: "Se permite el cambio de fecha previa coordinación y sujeto a disponibilidad. No se realiza devolución del dinero del adelanto en ningún caso.",
  },
  {
    id: "movilidad",
    icon: "car",
    title: "Movilidad",
    text: "El costo de traslado no está incluido en el precio del show y será adicional según la ubicación del evento.",
    note: "Sonido: el servicio no incluye equipo de sonido, salvo coordinación previa.",
  },
  {
    id: "espacio",
    icon: "home",
    title: "Espacio y condiciones",
    text: "El cliente deberá garantizar un espacio adecuado y seguro para el desarrollo de las actividades.",
  },
];

export const policiesClosing =
  "Siguiendo estas políticas, trabajamos con organización y compromiso para hacer de tu evento un momento inolvidable, lleno de alegría y diversión.";
