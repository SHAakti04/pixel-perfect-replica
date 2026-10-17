import { useEffect, useRef } from "react";
import office from "@/assets/image.png.asset.json";
import { CTAButtons } from "./CTAButtons";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

export function HeroSceneOne() {
  const root = useRef<HTMLElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = getGsap();
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduce) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-sweep]", { xPercent: -100, opacity: 0, duration: 1.6, ease: "power2.inOut" })
        .fromTo("[data-mask]", { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }, { clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.5, ease: "expo.inOut" }, 0.2)
        .from("[data-photo]", { scale: 1.18, duration: 2.2, ease: "power2.out" }, 0.3)
        .from("[data-eyebrow]", { y: 14, opacity: 0, duration: 0.7 }, 0.6)
        .from("[data-line] > span", { yPercent: 110, duration: 1, stagger: 0.12 }, 0.7)
        .to("[data-shine]", { backgroundPosition: "0% 0", duration: 1.4, ease: "power2.inOut" }, 1.4)
        .from("[data-copy]", { clipPath: "inset(0 0 100% 0)", y: 12, duration: 0.9 }, 1.2)
        .from("[data-cta]", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, 1.4)
        .from("[data-shard]", { xPercent: 40, opacity: 0, duration: 1.4, stagger: 0.15 }, 1.0);

      gsap.to("[data-photo]", { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-shard]", { yPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-text]", { y: -60, opacity: 0.3, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);

    const el = imgWrap.current;
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    const onMove = (e: PointerEvent) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: x * 5, rotateX: -y * 4, duration: 1, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 1.2 });
    if (fine && !reduce && el) {
      root.current.addEventListener("pointermove", onMove);
      root.current.addEventListener("pointerleave", onLeave);
    }
    const r = root.current;
    return () => {
      r.removeEventListener("pointermove", onMove);
      r.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="vision" className="scene-bg relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 lg:py-0">
      <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-electric/10 to-transparent" aria-hidden />
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div data-text className="relative z-10">
          <p data-eyebrow className="mb-6 text-xs font-semibold tracking-[0.18em] text-cyan uppercase md:text-sm">
            Salesforce Consulting &amp; Implementation Partner
          </p>
          <h1 className="font-display text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[1.06] font-bold tracking-tight">
            <span data-line className="block overflow-hidden pb-1"><span className="block">Turn Your Business</span></span>
            <span data-line className="block overflow-hidden pb-1"><span className="block">Vision into Real Results</span></span>
            <span data-line className="block overflow-hidden pb-1">
              <span className="block">with <span data-shine className="text-shine">Salesforce.</span></span>
            </span>
          </h1>
          <p data-copy className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            We design, implement and integrate Salesforce solutions that connect your people, processes and data — helping you automate, scale and grow with confidence.
          </p>
          <CTAButtons className="mt-10" />
        </div>

        <div className="relative [perspective:1400px] lg:-mr-10 lg:h-[82vh]">
          <div ref={imgWrap} className="relative h-[52vh] w-full [transform-style:preserve-3d] lg:h-full">
            <div data-mask className="absolute inset-0 overflow-hidden [clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)]">
              <img data-photo src={office.url} alt="Business leaders collaborating around a conference table in a high-rise office overlooking a city skyline" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />
            </div>
            <div data-shard aria-hidden className="pointer-events-none absolute -right-4 bottom-0 h-3/4 w-2/3 bg-gradient-to-tl from-electric/55 to-transparent mix-blend-screen [clip-path:polygon(100%_0,100%_100%,0_100%)] [transform:translateZ(40px)]" />
            <div data-shard aria-hidden className="pointer-events-none absolute -left-2 top-10 h-24 w-1 bg-cyan/70 [transform:translateZ(60px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
