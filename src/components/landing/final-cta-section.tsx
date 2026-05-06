"use client";

import { Reveal } from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { AnimatedCta } from "@/components/landing/animated-cta";

export function FinalCtaSection() {
  return (
    <MotionSection className="border-t-2 border-gold/30 bg-linear-to-br from-burgundy via-wine to-burgundy py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold sm:text-sm md:tracking-widest">
            Antes de irte
          </p>
          <h2 className="mt-5 font-heading text-4xl font-bold uppercase leading-[1.1] text-warm sm:text-5xl md:text-6xl">
            Tu cupo lo amarras cuando nos escribes, no cuando lo llevas en la cabeza otro mes
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-normal text-champagne/95 md:text-xl">
            El grupo cerrará al completar lugares. Si quieres seguir adelante, el registro es breve. En
            la siguiente pantalla ya está el equipo en WhatsApp para orientarte y ver las opciones para pagar.
          </p>
          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <AnimatedCta href="#registro" variant="primary">
              Dejar mi nombre en la lista
            </AnimatedCta>
          </div>
        </Reveal>
      </div>
    </MotionSection>
  );
}
