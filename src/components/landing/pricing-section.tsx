import Link from "next/link";
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
        <h2 className="text-center font-heading text-3xl font-bold uppercase text-warm sm:text-4xl md:text-5xl">
          Inversión clara · Sin letra pequeña
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-champagne/85 md:text-xl">
          El precio refleja formación presencial con expertas. Si necesitas cuotas,
          <Link href="#pagos" className="font-bold text-gold underline-offset-2 hover:underline">
            {" "}
            revisa las facilidades arriba
          </Link>
          .
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-gold/30 bg-gradient-to-br from-wine/60 to-burgundy/70 p-8 text-champagne shadow-2xl md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-gold">
              Precio master class
            </p>
            <p className="mt-3 font-heading text-5xl font-bold text-warm md:text-6xl">
              {price}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-champagne/95">
              Si pagas <strong className="text-warm">todo de una vez</strong>, tu
              inversión queda en{" "}
              <span className="text-2xl font-bold text-gold">{discounted}</span> (
              {EVENT.discountFullPayPercent}% de descuento).
            </p>
            <p className="mt-4 text-base text-champagne/90">
              Abono o cuotas disponibles; lo acordamos contigo tras el registro.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AnimatedCta href="#registro" variant="primary">
                Quiero reservar ya
              </AnimatedCta>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-white/10 bg-elevation/90 p-8 text-champagne md:p-10">
            <p className="font-heading text-xl font-bold uppercase text-warm md:text-2xl">
              Paso a paso
            </p>
            <p className="mt-3 text-lg text-champagne/90">
              Así reservas tu lugar. Los datos bancarios aparecen solo después de
              registrarte.
            </p>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
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
                    <p className="mt-1 text-base leading-relaxed text-champagne/90 md:text-[15px]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="#registro"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-6 w-full border-2 border-gold/50 text-warm hover:bg-gold/10 md:mt-8 md:h-12 md:text-base"
              )}
            >
              Ir al formulario de inscripción
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
