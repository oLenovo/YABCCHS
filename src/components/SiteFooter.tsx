import { Link } from "@tanstack/react-router";
import { BellRing, Instagram, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-warm text-coral-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="font-display text-base font-bold">CCHS Youth Advisory Board</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Promoting positivity and wellness at Creek 🍒 — student-run events and
            good vibes all year.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" hash="events" className="transition-colors hover:text-foreground">
                Event calendar
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Feedback form
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Follow us</h3>
          <div className="mt-3 flex gap-3">
            <a
              href="https://instagram.com/creekyab"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="https://www.remind.com/join/creekyab"
              target="_blank"
              rel="noreferrer"
              aria-label="Remind"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <BellRing className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Youth Advisory Board
      </div>
    </footer>
  );
}
