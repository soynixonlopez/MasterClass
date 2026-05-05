import Image from "next/image";
import {
  LANDING_CARD_HOVER,
  Reveal,
  StaggerArticle,
  StaggerReveal,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function InstructorsSection() {
  return (
    <MotionSection className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold uppercase leading-[1.08] text-carbon sm:text-5xl md:text-6xl">
            Quién te lleva del diagnóstico al resultado
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-elevation/85 md:text-xl">
            Personas que viven la colorimetría en sala, no solo teoría desde un podio.
          </p>
        </Reveal>
        <StaggerReveal className="mt-14 grid gap-8 md:grid-cols-2">
          {EVENT.instructors.map((i) => (
            <StaggerArticle
              key={i.name}
              className={cn(
                "overflow-hidden rounded-3xl border-2 border-wine/15 bg-warm shadow-xl shadow-wine/10",
                LANDING_CARD_HOVER
              )}
            >
              <div className="relative aspect-4/5 w-full bg-black md:aspect-3/4">
                <Image
                  src={i.photoSrc}
                  alt={`Retrato de ${i.name}, experta`}
                  fill
                  className="object-cover object-[50%_20%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i.name.includes("Sandra")}
                />
              </div>
              <div className="p-7 md:p-8">
                <h3 className="font-heading text-2xl font-bold uppercase text-carbon md:text-3xl">
                  {i.name}
                </h3>
                <p className="mt-2 text-base font-semibold text-wine md:text-lg">
                  {i.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-elevation/80 md:text-base">
                  {i.bio}
                </p>
              </div>
            </StaggerArticle>
          ))}
        </StaggerReveal>
      </div>
    </MotionSection>
  );
}
