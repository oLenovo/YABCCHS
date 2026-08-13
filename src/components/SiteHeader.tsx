import { Link } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  search?: string;
  onSearchChange?: (value: string) => void;
};

const links = [
  { to: "/", label: "Upcoming Events", hash: "events" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact / Links" },
] as const;

export function SiteHeader({ search, onSearchChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-warm text-coral-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Youth Advisory Board
          </span>
        </Link>

        <div className="relative order-last w-full sm:order-none sm:ml-auto sm:w-56 lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search events"
            placeholder="Search events…"
            value={search ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            disabled={!onSearchChange}
            className="h-10 rounded-full pl-9"
          />
        </div>

        <nav className="flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...("hash" in l ? { hash: l.hash } : {})}
              className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
