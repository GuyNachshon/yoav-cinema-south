import StripTitleMarquee from "@/components/StripTitleMarquee";
import StripLocationsTicker from "@/components/StripLocationsTicker";
import BackgroundPattern from "@/components/BackgroundPattern";
import { getEventsByDateByColumn, getUniqueDates } from "@/lib/data";

/** Width of description (title + location) only; time column is separate. */
const SCHEDULE_DESC_WIDTHS: Record<number, number> = { 0: 266, 1: 303, 2: 303 };

function groupByTime(events: { time: string; title: string; location: string; venue?: string }[]) {
  const groups: { time: string; events: typeof events }[] = [];
  for (const ev of events) {
    const last = groups[groups.length - 1];
    if (last && last.time === ev.time) {
      last.events.push(ev);
    } else {
      groups.push({ time: ev.time, events: [ev] });
    }
  }
  return groups;
}

export default async function EventsPage() {
  const dates = getUniqueDates();

  return (
    <main className="relative min-h-screen" style={{ overflowX: "hidden" }}>
      <BackgroundPattern />
      <StripTitleMarquee text="לוח אירועים" speed={200} repeat={100} spacesBetween={2} />
      <StripLocationsTicker />
      <section className="relative min-h-[calc(100vh-260px)] bg-black" dir="rtl">
        {dates.map((date) => {
          const byColumn = getEventsByDateByColumn(date);
          const dayName = byColumn.get(0)?.[0]?.dayName ?? byColumn.get(1)?.[0]?.dayName ?? byColumn.get(2)?.[0]?.dayName ?? "";
          return (
            <div
              key={date}
              className="schedule-strip py-[30px] pr-[80px] flex flex-row gap-8 flex-wrap items-start"
            >
              <div className="flex flex-col shrink-0 text-right">
                <span className="schedule-day">{dayName}</span>
                <span className="schedule-date">{date}</span>
              </div>
              <div className="flex flex-1 min-w-0 flex-wrap" style={{ gap: 20 }}>
                {[0, 1, 2].map((col) => {
                  const columnEvents = byColumn.get(col) ?? [];
                  const timeGroups = groupByTime(columnEvents);
                  const descWidth = SCHEDULE_DESC_WIDTHS[col] ?? 303;
                  return (
                    <div key={col} className="flex flex-col gap-4 min-w-0 flex-1 schedule-event-column">
                      {timeGroups.map(({ time, events: group }) =>
                        group.map((ev, i) => (
                          <article key={`${date}-${col}-${ev.time}-${ev.title}-${i}`} className="text-white flex flex-row items-baseline gap-0">
                            <div className="schedule-time-cell shrink-0 text-right navbar-font text-sm text-white/80">
                              {i === 0 ? time : "\u00A0"}
                            </div>
                            <div
                              className="schedule-event-body shrink-0 min-w-0 break-words w-fit"
                              style={{ width: descWidth }}
                            >
                              <p
                                style={{
                                  color: "#FFF",
                                  textAlign: "right",
                                  fontFamily: "var(--font-the-basics), sans-serif",
                                  fontSize: 15,
                                  fontWeight: 700,
                                  fontStyle: "normal",
                                  lineHeight: "normal",
                                }}
                              >
                                {ev.title}
                              </p>
                              <p
                                className="mt-0.5"
                                style={{
                                  color: "#FFF",
                                  fontFamily: "var(--font-the-basics-mono), ui-monospace, monospace",
                                  fontSize: 13,
                                  fontStyle: "normal",
                                  lineHeight: "normal",
                                }}
                              >
                                {ev.location}
                                {ev.venue ? `, ${ev.venue}` : ""}
                              </p>
                            </div>
                          </article>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
