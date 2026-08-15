import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EventCard } from "@/components/EventCard";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORY_FILTERS,
  events,
  formatEventDate,
  type EventCategory,
  type YabEvent,
} from "@/data/events";

function normalizeSupabaseEvent(row: Record<string, unknown>): YabEvent | null {
  if (!row || typeof row !== "object") return null;

  const title = typeof row.title === "string" ? row.title.trim() : "";
  const date = typeof row.date === "string" ? row.date : typeof row.event_date === "string" ? row.event_date : "";
  const categoryValue = typeof row.category === "string" ? row.category : "Meeting";
  const category: EventCategory =
    categoryValue === "Volunteering" ||
      categoryValue === "Workshop" ||
      categoryValue === "Meeting"
      ? categoryValue
      : "Meeting";

  if (!title && !row.id) return null;

  const roles = Array.isArray(row.roles)
    ? row.roles.filter((value): value is string => typeof value === "string")
    : [];

  return {
    id: String(row.id ?? `${title || "event"}-${date || "new"}`),
    title: title || "Untitled Event",
    category,
    date,
    start: typeof row.start === "string" ? row.start : "09:00",
    end: typeof row.end === "string" ? row.end : "10:00",
    location: typeof row.location === "string" ? row.location : "TBD",
    description: typeof row.description === "string" ? row.description : "",
    roles,
    featured: Boolean(row.featured),
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youth Advisory Board — Student Events" },
      {
        name: "description",
        content:
          "Browse upcoming school events, cultural fests, workshops and volunteer opportunities from the Youth Advisory Board.",
      },
      { property: "og:title", content: "Youth Advisory Board — Student Events" },
      {
        property: "og:description",
        content: "Upcoming fests, workshops, meetings and volunteer opportunities from Creek students.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<"All" | EventCategory>("All");
  const [search, setSearch] = useState("");
  const [eventsList, setEventsList] = useState<YabEvent[]>(events);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true, nullsFirst: false });

        if (error) throw error;

        const nextEvents = (data ?? [])
          .map((row) => normalizeSupabaseEvent(row as Record<string, unknown>))
          .filter((event): event is YabEvent => Boolean(event));

        if (isMounted) {
          setEventsList(nextEvents.length > 0 ? nextEvents : events);
        }
      } catch (error) {
        console.error("Error fetching events from Supabase:", error);
        if (isMounted) {
          setEventsList(events);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const featured = eventsList.find((e) => e.featured) ?? eventsList[0] ?? null;

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return eventsList
      .filter((e) => (filter === "All" ? true : e.category === filter))
      .filter(
        (e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [eventsList, filter, search]);

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
              Fests, workshops, volunteer opportunities and Monday meetings in IC 715 — just a
              quick look at what’s happening around Creek.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <a href="#events">
                  View Events
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            {featured && (
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
              </div>
            )}
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
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === f.value
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Loading events...
            </p>
          ) : visible.length === 0 ? (
            <p className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No events match that search yet — try another filter.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}