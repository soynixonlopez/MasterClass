import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EVENT } from "@/lib/constants";
import {
  formatMoneyUsd,
  getDiscountedFullPayUsd,
  getListPriceUsd,
} from "@/lib/pricing";

const groupUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL?.trim() ?? "";
const phone1 = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
const phone2 =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_2?.replace(/\D/g, "") ?? "";
/** Acepta NEXT_PUBLIC_WHATSAPP_CARMEN o NEXT_PUBLIC_WHATSAPP_NUMBER_CARMEN (tu .env). */
const carmenRaw =
  process.env.NEXT_PUBLIC_WHATSAPP_CARMEN?.trim() ||
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_CARMEN?.trim() ||
  "";
const carmenPhone = carmenRaw.replace(/\D/g, "");
const yappy =
  process.env.NEXT_PUBLIC_YAPPY_NUMBER ?? "Configura en .env.local";
const bankAccount =
  process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? "Configura en .env.local";

const receiptMessage = encodeURIComponent(
  `Hola, envío mi comprobante de pago para la Master Class: ${EVENT.title}.`
);

const carmenMessage = encodeURIComponent(
  "Hola, me registré en la Master Class de Colorimetría y necesito ayuda."
);

function waLink(num: string) {
  return `https://wa.me/${num}?text=${receiptMessage}`;
}

function carmenWaHref() {
  return `https://wa.me/${carmenPhone}?text=${carmenMessage}`;
}

export const metadata: Metadata = {
  title: "Registro recibido · Próximos pasos",
  description:
    "Grupo de WhatsApp, datos bancarios y envío de comprobante para tu ticket de acceso.",
  robots: { index: false, follow: false },
};

const stepCircle =
  "flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-wine/40 bg-wine text-sm font-heading font-bold text-warm";

export default function RegistroExitosoPage() {
  const phones = [phone1, phone2].filter(Boolean);

  return (
    <div className="min-h-screen bg-cream pb-28 text-carbon md:pb-24">
      <div className="mx-auto max-w-lg px-4 py-10 md:px-6 md:py-14">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-wine">
          ¡Registro recibido!
        </p>
        <h1 className="mt-3 text-center font-heading text-3xl font-bold uppercase leading-tight md:text-4xl">
          Tus pasos
        </h1>
        <p className="mt-4 text-center text-base leading-relaxed text-elevation/85">
          Hazlo en orden. Aquí tienes todo para tu{" "}
          <strong>entrada al evento</strong>.
        </p>

        <div className="mt-10 rounded-3xl border-2 border-wine/15 bg-white p-6 shadow-lg md:p-8">
          <ol className="space-y-8">
            <li className="flex gap-4">
              <span className={stepCircle} aria-hidden>
                1
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-heading text-base font-bold uppercase text-carbon">
                  Entra al grupo
                </p>
                <p className="mt-2 text-sm leading-relaxed text-elevation/90">
                  Avisos y logística del taller.
                </p>
                {groupUrl ? (
                  <Link
                    href={groupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-4 inline-flex h-11 w-full max-w-full items-center justify-center gap-2 rounded-full border-0 bg-wine text-sm text-warm hover:opacity-95 sm:w-auto sm:min-w-[240px]"
                    )}
                  >
                    Unirme al grupo
                    <ExternalLink className="size-4" aria-hidden />
                  </Link>
                ) : (
                  <p className="mt-3 rounded-lg bg-warm/80 p-3 text-xs text-elevation/85">
                    Falta configurar{" "}
                    <code className="rounded bg-cream px-1">
                      NEXT_PUBLIC_WHATSAPP_GROUP_URL
                    </code>{" "}
                    en <code className="rounded bg-cream px-1">.env.local</code>.
                  </p>
                )}
              </div>
            </li>

            <li className="flex gap-4">
              <span className={stepCircle} aria-hidden>
                2
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-heading text-base font-bold uppercase text-carbon">
                  Paga
                </p>
                <p className="mt-2 text-sm leading-relaxed text-elevation/90">
                  <strong>Lista:</strong> {formatMoneyUsd(getListPriceUsd())}{" "}
                  (abonos/cuotas).{" "}
                  <strong>Un solo pago:</strong>{" "}
                  {formatMoneyUsd(getDiscountedFullPayUsd())} (
                  {EVENT.discountFullPayPercent}% menos). Dilo en el mensaje del
                  comprobante.
                </p>
                <dl className="mt-4 space-y-3 border-t border-wine/10 pt-4 text-sm">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                    <dt className="shrink-0 text-xs font-bold uppercase tracking-wide text-elevation/55">
                      Titular
                    </dt>
                    <dd className="font-semibold text-carbon">
                      Sandra Milena Reyes
                    </dd>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                    <dt className="shrink-0 text-xs font-bold uppercase tracking-wide text-elevation/55">
                      Banco
                    </dt>
                    <dd className="font-semibold text-carbon">Banco General</dd>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                    <dt className="shrink-0 text-xs font-bold uppercase tracking-wide text-elevation/55">
                      Yappy / cuenta
                    </dt>
                    <dd className="font-mono text-[13px] text-carbon">
                      <span className="block break-all">{yappy}</span>
                      <span className="mt-1 block break-all">{bankAccount}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </li>

            <li className="flex gap-4">
              <span className={stepCircle} aria-hidden>
                3
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-heading text-base font-bold uppercase text-carbon">
                  Envía el comprobante
                </p>
                <p className="mt-2 text-sm leading-relaxed text-elevation/90">
                  Por WhatsApp, con tu captura. Así te enviamos el ticket de
                  acceso.
                </p>
                {phones.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-2">
                    {phones.map((num, i) => (
                      <li key={`${num}-${i}`}>
                        <Link
                          href={waLink(num)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 items-center justify-center gap-2 rounded-full border-2 border-wine/25 bg-cream text-sm font-semibold text-wine hover:bg-warm/50"
                        >
                          <MessageCircle className="size-4" aria-hidden />
                          Enviar comprobante ({i === 0 ? "contacto 1" : "contacto 2"})
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-lg bg-warm/80 p-3 text-xs text-elevation/85">
                    Configura{" "}
                    <code className="rounded bg-white px-1">
                      NEXT_PUBLIC_WHATSAPP_NUMBER
                    </code>{" "}
                    en <code className="rounded bg-white px-1">.env.local</code>.
                  </p>
                )}
              </div>
            </li>

            <li className="flex gap-4">
              <span className={stepCircle} aria-hidden>
                4
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-heading text-base font-bold uppercase text-carbon">
                  ¿Duda?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-elevation/90">
                  Escríbenos por WhatsApp si algo no queda claro; también está el{" "}
                  <strong>botón verde de soporte</strong> abajo a la derecha.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <p className="mt-8 text-center text-sm text-elevation/70">
          <Link
            href="/"
            className="font-semibold text-wine underline-offset-2 hover:underline"
          >
            Volver al inicio
          </Link>
        </p>
      </div>

      {carmenPhone ? (
        <a
          href={carmenWaHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "fixed right-4 z-[100] flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine md:right-6",
            "bottom-[max(1.25rem,env(safe-area-inset-bottom))] md:bottom-7",
            "bg-[#25D366] hover:bg-[#20BD5A]"
          )}
          aria-label="Soporte por WhatsApp disponible"
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          <span className="max-w-[12rem] leading-tight sm:max-w-none">
            Soporte disponible
          </span>
        </a>
      ) : null}
    </div>
  );
}
