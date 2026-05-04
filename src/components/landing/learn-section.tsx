import { Check } from "lucide-react";
import { MotionSection } from "@/components/landing/motion-section";

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
        <h2 className="text-center font-heading text-3xl font-bold uppercase text-carbon sm:text-4xl md:text-5xl">
          Lo que dominarás en el salón
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-lg font-medium leading-relaxed text-elevation/85 md:text-xl">
          Contenido pensado para que{" "}
          <strong className="text-wine">vendas servicios más caros y con menos retrabajos</strong>
          : teoría ordenada + práctica guiada, sin relleno.
        </p>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 rounded-2xl border-2 border-wine/10 bg-cream px-5 py-4 text-base text-elevation shadow-md md:text-lg"
            >
              <Check
                className="mt-0.5 size-6 shrink-0 text-wine"
                strokeWidth={2.5}
                aria-hidden
              />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
