import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Customize" },
  { to: "/gallery", label: "Gallery" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full ring-glow-orange bg-background">
            <Zap className="h-5 w-5 text-[var(--neon-orange)]" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider chrome-text">itslitneon<span className="text-[var(--neon-orange)] text-glow-orange">.com</span></div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">by Light Me Up Productions</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-[var(--neon-orange)] text-glow-orange" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="border-[var(--neon-orange)]/50 hover:bg-[var(--neon-orange)]/10">
            <a href="sms:+17024609190"><Phone className="mr-1 h-4 w-4" />Text Joe</a>
          </Button>
          <Button asChild size="sm" className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
            <Link to="/shop">Order Now</Link>
          </Button>
        </div>
        <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2 text-base font-semibold uppercase tracking-wider hover:bg-white/5"
                activeProps={{ className: "text-[var(--neon-orange)] bg-white/5" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button asChild variant="outline" className="border-[var(--neon-orange)]/50">
                <a href="sms:+17024609190"><Phone className="mr-1 h-4 w-4" />Text Joe</a>
              </Button>
              <Button asChild className="bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
                <Link to="/shop" onClick={() => setOpen(false)}>Order Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl chrome-text">LIGHT ME UP PRODUCTIONS</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Custom neon stable clocks built for harness racing barns, tack rooms, and winner's circles.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)] mb-3">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-[var(--neon-orange)]">Customize Your Clock</Link></li>
            <li><Link to="/gallery" className="hover:text-[var(--neon-orange)]">Gallery</Link></li>
            <li><Link to="/how-it-works" className="hover:text-[var(--neon-orange)]">How It Works</Link></li>
            <li><Link to="/faq" className="hover:text-[var(--neon-orange)]">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)] mb-3">Contact Joe</div>
          <ul className="space-y-2 text-sm">
            <li><a href="sms:+17024609190" className="flex items-center gap-2 hover:text-[var(--neon-orange)]"><Phone className="h-4 w-4" />Text 702-460-9190</a></li>
            <li><a href="mailto:lightmeupvegas@yahoo.com" className="flex items-center gap-2 hover:text-[var(--neon-orange)]"><Mail className="h-4 w-4" />lightmeupvegas@yahoo.com</a></li>
            <li><a href="mailto:josephdakuras@aol.com" className="flex items-center gap-2 hover:text-[var(--neon-orange)]"><Mail className="h-4 w-4" />josephdakuras@aol.com</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--neon-orange)] mb-3">Legal</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-[var(--neon-orange)]">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[var(--neon-orange)]">Terms & Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Light Me Up Productions. Built for the harness racing community.
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
