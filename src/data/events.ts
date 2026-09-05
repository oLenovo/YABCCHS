export type EventCategory = "Volunteering" | "Clubs" | "Athletics";

export function normalizeEventCategory(category: string): EventCategory {
  switch (category) {
    case "Volunteering":
      return "Volunteering";
    case "Clubs":
      return "Clubs";
    case "Athletics":
      return "Athletics";
    case "Workshop":
      return "Clubs";
    case "Meeting":
      return "Athletics";
    default:
      return "Athletics";
  }
}

export type YabEvent = {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO date
  start?: string | undefined; // HH:MM 24h
  end?: string | undefined;
  location: string;
  description: string;
  roles: string[];
  url?: string | undefined;
  allDay?: boolean;
  featured?: boolean;
};

export const CATEGORY_FILTERS: { label: string; value: "All" | EventCategory }[] = [
  { label: "All", value: "All" },
  { label: "Volunteering", value: "Volunteering" },
  { label: "Clubs", value: "Clubs" },
  { label: "Athletics", value: "Athletics" },
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

function toDateStamp(date: string) {
  return date.replace(/-/g, "");
}

function nextDateStamp(date: string) {
  const nextDate = new Date(`${date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toISOString().slice(0, 10).replace(/-/g, "");
}

export function googleCalendarUrl(e: YabEvent) {
  const hasTimedStart = Boolean(e.start);
  const start = e.start ?? "00:00";
  const end = e.end ?? start;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: e.allDay || !hasTimedStart
      ? `${toDateStamp(e.date)}/${nextDateStamp(e.date)}`
      : `${toStamp(e.date, start)}/${toStamp(e.date, end)}`,
    details: e.description,
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsDataUrl(e: YabEvent) {
  const hasTimedStart = Boolean(e.start);
  const start = e.start ?? "00:00";
  const end = e.end ?? start;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Youth Advisory Board//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@youth-advisory-board`,
    e.allDay || !hasTimedStart ? `DTSTART;VALUE=DATE:${toDateStamp(e.date)}` : `DTSTART:${toStamp(e.date, start)}`,
    e.allDay || !hasTimedStart ? `DTEND;VALUE=DATE:${nextDateStamp(e.date)}` : `DTEND:${toStamp(e.date, end)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.description}`,
    `LOCATION:${e.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
