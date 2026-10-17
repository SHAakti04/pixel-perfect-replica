import { useEffect, useRef } from "react";
import { CTAButtons } from "./CTAButtons";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

export function HeroSceneThree() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root.current, start: "top 60%", once: true } });
      tl.from("[data-s3-text] > *", { x: -40, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from("[data-dash]", { rotateY: -28, rotateX: 12, z: -200, opacity: 0, duration: 1.6, ease: "expo.out" }, 0)
        .from('[data-layer="1"]', { y: 30, opacity: 0, duration: 0.8 }, 0.5)
        .from('[data-layer="2"]', { y: 40, opacity: 0, duration: 0.8 }, 0.65)
        .from('[data-layer="3"]', { y: 50, opacity: 0, duration: 0.8 }, 0.8)
        .from("[data-bar]", { scaleY: 0, duration: 0.9, stagger: 0.05, ease: "power2.out" }, 0.9)
        .fromTo("[data-line]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 1.1)
        .from("[data-hbar]", { scaleX: 0, duration: 1, stagger: 0.12 }, 1.2)
        .from("[data-status]", { scale: 0, duration: 0.4, stagger: 0.12, ease: "back.out(3)" }, 1.4);

      root.current!.querySelectorAll<SVGCircleElement>("[data-ring]").forEach((el) => {
        const c = 2 * Math.PI * 16;
        tl.fromTo(el, { strokeDashoffset: c }, { strokeDashoffset: c * (1 - Number(el.dataset.pct) / 100), duration: 1.4, ease: "power2.out" }, 1.0);
      });
      root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const dec = Number(el.dataset.dec);
        const o = { v: 0 };
        tl.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = o.v.toFixed(dec); } }, 0.7);
      });

      gsap.fromTo("[data-dash]", { rotateY: -10, rotateX: 6 }, { rotateY: 4, rotateX: -2, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to('[data-layer="3"]', { z: 40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="outcomes" className="scene-bg relative flex items-center overflow-hidden py-24 lg:min-h-[100svh]">
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
        <div className="lg:-mr-24">
          <AnalyticsDashboard />
          <p className="mt-3 text-right text-[11px] text-muted-foreground">Illustrative demo data only.</p>
        </div>
      </div>
    </section>
  );
}
