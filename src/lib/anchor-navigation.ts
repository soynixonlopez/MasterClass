/**
 * Scroll fiable a secciones `#id` en la misma página.
 * `next/link` con `href="#..."` en el App Router a veces no hace scroll hasta el destino.
 */
export function scrollToAnchorByHash(hash: string): boolean {
  if (typeof document === "undefined") return false;
  if (!hash.startsWith("#") || hash.length <= 1) return false;

  const raw = hash.slice(1);
  let el = document.getElementById(raw);
  if (!el) {
    try {
      el = document.getElementById(decodeURIComponent(raw));
    } catch {
      /* ignore */
    }
  }
  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    window.history.replaceState(null, "", `#${raw}`);
  } catch {
    /* ignore */
  }
  return true;
}
