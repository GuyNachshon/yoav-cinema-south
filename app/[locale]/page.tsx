import StripTitleMarquee from "@/components/StripTitleMarquee";
import BackgroundPattern from "@/components/BackgroundPattern";
import TickerStrip from "@/components/TickerStrip";
import LandingFooter from "@/components/LandingFooter";
import { competitionTickers, getTickerSrc } from "@/lib/tickers";
import { eventTickers, getEventTickerSrc } from "@/lib/events";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <BackgroundPattern />
      <StripTitleMarquee text="תחרויות" speed={200} repeat={100} spacesBetween={2} />
      {competitionTickers.map(({ slug, title, speed, acceleration, direction, itemGap, repeat }) => (
        <TickerStrip
          key={slug}
          src={getTickerSrc(slug)}
          title={title}
          alt=""
          speed={speed}
          acceleration={acceleration}
          direction={direction}
          itemGap={itemGap}
          repeat={repeat}
          href={slug === "panorama" ? "/movies/panorama" : undefined}
        />
      ))}
      <StripTitleMarquee text="אירועים" speed={200} repeat={100} spacesBetween={2} />
      {eventTickers.map(({ slug, title, speed, acceleration, direction, itemGap, repeat }) => (
        <TickerStrip
          key={slug}
          src={getEventTickerSrc(slug)}
          title={title}
          alt=""
          speed={speed}
          acceleration={acceleration}
          direction={direction}
          itemGap={itemGap}
          repeat={repeat}
        />
      ))}
      <LandingFooter />
    </main>
  );
}
