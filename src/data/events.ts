export type EventCategory = "Volunteering" | "Clubs" | "PTCO";

export function normalizeEventCategory(category: string): EventCategory {
  switch (category) {
    case "Volunteering":
      return "Volunteering";
    case "Clubs":
      return "Clubs";
    case "PTCO":
      return "PTCO";
    case "Workshop":
      return "Clubs";
    case "Meeting":
      return "PTCO";
    default:
      return "PTCO";
  }
}

export type YabEvent = {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO date
  start: string; // HH:MM 24h
  end: string;
  location: string;
  description: string;
  roles: string[];
  featured?: boolean;
};

export const CATEGORY_FILTERS: { label: string; value: "All" | EventCategory }[] = [
  { label: "All", value: "All" },
  { label: "Volunteering", value: "Volunteering" },
  { label: "Clubs", value: "Clubs" },
  { label: "PTCO", value: "PTCO" },
];

export const events: YabEvent[] = [

];

export function formatEventDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });
}

export function formatTime(t: string) {
  const parts = t.split(":");
  const h = Number(parts[0] ?? 0);
  const m = Number(parts[1] ?? 0);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

function toStamp(date: string, time: string) {
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

export function googleCalendarUrl(e: YabEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${toStamp(e.date, e.start)}/${toStamp(e.date, e.end)}`,
    details: e.description,
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsDataUrl(e: YabEvent) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Youth Advisory Board//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@youth-advisory-board`,
    `DTSTART:${toStamp(e.date, e.start)}`,
    `DTEND:${toStamp(e.date, e.end)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.description}`,
    `LOCATION:${e.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
