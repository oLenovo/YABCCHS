import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EventCard } from "@/components/EventCard";
import { SignUpDialog } from "@/components/SignUpDialog";
import {
  CATEGORY_FILTERS,
  events,
  formatEventDate,
  type EventCategory,
  type YabEvent,
} from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth Advisory Board — Student Events & Sign-Ups" },
      {
        name: "description",
        content:
          "Browse upcoming school events, cultural fests, workshops and volunteer slots — and sign up in seconds with our student Youth Advisory Board.",
      },
      { property: "og:title", content: "Youth Advisory Board — Student Events & Sign-Ups" },
      {
        property: "og:description",
        content: "Upcoming fests, workshops, meetings and volunteer slots. Sign up in seconds.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<"All" | EventCategory>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<YabEvent | null>(null);
  const [open, setOpen] = useState(false);

  const featured = events.find((e) => e.featured) ?? events[0]!;

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events
      .filter((e) => (filter === "All" ? true : e.category === filter))
      .filter(
        (e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filter, search]);

  function openSignUp(event: YabEvent) {
    setSelected(event);
    setOpen(true);
  }

  return (
    <div className="min-h-screen">
      <SiteHeader search={search} onSearchChange={setSearch} />

      <main>
        <section className="bg-gradient-hero text-foreground">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/70 px-4 py-1.5 text-sm font-medium">
              <PartyPopper className="size-4" />
              Promoting positivity & wellness at Creek 🍒
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Good vibes, big events, all made by Creek students.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Fests, workshops, volunteer slots and our Monday meetings in IC 715 — find something
              you love and grab your spot in under a minute.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <a href="#events">
                  View Events
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                size="lg"
                onClick={() => openSignUp(featured)}
                className="bg-gradient-warm font-semibold text-sunny-foreground hover:opacity-90"
              >
                Join a Committee / Sign Up
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-card/60 bg-card/60 p-5 backdrop-blur-sm">
              <CalendarDays className="size-6" />
              <div className="flex-1">
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Next major event
                </p>
                <p className="text-lg font-semibold">
                  {featured.title} — {formatEventDate(featured.date)} · Coming soon!
                </p>
              </div>
              <Button variant="secondary" onClick={() => openSignUp(featured)}>
                Sign up
              </Button>
            </div>
          </div>
        </section>

        <section id="events" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Upcoming events</h2>
          <p className="mt-2 text-muted-foreground">
            Pick what you're into, or search from the bar up top — everyone's welcome.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No events match that search yet — try another filter.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((e) => (
                <EventCard key={e.id} event={e} onSignUp={openSignUp} />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
      <SignUpDialog event={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
