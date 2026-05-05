"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

export function WhatsAppFloat() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const num = digitsOnly(raw);
  if (!num) return null;

  const href = `https://wa.me/${num}?text=${encodeURIComponent(
    "Hola, quiero información sobre la Master Class de Colorimetría Desde Cero."
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "motion-safe:hover:scale-110 motion-safe:hover:shadow-2xl",
        "motion-reduce:hover:scale-100 motion-reduce:hover:shadow-lg",
        "md:bottom-8 md:right-8"
      )}
    >
      <MessageCircle className="size-7" strokeWidth={1.75} />
    </Link>
  );
}
