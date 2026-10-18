import { useState } from "react";
import { CAPABILITIES } from "./ConnectedEcosystem";

export function ServicesSection() {
  const [active, setActive] = useState("sales");

  return (
    <section id="services" className="scene-bg relative py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-cyan uppercase md:text-sm">Salesforce Services</p>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight font-bold tracking-tight">
          Four clouds. <span className="text-electric">One</span> connected business.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <article
              key={c.key}
              onMouseEnter={() => setActive(c.key)}
              className={`rounded-xl border p-6 transition-all duration-500 ${active === c.key ? "border-cyan/50 bg-panel/70 glow-electric" : "border-border bg-panel/30"}`}
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-cyan uppercase">{c.name}</p>
              <h3 className="mt-2 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
