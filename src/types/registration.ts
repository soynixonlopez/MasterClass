export type PaymentStatus = "pendiente" | "abonado" | "pagado";

/** Meta de cobro: precio lista o cierre en un pago con descuento. */
export type CollectionTarget = "list" | "discounted_full";

export type RegistrationRow = {
  id: string;
  full_name: string;
  whatsapp: string;
  email: string | null;
  experience_level: string | null;
  payment_method: string | null;
  amount_paid: number | null;
  collection_target?: CollectionTarget | null;
  payment_status: PaymentStatus;
  payment_proof: string | null;
  notes: string | null;
  accepted_contact: boolean | null;
  created_at: string;
  updated_at: string;
};
