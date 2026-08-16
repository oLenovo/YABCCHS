import { CalendarPlus, Clock, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatEventDate,
  formatTime,
  getCategoryLabel,
  googleCalendarUrl,
  icsDataUrl,
  type YabEvent,
} from "@/data/events";

const badgeStyles: Record<YabEvent["category"], string> = {
  Volunteering: "bg-accent/20 text-accent-foreground",
  Workshop: "bg-sunny/25 text-sunny-foreground",
  Meeting: "bg-primary/10 text-primary",
};

export function EventCard({
  event,
}: {
  event: YabEvent;
}) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[event.category]}`}
      >
        {getCategoryLabel(event.category)}
      </span>
      <h3 className="mt-3 text-xl font-bold">{event.title}</h3>

      <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-accent" />
          <dd>{formatEventDate(event.date)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-accent" />
          <dd>
            {formatTime(event.start)} – {formatTime(event.end)}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-accent" />
          <dd>{event.location}</dd>
        </div>
      </dl>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>

      <div className="mt-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <CalendarPlus className="size-4" />
              Add to Calendar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
                Google Calendar
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={icsDataUrl(event)} download={`${event.id}.ics`}>
                Apple / Outlook (.ics)
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}
