import { Briefcase, Headset, MessageSquare, BarChart3, Cloud, CheckCircle2, type LucideIcon } from "lucide-react";

export type Capability = { key: string; name: string; title: string; body: string; icon: LucideIcon; pos: { x: number; y: number } };

export const CAPABILITIES: Capability[] = [
  { key: "sales", name: "Sales Cloud", title: "One Customer Record", body: "One record for every lead and deal, from first click to closed-won, so nothing gets copy-pasted between tools.", icon: Briefcase, pos: { x: 14, y: 16 } },
  { key: "service", name: "Service Cloud", title: "Connected Support", body: "Support cases tied to the same record as the deal, so your team always has the full history in one place.", icon: Headset, pos: { x: 86, y: 16 } },
  { key: "slack", name: "Slack", title: "Collaboration in Context", body: "Your team closes deals and resolves cases where they already talk. Approvals, huddles and updates land in the same channel.", icon: MessageSquare, pos: { x: 14, y: 84 } },
  { key: "tableau", name: "Tableau", title: "Actionable Intelligence", body: "Live dashboards on pipeline health, service trends and revenue, with less manual reporting.", icon: BarChart3, pos: { x: 86, y: 84 } },
];

// Paths in a 100x100 viewBox from hub (50,50) to each node
const PATHS = [
  "M50 50 C 38 50, 30 20, 14 16",
  "M50 50 C 62 50, 70 20, 86 16",
  "M50 50 C 38 50, 30 80, 14 84",
  "M50 50 C 62 50, 70 80, 86 84",
];

export function ConnectedEcosystem({ active, onActive }: { active: string; onActive: (k: string) => void }) {
  return (
    <div data-eco className="relative mx-auto aspect-square w-full max-w-[640px] [perspective:1600px]">
      <div data-eco-plane className="relative h-full w-full [transform-style:preserve-3d]">
        <div className="grid-lines absolute inset-0 rounded-3xl" aria-hidden />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="lg" x1="0" x2="1">
              <stop offset="0" stopColor="var(--cyan)" />
              <stop offset="1" stopColor="var(--electric)" />
            </linearGradient>
          </defs>
          {PATHS.map((d, i) => (
            <g key={i}>
              <path data-path d={d} fill="none" stroke="url(#lg)" strokeWidth={CAPABILITIES[i]!.key === active ? 0.6 : 0.35} strokeLinecap="round" opacity={CAPABILITIES[i]!.key === active ? 1 : 0.55} pathLength={1} />
              <circle data-particle r="0.9" fill="var(--cyan)">
                <animateMotion dur={`${3 + i * 0.6}s`} repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
              </circle>
            </g>
          ))}
        </svg>

        {/* Hub */}
        <div data-hub className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl glass-panel glow-electric md:size-32 [transform:translateZ(60px)]">
          <div className="text-center">
            <Cloud className="mx-auto size-10 fill-electric text-electric" aria-hidden />
            <p className="mt-1 text-[11px] font-bold tracking-wide">Salesforce</p>
            <p className="text-[9px] tracking-[0.2em] text-cyan uppercase">Platform</p>
          </div>
        </div>

        {/* Nodes */}
        {CAPABILITIES.map((c) => {
          const Icon = c.icon;
          const on = c.key === active;
          return (
            <div key={c.key} style={{ left: `${c.pos.x}%`, top: `${c.pos.y}%` }} data-node className="absolute -translate-x-1/2 -translate-y-1/2">
            <button
              onMouseEnter={() => onActive(c.key)}
              onFocus={() => onActive(c.key)}
              onClick={() => onActive(c.key)}
              aria-pressed={on}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 glass-panel transition-all duration-500 [transform:translateZ(30px)] ${on ? "glow-electric border-cyan/60" : ""}`}
            >
              <span className={`grid size-9 place-items-center rounded-lg transition-colors ${on ? "bg-primary" : "bg-panel"}`}>
                <Icon className="size-4.5" aria-hidden />
              </span>
              <span className="text-left text-sm font-semibold whitespace-nowrap">{c.name}</span>
            </button>
            </div>
          );
        })}

        {/* Customer record */}
        <div data-float="record" className="absolute left-[24%] top-[30%] hidden w-48 rounded-lg bg-surface-light p-3 text-surface-light-foreground shadow-2xl md:block [transform:translateZ(90px)]">
          <p className="text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">Account · Shared record</p>
          <p className="mt-1 text-sm font-bold">Northwind Logistics</p>
          <div className="mt-2 flex items-center justify-between text-[10px]">
            <span>Opportunity</span><span className="font-semibold text-electric">Negotiation</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px]">
            <span>Open case #0482</span><span className="font-semibold">Linked</span>
          </div>
        </div>

        {/* Slack notification */}
        <div data-float="slack" className="absolute left-[56%] top-[60%] hidden w-52 rounded-lg glass-panel p-3 md:block [transform:translateZ(110px)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-success" aria-hidden />
            <p className="text-[11px] font-semibold">#deal-northwind</p>
          </div>
          <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">Discount approved. Case #0482 resolved — customer ready to sign.</p>
        </div>

        {/* Tableau mini */}
        <div data-float="kpi" className="absolute right-[6%] top-[36%] hidden w-36 rounded-lg glass-panel p-3 md:block [transform:translateZ(70px)]">
          <p className="text-[9px] tracking-wider text-muted-foreground uppercase">Pipeline (demo)</p>
          <p className="text-lg font-bold">$2.4M</p>
          <div className="mt-1 flex h-8 items-end gap-1">
            {[40, 55, 35, 70, 60, 85].map((h, i) => (
              <span key={i} data-minibar className="flex-1 origin-bottom rounded-sm bg-electric" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
