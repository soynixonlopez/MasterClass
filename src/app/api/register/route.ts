import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { buildRegistrationWelcomeEmail } from "@/lib/emails/registration-welcome";
import { quickRegistrationSchema } from "@/lib/validations/registration";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Petición JSON inválida." },
      { status: 400 },
    );
  }

  const parsed = quickRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Revisa los datos del formulario.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Falta configuración de Supabase en el servidor." },
      { status: 500 },
    );
  }

  const supabase = createClient(url, key);
  const { error: insertError } = await supabase.from("registrations").insert({
    full_name: data.full_name.trim(),
    whatsapp: data.whatsapp.trim(),
    email: data.email.trim(),
    experience_level: null,
    payment_method: null,
    amount_paid: 0,
    collection_target: "list",
    payment_proof: null,
    notes: "Registro web. Confirmación con grupo WhatsApp y datos de pago.",
    accepted_contact: data.accepted_contact,
    payment_status: "pendiente",
  });

  if (insertError) {
    const err = insertError as {
      message?: string;
      details?: string;
      code?: string;
    };
    const readable =
      [err.message, err.details].filter(Boolean).join(" ").trim() || null;
    console.error("[api/register]", readable ?? "(sin mensaje)", err);

    const looksLikeRls =
      readable?.toLowerCase().includes("permission denied") ||
      readable?.toLowerCase().includes("row-level security") ||
      readable?.toLowerCase().includes("violates row-level security") ||
      err.code === "42501";

    return NextResponse.json(
      {
        error: looksLikeRls
          ? "Tu sesión tiene permiso limitado para este formulario. Cierra sesión del panel administrador y vuelve a enviar, o aplica la migración de insert para usuarios autenticados."
          : readable
            ? `No pudimos guardar tu registro: ${readable}`
            : "No pudimos guardar tu registro.",
      },
      { status: 400 },
    );
  }

  let emailSent = false;
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail =
    process.env.REGISTRATION_FROM_EMAIL?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    "Master Class Colorimetría <onboarding@resend.dev>";

  if (!resendKey) {
    console.warn(
      "[api/register] RESEND_API_KEY no definida — se omite el correo transaccional.",
    );
  } else {
    try {
      const resend = new Resend(resendKey);
      const mail = buildRegistrationWelcomeEmail({
        recipientName: data.full_name.trim(),
      });
      const replyTo = process.env.REGISTRATION_REPLY_TO?.trim();

      const sendResult = await resend.emails.send({
        from: fromEmail,
        to: data.email.trim(),
        ...(replyTo ? { replyTo } : {}),
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });

      if (sendResult.error) {
        console.error(
          "[api/register] Resend:",
          sendResult.error.message ?? sendResult.error,
        );
      } else {
        emailSent = true;
      }
    } catch (e) {
      console.error("[api/register] email exception:", e);
    }
  }

  return NextResponse.json({ ok: true, emailSent });
}
