import { Cloud, Search, Bell, Home, Users, BarChart3, Settings, Headset } from "lucide-react";

const KPIS = [
  { label: "Open pipeline", value: 8.4, prefix: "$", suffix: "M", dec: 1 },
  { label: "New leads", value: 474, prefix: "", suffix: "", dec: 0 },
  { label: "Deals won", value: 95, prefix: "", suffix: "", dec: 0 },
  { label: "Open cases", value: 52, prefix: "", suffix: "", dec: 0 },
];
const BARS = [32, 48, 40, 56, 44, 62, 50, 78, 58, 70, 84, 92];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const LINE = "M0 70 L9 58 L18 62 L27 48 L36 52 L45 40 L54 44 L63 30 L72 34 L81 22 L90 18 L100 10";

function Ring({ pct, label, sub }: { pct: number; label: string; sub: string }) {
  const c = 2 * Math.PI * 16;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="size-16 -rotate-90 lg:size-18" aria-hidden>
        <circle cx="20" cy="20" r="16" fill="none" stroke="var(--panel)" strokeWidth="5" />
        <circle data-ring data-pct={pct} cx="20" cy="20" r="16" fill="none" stroke="var(--electric)" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
      </svg>
      <div>
        <p className="text-xl font-bold">{pct}%</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-[10px] text-cyan">{sub}</p>
      </div>
    </div>
  );
}

export function AnalyticsDashboard() {
  return (
    <div className="[perspective:1800px]">
      <div data-dash className="relative rounded-2xl border-2 border-foreground/10 bg-panel-2 p-2 shadow-[var(--shadow-panel)] glow-electric [transform-style:preserve-3d]" role="img" aria-label="Illustrative Salesforce analytics dashboard showing pipeline, revenue, lead conversion and service metrics (demo data)">
        <div className="flex overflow-hidden rounded-xl bg-navy">
          <aside className="hidden flex-col items-center gap-5 border-r border-border px-3 py-4 sm:flex">
            <Cloud className="size-6 fill-electric text-electric" />
            {[Home, Users, BarChart3, Headset, Settings].map((I, i) => (
              <I key={i} className={`size-4 ${i === 0 ? "text-cyan" : "text-muted-foreground"}`} />
            ))}
          </aside>
          <div className="min-w-0 flex-1 p-3 lg:p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-border px-3 py-1.5 text-[11px] text-muted-foreground">
                <Search className="size-3.5" /> Search records…
              </div>
              <span className="rounded border border-border px-2 py-1 text-[10px] text-muted-foreground">Demo data</span>
              <Bell className="size-4 text-muted-foreground" />
            </div>

            <div data-layer="1" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {KPIS.map((k) => (
                <div key={k.label} className="rounded-lg bg-panel-2 p-3">
                  <div className="flex items-center gap-1.5">
                    <span data-status className="size-1.5 rounded-full bg-success" />
                    <p className="text-[10px] text-muted-foreground">{k.label}</p>
                  </div>
                  <p className="mt-1 text-xl font-bold lg:text-2xl">
                    {k.prefix}<span data-count={k.value} data-dec={k.dec}>{k.value.toFixed(k.dec)}</span>{k.suffix}
                  </p>
                </div>
              ))}
            </div>

            <div data-layer="2" className="mt-2 grid gap-2 lg:grid-cols-[1.6fr_1fr]">
              <div className="rounded-lg bg-panel-2 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Revenue & pipeline trend</p>
                  <div className="flex gap-3 text-[9px] text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-electric" />Bookings</span>
                    <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-cyan" />Revenue</span>
                  </div>
                </div>
                <div className="relative mt-3 h-32 lg:h-40">
                  <div className="absolute inset-0 flex items-end gap-1.5">
                    {BARS.map((h, i) => (
                      <div key={i} className="flex h-full flex-1 flex-col justify-end">
                        <div data-bar className="origin-bottom rounded-t-sm bg-gradient-to-t from-electric/50 to-electric" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                  <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                    <path data-line d={LINE} fill="none" stroke="var(--cyan)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" pathLength={1} />
                  </svg>
                </div>
                <div className="mt-1 flex gap-1.5 text-[9px] text-muted-foreground">
                  {MONTHS.map((m, i) => <span key={i} className="flex-1 text-center">{m}</span>)}
                </div>
              </div>
              <div className="flex flex-col justify-around gap-3 rounded-lg bg-panel-2 p-3">
                <p className="text-xs font-semibold">Conversion & service</p>
                <Ring pct={67} label="Lead conversion" sub="+8 pts vs. last qtr" />
                <Ring pct={45} label="Cases resolved < 4h" sub="SLA on track" />
              </div>
            </div>

            <div data-layer="3" className="mt-2 hidden rounded-lg bg-panel-2 p-3 sm:block">
              <p className="mb-2 text-xs font-semibold">Team productivity</p>
              {[["Sales", 86], ["Service", 72], ["Success", 64]].map(([t, v]) => (
                <div key={t} className="mb-1.5 flex items-center gap-3 text-[10px]">
                  <span className="w-12 text-muted-foreground">{t}</span>
                  <div className="h-2 flex-1 rounded-full bg-panel">
                    <div data-hbar className="h-full origin-left rounded-full bg-electric" style={{ width: `${v}%` }} />
                  </div>
                  <span className="w-7 text-right">{v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
