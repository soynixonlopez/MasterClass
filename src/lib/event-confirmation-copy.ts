import { EVENT } from "@/lib/constants";

/** Datos del evento para confirmación post-registro (web y correo). */
export function getEventSummaryLines() {
  return {
    title: EVENT.title,
    when: `${EVENT.dateLabel} · ${EVENT.schedule}`,
    whereVenue: EVENT.locationName,
    whereAddress: EVENT.locationAddress,
  };
}

/**
 * Otros medios (fuera del checkout web). Partes para resaltar «soporte por WhatsApp» en web y correo.
 */
export const ALTERNATIVE_PAYMENTS_LEAD =
  "Para Yappy, pagos con tarjeta de crédito o débito, Cubo, Zelle y demás medios no tenemos cobro directo desde esta web: escríbenos a ";

export const ALTERNATIVE_PAYMENTS_HIGHLIGHT = "soporte por WhatsApp";

export const ALTERNATIVE_PAYMENTS_TRAIL =
  " y te orientamos caso por caso (en el sitio, el botón verde del borde inferior o cualquier enlace verde de comprobante más abajo).";

export const ALTERNATIVE_PAYMENTS_SUPPORT_COPY =
  ALTERNATIVE_PAYMENTS_LEAD +
  ALTERNATIVE_PAYMENTS_HIGHLIGHT +
  ALTERNATIVE_PAYMENTS_TRAIL;
