import { BenefitsSection } from "@/components/landing/benefits-section";
import { EventDetailsSection } from "@/components/landing/event-details-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FlexPaySection } from "@/components/landing/flex-pay-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { Hero } from "@/components/landing/hero";
import { InstructorsSection } from "@/components/landing/instructors-section";
import { LearnSection } from "@/components/landing/learn-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProblemDesire } from "@/components/landing/problem-desire";
import { RegistrationFormSection } from "@/components/landing/registration-form";
import { SiteFooter } from "@/components/landing/site-footer";
import { UrgencyBar } from "@/components/landing/urgency-bar";
import { WhatsAppFloat } from "@/components/landing/whatsapp-float";
import { EVENT } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <UrgencyBar />
        <ProblemDesire />
        <FlexPaySection />
        <LearnSection />
        <BenefitsSection />
        <InstructorsSection />
        <EventDetailsSection />
        <PricingSection />
        <RegistrationFormSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: EVENT.title,
            startDate: "2026-06-17T08:00:00-05:00",
            endDate: "2026-06-17T12:00:00-05:00",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: EVENT.locationName,
              address: EVENT.locationAddress,
            },
            offers: {
              "@type": "Offer",
              price: EVENT.priceUsd,
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
