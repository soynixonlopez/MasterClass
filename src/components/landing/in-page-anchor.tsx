"use client";

import type { ComponentPropsWithoutRef } from "react";
import { scrollToAnchorByHash } from "@/lib/anchor-navigation";

export type InPageAnchorProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
> & {
  href: string;
};

/** Ancla misma página (`#seccion`): scroll explícito para compatibilidad con Next.js App Router. */
export function InPageAnchor({
  href,
  onClick,
  ...props
}: InPageAnchorProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          scrollToAnchorByHash(href);
        }
        onClick?.(e);
      }}
      {...props}
    />
  );
}
