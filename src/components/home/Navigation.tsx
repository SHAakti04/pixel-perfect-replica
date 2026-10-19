import { useEffect, useState } from "react";
import { Menu, X, Cloud } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function Navigation() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-border bg-navy/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 py-4 md:px-10" aria-label="Main">
        <a href="#services" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-md bg-primary">
            <Cloud className="size-4.5 text-primary-foreground" aria-hidden />
          </span>
          {SITE.name}
        </a>
        <ul className="hidden items-center gap-9 lg:flex">
          {SITE.nav.map((n) => (
            <li key={n.label}>
              <a href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={SITE.bookingHref}
          className="btn-sweep hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow-electric lg:inline-flex"
        >
          Book a Free Consultation
        </a>
        <button
          className="grid size-10 place-items-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-navy/95 px-5 pb-6 backdrop-blur-xl lg:hidden">
          {SITE.nav.map((n) => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-base font-medium">
              {n.label}
            </a>
          ))}
          <a href={SITE.bookingHref} onClick={() => setOpen(false)} className="mt-5 flex justify-center rounded-md bg-primary py-3.5 font-semibold text-primary-foreground">
            Book a Free Consultation
          </a>
        </div>
      )}
    </header>
  );
}
