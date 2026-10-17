import { useEffect, useRef, useState } from "react";
import { CTAButtons } from "./CTAButtons";
import { CAPABILITIES, ConnectedEcosystem } from "./ConnectedEcosystem";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

export function HeroSceneTwo() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("sales");

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root.current, start: "top 65%", once: true } });
      tl.from("[data-s2-text] > *", { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from("[data-hub]", { rotateY: -70, rotateX: 25, scale: 0.6, opacity: 0, duration: 1.3, ease: "expo.out" }, 0.1)
        .from("[data-node]", { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)" }, 0.5)
        .fromTo("[data-path]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: "power2.inOut" }, 0.6)
        .from("[data-particle]", { opacity: 0, duration: 0.4 }, 1.6)
        .from('[data-float="record"]', { x: -60, opacity: 0, duration: 0.9 }, 1.4)
        .from('[data-float="slack"]', { y: 40, opacity: 0, duration: 0.9 }, 1.7)
        .from('[data-float="kpi"]', { x: 50, opacity: 0, duration: 0.9 }, 1.9)
        .from("[data-minibar]", { scaleY: 0, duration: 0.6, stagger: 0.05 }, 2.1)
        .from("[data-cap]", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1 }, 1.2);

      gsap.fromTo("[data-eco-plane]", { rotateX: 14, rotateZ: -2 }, { rotateX: -6, rotateZ: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="connected" className="scene-bg relative overflow-hidden py-24 lg:min-h-[100svh] lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
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
          <ConnectedEcosystem active={active} onActive={setActive} />
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

      <div id="services" className="mx-auto mt-16 grid max-w-[1400px] gap-4 px-5 sm:grid-cols-2 md:px-10 lg:mt-10 lg:grid-cols-4">
        {CAPABILITIES.map((c) => (
          <article
            key={c.key}
            data-cap
            onMouseEnter={() => setActive(c.key)}
            className={`rounded-xl border p-6 transition-all duration-500 ${active === c.key ? "border-cyan/50 bg-panel/70" : "border-border bg-panel/30"}`}
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-cyan uppercase">{c.name}</p>
            <h3 className="mt-2 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
