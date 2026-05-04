import Image from "next/image";
import { MotionSection } from "@/components/landing/motion-section";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function InstructorsSection() {
  return (
    <MotionSection className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-heading text-3xl font-bold uppercase text-carbon sm:text-4xl md:text-5xl">
          Aprende con quienes sí saben enseñar
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-medium text-elevation/85 md:text-xl">
          Dos marcas, una misión: llevarte de la teoría a la mano en salón, sin
          atajos.
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {EVENT.instructors.map((i) => (
            <article
              key={i.name}
              className="overflow-hidden rounded-3xl border-2 border-wine/15 bg-warm shadow-xl shadow-wine/10"
            >
              <div className="relative flex min-h-[240px] items-center justify-center bg-black px-6 py-12 md:min-h-[280px] md:px-10 md:py-14">
                <Image
                  src={i.logoSrc}
                  alt={`Logo ${i.name}`}
                  width={400}
                  height={180}
                  className={cn(
                    "max-h-[200px] max-w-full object-contain md:max-h-[240px]",
                    i.name.includes("Carmen") &&
                      "scale-[1.15] md:scale-125"
                  )}
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
                  Parte del equipo que impartirá la Master Class presencial en{" "}
                  {EVENT.locationName}.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
