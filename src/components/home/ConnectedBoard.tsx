import { useEffect, useRef, useState, type ReactNode } from "react";
import { AtSign, CheckCircle2, ChevronRight, Cloud, Database, Globe2, Mic, Paperclip, Send, Settings, Smile, Users, UserRound } from "lucide-react";
import { CAPABILITIES, MASCOT, SALESFORCE_LOGO } from "./ConnectedEcosystem";

const W = 1280;
const H = 760;
const logo = (k: string) => CAPABILITIES.find((c) => c.key === k)!.logo;

/** Scales a fixed-size design canvas to fit its parent box exactly. */
function FitCanvas({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(el.clientWidth / W, el.clientHeight / H)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="relative h-full w-full">
      <div
        className="absolute top-1/2 left-1/2"
        style={{ width: W, height: H, transform: `translate(-50%,-50%) scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

function CardShell({ k, title, sub, className, children }: { k: string; title: string; sub: string; className: string; children: ReactNode }) {
  return (
    <div data-card className={`absolute flex flex-col overflow-hidden rounded-2xl border border-electric/30 bg-panel-2/80 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--electric)_45%,transparent)] backdrop-blur-xl ${className}`}>
      <div className="flex items-center gap-4 border-b border-electric/15 px-5 py-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-light p-2 shadow-lg"><img src={logo(k)} alt="" className="h-full w-full object-contain" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold leading-tight">{title}</p>
          <p className="text-sm text-foreground/75">{sub}</p>
        </div>
        <ChevronRight className="size-6 text-cyan" aria-hidden />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

const STAGES = [
  ["Lead", 12, "bg-electric/70"],
  ["Qualified", 8, "bg-electric"],
  ["Proposal", 6, "bg-violet"],
  ["Negotiation", 4, "bg-rose"],
  ["Closed Won", 10, "bg-success"],
] as const;

function SalesBody() {
  const accounts = [["A", "Acme Corporation", "$125,000", "75%", "bg-electric"], ["G", "Globex Industries", "$89,000", "55%", "bg-cyan"], ["T", "TechNova Solutions", "$75,000", "45%", "bg-violet"]] as const;
  const bars = [30, 42, 55, 68, 92];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex gap-1.5">
        {STAGES.map(([n, c, bg]) => (
          <span key={n} className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-semibold whitespace-nowrap text-primary-foreground ${bg}`}>{n} <span className="opacity-80">{c}</span></span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-3">
        <div className="flex flex-col gap-2">
          {accounts.map(([i, n, v, w, c]) => (
            <div key={n} className="flex flex-1 items-center gap-3 rounded-lg bg-surface-light px-3 text-surface-light-foreground">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground ${c}`}>{i}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold">{n}</p>
                <p className="text-[11px] opacity-70">{v}</p>
                <div className="mt-1 h-1 rounded-full bg-surface-light-foreground/10"><div className={`h-full rounded-full ${c}`} style={{ width: w }} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col rounded-lg border border-electric/15 bg-navy/50 p-3">
          <div className="flex items-start justify-between">
            <p className="text-xs text-foreground/75">Total Pipeline</p>
            <span className="rounded bg-success/20 px-1.5 text-[10px] font-semibold text-success">↑ 28%</span>
          </div>
          <p className="text-3xl font-bold">$2.4M</p>
          <div className="mt-2 flex flex-1 items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div data-bar className="w-full origin-bottom rounded-t bg-gradient-to-t from-electric to-cyan" style={{ height: `${h}%`, minHeight: 6 }} />
                <span className="text-[9px] text-foreground/60">{["Jan", "Feb", "Mar", "Apr", "May"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceBody() {
  const tickets = [["#000482", "Login issue", "High", "bg-rose", "2h ago"], ["#000471", "Payment failed", "Medium", "bg-amber", "5h ago"], ["#000458", "Feature request", "Low", "bg-electric", "1d ago"]] as const;
  return (
    <div className="grid h-full grid-cols-[1.15fr_1fr] gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1.5 text-[11px] font-semibold">
          <span className="rounded-md bg-surface-light px-2.5 py-1 text-electric">Open 6</span>
          <span className="rounded-md bg-panel px-2.5 py-1">In Progress 4</span>
          <span className="rounded-md bg-panel px-2.5 py-1">Resolved 12</span>
        </div>
        {tickets.map(([id, t, p, c, a]) => (
          <div key={id} className="flex flex-1 items-center gap-2.5 border-b border-electric/10">
            <span className={`grid size-7 shrink-0 place-items-center rounded-full ${c}`}><UserRound className="size-4 text-primary-foreground" /></span>
            <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold">{id}</p><p className="text-[11px] text-foreground/65">{t}</p></div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-semibold text-primary-foreground ${c}`}>{p}</span>
            <span className="w-10 text-right text-[10px] text-foreground/55">{a}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-electric/15 bg-navy/50 p-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-surface-light text-xs font-bold text-surface-light-foreground">SW</span>
          <div><p className="text-[13px] font-semibold">Sarah Wilson</p><p className="text-[10px] text-foreground/60">Acme Corporation</p></div>
        </div>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-electric px-2.5 py-1.5 text-[11px]">I'm facing an issue with my account login.</p>
        <p className="max-w-[85%] rounded-lg rounded-tl-none bg-surface-light px-2.5 py-1.5 text-[11px] text-surface-light-foreground">Our team is looking into this. We'll get back to you shortly!</p>
        <div className="mt-auto flex items-center justify-between rounded-md border border-electric/20 px-2.5 py-1.5 text-[11px] text-foreground/50">Type a message… <Send className="size-3.5 text-foreground" /></div>
      </div>
    </div>
  );
}

function SlackBody() {
  return (
    <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-3">
      <div className="flex flex-col gap-1 rounded-lg bg-navy/50 p-2.5 text-[13px]">
        <p className="mb-1 flex items-center justify-between font-semibold">Channels <ChevronRight className="size-4" /></p>
        <p className="flex items-center justify-between rounded-md bg-electric/25 px-2 py-1 font-semibold"># sales-updates <span className="rounded-full bg-rose px-1.5 text-[10px]">3</span></p>
        {["customer-support", "product", "general", "announcements"].map((c) => <p key={c} className="px-2 py-1 text-foreground/75"># {c}</p>)}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-electric p-1"><img src={SALESFORCE_LOGO} alt="" className="w-full" /></span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold">Sales Bot <span className="text-[10px] font-normal text-foreground/55">10:15 AM</span></p>
            <p className="text-[12px]">🎉 Deal moved to Closed Won!</p>
            <div className="mt-1.5 rounded-lg border border-electric/25 bg-navy/60 p-2">
              <p className="text-[12px] font-semibold">Acme Corporation</p>
              <p className="text-[11px] text-foreground/65">$125,000 • Closed Won</p>
              <p className="mt-1.5 rounded-md bg-success py-1 text-center text-[11px] font-semibold">View in Salesforce</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-light text-xs font-bold text-surface-light-foreground">TL</span>
          <div><p className="text-[13px] font-semibold">Team Lead <span className="text-[10px] font-normal text-foreground/55">10:18 AM</span></p><p className="text-[12px]">Great work team! 🚀</p></div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-md border border-electric/20 px-2.5 py-1.5 text-[11px] text-foreground/50">
          <span className="flex-1">Message #sales-updates</span><Smile className="size-3.5" /><Paperclip className="size-3.5" /><Mic className="size-3.5" /><Send className="size-3.5 text-foreground" />
        </div>
      </div>
    </div>
  );
}

function TableauBody() {
  const kpis = [["$2.4M", "Revenue", "28%"], ["1.2K", "Customers", "18%"], ["32%", "Conversion", "12%"], ["92%", "Satisfaction", "6%"]];
  const regions = [["North America", "42%", "bg-cyan"], ["Europe", "28%", "bg-electric"], ["Asia", "20%", "bg-amber"], ["Others", "10%", "bg-rose"]] as const;
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="grid grid-cols-4 gap-2">
        {kpis.map(([v, l, d]) => (
          <div key={l} className="rounded-lg border border-electric/15 bg-navy/50 px-2.5 py-2">
            <p className="text-lg leading-tight font-bold">{v}</p><p className="text-[10px] text-foreground/70">{l}</p><p className="text-[10px] font-semibold text-success">↑ {d}</p>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-2.5">
        <div className="flex flex-col rounded-lg border border-electric/15 bg-navy/50 p-2.5">
          <p className="text-[12px] font-semibold">Revenue Trend</p>
          <svg viewBox="0 0 200 80" className="mt-1 w-full flex-1" preserveAspectRatio="none" aria-hidden>
            <defs><linearGradient id="tb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--electric)" stopOpacity=".6" /><stop offset="1" stopColor="var(--electric)" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 70 L35 45 L70 52 L105 30 L140 34 L200 8 L200 80 L0 80Z" fill="url(#tb)" />
            <path data-trend d="M0 70 L35 45 L70 52 L105 30 L140 34 L200 8" fill="none" stroke="var(--cyan)" strokeWidth="2" pathLength={1} />
          </svg>
        </div>
        <div className="flex gap-2 rounded-lg border border-electric/15 bg-navy/50 p-2.5">
          <Globe2 className="size-14 shrink-0 self-center text-electric/80" aria-hidden />
          <div className="flex flex-1 flex-col justify-center gap-1.5">
            <p className="text-[12px] font-semibold">Customers by Region</p>
            {regions.map(([n, v, c]) => <p key={n} className="flex items-center gap-1.5 text-[10px]"><span className={`size-2 rounded-full ${c}`} /><span className="flex-1">{n}</span>{v}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const LINKS = [
  { d: "M640 380 C 560 300, 600 150, 500 140", icon: Users, at: { x: 595, y: 175 } },
  { d: "M640 380 C 720 300, 680 150, 780 140", icon: Database, at: { x: 700, y: 205 } },
  { d: "M640 380 C 560 460, 600 560, 490 570", icon: UserRound, at: { x: 520, y: 470 } },
  { d: "M640 380 C 720 460, 680 560, 790 570", icon: Cloud, at: { x: 770, y: 470 } },
  { d: "M640 380 C 640 480, 700 560, 720 620", icon: Settings, at: { x: 720, y: 640 } },
];

export function ConnectedBoard() {
  return (
    <FitCanvas>
      {/* connectors */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs><linearGradient id="cb" x1="0" x2="1"><stop offset="0" stopColor="var(--cyan)" /><stop offset="1" stopColor="var(--electric)" /></linearGradient></defs>
        {LINKS.map((l, i) => (
          <g key={i}>
            <path data-path d={l.d} fill="none" stroke="url(#cb)" strokeWidth={2.5} strokeLinecap="round" pathLength={1} opacity={0.8} />
            <circle r={4} fill="var(--cyan)"><animateMotion dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" path={l.d} /></circle>
          </g>
        ))}
      </svg>

      {/* hub */}
      <div data-hub className="absolute" style={{ left: 640 - 160, top: 380 - 190, width: 320, height: 320 }}>
        <div className="orbit-ring absolute -inset-4 rounded-full border border-dashed border-cyan/35" />
        <div className="absolute inset-0 rounded-full border-2 border-electric/60 bg-[radial-gradient(circle,color-mix(in_oklab,var(--electric)_45%,transparent),transparent_70%)] glow-electric" />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <img src={MASCOT} alt="Kefaru rhino mascot" className="mascot-float absolute inset-x-0 bottom-0 mx-auto w-[92%]" />
        </div>
        <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-electric/50 bg-navy/90 px-5 py-2.5 shadow-2xl glow-electric">
          <img src={SALESFORCE_LOGO} alt="Salesforce" className="h-10 w-auto" />
          <div><p className="text-lg leading-tight font-semibold">Salesforce</p><p className="text-sm font-bold tracking-[0.3em] text-cyan">PLATFORM</p></div>
        </div>
      </div>

      {/* node icons */}
      {LINKS.map(({ icon: Icon, at }, i) => (
        <span key={i} data-node className="absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-electric/50 bg-panel shadow-xl glow-electric" style={{ left: at.x, top: at.y }}>
          <Icon className="size-7 text-cyan" aria-hidden />
        </span>
      ))}

      <CardShell k="sales" title="Sales Cloud" sub="Drive Revenue. Build Relationships." className="top-0 left-0 h-[340px] w-[490px]"><SalesBody /></CardShell>
      <CardShell k="service" title="Service Cloud" sub="Deliver Exceptional Customer Service." className="top-0 right-0 h-[340px] w-[490px]"><ServiceBody /></CardShell>
      <CardShell k="slack" title="Slack" sub="Bring Teams and Data Together." className="bottom-0 left-0 h-[370px] w-[470px]"><SlackBody /></CardShell>
      <CardShell k="tableau" title="Tableau" sub="Turn Data into Actionable Insights." className="right-0 bottom-0 h-[370px] w-[470px]"><TableauBody /></CardShell>

      <div data-float className="absolute bottom-0 left-1/2 flex w-[320px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-electric/40 bg-panel-2/90 px-4 py-3 backdrop-blur-xl">
        <CheckCircle2 className="size-7 shrink-0 text-success" aria-hidden />
        <p className="text-[13px] leading-snug">Approvals, updates and insights flow seamlessly across the tools your team already uses.</p>
      </div>
      <AtSign className="hidden" />
    </FitCanvas>
  );
}

/** Compact phone version: mascot hub + 2×2 mini app cards. */
export function ConnectedBoardMobile() {
  const minis = [
    ["sales", "Sales Cloud", "$2.4M", "Pipeline ↑ 28%"],
    ["service", "Service Cloud", "6 open", "1 high priority"],
    ["slack", "Slack", "#sales-updates", "Deal Closed Won 🎉"],
    ["tableau", "Tableau", "92%", "Satisfaction ↑ 6%"],
  ];
  return (
    <div className="flex flex-col items-center gap-3">
      <div data-hub className="relative size-32">
        <div className="absolute inset-0 rounded-full border-2 border-electric/60 glow-electric" />
        <div className="absolute inset-0 overflow-hidden rounded-full"><img src={MASCOT} alt="Kefaru rhino mascot" className="mascot-float absolute inset-x-0 bottom-0 mx-auto w-[92%]" /></div>
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-electric/50 bg-navy/90 px-2.5 py-1">
          <img src={SALESFORCE_LOGO} alt="Salesforce" className="h-4 w-auto" /><span className="text-[9px] font-bold tracking-[0.2em] text-cyan">PLATFORM</span>
        </div>
      </div>
      <div className="mt-2 grid w-full grid-cols-2 gap-2">
        {minis.map(([k, n, v, s]) => (
          <div key={k} data-card className="rounded-xl border border-electric/30 bg-panel-2/80 p-2.5 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-surface-light p-1"><img src={logo(k!)} alt="" className="h-full w-full object-contain" /></span>
              <p className="truncate text-[12px] font-bold">{n}</p>
            </div>
            <p className="mt-1.5 truncate text-sm font-bold">{v}</p>
            <p className="truncate text-[10px] text-foreground/70">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
