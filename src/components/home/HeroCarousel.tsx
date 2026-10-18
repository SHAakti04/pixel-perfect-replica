import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSceneOne } from "./HeroSceneOne";
import { HeroSceneTwo } from "./HeroSceneTwo";
import { HeroSceneThree } from "./HeroSceneThree";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

const SLIDES = [
  { id: "vision", label: "Vision" },
  { id: "connected", label: "Connected" },
  { id: "outcomes", label: "Outcomes" },
] as const;

const AUTOPLAY_MS = 7000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const animating = useRef(false);
  const activeRef = useRef(0);
  activeRef.current = active;

  const goTo = useCallback((next: number, dir: 1 | -1 = 1) => {
    const from = activeRef.current;
    const idx = (next + SLIDES.length) % SLIDES.length;
    if (idx === from || animating.current) return;

    const outEl = slideRefs.current[from];
    const inEl = slideRefs.current[idx];
    const { gsap } = getGsap();
    const reduce = prefersReducedMotion();

    setActive(idx);

    if (reduce || !outEl || !inEl) {
      slideRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { autoAlpha: i === idx ? 1 : 0, xPercent: 0, rotateY: 0, z: 0 });
      });
      return;
    }

    animating.current = true;
    gsap.set(inEl, { autoAlpha: 1, zIndex: 2 });
    gsap.set(outEl, { zIndex: 1 });
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(outEl, { autoAlpha: 0, zIndex: 0 });
        animating.current = false;
      },
    });
    tl.to(outEl, { xPercent: -38 * dir, rotateY: 22 * dir, z: -260, autoAlpha: 0, duration: 1.05 }, 0).fromTo(
      inEl,
      { xPercent: 42 * dir, rotateY: -26 * dir, z: -320, autoAlpha: 0 },
      { xPercent: 0, rotateY: 0, z: 0, autoAlpha: 1, duration: 1.05 },
      0.12,
    );
  }, []);

  // Autoplay with progress bar
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const bar = progressRef.current;
    if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: "none" });
    timerRef.current = window.setTimeout(() => goTo(activeRef.current + 1, 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (bar) gsap.killTweensOf(bar);
    };
  }, [active, paused, goTo]);

  // Initial state: only first slide visible
  useEffect(() => {
    const { gsap } = getGsap();
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 0 });
    });
  }, []);

  const jump = (i: number) => goTo(i, i > activeRef.current ? 1 : -1);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="CloudPeak highlights"
      className="scene-bg relative h-[100svh] min-h-[620px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 [perspective:1800px]">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}: ${s.label}`}
            aria-hidden={active !== i}
            className="absolute inset-0 overflow-hidden [transform-style:preserve-3d]"
            style={{ pointerEvents: active === i ? "auto" : "none" }}
          >
            {i === 0 && <HeroSceneOne active={active === 0} />}
            {i === 1 && <HeroSceneTwo active={active === 1} />}
            {i === 2 && <HeroSceneThree active={active === 2} />}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-5 px-5 md:bottom-9">
        <button
          onClick={() => goTo(activeRef.current - 1, -1)}
          aria-label="Previous slide"
          className="grid size-11 place-items-center rounded-full border border-foreground/25 bg-panel/50 backdrop-blur-md transition-all duration-300 hover:border-cyan/70 hover:glow-electric"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <div className="flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jump(i)}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              aria-current={active === i ? "true" : undefined}
              className="group flex items-center gap-2.5"
            >
              <span
                className={`font-mono text-[11px] transition-colors ${active === i ? "text-cyan" : "text-muted-foreground group-hover:text-foreground"}`}
              >
                0{i + 1}
              </span>
              <span className={`relative h-0.5 overflow-hidden rounded-full transition-all duration-500 ${active === i ? "w-16 bg-foreground/20" : "w-6 bg-foreground/20 group-hover:bg-foreground/40"}`}>
                {active === i && <span ref={progressRef} className="absolute inset-0 origin-left scale-x-0 bg-cyan" />}
              </span>
              <span
                className={`hidden text-[11px] font-semibold tracking-[0.18em] uppercase transition-all md:inline ${
                  active === i ? "text-foreground" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(activeRef.current + 1, 1)}
          aria-label="Next slide"
          className="grid size-11 place-items-center rounded-full border border-foreground/25 bg-panel/50 backdrop-blur-md transition-all duration-300 hover:border-cyan/70 hover:glow-electric"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
