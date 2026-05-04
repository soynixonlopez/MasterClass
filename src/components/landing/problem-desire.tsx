import Image from "next/image";
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
        <p className="text-center text-sm font-bold uppercase tracking-widest text-wine">
          ¿Te suena familiar?
        </p>
        <h2 className="mt-4 text-center font-heading text-3xl font-bold uppercase leading-tight text-carbon sm:text-4xl md:text-5xl">
          El miedo a equivocarte el color te está costando clientas
        </h2>
        <div className="mt-10 space-y-6 text-center text-lg font-medium leading-relaxed text-elevation/90 md:text-xl">
          <p>
            Mezclas que no rinden, tonos que se tapan, resultados que no cuadran con
            lo prometido… <strong className="text-wine">No es falta de ganas</strong>:
            es falta de un sistema claro que puedas replicar en salón.
          </p>
          <p>
            Esta Master Class presencial está diseñada para que{" "}
            <strong className="text-carbon">dejes de adivinar</strong> y empieces a
            trabajar con criterio: diagnóstico, altura, reflejos, neutralización y
            aplicación con{" "}
            <strong className="text-wine">dos coloristas expertas al lado tuyo</strong>.
          </p>
        </div>

        <div className="mt-14 border-t border-wine/10 pt-14">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-wine">
            En colaboración con
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {EVENT.instructors.map((expert) => (
              <div
                key={expert.name}
                className="flex h-24 w-full max-w-[280px] items-center justify-center sm:h-28 md:h-32 md:max-w-[320px]"
              >
                <Image
                  src={expert.logoSrc}
                  alt={`Logo ${expert.name}`}
                  width={320}
                  height={140}
                  className={cn(
                    "max-h-full max-w-full object-contain",
                    expert.name.includes("Carmen") &&
                      "scale-[1.2] sm:scale-125 md:scale-[1.35]"
                  )}
                  sizes="(max-width: 640px) 280px, 320px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-3xl border-2 border-wine/15 bg-warm/90 p-8 text-center shadow-lg md:mt-16 md:p-10">
          <p className="font-heading text-xl font-bold uppercase text-carbon md:text-2xl">
            Tu próximo nivel empieza con una decisión
          </p>
          <p className="mt-3 text-base text-elevation/85 md:text-lg">
            Haz clic, regístrate y recibe en WhatsApp los pasos para asegurar tu cupo.
          </p>
          <div className="mt-8 flex justify-center">
            <AnimatedCta href="#registro" variant="primary">
              Reservar mi lugar ahora
            </AnimatedCta>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
