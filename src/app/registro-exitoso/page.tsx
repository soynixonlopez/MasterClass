import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ExternalLink, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EVENT } from "@/lib/constants";
import {
  formatMoneyUsd,
  getDiscountedFullPayUsd,
  getListPriceUsd,
} from "@/lib/pricing";
import {
  buildReceiptContacts,
  getBankTransferDetails,
  getGroupInviteUrl,
  receiptWhatsAppHref,
  getSupportWaHref,
} from "@/lib/post-registration-details";

const groupUrl = getGroupInviteUrl();
const { holder, bankName, account: bankAccountRaw, accountConfigured: bankAccountConfigured } =
  getBankTransferDetails();

const supportHref = getSupportWaHref();

export const metadata: Metadata = {
  title: "Registro recibido",
  description:
    "Grupo de WhatsApp, transferencia bancaria y envío de comprobante por WhatsApp.",
  robots: { index: false, follow: false },
};

const sectionTitle =
  "font-heading text-lg font-bold uppercase tracking-wide text-carbon md:text-xl";

export default function RegistroExitosoPage() {
  const receiptContacts = buildReceiptContacts();

  function waLink(digits: string) {
    return receiptWhatsAppHref(digits);
  }

  return (
    <div className="min-h-screen bg-cream pb-32 text-carbon md:pb-28">
      <div className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16 lg:max-w-[42rem]">
        <header className="text-center md:px-2">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-wine md:text-[0.8rem]">
            ¡Registro recibido!
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold uppercase leading-[1.12] text-carbon md:text-4xl lg:text-[2.65rem]">
            Grupo, transferencia y comprobante
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-elevation/80 md:text-lg">
            Tienes todo en esta pantalla: únete al grupo, transfieres solo a la cuenta indicada y envías tu
            captura por WhatsApp cuando hayas pagado.
          </p>
        </header>

        <div className="mt-12 rounded-[1.75rem] border-2 border-wine/15 bg-white p-8 shadow-xl shadow-wine/5 md:mt-14 md:p-12 md:px-14">
          {/* Grupo */}
          <section className="pb-12 md:pb-14">
            <p className={sectionTitle}>Grupo del encuentro</p>
            <p className="mt-4 text-base leading-relaxed text-elevation/88 md:text-[1.0625rem]">
              Anuncios del taller, ubicación práctica y avisos de último minuto van en el grupo oficial.
            </p>
            {groupUrl ? (
              <Link
                href={groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full border-0 bg-wine px-6 text-[0.95rem] font-bold text-warm hover:opacity-[0.97] md:text-base",
                )}
              >
                Unirme al grupo
                <ExternalLink className="size-[1.125rem] shrink-0" aria-hidden />
              </Link>
            ) : (
              <div className="mt-8 rounded-2xl border border-wine/20 bg-warm/90 p-5 text-sm text-elevation/85 md:p-6">
                Configura{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs font-mono text-carbon ring-1 ring-wine/10">
                  NEXT_PUBLIC_WHATSAPP_GROUP_URL
                </code>{" "}
                en <code className="rounded px-1.5 py-0.5 text-xs">.env.local</code> para mostrar el
                botón de invitación.
              </div>
            )}
          </section>

          {/* Pago */}
          <section className="border-t border-wine/15 pt-12 md:pb-2 md:pt-14">
            <p className={sectionTitle}>Solo cobramos por transferencia</p>
            <p className="mt-5 text-base leading-relaxed text-elevation/88 md:text-[1.0625rem]">
              <strong className="font-semibold text-carbon">
                Lista: {formatMoneyUsd(getListPriceUsd())}
              </strong>{" "}
              (abonos o cuotas acordadas).{" "}
              <strong className="font-semibold text-carbon">
                Un solo pago: {formatMoneyUsd(getDiscountedFullPayUsd())}
              </strong>{" "}
              ({EVENT.discountFullPayPercent}% menos si pagas todo de una vez). Indica nombre y concepto en
              la transferencia cuando puedas y repite lo mismo al enviar el comprobante.
            </p>

            <div className="mt-6 rounded-2xl border border-gold/35 bg-linear-to-br from-champagne/50 to-white p-5 md:p-6">
              <p className="text-sm font-semibold leading-snug text-elevation md:text-[0.9375rem]">
                Para <strong>Yappy, Zelle u otros medios</strong> no tenemos cobro directo desde esta página:
                escríbenos a{" "}
                <strong className="text-wine">soporte por WhatsApp</strong> y te orientamos caso por caso (usa
                el botón verde del borde inferior o cualquier enlace verde más abajo).
              </p>
            </div>

            {bankAccountConfigured ? (
              <dl className="mt-10 space-y-0 divide-y divide-wine/10 rounded-2xl border border-wine/12 bg-cream/50 text-[0.9375rem] md:text-base">
                <div className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-8 md:px-6 md:py-6">
                  <dt className="min-w-[7.5rem] shrink-0 text-xs font-bold uppercase tracking-wider text-elevation/55">
                    Titular
                  </dt>
                  <dd className="font-semibold text-carbon">{holder}</dd>
                </div>
                <div className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-8 md:px-6 md:py-6">
                  <dt className="min-w-[7.5rem] shrink-0 text-xs font-bold uppercase tracking-wider text-elevation/55">
                    Banco
                  </dt>
                  <dd className="font-semibold text-carbon">{bankName}</dd>
                </div>
                <div className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-start sm:gap-8 md:px-6 md:py-6">
                  <dt className="min-w-[7.5rem] shrink-0 text-xs font-bold uppercase tracking-wider text-elevation/55">
                    Transferencia a
                  </dt>
                  <dd className="break-all font-mono text-[0.9rem] font-semibold leading-relaxed tracking-tight text-carbon md:text-[0.95rem]">
                    {bankAccountRaw}
                  </dd>
                </div>
              </dl>
            ) : (
              <div className="mt-8 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-5 text-sm leading-relaxed text-elevation/90 md:p-6">
                Define{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs ring-1 ring-wine/10">
                  NEXT_PUBLIC_BANK_ACCOUNT
                </code>{" "}
                (y opcionalmente{" "}
                <code className="rounded bg-white px-1 py-0.5 text-xs font-mono">
                  NEXT_PUBLIC_BANK_ACCOUNT_HOLDER
                </code>
                ,{" "}
                <code className="rounded bg-white px-1 py-0.5 text-xs font-mono">
                  NEXT_PUBLIC_BANK_NAME
                </code>
                ) en tu <strong>.env.local</strong> para mostrar la cuenta de transferencia.
              </div>
            )}
          </section>

          {/* Comprobante WhatsApp */}
          <section className="border-t border-wine/15 pt-12 md:pt-14">
            <p className={sectionTitle}>Envía el comprobante por WhatsApp</p>
            <p className="mt-5 text-base leading-relaxed text-elevation/88 md:text-[1.0625rem]">
              {receiptContacts.length > 1
                ? "Toca el botón que te convenga. Se abre WhatsApp con un mensaje listo; solo adjunta la "
                : "Toca el botón verde. Se abre WhatsApp con un mensaje listo; solo adjunta la "}
              <strong>captura o PDF del banco</strong>.
            </p>

            {receiptContacts.length > 0 ? (
              <ul className="mt-10 flex flex-col gap-4 md:gap-5">
                {receiptContacts.map(({ digits, label }) => (
                  <li key={`${digits}-${label}`}>
                    <Link
                      href={waLink(digits)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        receiptContacts.length > 1
                          ? `Enviar comprobante por WhatsApp — ${label}`
                          : "Enviar comprobante por WhatsApp"
                      }
                      className={cn(
                        "group flex w-full items-center gap-4 rounded-2xl border border-white/20 bg-[#25D366] px-5 py-4 shadow-md shadow-black/12 ring-2 ring-black/5 transition-[transform,box-shadow,background-color] motion-safe:hover:bg-[#20bd5a] motion-safe:hover:shadow-lg motion-safe:active:scale-[0.995] md:gap-5 md:rounded-[1.25rem] md:px-6 md:py-5",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]",
                      )}
                    >
                      <span
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20 md:size-12"
                        aria-hidden
                      >
                        <MessageCircle className="size-[1.35rem] text-white md:size-6" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 flex-1 text-left leading-snug">
                        <span className="block font-bold tracking-tight text-white [text-shadow:0_1px_0_rgba(0,0,0,0.12)] md:text-[1.125rem]">
                          Enviar comprobante aquí
                        </span>
                      </span>
                      <ChevronRight
                        className="size-6 shrink-0 text-white/90 transition-transform motion-safe:group-hover:translate-x-1 md:size-7"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-2xl border border-wine/20 bg-warm/90 p-5 text-sm text-elevation/85 md:p-6">
                Configura al menos{" "}
                <code className="rounded bg-white px-1.5 font-mono text-xs">
                  NEXT_PUBLIC_WHATSAPP_NUMBER
                </code>{" "}
                (Sandra) y opcionalmente{" "}
                <code className="rounded bg-white px-1 font-mono text-xs">
                  NEXT_PUBLIC_WHATSAPP_CARMEN
                </code>{" "}
                o{" "}
                <code className="rounded bg-white px-1 font-mono text-xs">
                  NEXT_PUBLIC_WHATSAPP_NUMBER_2
                </code>{" "}
                en <strong>.env.local</strong>.
              </div>
            )}

            <p className="mt-10 text-center text-[0.8125rem] leading-relaxed text-elevation/72 md:text-sm">
              Con la captura validamos tu pago y te enviamos el acceso cuando corresponda.
            </p>
          </section>
        </div>

        <p className="mt-12 text-center text-[0.9375rem] text-elevation/70 md:mt-14">
          <Link
            href="/"
            className="font-semibold text-wine underline-offset-4 transition hover:text-burgundy hover:underline"
          >
            Volver al inicio
          </Link>
        </p>
      </div>

      {supportHref ? (
        <a
          href={supportHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "fixed right-5 z-[100] flex max-w-[min(100vw-2.5rem,22rem)] items-center gap-3 rounded-full px-5 py-3.5 font-semibold tracking-tight text-white shadow-lg shadow-black/20 transition-[transform,box-shadow] hover:brightness-[1.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E] md:right-8",
            "bottom-[max(1.35rem,env(safe-area-inset-bottom))] md:bottom-8",
            "bg-[#25D366]",
          )}
          aria-label="Soporte en línea por WhatsApp"
        >
          <MessageCircle className="size-6 shrink-0 text-white/95" aria-hidden />
          <span className="min-w-0 flex-1 text-left text-[0.9375rem] leading-tight md:text-[1rem]">
            Soporte en línea
          </span>
        </a>
      ) : null}
    </div>
  );
}
