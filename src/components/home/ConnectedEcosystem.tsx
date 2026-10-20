import { CheckCircle2 } from "lucide-react";
import mascot from "@/assets/mascot.png";
import salesLogo from "@/assets/sales-cloud.png.asset.json";
import serviceLogo from "@/assets/service-cloud.png.asset.json";
import slackLogo from "@/assets/slack.png.asset.json";
import tableauLogo from "@/assets/tableau.png.asset.json";
import salesforceLogo from "@/assets/salesforce.png.asset.json";

export type Capability = { key: string; name: string; title: string; body: string; logo: string; pos: { x: number; y: number } };

export const SALESFORCE_LOGO = salesforceLogo.url;
export const MASCOT = mascot;

export const CAPABILITIES: Capability[] = [
  { key: "sales", name: "Sales Cloud", title: "One Customer Record", body: "Every lead and deal in one record, from first click to closed-won.", logo: salesLogo.url, pos: { x: 15, y: 17 } },
  { key: "service", name: "Service Cloud", title: "Connected Support", body: "Cases tied to the same record as the deal, with full history in one place.", logo: serviceLogo.url, pos: { x: 85, y: 17 } },
  { key: "slack", name: "Slack", title: "Collaboration in Context", body: "Approvals, huddles and updates land in the channel your team already uses.", logo: slackLogo.url, pos: { x: 15, y: 83 } },
  { key: "tableau", name: "Tableau", title: "Actionable Intelligence", body: "Live dashboards on pipeline, service trends and revenue.", logo: tableauLogo.url, pos: { x: 85, y: 83 } },
];

const PATHS = [
  "M50 50 C 36 46, 30 22, 15 17",
  "M50 50 C 64 46, 70 22, 85 17",
  "M50 50 C 36 54, 30 78, 15 83",
  "M50 50 C 64 54, 70 78, 85 83",
];

export function ConnectedEcosystem({ active, onActive }: { active: string; onActive: (k: string) => void }) {
  const current = CAPABILITIES.find((c) => c.key === active) ?? CAPABILITIES[0]!;
  return (
    <div data-eco className="relative mx-auto aspect-square w-full max-w-[620px] [perspective:1600px]">
      <div data-eco-plane className="relative h-full w-full [transform-style:preserve-3d]">
        <div className="grid-lines absolute inset-0 rounded-3xl" aria-hidden />

        {/* Orbit rings */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
          <div className="orbit-ring absolute size-[78%] rounded-full border border-dashed border-electric/25" />
          <div className="orbit-ring-rev absolute size-[58%] rounded-full border border-cyan/20" >
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-cyan glow-electric" />
          </div>
          <div className="absolute size-[44%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--electric)_45%,transparent),transparent_68%)] blur-2xl" />
        </div>

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="lg" x1="0" x2="1">
              <stop offset="0" stopColor="var(--cyan)" />
              <stop offset="1" stopColor="var(--electric)" />
            </linearGradient>
          </defs>
          {PATHS.map((d, i) => {
            const on = CAPABILITIES[i]!.key === active;
            return (
              <g key={i}>
                <path data-path d={d} fill="none" stroke="url(#lg)" strokeWidth={on ? 0.7 : 0.3} strokeLinecap="round" opacity={on ? 1 : 0.45} pathLength={1} className="transition-all duration-500" />
                <circle data-particle r={on ? 1.1 : 0.7} fill="var(--cyan)">
                  <animateMotion dur={`${2.6 + i * 0.5}s`} repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Mascot hub */}
        <div data-hub className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 [transform:translateZ(60px)]">
          <div className="relative aspect-square">
            <div className="absolute inset-[6%] rounded-full glass-panel glow-electric" />
            <div className="absolute inset-[6%] overflow-hidden rounded-full">
              <img src={mascot} alt="Our mascot, the connected-platform rhino" className="mascot-float absolute inset-x-0 bottom-0 mx-auto w-[92%]" loading="lazy" />
            </div>
            <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-electric/40 bg-navy/90 py-1.5 pr-3.5 pl-2 shadow-xl backdrop-blur-md">
              <img src={salesforceLogo.url} alt="Salesforce" className="h-5 w-auto" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-cyan uppercase">Platform</span>
            </div>
          </div>
        </div>

        {/* Logo nodes */}
        {CAPABILITIES.map((c) => {
          const on = c.key === active;
          return (
            <div key={c.key} style={{ left: `${c.pos.x}%`, top: `${c.pos.y}%` }} data-node className="absolute -translate-x-1/2 -translate-y-1/2">
              <button
                onMouseEnter={() => onActive(c.key)}
                onFocus={() => onActive(c.key)}
                onClick={() => onActive(c.key)}
                aria-pressed={on}
                aria-label={c.name}
                className={`group flex flex-col items-center gap-2 transition-transform duration-500 [transform:translateZ(30px)] ${on ? "scale-110" : "hover:scale-105"}`}
              >
                <span className={`relative grid size-[72px] place-items-center rounded-2xl bg-surface-light p-3 shadow-2xl ring-1 transition-all duration-500 lg:size-20 ${on ? "ring-cyan glow-electric" : "ring-foreground/10"}`}>
                  {on && <span className="absolute -inset-2 animate-ping rounded-3xl border border-cyan/40 [animation-duration:2.4s]" aria-hidden />}
                  <img src={c.logo} alt="" className="h-full w-full object-contain" />
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors ${on ? "bg-primary text-primary-foreground" : "bg-panel/70 text-foreground/85"}`}>{c.name}</span>
              </button>
            </div>
          );
        })}

        {/* Active capability card */}
        <div data-float="record" className="absolute left-1/2 top-[1%] w-60 -translate-x-1/2 rounded-xl glass-panel p-3 text-center [transform:translateZ(90px)]">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan uppercase">{current.name}</p>
          <p key={current.key} className="mt-0.5 text-sm font-bold animate-in fade-in slide-in-from-bottom-1 duration-500">{current.title}</p>
        </div>

        <div data-float="slack" className="absolute left-1/2 bottom-[2%] w-64 -translate-x-1/2 rounded-xl glass-panel p-3 [transform:translateZ(110px)]">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <p key={current.key} className="text-[11px] leading-snug text-foreground/80 animate-in fade-in duration-500">{current.body}</p>
          </div>
        </div>

        <span data-float="kpi" className="hidden" />
      </div>
    </div>
  );
}
