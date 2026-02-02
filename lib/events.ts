import type { EventTicker } from "@/types/content";
import eventsData from "@/content/events.json";

export const eventTickers: EventTicker[] = (
  eventsData as { events: EventTicker[] }
).events;

export function getEventTickerSrc(slug: string): string {
  return `/api/ticker/events/${slug}`;
}
