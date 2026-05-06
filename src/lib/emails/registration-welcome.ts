import { EVENT } from "@/lib/constants";
import {
  ALTERNATIVE_PAYMENTS_LEAD,
  ALTERNATIVE_PAYMENTS_HIGHLIGHT,
  ALTERNATIVE_PAYMENTS_TRAIL,
  ALTERNATIVE_PAYMENTS_SUPPORT_COPY,
  getEventSummaryLines,
} from "@/lib/event-confirmation-copy";
import {
  buildReceiptContacts,
  getBankTransferDetails,
  getGroupInviteUrl,
  getPricingCopy,
  getSuccessPageUrl,
  receiptWhatsAppHref,
} from "@/lib/post-registration-details";

const WINE = "#8a1538";
const BURGUNDY = "#6e1023";
const GOLD = "#d4af37";
const CREAM = "#fff7ea";
const CARBON = "#0b0b0d";
const MUTED = "#4a4a50";
const WHATSAPP_GREEN = "#25d366";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildRegistrationWelcomeEmail(input: {
  recipientName: string;
}): { subject: string; html: string; text: string } {
  const first = input.recipientName.trim().split(/\s+/)[0] ?? "";
  const headlineHtml = first
    ? `Gracias, ${escapeHtml(first)}`
    : "Gracias por tu registro";
  const groupUrl = getGroupInviteUrl();
  const { holder, bankName, account, accountConfigured } =
    getBankTransferDetails();
  const pricing = getPricingCopy();
  const successUrl = getSuccessPageUrl();
  const receiptContacts = buildReceiptContacts();
  const lines = getEventSummaryLines();
  const subject = `${EVENT.title.slice(0, 55)} · Tu siguiente paso (grupo y pago)`;

  const eventDetailBoxHtml = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;border-radius:14px;border:1px solid rgba(138,21,56,0.14);background:#fcf9f5;">
        <tr><td style="padding:18px 20px;">
          <span style="font-size:11px;font-weight:800;color:${WINE};letter-spacing:0.14em;text-transform:uppercase;">Tu master class</span>
          <p style="margin:10px 0 0;font-size:16px;font-weight:700;line-height:1.38;color:${CARBON};">${escapeHtml(lines.title)}</p>
          <p style="margin:10px 0 0;color:${CARBON};font-size:14px;line-height:1.5;"><strong>Fecha y horario</strong> — ${escapeHtml(lines.when)}</p>
          <p style="margin:8px 0 0;color:${CARBON};font-size:14px;line-height:1.55;"><strong>Ubicación</strong> — ${escapeHtml(lines.whereVenue)}, ${escapeHtml(lines.whereAddress)}</p>
        </td></tr>
      </table>`;

  let bankBlockHtml = "";
  if (accountConfigured) {
    bankBlockHtml = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;font-size:14px;border-radius:14px;overflow:hidden;border:1px solid rgba(138,21,56,0.12);background:#fcf9f5;">
        <tr><td style="padding:14px 18px;font-weight:bold;text-transform:uppercase;letter-spacing:0.08em;color:${MUTED};font-size:11px;border-bottom:1px solid rgba(138,21,56,0.08);">Titular</td></tr>
        <tr><td style="padding:14px 18px;font-weight:600;color:${CARBON};">${escapeHtml(holder)}</td></tr>
        <tr><td style="padding:14px 18px;font-weight:bold;text-transform:uppercase;letter-spacing:0.08em;color:${MUTED};font-size:11px;border-top:1px solid rgba(138,21,56,0.08);border-bottom:1px solid rgba(138,21,56,0.08);">Banco</td></tr>
        <tr><td style="padding:14px 18px;font-weight:600;color:${CARBON};">${escapeHtml(bankName)}</td></tr>
        <tr><td style="padding:14px 18px;font-weight:bold;text-transform:uppercase;letter-spacing:0.08em;color:${MUTED};font-size:11px;border-bottom:1px solid rgba(138,21,56,0.08);border-top:1px solid rgba(138,21,56,0.08);">Cuenta / IBAN</td></tr>
        <tr><td style="padding:14px 18px;font-family:ui-monospace,monospace;font-size:13px;font-weight:600;line-height:1.45;color:${CARBON};word-break:break-all;">${escapeHtml(account)}</td></tr>
      </table>`;
  } else {
    bankBlockHtml = `<p style="margin:18px 0 0;color:${MUTED};font-size:13px;line-height:1.55;background:#fffdf8;border-radius:12px;padding:14px 16px;border:1px dashed rgba(138,21,56,0.35);">
        Los datos bancarios se confirman en tu pantalla de <a href="${successUrl}" style="color:${WINE};font-weight:600;">registro exitoso</a> cuando el equipo los configure en el sitio.</p>`;
  }

  const groupBtn = groupUrl
    ? `
      <a href="${escapeHtml(groupUrl)}" style="display:inline-block;margin-top:14px;background:linear-gradient(135deg,${WINE} 0%,${BURGUNDY} 100%);color:#faf7f2;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:9999px;"
        target="_blank" rel="noopener noreferrer">Entrar al grupo de WhatsApp</a>`
    : `<p style="margin:14px 0 0;color:${MUTED};font-size:13px;">El enlace al grupo aparece también en tu <a href="${successUrl}" style="color:${WINE};font-weight:600;">página de confirmación</a> en el navegador.</p>`;

  const receiptBtnsHtml =
    receiptContacts.length > 0
      ? receiptContacts
          .map(
            (c, i) => `
      <a href="${escapeHtml(receiptWhatsAppHref(c.digits))}" style="display:block;margin-top:${i === 0 ? "14" : "10"}px;background:${WHATSAPP_GREEN};color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 20px;border-radius:12px;text-align:center;"
        target="_blank" rel="noopener noreferrer">Enviar comprobante — ${escapeHtml(c.label)}</a>`,
          )
          .join("")
      : `<p style="margin:14px 0 0;color:${MUTED};font-size:13px;">Abre WhatsApp desde la <a href="${successUrl}" style="color:${WINE};font-weight:600;">página web de confirmación</a> cuando el equipo haya cargado los números.</p>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CREAM};font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(138,21,56,0.08);border:1px solid rgba(212,175,55,0.25);">
          <tr>
            <td style="background:linear-gradient(130deg,${WINE} 0%,${BURGUNDY} 55%,#4a0d1e 100%);padding:28px 28px 26px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:rgba(250,247,242,0.72);">My Hair by Sandra</p>
              <h1 style="margin:12px 0 0;font-size:22px;line-height:1.2;font-weight:800;color:#faf7f2;letter-spacing:-0.02em;">${headlineHtml}</h1>
              <p style="margin:10px 0 0;font-size:15px;line-height:1.55;color:rgba(250,247,242,0.92);">${escapeHtml(EVENT.title)}</p>
              <p style="margin:8px 0 0;font-size:13px;line-height:1.45;color:rgba(250,247,242,0.9);">${escapeHtml(lines.when)}</p>
              <p style="margin:4px 0 0;font-size:12px;line-height:1.5;color:rgba(250,247,242,0.84);">${escapeHtml(lines.whereVenue)} — ${escapeHtml(lines.whereAddress)}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr><td style="border-radius:9999px;background:rgba(212,175,55,0.35);height:4px;width:56px;line-height:0;font-size:0;">&#8203;</td></tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 22px;color:${CARBON};font-size:15px;line-height:1.65;">
              <p style="margin:0;color:${MUTED};">Tu registro ya está guardado. Conserva estos datos del evento siempre a la vista:</p>
              ${eventDetailBoxHtml}

              <p style="margin:22px 0 0;color:${MUTED};font-size:14px;">En tres pasos cierras tu cupo:</p>

              <!-- Paso 1 -->
              <table role="presentation" width="100%" style="margin-top:26px;border-left:4px solid ${GOLD};background:linear-gradient(90deg,rgba(244,230,193,0.45) 0%,#fff 100%);border-radius:0 14px 14px 0;">
                <tr><td style="padding:16px 18px;">
                  <span style="font-size:11px;font-weight:800;color:${WINE};letter-spacing:0.12em;text-transform:uppercase;">Primer paso · Comunidad</span>
                  <p style="margin:8px 0 0;font-weight:650;color:${CARBON};">Únete al grupo oficial para avisos, ubicación práctica y coordinación antes del taller.</p>
                  ${groupBtn}
                </td></tr>
              </table>

              <!-- Paso 2 -->
              <table role="presentation" width="100%" style="margin-top:20px;border-left:4px solid ${WINE};background:#fafafa;border-radius:0 14px 14px 0;">
                <tr><td style="padding:16px 18px;">
                  <span style="font-size:11px;font-weight:800;color:${WINE};letter-spacing:0.12em;text-transform:uppercase;">Segundo paso · Pago</span>
                  <p style="margin:8px 0 0;color:${CARBON};">
                    Lista: <strong>${escapeHtml(pricing.listPrice)}</strong> · Un solo pago: <strong>${escapeHtml(pricing.fullPay)}</strong> (${pricing.discountPercent}% menos).</p>
                  <p style="margin:12px 0 0;color:${MUTED};font-size:13px;line-height:1.55;">${escapeHtml(ALTERNATIVE_PAYMENTS_LEAD)}<strong>${escapeHtml(ALTERNATIVE_PAYMENTS_HIGHLIGHT)}</strong>${escapeHtml(ALTERNATIVE_PAYMENTS_TRAIL)} La <strong>transferencia bancaria</strong> sí la haces con los datos indicados abajo.</p>
                  ${bankBlockHtml}
                </td></tr>
              </table>

              <!-- Paso 3 -->
              <table role="presentation" width="100%" style="margin-top:20px;border-left:4px solid ${WHATSAPP_GREEN};background:rgba(37,211,102,0.06);border-radius:0 14px 14px 0;">
                <tr><td style="padding:16px 18px;">
                  <span style="font-size:11px;font-weight:800;color:#128c7e;letter-spacing:0.12em;text-transform:uppercase;">Tercer paso · Tu comprobante</span>
                  <p style="margin:8px 0 0;color:${CARBON};">Al pagar, abre uno de estos botones: el mensaje va listo para que solo adjuntes tu <strong>captura o PDF</strong> del banco.</p>
                  ${receiptBtnsHtml}
                </td></tr>
              </table>

              <!-- CTA web -->
              <div style="text-align:center;margin:30px 0 8px;">
                <a href="${successUrl}" style="display:inline-block;color:${WINE};font-weight:700;font-size:13px;text-decoration:underline;text-underline-offset:4px;"
                  target="_blank" rel="noopener noreferrer">Ver todo en pantalla grande en el sitio</a>
              </div>
              <p style="margin:22px 0 0;color:${MUTED};font-size:12px;line-height:1.5;text-align:center;">${escapeHtml(lines.when)} · ${escapeHtml(lines.whereVenue)}</p>

              <hr style="border:none;border-top:1px solid rgba(138,21,56,0.1);margin:26px 0 18px;">
              <p style="margin:0;color:${MUTED};font-size:11px;line-height:1.5;text-align:center;">Correo automático del registro. Si no fuiste tú, ignora este mensaje.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const groupLine = groupUrl
    ? `Grupo WhatsApp: ${groupUrl}\n`
    : `Grupo: ver ${successUrl}\n`;
  const bankLines = accountConfigured
    ? `Transferencia — Titular: ${holder}\nBanco: ${bankName}\nCuenta: ${account}\n`
    : `Datos bancarios: ver ${successUrl}\n`;
  const receiptLines =
    receiptContacts.length > 0
      ? receiptContacts
          .map(
            (c) =>
              `Comprobante por WhatsApp (${c.label}): ${receiptWhatsAppHref(c.digits)}`,
          )
          .join("\n") + "\n"
      : `Comprobante: enlaces en ${successUrl}\n`;

  const greetingLine = first ? `Hola ${first},\n\n` : "Hola,\n\n";

  const text = `${greetingLine}¡Gracias por registrarte! Tu cupo está en proceso.

EVENTO — ${EVENT.title}
${EVENT.dateLabel} · ${EVENT.schedule}
${EVENT.locationName} — ${EVENT.locationAddress}

PRIMER PASO — Grupo oficial
${groupLine}

SEGUNDO PASO — Pago
Lista: ${pricing.listPrice}. Un solo pago: ${pricing.fullPay} (${pricing.discountPercent}% menos si pagas todo de una vez).

${bankLines}
${ALTERNATIVE_PAYMENTS_SUPPORT_COPY} La transferencia bancaria la haces con los datos indicados arriba.

TERCER PASO — Envía tu comprobante por WhatsApp
${receiptLines}

Página con todos los detalles en el navegador:
${successUrl}

—

My Hair by Sandra · Master Class Colorimetría
`;

  return { subject, html, text };
}
