import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EventCard } from "@/components/EventCard";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORY_FILTERS,
  events,
  formatEventDate,
  getCategoryLabel,
  type EventCategory,
  type YabEvent,
} from "@/data/events";

function normalizeSupabaseEvent(row: Record<string, unknown>): YabEvent | null {
  if (!row || typeof row !== "object") return null;

  const title = typeof row.title === "string" ? row.title.trim() : "";
  const date = typeof row.date === "string" ? row.date : typeof row.event_date === "string" ? row.event_date : "";
  const categoryValue = typeof row.category === "string" ? row.category : "Meeting";
  const normalizedCategoryValue =
    categoryValue === "Clubs"
      ? "Workshop"
      : categoryValue === "PTCO"
        ? "Meeting"
        : categoryValue;
  const category: EventCategory =
    normalizedCategoryValue === "Volunteering" ||
      normalizedCategoryValue === "Workshop" ||
      normalizedCategoryValue === "Meeting"
      ? normalizedCategoryValue
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

function formatDateKey(date: Date) {
  const normalized = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return normalized.toISOString().slice(0, 10);
}

function Index() {
  const [filter, setFilter] = useState<"All" | EventCategory>("All");
  const [search, setSearch] = useState("");
  const [eventsList, setEventsList] = useState<YabEvent[]>(events);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const firstEventDate = events[0]?.date;
    return firstEventDate ? new Date(`${firstEventDate}T12:00:00`) : new Date();
  });
  const [month, setMonth] = useState<Date>(() => {
    const firstEventDate = events[0]?.date;
    return firstEventDate ? new Date(`${firstEventDate}T12:00:00`) : new Date();
  });

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

  const eventDates = useMemo(() => new Set(visible.map((event) => event.date)), [visible]);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    const selectedKey = formatDateKey(selectedDate);
    return visible.filter((event) => event.date === selectedKey);
  }, [selectedDate, visible]);

  useEffect(() => {
    if (visible.length === 0) return;
    const firstVisibleDate = new Date(`${visible[0].date}T12:00:00`);
    setMonth(firstVisibleDate);
    setSelectedDate(firstVisibleDate);
  }, [visible]);

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
              Clubs, meetings, volunteer opportunities, Monday meetings in IC 715 — just a
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

          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
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

            <div className="inline-flex rounded-full border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setView("cards")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${view === "cards"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                List view
              </button>
              <button
                type="button"
                onClick={() => setView("calendar")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${view === "calendar"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Calendar view
              </button>
            </div>
          </div>

          {loading ? (
            <p className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Loading events...
            </p>
          ) : visible.length === 0 ? (
            <p className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No events match that search yet — try another filter.
            </p>
          ) : view === "calendar" ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date ?? undefined)}
                  month={month}
                  onMonthChange={setMonth}
                  className="mx-auto w-full max-w-[620px]"
                  components={{
                    DayContent: ({ date }) => {
                      const isoDay = formatDateKey(date);
                      const hasEvent = eventDates.has(isoDay);
                      const isSelected = selectedDate && formatDateKey(selectedDate) === isoDay;
                      const isToday = formatDateKey(new Date()) === isoDay;

                      const backgroundClass = isSelected
                        ? "bg-[#7a4b39] text-white"
                        : isToday
                          ? "bg-[#1e90ff] text-white"
                          : hasEvent
                            ? "bg-[#f7c89f] text-[#3b2a22]"
                            : "bg-transparent text-foreground";

                      return (
                        <div className="flex h-full w-full items-center justify-center">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${backgroundClass}`}
                          >
                            {date.getDate()}
                          </span>
                        </div>
                      );
                    },
                  }}
                />
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h3 className="text-lg font-semibold">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                    : "Select a date"}
                </h3>

                <div className="mt-4 space-y-3">
                  {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map((event) => (
                      <div key={event.id} className="rounded-xl border border-border bg-secondary/40 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {getCategoryLabel(event.category)}
                        </p>
                        <p className="mt-1 font-semibold text-foreground">{event.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatEventDate(event.date)} · {event.location}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No events on this date.</p>
                  )}
                </div>
              </div>
            </div>
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