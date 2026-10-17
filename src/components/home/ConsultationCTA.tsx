import { CTAButtons } from "./CTAButtons";
import { SITE } from "@/lib/site-config";

export function ConsultationCTA() {
  return (
    <section id="consultation" className="relative border-t border-border bg-navy py-24">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan uppercase md:text-sm">Let's talk</p>
        <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight font-bold tracking-tight">
          Connect people, processes, data and AI — with <span className="text-electric">Salesforce.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
          Tell us where you are today. We'll map a practical path to measurable outcomes.
        </p>
        <CTAButtons className="mt-10 justify-center" />
      </div>
      <footer className="mx-auto mt-24 flex max-w-[1400px] flex-col justify-between gap-2 px-5 text-xs text-muted-foreground md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} {SITE.name}. Salesforce Consulting & Implementation Partner.</span>
        <span>Salesforce, Slack and Tableau are trademarks of Salesforce, Inc.</span>
      </footer>
    </section>
  );
}
