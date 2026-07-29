import { Link } from "@tanstack/react-router";

type FooterLink = { label: string; to: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Fresh Produce", to: "/shop" },
      { label: "Butchery", to: "/shop" },
      { label: "Bulk & Wholesale", to: "/shop" },
      { label: "Household", to: "/shop" },
      { label: "Offers", to: "/shop" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "5 km Delivery", to: "/" },
      { label: "Trade Accounts", to: "/register" },
      { label: "Click & Collect", to: "/" },
      { label: "Returns", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", to: "/our-story" },
      { label: "Careers", to: "/" },
      { label: "Press", to: "/" },
      { label: "Contact", to: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="surface-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <span className="font-display text-crimson-gradient text-3xl font-semibold tracking-[-0.02em]">ALHARAM</span>
            <span className="mt-1 block text-[10px] tracking-[0.32em] uppercase opacity-60">
              Cash &amp; Carry
            </span>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed opacity-60">
              A thousand-plus lines under one roof, delivered anywhere inside five kilometres. Open
              seven days, 7am–10pm.
            </p>
            <div className="mt-8 h-px w-24 crimson-rule" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-semibold tracking-[0.24em] uppercase opacity-50">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[14px] opacity-80 transition-opacity duration-300 hover:opacity-100"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[12px] opacity-50 sm:flex-row">
          <p>© {new Date().getFullYear()} Alharam Cash &amp; Carry. All rights reserved.</p>
          <p>Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}
