import { Calendar, Clock, GraduationCap, MapPinned, Users } from "lucide-react";
import {
  LANDING_CARD_HOVER,
  Reveal,
  StaggerBox,
  StaggerDl,
} from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const rows = [
  {
    icon: Calendar,
    label: "Fecha",
    value: EVENT.dateLabel,
  },
  {
    icon: Clock,
    label: "Horario",
    value: EVENT.schedule,
  },
  {
    icon: Users,
    label: "Modalidad",
    value: "Presencial",
  },
  {
    icon: MapPinned,
    label: "Lugar",
    value: `${EVENT.locationName}, ${EVENT.locationAddress}`,
  },
  {
    icon: GraduationCap,
    label: "Duración",
    value: EVENT.format,
  },
];

export function EventDetailsSection() {
  return (
    <MotionSection id="detalles" className="bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold uppercase leading-[1.08] text-carbon sm:text-5xl md:text-6xl">
            Fecha, lugar y horario. Todo claro
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-elevation/85 md:text-xl">
            Agenda con certeza y decide si este encaje te conviene antes de pasar al formulario.
          </p>
        </Reveal>
        <StaggerDl className="mt-14 flex flex-col gap-4">
          {rows.map(({ icon: Icon, label, value }) => (
            <StaggerBox
              key={label}
              className={cn(
                "flex gap-5 rounded-2xl border-2 border-wine/10 bg-cream/95 px-5 py-5 shadow-sm",
                LANDING_CARD_HOVER
              )}
            >
              <Icon className="mt-1 size-7 shrink-0 text-wine" aria-hidden />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-elevation/55">
                  {label}
                </dt>
                <dd className="mt-2 text-base font-medium text-elevation md:text-lg">
                  {value}
                </dd>
              </div>
            </StaggerBox>
          ))}
        </StaggerDl>
      </div>
    </MotionSection>
  );
}
