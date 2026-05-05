import Link from "next/link";
import {
  LANDING_CARD_HOVER,
  Reveal,
  StaggerBox,
  StaggerListItem,
  StaggerOl,
  StaggerReveal,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EVENT } from "@/lib/constants";
import {
  formatMoneyUsd,
  getDiscountedFullPayUsd,
  getListPriceUsd,
} from "@/lib/pricing";
import { AnimatedCta } from "@/components/landing/animated-cta";

const price = formatMoneyUsd(getListPriceUsd());
const discounted = formatMoneyUsd(getDiscountedFullPayUsd());

const steps = [
  {
    title: "Completa el formulario",
    body: "Nombre, WhatsApp, email y aceptación. Sin datos de pago aquí: solo aseguras tu cupo.",
  },
  {
    title: "Abre tu página de confirmación",
    body: "Al enviar verás los datos para Yappy o transferencia, el grupo de WhatsApp y cómo enviar tu comprobante.",
  },
  {
    title: "Paga y envía el comprobante",
    body: "Realiza tu abono o pago completo y mándanos la captura por WhatsApp para validar tu acceso.",
  },
] as const;

export function PricingSection() {
  return (
    <MotionSection className="bg-carbon py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold uppercase leading-[1.08] text-warm sm:text-5xl md:text-6xl">
            Sabes cuánto invertir y qué pasa después
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-champagne/90 md:text-xl">
            Sin sorpresas: precio fijo, descuento si pagas completo.
            Cuotas o abono si los necesitas. El equipo te guía por WhatsApp tras registrarte.{" "}
            <Link href="#pagos" className="font-bold text-gold underline-offset-2 hover:underline">
              Ver opciones de pago flexibles
            </Link>
            .
          </p>
        </Reveal>
        <StaggerReveal className="mt-14 grid min-w-0 gap-8 md:grid-cols-2 md:items-stretch">
          <StaggerBox
            className={cn(
              "flex min-w-0 min-h-0 flex-col justify-center rounded-3xl border-2 border-gold/30 bg-gradient-to-br from-wine/60 to-burgundy/70 p-8 text-champagne shadow-2xl md:p-10",
              LANDING_CARD_HOVER
            )}
          >
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-widest text-gold">
                Precio master class
              </p>
              <p className="mt-3 break-words font-heading text-5xl font-bold text-warm md:text-6xl">
                {price}
              </p>
              <p className="mt-5 break-words [overflow-wrap:anywhere] text-lg leading-relaxed text-champagne/95">
                Si pagas <strong className="text-warm">todo de una vez</strong>, tu
                inversión queda en{" "}
                <span className="text-2xl font-bold text-gold break-words [overflow-wrap:anywhere]">
                  {discounted}
                </span>{" "}
                (
                {EVENT.discountFullPayPercent}% de descuento).
              </p>
              <p className="mt-4 text-base text-champagne/90">
                Abono o cuotas disponibles; lo acordamos contigo tras el registro.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <AnimatedCta href="#registro" variant="primary">
                  Registrarme y ver cómo pagar
                </AnimatedCta>
              </div>
            </div>
          </StaggerBox>
          <StaggerBox
            className={cn(
              "min-w-0 rounded-3xl border-2 border-white/10 bg-elevation/90 p-8 text-champagne md:p-10",
              LANDING_CARD_HOVER
            )}
          >
            <p className="font-heading text-xl font-bold uppercase text-warm md:text-2xl">
              Paso a paso
            </p>
            <p className="mt-3 break-words [overflow-wrap:anywhere] text-lg text-champagne/90">
              Así reservas tu lugar. Los datos bancarios aparecen solo después de
              registrarte.
            </p>
            <StaggerOl className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <StaggerListItem key={step.title}>
                  <div className="flex min-w-0 gap-4">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/10 font-heading text-lg font-bold text-gold"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-base font-bold uppercase tracking-wide text-gold/95 md:text-sm">
                        {step.title}
                      </p>
                      <p className="mt-1 break-words [overflow-wrap:anywhere] text-base leading-relaxed text-champagne/90 md:text-[15px]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </StaggerListItem>
              ))}
            </StaggerOl>
            <Link
              href="#registro"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                // outline trae `bg-background` (blanco en tema claro): aquí rompe el contraste sobre la tarjeta oscura
                "mt-6 w-full border-2 border-gold/55 bg-transparent text-warm shadow-none",
                "hover:border-gold/70 hover:bg-gold/15 hover:text-warm",
                "focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/35",
                "md:mt-8 md:h-12 md:min-h-12 md:text-base"
              )}
            >
              Ir al formulario de inscripción
            </Link>
          </StaggerBox>
        </StaggerReveal>
      </div>
    </MotionSection>
  );
}
