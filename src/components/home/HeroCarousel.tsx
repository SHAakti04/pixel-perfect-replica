import { useEffect, useRef, useState } from "react";
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

function slideStyle(i: number, active: number): React.CSSProperties {
  if (i === active) {
    return { transform: "translateX(0%) rotateY(0deg)", opacity: 1, visibility: "visible", zIndex: 2 };
  }
  const side = i < active ? -1 : 1;
  return {
    transform: `translateX(${side * 42}%) rotateY(${side * -24}deg)`,
    opacity: 0,
    visibility: "hidden",
    zIndex: 0,
  };
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);
  activeRef.current = active;
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = prefersReducedMotion();
  }, []);

  // Autoplay with progress bar
  useEffect(() => {
    if (paused || reduce.current) return;
    const { gsap } = getGsap();
    const bar = progressRef.current;
    if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: "none" });
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => {
      window.clearTimeout(t);
      if (bar) gsap.killTweensOf(bar);
    };
  }, [active, paused]);

  const goTo = (i: number) => setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

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
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}: ${s.label}`}
            aria-hidden={active !== i}
            className="scene-bg absolute inset-0 overflow-hidden transition-[transform,opacity,visibility] duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform motion-reduce:transition-none"
            style={{
              ...slideStyle(i, active),
              pointerEvents: active === i ? "auto" : "none",
            }}
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
          onClick={() => goTo(activeRef.current - 1)}
          aria-label="Previous slide"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-foreground/25 bg-panel/50 backdrop-blur-md transition-all duration-300 hover:border-cyan/70 hover:glow-electric"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <div className="flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
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
          onClick={() => goTo(activeRef.current + 1)}
          aria-label="Next slide"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-foreground/25 bg-panel/50 backdrop-blur-md transition-all duration-300 hover:border-cyan/70 hover:glow-electric"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
