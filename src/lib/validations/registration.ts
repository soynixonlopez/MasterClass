import { z } from "zod";

export const experienceOptions = [
  "Desde cero",
  "Básico",
  "Intermedio",
  "Profesional",
] as const;

export const paymentMethodOptions = [
  "Pago completo",
  "Abono inicial",
  "Pago por cuotas",
] as const;

/** Formulario público reducido: solo datos de contacto. */
export const quickRegistrationSchema = z.object({
  full_name: z.string().min(2, "Ingresa tu nombre completo"),
  whatsapp: z.string().min(8, "Ingresa un WhatsApp válido"),
  email: z.string().email("Correo electrónico inválido"),
  accepted_contact: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar el contacto por WhatsApp",
  }),
});

export type QuickRegistrationInput = z.infer<typeof quickRegistrationSchema>;

/** Esquema completo (panel u otros usos). */
export const registrationSchema = z.object({
  full_name: z.string().min(2, "Ingresa tu nombre completo"),
  whatsapp: z.string().min(8, "Ingresa un WhatsApp válido"),
  email: z.string().email("Correo electrónico inválido"),
  experience_level: z.enum(experienceOptions, {
    message: "Selecciona tu nivel de experiencia",
  }),
  payment_method: z.enum(paymentMethodOptions, {
    message: "Selecciona un método de pago",
  }),
  amount_paid: z
    .number({ message: "Indica el monto abonado" })
    .min(0, "El monto no puede ser negativo"),
  payment_proof: z.string().optional(),
  notes: z.string().optional(),
  accepted_contact: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar el contacto por WhatsApp",
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
