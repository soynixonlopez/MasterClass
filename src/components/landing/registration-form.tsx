"use client";

import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import {
  quickRegistrationSchema,
  type QuickRegistrationInput,
} from "@/lib/validations/registration";
import { LANDING_CARD_HOVER, Reveal } from "@/components/landing/landing-motion";
import { MotionSection } from "@/components/landing/motion-section";
import { cn } from "@/lib/utils";

/** `input-autofill-light`: autofill sobre fondo claro marca */
const fieldClass =
  "input-autofill-light h-[3.375rem] w-full max-w-none !rounded-xl !border-2 !border-wine/20 !bg-white/95 px-4 !text-lg !text-carbon shadow-sm shadow-wine/5 placeholder:!text-elevation/45 focus-visible:!border-wine focus-visible:!ring-2 focus-visible:!ring-gold/20 dark:!border-wine/20 dark:!bg-white dark:!text-carbon";

const labelClass =
  "!text-carbon text-base font-semibold md:text-[1.05rem] dark:!text-carbon";

const defaultValues: QuickRegistrationInput = {
  full_name: "",
  whatsapp: "",
  email: "",
  accepted_contact: false,
};

export function RegistrationFormSection() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<QuickRegistrationInput>({
    resolver: zodResolver(quickRegistrationSchema),
    defaultValues,
  });

  const accepted = useWatch({ control, name: "accepted_contact" });

  async function onSubmit(data: QuickRegistrationInput) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("registrations").insert({
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

      if (error) {
        const err = error as {
          message?: string;
          details?: string;
          hint?: string;
          code?: string;
        };
        const readable =
          [err.message, err.details].filter(Boolean).join(" ").trim() || null;
        console.error("[registrations insert]", readable ?? "(sin mensaje)", err);

        const looksLikeRls =
          readable?.toLowerCase().includes("permission denied") ||
          readable?.toLowerCase().includes("row-level security") ||
          readable?.toLowerCase().includes("violates row-level security") ||
          err.code === "42501";

        toast.error(
          looksLikeRls
            ? "Tu sesión tiene permiso limitado para este formulario. Cierra sesión del panel administrador y vuelve a enviar, o aplica la migración 003 en Supabase."
            : readable
              ? `No pudimos enviar tu registro: ${readable}`
              : "No pudimos enviar tu registro. Revisa tu conexión e inténtalo de nuevo.",
        );
        return;
      }

      toast.success("Registro recibido. Ya puedes revisar grupo y datos de pago.");
      router.push("/registro-exitoso");
    } catch (e) {
      console.error(e);
      toast.error("Error de conexión. Revisa tu red e intenta otra vez.");
    }
  }

  return (
    <MotionSection
      id="registro"
      className="relative scroll-mt-24 overflow-hidden bg-[#fcf9f5] py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(212,175,55,0.09),transparent_52%),radial-gradient(ellipse_55%_45%_at_0%_100%,rgba(138,21,56,0.045),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_65%,rgba(212,175,55,0.06),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:gap-12">
          <Reveal className="text-center">
            <header>
              <h2 className="mx-auto max-w-xl font-heading font-bold uppercase leading-[1.08] tracking-tight text-carbon">
                <span className="block text-[clamp(1.85rem,4.5vw,2.65rem)]">Regístrate</span>
                <span className="mt-2 block text-[clamp(1.35rem,3vw,1.75rem)] font-semibold uppercase tracking-wide text-wine">
                  y separa tu cupo
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-elevation/80 sm:text-[1.0625rem]">
                Nombre, WhatsApp y correo. Sin cobro aquí; al enviar ves el grupo y las formas de pagar en
                una sola vista.
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={cn(
                "mx-auto w-full max-w-xl space-y-6 rounded-3xl border border-wine/15 bg-white/95 p-6 shadow-lg shadow-wine/5 ring-1 ring-gold/10 sm:space-y-7 sm:p-8 md:space-y-8 md:p-10",
                LANDING_CARD_HOVER
              )}
              >
              <div className="space-y-2">
                <Label htmlFor="full_name" className={labelClass}>
                  Nombre completo
                </Label>
                <Input
                  id="full_name"
                  autoComplete="name"
                  className={fieldClass}
                  aria-invalid={!!errors.full_name}
                  {...register("full_name")}
                />
                {errors.full_name && (
                  <p className="text-sm font-medium text-red-700">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className={labelClass}>
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+507 6000-0000"
                  className={fieldClass}
                  aria-invalid={!!errors.whatsapp}
                  {...register("whatsapp")}
                />
                {errors.whatsapp && (
                  <p className="text-sm font-medium text-red-700">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={labelClass}>
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-red-700">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex min-w-0 items-start gap-3 rounded-xl border-2 border-wine/15 bg-linear-to-br from-champagne/35 to-white p-4 sm:p-5">
                <Checkbox
                  id="accepted_contact"
                  checked={!!accepted}
                  onCheckedChange={(c) =>
                    setValue("accepted_contact", c === true, {
                      shouldValidate: true,
                    })
                  }
                  aria-invalid={!!errors.accepted_contact}
                  className="border-wine data-checked:bg-wine data-checked:text-white"
                />
                <div className="grid min-w-0 gap-1.5 leading-snug">
                  <Label
                    htmlFor="accepted_contact"
                    className="cursor-pointer text-base font-normal !text-carbon dark:!text-carbon"
                  >
                    Acepto recibir por WhatsApp la información del evento y cómo completar mi cupo.
                  </Label>
                  {errors.accepted_contact && (
                    <p className="text-sm font-medium text-red-700">
                      {errors.accepted_contact.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[3.75rem] w-full rounded-full bg-linear-to-r from-wine to-burgundy text-lg font-bold text-warm shadow-xl hover:opacity-[0.97] md:min-h-[4.25rem] md:text-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
              <p className="text-center text-sm leading-relaxed text-elevation/75 md:text-base">
                Al enviar recibimos tu solicitud con calma y te contestamos por WhatsApp. Si el
                grupo ya está lleno, te lo decimos antes de que pagues algo.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </MotionSection>
  );
}
