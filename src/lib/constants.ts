export const EVENT = {
  title: "Master Class presencial, Colorimetría desde cero",
  heroTitle: "Menos improvisar en el sillón, más control en el resultado",
  heroSubtitle:
    "Una tarde en salón con Sandra Reyes y Carmen González: ver el cabello con criterio, mezclar con intención y aplicar con seguridad. El grupo es pequeño; cuando se completa, cerramos la lista.",
  dateLabel: "17 de Junio de 2026",
  schedule: "8:00 A.M. a 12:00 M.D.",
  format: "4 clases presenciales de 8:00 A.M. a 12:00 M.D.",
  locationName: "My Hair by Sandra",
  locationAddress: "San Francisco, Calle 74, al lado de Maissi",
  priceUsd: 250,
  discountFullPayPercent: 10,
  instructors: [
    {
      name: "Sandra Reyes",
      role: "Empresaria en belleza y colorimetría, fundadora de My Hair by Sandra",
      bio: "Sandra lidera My Hair by Sandra y acompaña a equipos que quieren resultados predecibles en color. En esta sesión comparte el criterio que usa en salón día a día, sin atajos de manual.",
      photoSrc: "/img/señoraSandra.png",
      logoSrc: "/img/sandraLogo.png",
    },
    {
      name: "Carmen González",
      role: "Colorista profesional y estilista, más de 30 años trabajando con clientela internacional",
      bio: "Carmen se mueve entre consulta técnica, corrección y terminaciones pulidas frente al espejo. En esta clase aporta su ojo curtido para que lleves de vuelta al salón ideas que funcionan cuando la cliente ya está en el sillón.",
      photoSrc: "/img/señoraCarmen.png",
      logoSrc: "/img/carmenLogo.png",
    },
  ],
} as const;

/** Texto editable sobre certificación o constancia */
export const CERTIFICATE_COPY =
  "Incluye constancia de participación (ajusta este texto si aplica).";

export const PLACEHOLDER_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
  texture:
    "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80",
} as const;
