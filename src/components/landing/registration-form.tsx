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
import { MotionSection } from "@/components/landing/motion-section";

const fieldClass =
  "h-12 !rounded-xl !border-2 !border-neutral-300 !bg-white px-3.5 !text-base !text-neutral-900 !shadow-none placeholder:!text-neutral-500 focus-visible:!border-wine focus-visible:!ring-2 focus-visible:!ring-wine/25 dark:!border-neutral-300 dark:!bg-white dark:!text-neutral-900";

const labelClass = "!text-carbon text-sm font-semibold dark:!text-carbon";

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
        notes: "Registro web – pasos siguientes en página de confirmación.",
        accepted_contact: data.accepted_contact,
        payment_status: "pendiente",
      });

      if (error) {
        console.error(error);
        toast.error("No pudimos enviar tu registro. Intenta de nuevo.");
        return;
      }

      toast.success("¡Listo! Te llevamos a los siguientes pasos.");
      router.push("/registro-exitoso");
    } catch (e) {
      console.error(e);
      toast.error("Error de conexión. Revisa tu red e intenta otra vez.");
    }
  }

  return (
    <MotionSection
      id="registro"
      className="scroll-mt-24 bg-warm py-20 md:py-28"
    >
      <div className="mx-auto max-w-xl px-4 md:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-wine">
          Registro
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold uppercase text-carbon sm:text-4xl md:text-5xl">
          Deja tus datos y continúa
        </h2>
        <p className="mt-5 text-center text-lg font-medium leading-relaxed text-elevation">
          Solo necesitamos tu nombre, WhatsApp y correo. Al enviar, verás en la
          siguiente pantalla el <strong className="text-wine">grupo de WhatsApp</strong>, los{" "}
          <strong className="text-wine">datos bancarios</strong> y cómo enviar tu
          comprobante para tu ticket de acceso.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6 rounded-3xl border-2 border-wine/25 bg-white p-7 shadow-xl md:p-9"
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

          <div className="flex items-start gap-3 rounded-xl border-2 border-wine/15 bg-cream/80 p-4">
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
            <div className="grid gap-1.5 leading-snug">
              <Label
                htmlFor="accepted_contact"
                className="cursor-pointer font-normal !text-carbon dark:!text-carbon"
              >
                Acepto recibir mensajes por WhatsApp con la información del evento y
                los pasos para mi cupo.
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
            className="h-14 w-full gap-2 rounded-full bg-gradient-to-r from-wine to-burgundy text-base font-bold text-warm shadow-lg hover:opacity-95 md:text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Registrando…
              </>
            ) : (
              "Registrarme y ver siguientes pasos"
            )}
          </Button>
        </form>
      </div>
    </MotionSection>
  );
}
