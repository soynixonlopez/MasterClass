"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const LANDING_EASE = [0.21, 0.47, 0.32, 0.98] as const;

type SectionMotionProps = HTMLMotionProps<"section"> & {
  /** Retraso al entrar en vista (solo si hay animación activa) */
  delay?: number;
};

export function MotionSection({
  className,
  children,
  delay = 0,
  ...props
}: SectionMotionProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className={cn(className)}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-11% 0px -14% 0px", amount: 0.08 }}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : delay,
        ease: [...LANDING_EASE],
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
