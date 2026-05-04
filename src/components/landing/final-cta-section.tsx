"use client";

import { MotionSection } from "@/components/landing/motion-section";
import { AnimatedCta } from "@/components/landing/animated-cta";

export function FinalCtaSection() {
  return (
    <MotionSection className="border-t-2 border-gold/30 bg-gradient-to-br from-burgundy via-wine to-burgundy py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-gold">
          Última llamada a la acción
        </p>
        <h2 className="mt-4 font-heading text-3xl font-bold uppercase leading-tight text-warm sm:text-4xl md:text-5xl">
          Tu cupo no se aparta solo hasta que des el primer paso
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-champagne/95 md:text-xl">
          Las plazas presenciales son limitadas para cuidar la calidad del
          acompañamiento. Completa el registro y hablamos por WhatsApp enseguida.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <AnimatedCta href="#registro" variant="primary">
            Apartar mi cupo hoy
          </AnimatedCta>
        </div>
      </div>
    </MotionSection>
  );
}
