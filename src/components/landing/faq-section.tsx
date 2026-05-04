"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionSection } from "@/components/landing/motion-section";

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
    a: "En My Hair by Sandra, San Francisco, Calle 74, al lado de Massi — modalidad 100% presencial.",
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
    <MotionSection id="faq" className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h2 className="text-center font-heading text-3xl font-bold uppercase text-carbon sm:text-4xl md:text-5xl">
          Dudas que ya te respondemos
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-base text-elevation/80 md:text-lg">
          Transparencia antes de invertir: lee y sigue al registro con tranquilidad.
        </p>
        <Accordion multiple={false} className="mt-12 w-full space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="rounded-2xl border-2 border-wine/10 bg-warm/90 px-4 py-1 shadow-sm"
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
      </div>
    </MotionSection>
  );
}
