import { Calendar, Clock, GraduationCap, MapPinned, Users } from "lucide-react";
import { MotionSection } from "@/components/landing/motion-section";
import { EVENT } from "@/lib/constants";

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
    value: `${EVENT.locationName} — ${EVENT.locationAddress}`,
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
        <h2 className="text-center font-heading text-3xl font-bold uppercase text-carbon sm:text-4xl md:text-5xl">
          Todo lo que necesitas saber
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-elevation/80 md:text-xl">
          Fechas, lugar y formato presencial para planificar sin sorpresas.
        </p>
        <dl className="mt-14 space-y-4">
          {rows.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex gap-5 rounded-2xl border-2 border-wine/10 bg-cream/95 px-5 py-5 shadow-sm"
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
            </div>
          ))}
        </dl>
      </div>
    </MotionSection>
  );
}
