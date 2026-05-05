import Image from "next/image";
import { LANDING_CARD_HOVER, Reveal } from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { AnimatedCta } from "@/components/landing/animated-cta";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProblemDesire() {
  return (
    <MotionSection
      id="transformacion"
      className="bg-cream py-20 text-elevation md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-widest text-wine">
            ¿Te suena familiar?
          </p>
          <h2 className="mt-5 text-center font-heading text-4xl font-bold uppercase leading-[1.08] text-carbon sm:text-5xl md:text-6xl">
            Si el resultado no cuenta la misma historia que tu consulta inicial, algo se perdió por el
            camino
          </h2>
        </Reveal>
        <Reveal
          delay={0.06}
          className="mt-10 space-y-6 text-center text-lg font-normal leading-relaxed text-elevation/90 md:text-xl"
        >
          <p>
            En color la clienta mide rápido si lo que acordaste en la consulta encaja con lo que ve al
            mirar el resultado.
          </p>
          <p>
            En esta tarde presencial ordenas diagnóstico, alturas, reflejos, neutralización y aplicación
            junto a{" "}
            <strong className="font-medium text-wine">Sandra Reyes y Carmen González</strong>, desde la
            primera observación del cabello hasta el acabado frente a ella.
          </p>
        </Reveal>

        <Reveal
          delay={0.12}
          className={cn(
            "mt-14 rounded-3xl border-2 border-wine/15 bg-white/90 p-8 text-center shadow-lg shadow-wine/5 md:mt-16 md:p-10",
            LANDING_CARD_HOVER
          )}
        >
          <div className="pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-wine">
              En colaboración con
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-10 md:mt-8 md:gap-14">
              {EVENT.instructors.map((expert) => (
                <div
                  key={expert.name}
                  className="flex h-20 w-full max-w-[260px] items-center justify-center sm:h-24 md:h-28 md:max-w-[300px]"
                >
                  <Image
                    src={expert.logoSrc}
                    alt={`Logo ${expert.name}`}
                    width={320}
                    height={140}
                    className={cn(
                      "max-h-full max-w-full object-contain transition-transform duration-300 motion-safe:hover:scale-[1.03]",
                      expert.name.includes("Carmen") &&
                        "scale-[1.15] sm:scale-[1.2] md:scale-[1.28]"
                    )}
                    sizes="(max-width: 640px) 260px, 300px"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 font-heading text-2xl font-bold uppercase leading-tight text-carbon md:mt-10 md:text-[1.85rem] lg:text-[2.15rem]">
            Cuando encaje con tu sala, mejor reservar hoy que dejarlo para después
          </p>
          <p className="mx-auto mt-4 max-w-lg text-lg font-normal leading-relaxed text-elevation/85 md:text-xl">
            Si te encaja el plan, deja tu contacto abajo. Al enviar verás el grupo, formas de pagar y dónde mandar
            el comprobante, sin dar vueltas.
          </p>
          <div className="mt-8 flex justify-center md:mt-10">
            <AnimatedCta href="#registro" variant="primary">
              Completar mi solicitud
            </AnimatedCta>
          </div>
        </Reveal>
      </div>
    </MotionSection>
  );
}
