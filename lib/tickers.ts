import type { CompetitionTicker } from "@/types/content";
import competitionsData from "@/content/competitions.json";

export const competitionTickers: CompetitionTicker[] = (
  competitionsData as { competitions: CompetitionTicker[] }
).competitions;

export function getTickerSrc(slug: string): string {
  return `/assets/tickers/competitions/${slug}.svg`;
}
