"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { scrollToAnchorByHash } from "@/lib/anchor-navigation";
import { cn } from "@/lib/utils";

type AnimatedCtaProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  /** Tooltip al pasar el cursor (opcional) */
  title?: string;
  /** Ocupa todo el ancho del contenedor (CTA “barra completa”). */
  fullWidth?: boolean;
};

export function AnimatedCta({
  href,
  children,
  variant = "primary",
  className,
  title,
  fullWidth = false,
}: AnimatedCtaProps) {
  const isPrimary = variant === "primary";
  const isHashAnchor = href.startsWith("#") && href.length > 1;
  const ctaClassName = cn(
    buttonVariants({ size: "lg" }),
    isPrimary
      ? "relative min-h-[3.5rem] rounded-full border-0 bg-linear-to-r from-gold via-[#e8c65c] to-gold px-10 py-4 text-lg font-bold tracking-wide text-carbon shadow-lg shadow-gold/35 md:min-h-16 md:px-14 md:text-xl md:tracking-normal"
      : "min-h-[3.5rem] rounded-full border-2 border-gold/50 bg-transparent px-8 py-4 text-lg font-bold text-champagne hover:bg-wine/50 md:min-h-16 md:px-10 md:text-xl",
    fullWidth && "w-full justify-center max-w-none",
    className
  );

  return (
    <motion.div
      className={cn(fullWidth ? "flex w-full max-w-none" : "inline-flex")}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <motion.span
        className={cn(
          "rounded-full",
          fullWidth ? "flex w-full max-w-none" : "inline-flex"
        )}
        animate={
          isPrimary
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(212, 175, 55, 0.55)",
                  "0 0 0 14px rgba(212, 175, 55, 0)",
                  "0 0 0 0 rgba(212, 175, 55, 0.55)",
                ],
              }
            : undefined
        }
        transition={
          isPrimary
            ? { duration: 2.2, repeat: Infinity, ease: "easeOut" }
            : undefined
        }
      >
        {isHashAnchor ? (
          <a
            href={href}
            title={title}
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchorByHash(href);
            }}
            className={ctaClassName}
          >
            {children}
          </a>
        ) : (
          <Link href={href} title={title} className={ctaClassName}>
            {children}
          </Link>
        )}
      </motion.span>
    </motion.div>
  );
}
