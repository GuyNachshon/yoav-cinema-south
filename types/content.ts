export type Credit = { role: string; name: string };
export type Screening = { date: string; time: string; venue?: string };

export type Event = {
  date: string;
  dayName: string;
  time: string;
  title: string;
  subtitle?: string;
  location: string;
  venue?: string;
  /** Column index 0–2 for the three lists per day. Optional; defaults to 0. */
  column?: number;
};

export type Category = {
  slug: string;
  nameHe: string;
  patternKey: string;
  order: number;
};

export type Movie = {
  slug: string;
  categorySlugs: string[];
  title: string;
  directors: string;
  year: number;
  duration: number;
  languages: string;
  genre: string;
  synopsis: string;
  credits: Credit[];
  stillImage: string;
  screenings: Screening[];
};

export type AboutCopy = {
  column1: string;
  column2: string;
};

export type CompetitionTicker = {
  slug: string;
  title: string;
  /** Scroll duration in seconds (lower = faster). Optional, default from TickerStrip. */
  speed?: number;
  /** Seconds to ramp from idle to full speed on hover. Optional. */
  acceleration?: number;
  /** Scroll direction. Optional, default "left". */
  direction?: "left" | "right";
  /** Gap between ticker items in px (negative = overlap). Optional. */
  itemGap?: number;
  /** Number of item repetitions (use more when itemGap is negative). Optional. */
  repeat?: number;
};

export type EventTicker = {
  slug: string;
  title: string;
  order?: number;
  speed?: number;
  acceleration?: number;
  direction?: "left" | "right";
  itemGap?: number;
  repeat?: number;
};

export type LandingContent = {
  heroImageMain: string;
  heroImageSecondary: string;
};
