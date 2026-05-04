import { EVENT } from "@/lib/constants";
import type { CollectionTarget, PaymentStatus } from "@/types/registration";

export function formatMoneyUsd(n: number): string {
  return new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);
}

export function getListPriceUsd(): number {
  return EVENT.priceUsd;
}

export function getDiscountedFullPayUsd(): number {
  return EVENT.priceUsd * (1 - EVENT.discountFullPayPercent / 100);
}

export function resolveTargetTotalUsd(target: CollectionTarget): number {
  return target === "discounted_full"
    ? getDiscountedFullPayUsd()
    : getListPriceUsd();
}

/** Saldo pendiente según meta de cobro y estado. */
export function getRemainingUsd(input: {
  amountPaid: number;
  paymentStatus: PaymentStatus;
  collectionTarget: CollectionTarget;
}): number {
  if (input.paymentStatus === "pagado") return 0;
  const cap = resolveTargetTotalUsd(input.collectionTarget);
  return Math.max(0, cap - input.amountPaid);
}

export function normalizeCollectionTarget(
  raw: string | null | undefined
): CollectionTarget {
  return raw === "discounted_full" ? "discounted_full" : "list";
}
