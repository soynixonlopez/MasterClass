"use client";

import { Flame, Timer } from "lucide-react";
import { motion } from "framer-motion";

export function UrgencyBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden border-y-2 border-gold/40 bg-gradient-to-r from-burgundy via-wine to-burgundy py-4 text-champagne"
    >
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-30"
      animate={{ opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.12) 45%, transparent 90%)",
      }}
    />
      <p className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-4 text-center sm:flex-row sm:gap-6 sm:text-left">
        <span className="inline-flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-warm sm:text-xl">
          <Flame className="size-6 shrink-0 animate-pulse text-gold" aria-hidden />
          Edición presencial limitada
        </span>
        <span className="hidden text-gold/60 sm:inline">|</span>
        <span className="inline-flex max-w-md items-center gap-2 text-base font-medium sm:text-lg">
          <Timer className="size-5 shrink-0 text-gold" aria-hidden />
          Cada cupo cuenta: al llenar el grupo, cerramos inscripciones.
        </span>
      </p>
    </motion.div>
  );
}
