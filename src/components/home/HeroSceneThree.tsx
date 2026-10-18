import { useEffect, useRef } from "react";
import { CTAButtons } from "./CTAButtons";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

export function HeroSceneThree({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !root.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-s3-text] > *", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, 0.2)
        .fromTo("[data-dash]", { rotateY: -28, rotateX: 12, z: -200, opacity: 0 }, { rotateY: 0, rotateX: 0, z: 0, opacity: 1, duration: 1.6, ease: "expo.out" }, 0.2)
        .fromTo('[data-layer="1"]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7)
        .fromTo('[data-layer="2"]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.85)
        .fromTo('[data-layer="3"]', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0)
        .fromTo("[data-bar]", { scaleY: 0 }, { scaleY: 1, duration: 0.9, stagger: 0.05, ease: "power2.out" }, 1.1)
        .fromTo("[data-line]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 1.3)
        .fromTo("[data-hbar]", { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.12 }, 1.4)
        .fromTo("[data-status]", { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.12, ease: "back.out(3)" }, 1.6);

      root.current!.querySelectorAll<SVGCircleElement>("[data-ring]").forEach((el) => {
        const c = 2 * Math.PI * 16;
        tl.fromTo(el, { strokeDashoffset: c }, { strokeDashoffset: c * (1 - Number(el.dataset["pct"]) / 100), duration: 1.4, ease: "power2.out" }, 1.2);
      });
      root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset["count"]);
        const dec = Number(el.dataset["dec"]);
        const o = { v: 0 };
        tl.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = o.v.toFixed(dec); } }, 0.9);
      });
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <div ref={root} className="flex h-full items-center pt-20 pb-24 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div data-s3-text>
          <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-cyan uppercase md:text-sm">Turn Data into Business Momentum.</p>
          <h2 className="font-display text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.08] font-bold tracking-tight">
            Simplify Your Business. Scale with <span className="text-electric">Salesforce.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            We build Salesforce solutions that streamline operations, automate workflows, and give your teams the tools to work smarter and grow faster.
          </p>
          <CTAButtons className="mt-10" />
        </div>
        <div className="xl:-mr-6">
          <AnalyticsDashboard />
          <p className="mt-3 text-right text-[11px] text-muted-foreground">Illustrative demo data only.</p>
        </div>
      </div>
    </div>
  );
}
