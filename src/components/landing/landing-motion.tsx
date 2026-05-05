"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Curva de salida suave, coherente en toda la landing */
export const LANDING_EASE = [0.21, 0.47, 0.32, 0.98] as const;

const staggerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: LANDING_EASE },
  },
};

/** Hover en tarjetas: respeta usuarios con “menos movimiento” */
export const LANDING_CARD_HOVER =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:active:translate-y-0 motion-reduce:hover:translate-y-0";

type Slots = { className?: string; children: React.ReactNode };

export function StaggerReveal({
  className,
  stagger = 0.085,
  children,
}: Slots & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={cn(className)}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -12% 0px", amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerUl({
  className,
  stagger = 0.085,
  children,
}: Slots & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <ul className={cn(className)}>{children}</ul>;

  return (
    <motion.ul
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -12% 0px", amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerOl({
  className,
  stagger = 0.085,
  children,
}: Slots & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <ol className={cn(className)}>{children}</ol>;

  return (
    <motion.ol
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -12% 0px", amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.ol>
  );
}

/** Lista de definición (`<dl>`) con entradas animadas por hijos (`StaggerBox`). */
export function StaggerDl({
  className,
  stagger = 0.085,
  children,
}: Slots & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <dl className={cn(className)}>{children}</dl>;

  return (
    <motion.dl
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -12% 0px", amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.dl>
  );
}

export function StaggerListItem({ className, children }: Slots) {
  const reduce = useReducedMotion();
  if (reduce) return <li className={className}>{children}</li>;
  return (
    <motion.li className={className} variants={staggerVariants}>
      {children}
    </motion.li>
  );
}

export function StaggerArticle({ className, children }: Slots) {
  const reduce = useReducedMotion();
  if (reduce) return <article className={className}>{children}</article>;
  return (
    <motion.article className={className} variants={staggerVariants}>
      {children}
    </motion.article>
  );
}

export function StaggerBox({ className, children }: Slots) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerVariants}>
      {children}
    </motion.div>
  );
}

/** Cabeceras de bloque entran antes que la rejilla */
export function Reveal({
  className,
  delay = 0,
  children,
}: Slots & { delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.5, delay, ease: LANDING_EASE }}
    >
      {children}
    </motion.div>
  );
}
