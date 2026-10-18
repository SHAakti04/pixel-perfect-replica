import { useEffect, useRef, useState } from "react";
import { CTAButtons } from "./CTAButtons";
import { CAPABILITIES, ConnectedEcosystem } from "./ConnectedEcosystem";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

export function HeroSceneTwo({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [activeCap, setActiveCap] = useState("sales");

  useEffect(() => {
    if (!active || !root.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-s2-text] > *", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, 0.2)
        .fromTo("[data-hub]", { rotateY: -70, rotateX: 25, scale: 0.6, opacity: 0 }, { rotateY: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "expo.out" }, 0.3)
        .fromTo("[data-node]", { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)" }, 0.7)
        .fromTo("[data-path]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: "power2.inOut" }, 0.8)
        .fromTo("[data-particle]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.8)
        .fromTo('[data-float="record"]', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, 1.6)
        .fromTo('[data-float="slack"]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.9)
        .fromTo('[data-float="kpi"]', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, 2.1)
        .fromTo("[data-minibar]", { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: 0.05 }, 2.3);
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <div ref={root} className="flex h-full items-center pt-20 pb-24 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-s2-text>
          <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-cyan uppercase md:text-sm">Connected Experience. One Business View.</p>
          <h2 className="font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.08] font-bold tracking-tight">
            Connect Every Team. <span className="text-electric">Unify</span> Every Customer Interaction.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Bring Sales Cloud, Service Cloud, Slack and Tableau together into one connected experience. Give your B2B teams a shared view of customers, conversations and performance — across industries.
          </p>
          <CTAButtons className="mt-10" />
        </div>

        <div className="hidden md:block">
          <ConnectedEcosystem active={activeCap} onActive={setActiveCap} />
        </div>

        {/* Mobile connected stack */}
        <ol className="relative space-y-3 border-l border-electric/40 pl-6 md:hidden">
          {CAPABILITIES.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.key} className="relative rounded-xl glass-panel p-4">
                <span className="absolute -left-[31px] top-5 size-3 rounded-full bg-cyan glow-electric" aria-hidden />
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary"><Icon className="size-4.5" aria-hidden /></span>
                  <div>
                    <p className="text-[11px] tracking-wider text-cyan uppercase">{c.name}</p>
                    <p className="font-semibold">{c.title}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
