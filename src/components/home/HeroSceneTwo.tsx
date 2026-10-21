import { useEffect, useRef } from "react";
import { CTAButtons } from "./CTAButtons";
import { ConnectedBoard, ConnectedBoardMobile } from "./ConnectedBoard";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

export function HeroSceneTwo({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !root.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-s2-text] > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.09 }, 0.1)
        .fromTo("[data-card]", { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)" }, 0.3)
        .fromTo("[data-hub]", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "expo.out" }, 0.5)
        .fromTo("[data-node]", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.6)" }, 0.9)
        .fromTo("[data-path]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, stagger: 0.1, ease: "power2.inOut" }, 0.9)
        .fromTo("[data-float]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.5)
        .fromTo("[data-bar]", { scaleY: 0 }, { scaleY: 1, duration: 0.5, stagger: 0.05 }, 1.4)
        .fromTo("[data-trend]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 1.5);
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <div ref={root} className="flex h-full items-center pt-20 pb-24 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div data-s2-text>
          <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-cyan uppercase md:text-sm">Connected Experience. One Business View.</p>
          <h2 className="font-display text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.08] font-bold tracking-tight">
            Connect Every Team. <span className="text-electric">Unify</span> Every Customer Interaction.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Bring Sales Cloud, Service Cloud, Slack and Tableau together into one connected experience — a shared view of customers, conversations and performance.
          </p>
          <CTAButtons className="mt-10" />
        </div>

        {/* Desktop board — scales to fit the column */}
        <div className="hidden h-[52vh] min-h-0 md:block lg:h-[68vh] xl:-mr-6">
          <ConnectedBoard />
        </div>

        {/* Mobile: compact mascot hub + mini app cards */}
        <div className="md:hidden">
          <ConnectedBoardMobile />
        </div>
      </div>
    </div>
  );
}
