import { Banknote, CalendarClock, HandCoins } from "lucide-react";
import {
  LANDING_CARD_HOVER,
  Reveal,
  StaggerArticle,
  StaggerReveal,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { AnimatedCta } from "@/components/landing/animated-cta";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
      <div className="mx-auto min-w-0 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full border border-wine/25 bg-white/90 px-5 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-wine shadow-sm sm:text-sm sm:tracking-[0.22em]">
            Facilidades de pago
          </p>
          <h2 className="mt-6 font-heading text-4xl font-bold uppercase leading-[1.08] text-carbon sm:text-5xl md:text-6xl">
            Si el dinero fue la excusa, aquí tienes caminos
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-elevation/90 md:text-xl">
            Pagos flexibles porque{" "}
            <strong className="text-wine">necesitas la técnica hoy</strong>, no después de otro
            año de “cuando pueda todo junto”.
          </p>
        </Reveal>

        <StaggerReveal className="mt-14 grid w-full min-w-0 gap-6 md:grid-cols-3 md:items-stretch">
          {cards.map(({ icon: Icon, title, body, highlight }) => (
            <StaggerArticle
              key={title}
              className={cn(
                "flex flex-col rounded-3xl border-2 border-wine/10 bg-white p-7 shadow-xl shadow-wine/5",
                LANDING_CARD_HOVER
              )}
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
            </StaggerArticle>
          ))}
        </StaggerReveal>

        <Reveal
          className={cn(
            "mx-auto mt-14 max-w-2xl rounded-3xl border-2 border-dashed border-gold/50 bg-carbon/95 p-8 text-center text-champagne shadow-2xl md:p-10",
            LANDING_CARD_HOVER
          )}
        >
          <p className="font-heading text-2xl font-bold uppercase leading-tight text-warm md:text-3xl">
            Un formulario breve, luego WhatsApp y formas de pagar
          </p>
          <p className="mt-4 text-base leading-relaxed text-champagne/90 md:text-lg">
            Mismo flujo que más arriba: registro breve, siguiente pantalla con datos y grupo.
          </p>
          <div className="mt-8 flex justify-center">
            <AnimatedCta href="#registro" variant="primary">
              Ir al registro
            </AnimatedCta>
          </div>
        </Reveal>
      </div>
    </MotionSection>
  );
}
