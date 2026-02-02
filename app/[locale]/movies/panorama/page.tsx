import StripTitleMarquee from "@/components/StripTitleMarquee";
import BackgroundPattern from "@/components/BackgroundPattern";
import PanoramaPatternStrip from "@/components/PanoramaPatternStrip";
import PanoramaImageStrip from "@/components/PanoramaImageStrip";
import NoBodyScroll from "@/components/NoBodyScroll";

/**
 * Panorama page: no scroll. Fixed viewport.
 * Layout: navbar (3rem) is in layout; main = remaining height.
 * Inside main: header (130) | pattern (30+26) | gap (50) | image strip (flex) | bottom pad (60).
 */
const MAIN_HEIGHT = "calc(100vh - 3rem)"; // 3rem = Navbar h-12

export default function PanoramaPage() {
  return (
    <>
      <NoBodyScroll />
      <main
        className="overflow-hidden flex flex-col bg-black"
        style={{ height: MAIN_HEIGHT }}
      >
      {/* Header strip: 130px */}
      <header className="shrink-0 h-[130px] overflow-hidden relative z-10">
        <BackgroundPattern fixed={false} />
        <StripTitleMarquee text="פנורמה" speed={200} repeat={100} spacesBetween={2} />
      </header>

      {/* Pattern strip: 30px margin + 26px = 56px */}
      <div className="shrink-0 relative z-10">
        <PanoramaPatternStrip />
      </div>

      {/* Gap 50px */}
      <div className="shrink-0 h-[50px]" aria-hidden />

      {/* Remaining area: strip + 60px bottom padding. This div is flex-1 and has pb-60. */}
      <div className="flex-1 min-h-0 flex flex-col pb-[60px] relative z-10">
        <div className="flex-1 min-h-0 overflow-hidden">
          <PanoramaImageStrip />
        </div>
      </div>
    </main>
    </>
  );
}
