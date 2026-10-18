import { useEffect, useState } from "react";
import { SCENES } from "@/lib/site-config";

export function HeroProgressIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SCENES.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Hero scenes" className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 min-[1600px]:flex">
      {SCENES.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} aria-current={active === i ? "step" : undefined} className="group flex items-center gap-3 flex-row-reverse justify-end">
          <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-all ${active === i ? "text-cyan opacity-100" : "opacity-0 group-hover:opacity-70"}`}>
            {s.label}
          </span>
          <span className={`font-mono text-xs transition-colors ${active === i ? "text-foreground" : "text-muted-foreground"}`}>0{i + 1}</span>
          <span className={`h-px transition-all duration-500 ${active === i ? "w-10 bg-cyan" : "w-4 bg-muted-foreground/50"}`} />
        </a>
      ))}
    </nav>
  );
}
