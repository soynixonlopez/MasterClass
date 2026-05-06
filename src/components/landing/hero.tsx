"use client";

import Image from "next/image";
import {
  CalendarDays,
  Clock,
  MapPin,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EVENT, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { getYoutubeEmbedSrc } from "@/lib/youtube";
import { AnimatedCta } from "@/components/landing/animated-cta";
import { InPageAnchor } from "@/components/landing/in-page-anchor";

export function Hero() {
  const embedSrc = getYoutubeEmbedSrc();

  return (
    <section className="relative overflow-hidden bg-carbon text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(212,175,55,0.2),transparent_50%),radial-gradient(ellipse_at_90%_30%,rgba(138,21,56,0.4),transparent_45%),linear-gradient(180deg,rgba(11,11,13,0)_0%,rgba(11,11,13,0.9)_100%)]"
      />
      <div className="relative mx-auto grid min-w-0 max-w-7xl gap-12 px-4 pb-24 pt-24 md:gap-14 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-28">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-block max-w-full rounded-full border border-gold/45 bg-wine/45 px-5 py-2 text-center text-[11px] font-semibold uppercase leading-snug tracking-[0.18em] text-champagne shadow-sm backdrop-blur-sm sm:text-xs sm:tracking-[0.22em]"
          >
            {EVENT.title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-heading text-[clamp(2.5rem,11vw,4.1rem)] font-bold uppercase leading-[1.04] tracking-tight text-warm sm:text-[clamp(2.75rem,8vw,4.5rem)] md:text-7xl lg:text-8xl xl:text-[5rem] xl:leading-[1.02]"
          >
            {EVENT.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-champagne md:text-xl"
          >
            {EVENT.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-carbon/60 px-3 py-2 text-sm font-semibold text-gold md:text-base">
              <ShieldCheck className="size-5 shrink-0" aria-hidden />
              100% presencial, aula real
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-champagne/20 bg-carbon/60 px-3 py-2 text-sm font-semibold text-champagne md:text-base">
              <Users className="size-5 shrink-0" aria-hidden />
              Cupos limitados
            </span>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-8 flex flex-col gap-4 text-base text-champagne/95 md:text-lg"
          >
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-6 shrink-0 text-gold" />
              <span>
                <strong className="text-warm">Cuándo:</strong> {EVENT.dateLabel}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-6 shrink-0 text-gold" />
              <span>
                <strong className="text-warm">Horario:</strong> {EVENT.schedule}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-6 shrink-0 text-gold" />
              <span>
                <strong className="text-warm">Dónde:</strong> {EVENT.locationName},{" "}
                {EVENT.locationAddress}
              </span>
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.17 }}
            className="mt-10 flex w-full max-w-xl flex-col gap-4 lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center lg:gap-4"
          >
            <AnimatedCta
              href="#registro"
              variant="primary"
              fullWidth
              title="Formulario breve: nombre, WhatsApp y correo. Aquí no se pide tarjeta."
            >
              Apartar mi cupo
            </AnimatedCta>
            <InPageAnchor
              href="#video-promo"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex min-h-[3.25rem] w-full shrink-0 justify-center rounded-full border-2 border-white/25 bg-white/5 px-8 text-lg font-semibold text-warm backdrop-blur-sm hover:bg-white/10 md:min-h-14 md:text-xl lg:w-auto"
              )}
            >
              <Play className="mr-2 size-5 shrink-0 fill-current" aria-hidden />
              Ver el video primero
            </InPageAnchor>
            <InPageAnchor
              href="#curso"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "min-h-[2.75rem] w-full justify-center text-center text-lg font-semibold text-champagne underline-offset-4 hover:text-gold hover:underline md:text-xl lg:w-auto lg:min-w-0"
              )}
            >
              Ver programa del curso →
            </InPageAnchor>
          </motion.div>
        </div>

        <motion.div
          id="video-promo"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mx-auto min-w-0 w-full max-w-md scroll-mt-28"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 shadow-2xl shadow-black/60 ring-4 ring-gold/10">
            {embedSrc ? (
              <div className="relative aspect-[9/16] w-full bg-elevation">
                <iframe
                  title="Video promocional Master Class Colorimetría Desde Cero"
                  src={embedSrc}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={PLACEHOLDER_IMAGES.hero}
                  alt="Ambiente de salón profesional. Configura NEXT_PUBLIC_YOUTUBE_VIDEO_ID para tu video."
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-carbon/75 p-6 text-center">
                  <Play className="mb-3 size-14 text-gold" aria-hidden />
                  <p className="font-heading text-lg font-bold text-warm">
                    Añade tu video promocional
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-champagne">
                    En <code className="rounded bg-black/40 px-1">.env.local</code> define{" "}
                    <code className="rounded bg-black/40 px-1">
                      NEXT_PUBLIC_YOUTUBE_VIDEO_ID
                    </code>{" "}
                    con el ID o la URL del video de YouTube.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 w-full px-1">
            <p className="text-center text-pretty text-[0.8125rem] font-medium leading-snug tracking-tight text-gold sm:text-sm md:text-base">
              Mira el video y entiende por qué este entrenamiento es para ti.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
