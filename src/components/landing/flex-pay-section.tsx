import { Banknote, CalendarClock, HandCoins, Sparkles } from "lucide-react";
import { MotionSection } from "@/components/landing/motion-section";
import { AnimatedCta } from "@/components/landing/animated-cta";
import { EVENT } from "@/lib/constants";
import { formatMoneyUsd, getDiscountedFullPayUsd } from "@/lib/pricing";

const discounted = formatMoneyUsd(getDiscountedFullPayUsd());

const cards = [
  {
    icon: HandCoins,
    title: "Abono inicial",
    body: "Separa tu lugar con un abono y completa antes de iniciar clases. Tras registrarte verás en la siguiente pantalla cómo coordinar por WhatsApp.",
    highlight: "Empieza sin pagar todo de golpe",
  },
  {
    icon: CalendarClock,
    title: "Cuotas flexibles",
    body: "Puedes pagar en cuotas según lo coordinemos contigo. Ideal si quieres invertir en tu formación sin frenar tu flujo del salón.",
    highlight: "El curso presencial más al alcance",
  },
  {
    icon: Banknote,
    title: "Pago completo",
    body: `Un solo pago con ${EVENT.discountFullPayPercent}% de descuento: pagas ${discounted} en lugar del precio completo.`,
    highlight: "Máximo ahorro y cupo asegurado",
  },
];

export function FlexPaySection() {
  return (
    <MotionSection
      id="pagos"
      className="border-t border-wine/10 bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-wine/20 bg-white/80 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-wine shadow-sm">
            <Sparkles className="size-4 text-gold" aria-hidden />
            Facilidades de pago
          </p>
          <h2 className="mt-6 font-heading text-3xl font-bold uppercase leading-tight text-carbon sm:text-4xl md:text-5xl">
            No dejes que el precio te detenga
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-elevation/90 md:text-xl">
            Queremos que puedas{" "}
            <strong className="text-wine">asistir presencialmente</strong> y llevar
            técnica de color a tu salón. Por eso ofrecemos{" "}
            <strong>opciones de pago</strong> claras: tú eliges cómo invertir.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, body, highlight }) => (
            <article
              key={title}
              className="flex flex-col rounded-3xl border-2 border-wine/10 bg-white p-7 shadow-xl shadow-wine/5"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/30 to-wine/20 text-wine">
                <Icon className="size-7" aria-hidden />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold uppercase tracking-wide text-carbon md:text-2xl">
                {title}
              </h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gold">
                {highlight}
              </p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-elevation/85 md:text-lg">
                {body}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border-2 border-dashed border-gold/50 bg-carbon/95 p-8 text-center text-champagne shadow-2xl md:p-10">
          <p className="font-heading text-2xl font-bold uppercase text-warm md:text-3xl">
            Siguiente paso: reserva
          </p>
          <p className="mt-3 text-base leading-relaxed text-champagne/90 md:text-lg">
            Completa el registro en la landing y en la pantalla siguiente tendrás el grupo, el pago y cómo enviar tu comprobante.
          </p>
          <div className="mt-8 flex justify-center">
            <AnimatedCta href="#registro" variant="primary">
              Quiero que me contacten
            </AnimatedCta>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
