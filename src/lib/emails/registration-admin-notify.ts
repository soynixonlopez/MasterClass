const WINE = "#8a1538";
const BURGUNDY = "#6e1023";
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

function whatsappDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

function leadWhatsAppHref(digits: string, firstName: string): string {
  const greeting = firstName.trim()
    ? `Hola ${firstName.trim()}, te escribo por tu registro a la Master Class.`
    : "Hola, te escribo por tu registro a la Master Class.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(greeting)}`;
}

export function buildNewRegistrationAdminEmail(input: {
  fullName: string;
  whatsapp: string;
  email: string;
  acceptedContact: boolean;
}): { subject: string; html: string; text: string } {
  const name = input.fullName.trim();
  const waRaw = input.whatsapp.trim();
  const mail = input.email.trim();
  const digits = whatsappDigits(waRaw);
  const first = name.split(/\s+/)[0] ?? "";
  const waHref = digits ? leadWhatsAppHref(digits, first) : "";

  const subject = `Nuevo registro — ${name.slice(0, 80)}`;

  const waBtn = waHref
    ? `<a href="${escapeHtml(waHref)}" style="display:inline-block;margin-top:16px;background:${WHATSAPP_GREEN};color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 24px;border-radius:12px;text-align:center;"
        target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>`
    : `<p style="margin:16px 0 0;color:${MUTED};font-size:13px;">No se pudo generar el enlace automático (revisa el número en el panel).</p>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CREAM};font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 32px rgba(138,21,56,0.08);border:1px solid rgba(212,175,55,0.22);">
          <tr>
            <td style="background:linear-gradient(130deg,${WINE} 0%,${BURGUNDY} 55%,#4a0d1e 100%);padding:22px 24px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(250,247,242,0.75);">Notificación</p>
              <h1 style="margin:10px 0 0;font-size:20px;line-height:1.25;font-weight:800;color:#faf7f2;">Nueva persona registrada</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 26px;color:${CARBON};font-size:15px;line-height:1.55;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;border:1px solid rgba(138,21,56,0.12);background:#fcf9f5;">
                <tr><td style="padding:14px 16px;">
                  <p style="margin:0 0 8px;font-size:12px;font-weight:800;color:${WINE};letter-spacing:0.08em;text-transform:uppercase;">Datos</p>
                  <p style="margin:0;"><strong>Nombre</strong> — ${escapeHtml(name)}</p>
                  <p style="margin:8px 0 0;"><strong>Correo</strong> — ${escapeHtml(mail)}</p>
                  <p style="margin:8px 0 0;"><strong>WhatsApp</strong> — ${escapeHtml(waRaw)}</p>
                  <p style="margin:8px 0 0;"><strong>Aceptó contacto</strong> — ${input.acceptedContact ? "Sí" : "No"}</p>
                </td></tr>
              </table>
              ${waBtn}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines = [
    "Nueva persona registrada en la Master Class.",
    "",
    `Nombre: ${name}`,
    `Correo: ${mail}`,
    `WhatsApp: ${waRaw}`,
    `Aceptó contacto: ${input.acceptedContact ? "Sí" : "No"}`,
    "",
    waHref ? `Abrir WhatsApp: ${waHref}` : "",
  ].filter(Boolean);

  return { subject, html, text: textLines.join("\n") };
}
