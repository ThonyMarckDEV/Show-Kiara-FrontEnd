// Datos del telón para saber dónde termina la intro
export function getIntroBounds() {
  const wrapper = document.querySelector(".curtain-wrapper");
  if (!wrapper) return { revealAt: 0, introEnd: 0 };
  const dist = wrapper.offsetHeight - window.innerHeight;
  return {
    revealAt: wrapper.offsetTop + dist * 0.78, // el telón ya casi está abierto
    introEnd: wrapper.offsetTop + dist,        // telón abierto, hero completo
  };
}

function getNavOffset() {
  const nav = document.querySelector(".navbar");
  return nav ? nav.offsetHeight : 0;
}

/**
 * Baja suave a una sección. "#inicio" lleva al hero con el telón ya abierto.
 * Úsalo en onClick: (e) => scrollToSection(e, "#paquetes")
 */
export function scrollToSection(e, href) {
  e?.preventDefault();

  let top;
  if (href === "#inicio") {
    top = getIntroBounds().introEnd;
  } else {
    const el = document.querySelector(href);
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY - getNavOffset() + 1;
  }

  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", href);
}
