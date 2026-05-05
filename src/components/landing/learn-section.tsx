import { Check } from "lucide-react";
import {
  LANDING_CARD_HOVER,
  Reveal,
  StaggerListItem,
  StaggerUl,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { cn } from "@/lib/utils";

const items = [
  "Teoría base del color",
  "Diagnóstico capilar",
  "Alturas de tono",
  "Reflejos y matices",
  "Neutralización",
  "Mezclas correctas",
  "Aplicación profesional",
  "Errores comunes en colorimetría",
];

export function LearnSection() {
  return (
    <MotionSection id="curso" className="bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold uppercase leading-[1.08] text-carbon sm:text-5xl md:text-6xl">
            En el salón vas a dominar esto
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-elevation/90 md:text-xl">
            Contenido ordenado para{" "}
            <strong className="text-wine">cobrar con respaldo</strong> y bajar retrabajos: teoría y
            criterio práctico, sin relleno ni humo.
          </p>
        </Reveal>
        <StaggerUl className="mt-14 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <StaggerListItem key={item}>
              <div
                className={cn(
                  "flex h-full items-start gap-4 rounded-2xl border-2 border-wine/10 bg-cream px-5 py-4 text-base text-elevation shadow-md md:text-lg",
                  LANDING_CARD_HOVER
                )}
              >
                <Check
                  className="mt-0.5 size-6 shrink-0 text-wine"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className="font-medium">{item}</span>
              </div>
            </StaggerListItem>
          ))}
        </StaggerUl>
      </div>
    </MotionSection>
  );
}
