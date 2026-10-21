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
    <div ref={root} className="flex h-full flex-col pt-20 pb-20 md:pt-24 md:pb-24">
      {/* Compact header */}
      <div data-s2-text className="mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-4 px-5 md:px-10">
        <div className="min-w-0">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-cyan uppercase md:text-xs">Connected Experience. One Business View.</p>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.1] font-bold tracking-tight">
            Connect Every Team. <span className="text-electric">Unify</span> Every Customer Interaction.
          </h2>
        </div>
        <CTAButtons className="hidden shrink-0 lg:flex" />
      </div>

      {/* Desktop board — always fits the remaining screen space */}
      <div className="mx-auto mt-4 hidden w-full max-w-[1400px] flex-1 px-5 md:mt-6 md:block md:px-10">
        <ConnectedBoard />
      </div>

      {/* Mobile: compact mascot hub + mini app cards */}
      <div className="mx-auto mt-5 w-full max-w-md flex-1 overflow-hidden px-5 md:hidden">
        <ConnectedBoardMobile />
      </div>
    </div>
  );
}
