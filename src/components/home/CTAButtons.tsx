import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function CTAButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:gap-4 ${className}`}>
      <a
        data-cta
        href={SITE.bookingHref}
        className="btn-sweep group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:glow-electric"
      >
        Book a Free Consultation
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </a>
      <a
        data-cta
        href={SITE.servicesHref}
        className="btn-sweep inline-flex h-13 items-center justify-center rounded-md border border-foreground/30 bg-panel/40 px-7 py-3.5 text-[15px] font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/70"
      >
        Explore Salesforce Services
      </a>
    </div>
  );
}
