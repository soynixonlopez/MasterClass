"use client";

import { motion } from "framer-motion";

export function UrgencyBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden border-y-2 border-gold/40 bg-linear-to-r from-burgundy via-wine to-burgundy py-4 text-champagne sm:py-4 md:py-4"
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
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-4 md:gap-y-1">
          <span className="font-heading text-base font-bold uppercase tracking-[0.12em] text-warm sm:text-lg md:text-xl md:tracking-wide">
            Edición presencial limitada
          </span>
          <span className="hidden text-gold/50 md:inline md:shrink-0" aria-hidden>
            ·
          </span>
          <span className="max-w-md text-sm font-medium leading-snug text-champagne/95 sm:max-w-none sm:text-base md:text-base lg:text-lg">
            Cada cupo cuenta: al llenar el grupo, cerramos inscripciones.
          </span>
        </div>
      </div>
    </motion.div>
  );
}
