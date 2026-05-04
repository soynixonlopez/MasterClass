export const EVENT = {
  title: "Master Class Presencial – Colorimetría Desde Cero",
  heroTitle: "Domina la Colorimetría desde Cero",
  heroSubtitle:
    "Aprende técnicas profesionales con Sandra Reyes y Carmen González en una experiencia presencial diseñada para transformar tu talento.",
  dateLabel: "17 de Junio de 2026",
  schedule: "8:00 A.M. – 12:00 M.D.",
  format: "4 clases presenciales de 8:00 A.M. a 12:00 M.D.",
  locationName: "My Hair by Sandra",
  locationAddress: "San Francisco, Calle 74, al lado de Massi",
  priceUsd: 250,
  discountFullPayPercent: 10,
  instructors: [
    {
      name: "Sandra Reyes",
      role: "Colorista profesional experta · My Hair by Sandra",
      logoSrc: "/img/sandraLogo.png",
    },
    {
      name: "Carmen González",
      role: "Colorista profesional experta",
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
