export type EventCategory = "Culture" | "Volunteering" | "Workshop" | "Meeting";

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
  { label: "Cultural Fests", value: "Culture" },
  { label: "Volunteering", value: "Volunteering" },
  { label: "Workshops", value: "Workshop" },
  { label: "Meetings", value: "Meeting" },
];

export const events: YabEvent[] = [
  {
    id: "ethnic-fest",
    title: "Ethnic Fest 2026",
    category: "Culture",
    date: "2026-09-19",
    start: "16:00",
    end: "20:00",
    location: "Main Gym & Courtyard",
    description:
      "Our biggest celebration of the year — food booths, music, dance performances and culture clubs from across the school.",
    roles: ["Attendee", "Volunteer", "Booth Host", "Performer"],
    featured: true,
  },
  {
    id: "board-meeting-sept",
    title: "September Board Meeting",
    category: "Meeting",
    date: "2026-09-03",
    start: "15:30",
    end: "16:30",
    location: "Library Conference Room",
    description:
      "Open monthly meeting. Bring ideas, vote on fall projects, and meet the committee leads.",
    roles: ["Attendee", "Note Taker", "Committee Lead"],
  },
  {
    id: "food-drive",
    title: "Neighborhood Food Drive",
    category: "Volunteering",
    date: "2026-09-12",
    start: "09:00",
    end: "13:00",
    location: "Student Center Lobby",
    description:
      "Sort and pack donations with the local food bank. Counts toward community service hours.",
    roles: ["Volunteer", "Sorting Lead", "Driver Helper"],
  },
  {
    id: "public-speaking",
    title: "Public Speaking Workshop",
    category: "Workshop",
    date: "2026-09-24",
    start: "15:45",
    end: "17:00",
    location: "Room 204",
    description:
      "A hands-on session on pitching ideas, running a meeting, and speaking with confidence.",
    roles: ["Attendee", "Volunteer"],
  },
  {
    id: "mural-project",
    title: "Hallway Mural Painting",
    category: "Volunteering",
    date: "2026-10-03",
    start: "10:00",
    end: "15:00",
    location: "B-Wing Hallway",
    description:
      "Help paint a student-designed mural celebrating our school community. No experience needed.",
    roles: ["Volunteer", "Design Crew", "Supply Runner"],
  },
  {
    id: "leadership-lab",
    title: "Leadership Lab: Event Planning",
    category: "Workshop",
    date: "2026-10-10",
    start: "13:00",
    end: "15:00",
    location: "Room 118",
    description:
      "Learn how we budget, plan and run school-wide events from start to finish.",
    roles: ["Attendee", "Volunteer"],
  },
  {
    id: "heritage-night",
    title: "Heritage Night Showcase",
    category: "Culture",
    date: "2026-10-24",
    start: "18:00",
    end: "21:00",
    location: "Auditorium",
    description:
      "An evening of student performances, storytelling and family recipes shared on stage.",
    roles: ["Attendee", "Performer", "Booth Host", "Stage Crew"],
  },
  {
    id: "board-meeting-oct",
    title: "October Board Meeting",
    category: "Meeting",
    date: "2026-10-01",
    start: "15:30",
    end: "16:30",
    location: "Library Conference Room",
    description: "Recap Ethnic Fest, plan winter service projects, and open floor for proposals.",
    roles: ["Attendee", "Note Taker"],
  },
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
