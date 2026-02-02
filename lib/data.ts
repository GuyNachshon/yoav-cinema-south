import type { Category, Event, Movie, AboutCopy } from "@/types/content";
import categoriesData from "@/content/categories.json";
import scheduleData from "@/content/schedule.json";
import moviesData from "@/content/movies.json";
import aboutData from "@/content/about.json";

/** Content files may have a root "name" (Tina display) plus the main array key. */
type Wrapped<T> = { [key: string]: T[] | string };

export const categories: Category[] = (categoriesData as Wrapped<Category>).categories as Category[];
export const movies: Movie[] = (moviesData as Wrapped<Movie>).movies as Movie[];
export const aboutCopy: AboutCopy = aboutData as AboutCopy;

const schedule: Event[] = (scheduleData as Wrapped<Event>).schedule as Event[];

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((m) => m.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getEventsByDate(): Map<string, Event[]> {
  const map = new Map<string, Event[]>();
  for (const e of schedule) {
    const list = map.get(e.date) ?? [];
    list.push(e);
    map.set(e.date, list);
  }
  return map;
}

/** Parse "D.MM" or "DD.MM" to [day, month] for numeric sort. */
function parseDateKey(s: string): [number, number] {
  const [d, m] = s.split(".").map(Number);
  return [d, m];
}

export function getUniqueDates(): string[] {
  const set = new Set(schedule.map((e) => e.date));
  return Array.from(set).sort((a, b) => {
    const [da, ma] = parseDateKey(a);
    const [db, mb] = parseDateKey(b);
    return ma !== mb ? ma - mb : da - db;
  });
}

/** Events for one date grouped by column (0, 1, 2), each array sorted by time. */
export function getEventsByDateByColumn(date: string): Map<number, Event[]> {
  const byColumn = new Map<number, Event[]>();
  const dayEvents = (getEventsByDate().get(date) ?? []).slice();
  dayEvents.sort((a, b) => a.time.localeCompare(b.time));
  for (const e of dayEvents) {
    const col = e.column ?? 0;
    const list = byColumn.get(col) ?? [];
    list.push(e);
    byColumn.set(col, list);
  }
  return byColumn;
}
