import { EVENT } from "@/lib/constants";
import {
  formatMoneyUsd,
  getDiscountedFullPayUsd,
  getListPriceUsd,
} from "@/lib/pricing";

/** URL base pública para enlaces en correo / metadatos. */
export function getSiteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^\/+/, "");
    return host.startsWith("http") ? host.replace(/\/$/, "") : `https://${host}`;
  }

  return "http://localhost:3000";
}

export function getSuccessPageUrl(): string {
  return `${getSiteBaseUrl()}/registro-exitoso`;
}

export function getGroupInviteUrl(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL?.trim() ?? "";
}

const sandraDigits =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

const carmenEnvDigits =
  (
    process.env.NEXT_PUBLIC_WHATSAPP_CARMEN?.trim() ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_CARMEN?.trim() ||
    ""
  ).replace(/\D/g, "") ?? "";

const secondLineDigits =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_2?.replace(/\D/g, "") ?? "";

const nameSandra =
  process.env.NEXT_PUBLIC_WHATSAPP_NAME_SANDRA?.trim() || "Sandra González";
const nameCarmen =
  process.env.NEXT_PUBLIC_WHATSAPP_NAME_CARMEN?.trim() || "Carmen González";

export type ReceiptContact = { digits: string; label: string };

/** Mensaje prefijado para abrir WhatsApp al enviar comprobante. */
export function getReceiptWaTextEncoded(): string {
  return encodeURIComponent(
    `Hola, envío mi comprobante de pago para la Master Class: ${EVENT.title}.`,
  );
}

export function receiptWhatsAppHref(digits: string): string {
  return `https://wa.me/${digits}?text=${getReceiptWaTextEncoded()}`;
}

const supportMessageEncoded = encodeURIComponent(
  "Hola, escribo por soporte después de registrar la Master Class (pago u otra consulta).",
);

/** Botón flotante de soporte en /registro-exitoso. */
export function getSupportWaHref(): string {
  const digits =
    sandraDigits || carmenEnvDigits || secondLineDigits || "";
  if (!digits) return "";
  return `https://wa.me/${digits}?text=${supportMessageEncoded}`;
}

export function buildReceiptContacts(): ReceiptContact[] {
  const list: ReceiptContact[] = [];
  if (sandraDigits) list.push({ digits: sandraDigits, label: nameSandra });

  let carmenDigits = carmenEnvDigits;
  if (!carmenDigits && secondLineDigits && secondLineDigits !== sandraDigits) {
    carmenDigits = secondLineDigits;
  }

  if (
    carmenDigits &&
    carmenDigits !== sandraDigits &&
    !list.some((x) => x.digits === carmenDigits)
  ) {
    list.push({ digits: carmenDigits, label: nameCarmen });
  }

  return list;
}

export function getBankTransferDetails(): {
  holder: string;
  bankName: string;
  account: string;
  accountConfigured: boolean;
} {
  const holder =
    process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER?.trim() ??
    "Sandra Milena Reyes";
  const bankName =
    process.env.NEXT_PUBLIC_BANK_NAME?.trim() ?? "Banco General";
  const account = process.env.NEXT_PUBLIC_BANK_ACCOUNT?.trim() ?? "";
  const accountConfigured =
    account.length > 0 && !account.includes("Configura");

  return { holder, bankName, account, accountConfigured };
}

export function getPricingCopy(): {
  listPrice: string;
  fullPay: string;
  discountPercent: number;
} {
  return {
    listPrice: formatMoneyUsd(getListPriceUsd()),
    fullPay: formatMoneyUsd(getDiscountedFullPayUsd()),
    discountPercent: EVENT.discountFullPayPercent,
  };
}
