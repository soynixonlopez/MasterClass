"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LANDING_CARD_HOVER,
  Reveal,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { AnimatedCta } from "@/components/landing/animated-cta";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No. El programa está pensado para quien parte desde cero y para quien quiere ordenar y profesionalizar su técnica.",
  },
  {
    q: "¿Puedo pagar por cuotas?",
    a: "Sí. Puedes elegir abono inicial o cuotas; al registrar te contactamos por WhatsApp para acordar el plan.",
  },
  {
    q: "¿Dónde será la clase?",
    a: "En My Hair by Sandra, San Francisco, Calle 74, al lado de Massi. Modalidad 100% presencial.",
  },
  {
    q: "¿Qué incluye la Master Class?",
    a: "Formación intensiva en teoría y práctica guiada, materiales clave de trabajo y enfoque salón real (ajusta según tu política).",
  },
  {
    q: "¿Cómo confirmo mi cupo?",
    a: "Al enviar tu registro recibimos tu solicitud y te escribimos por WhatsApp para validar pago y cupo.",
  },
];

export function FaqSection() {
  return (
    <MotionSection id="faq" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold uppercase leading-[1.1] text-carbon sm:text-5xl md:text-6xl">
            ¿Dudas? Aquí están las respuestas
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg font-medium text-elevation/85 md:text-xl">
            Decide con la información encima de la mesa. El registro es breve cuando quieras apartar lugar.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion multiple={false} className="mt-12 w-full space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className={cn(
                  "rounded-2xl border-2 border-wine/10 bg-warm/90 px-4 py-1 shadow-sm motion-safe:hover:border-wine/25 motion-safe:hover:shadow-md",
                  LANDING_CARD_HOVER
                )}
              >
                <AccordionTrigger className="text-left text-base font-bold text-carbon hover:no-underline md:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-elevation/85 md:text-lg">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal
          className={cn(
            "mx-auto mt-14 max-w-md rounded-3xl border-2 border-wine/15 bg-white p-8 text-center shadow-md md:p-10",
            LANDING_CARD_HOVER
          )}
        >
          <p className="font-heading text-lg font-bold uppercase text-carbon md:text-xl">
            ¿Lista? El formulario abajo lleva muy poco
          </p>
          <div className="mt-8 flex justify-center">
            <AnimatedCta href="#registro" variant="primary">
              Ir al registro ahora
            </AnimatedCta>
          </div>
        </Reveal>
      </div>
    </MotionSection>
  );
}
