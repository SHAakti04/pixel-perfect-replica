import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/home/Navigation";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salesforce Consulting & Implementation Partner | CloudPeak" },
      { name: "description", content: "We design, implement and integrate Salesforce solutions that connect your people, processes, data and AI for measurable results." },
      { property: "og:title", content: "Salesforce Consulting & Implementation Partner | CloudPeak" },
      { property: "og:description", content: "Connect Sales Cloud, Service Cloud, Slack and Tableau into one business view — and scale with confidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroCarousel />
      <ServicesSection />
      <ConsultationCTA />
    </main>
  );
}
