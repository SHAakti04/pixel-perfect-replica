// Configurable CTA destinations. Replace with real booking / services URLs when available.
export const SITE = {
  name: "CloudPeak",
  bookingHref: "#consultation",
  servicesHref: "#services",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#connected" },
    { label: "Industries", href: "#outcomes" },
    { label: "About", href: "#consultation" },
    { label: "Contact", href: "#consultation" },
  ],
};

export const SCENES = [
  { id: "vision", label: "Vision" },
  { id: "connected", label: "Connected" },
  { id: "outcomes", label: "Outcomes" },
] as const;
