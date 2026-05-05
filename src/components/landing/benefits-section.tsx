import {
  LANDING_CARD_HOVER,
  Reveal,
  StaggerListItem,
  StaggerUl,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { CERTIFICATE_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "Ruta desde cero",
    text: "Sin suposiciones: paso a paso para aplicar en citas reales.",
  },
  {
    title: "Práctica en vivo",
    text: "Corrección y acompañamiento de coloristas que trabajan el color a diario.",
  },
  {
    title: "Resultados vendibles",
    text: "Técnicas que puedes comunicar a tu clienta y cobrar con más confianza.",
  },
  {
    title: "Marca personal más fuerte",
    text: "Diferénciate de quien “echa y espera” sin diagnóstico.",
  },
  {
    title: "Menos estrés técnico",
    text: "Entiendes qué hace cada producto y por qué falla cuando falla.",
  },
  {
    title: "Bonus",
    text: CERTIFICATE_COPY,
  },
];

export function BenefitsSection() {
  return (
    <MotionSection className="bg-carbon py-20 text-champagne md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold uppercase leading-[1.08] text-warm sm:text-5xl md:text-6xl">
            Por qué invertirías tu tarde aquí
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-champagne/90 md:text-xl">
            No es curso grabado ni motivación suelta: es método presencial para que{" "}
            <strong className="text-gold">vuelvas y apliques desde el lunes</strong>.
          </p>
        </Reveal>
        <StaggerUl className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, text }) => (
            <StaggerListItem key={title}>
              <div
                className={cn(
                  "h-full rounded-3xl border-2 border-gold/25 bg-gradient-to-b from-wine/40 to-burgundy/30 p-6 md:p-7",
                  LANDING_CARD_HOVER
                )}
              >
                <p className="font-heading text-lg font-bold uppercase tracking-wide text-gold md:text-xl">
                  {title}
                </p>
                <p className="mt-3 text-base leading-relaxed text-champagne/95 md:text-lg">
                  {text}
                </p>
              </div>
            </StaggerListItem>
          ))}
        </StaggerUl>
      </div>
    </MotionSection>
  );
}
