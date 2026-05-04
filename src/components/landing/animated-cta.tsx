"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnimatedCtaProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function AnimatedCta({
  href,
  children,
  variant = "primary",
  className,
}: AnimatedCtaProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      className="inline-flex"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <motion.span
        className="inline-flex rounded-full"
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
        <Link
          href={href}
          className={cn(
            buttonVariants({ size: "lg" }),
            isPrimary
              ? "relative h-12 min-h-[3rem] rounded-full border-0 bg-gradient-to-r from-gold via-[#e8c65c] to-gold px-8 text-base font-semibold tracking-wide text-carbon shadow-lg shadow-gold/30 md:h-14 md:min-h-[3.5rem] md:px-10 md:text-lg"
              : "h-12 min-h-[3rem] rounded-full border-2 border-gold/50 bg-transparent px-6 text-base font-semibold text-champagne hover:bg-wine/50 md:h-14 md:px-8 md:text-lg",
            className
          )}
        >
          {children}
        </Link>
      </motion.span>
    </motion.div>
  );
}
