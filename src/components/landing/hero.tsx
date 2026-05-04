"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EVENT, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { getYoutubeEmbedSrc } from "@/lib/youtube";
import { AnimatedCta } from "@/components/landing/animated-cta";

export function Hero() {
  const embedSrc = getYoutubeEmbedSrc();

  return (
    <section className="relative overflow-hidden bg-carbon text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(212,175,55,0.2),transparent_50%),radial-gradient(ellipse_at_90%_30%,rgba(138,21,56,0.4),transparent_45%),linear-gradient(180deg,rgba(11,11,13,0)_0%,rgba(11,11,13,0.9)_100%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-24 md:grid-cols-2 md:items-center md:gap-14 md:px-6 lg:gap-16 lg:pt-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-gold/40 bg-wine/50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-champagne"
          >
            <Sparkles className="size-4 text-gold" aria-hidden />
            {EVENT.title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-heading text-4xl font-bold uppercase leading-[1.05] tracking-tight text-warm sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {EVENT.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-champagne sm:text-xl"
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
              100% presencial · Aula real
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

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.17 }}
            className="mt-6 max-w-xl text-sm font-medium text-champagne/85 md:text-base"
          >
            Conoce inversión, descuentos y facilidades de pago más abajo: primero
            asegúrate de que{" "}
            <strong className="text-gold">este entrenamiento es para ti</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <AnimatedCta href="#registro" variant="primary">
              Sí, quiero mi cupo
            </AnimatedCta>
            <Link
              href="#video-promo"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 min-h-12 justify-center rounded-full border-2 border-white/20 bg-white/5 px-6 text-base font-semibold text-warm backdrop-blur-sm hover:bg-white/10 md:h-14 md:px-8 md:text-lg"
              )}
            >
              <Play className="mr-2 size-5 fill-current" aria-hidden />
              Ver video
            </Link>
            <Link
              href="#curso"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "text-base font-semibold text-champagne underline-offset-4 hover:text-gold hover:underline md:text-lg"
              )}
            >
              Ver programa del curso →
            </Link>
          </motion.div>
        </div>

        <motion.div
          id="video-promo"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl scroll-mt-28 md:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 shadow-2xl shadow-black/60 ring-4 ring-gold/10">
            {embedSrc ? (
              <div className="relative aspect-video w-full bg-elevation">
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
              <div className="relative aspect-video w-full">
                <Image
                  src={PLACEHOLDER_IMAGES.hero}
                  alt="Ambiente de salón profesional — configura NEXT_PUBLIC_YOUTUBE_VIDEO_ID para mostrar tu video"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 560px"
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
          <p className="mt-4 text-center text-sm text-champagne/75 md:text-base">
            <span className="inline-flex items-center gap-1 font-semibold text-gold">
              <Play className="size-4" aria-hidden />
              Mira el video y entiende por qué este entrenamiento es para ti.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
