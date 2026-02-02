import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import StripTitleMarquee from "@/components/StripTitleMarquee";
import BackgroundPattern from "@/components/BackgroundPattern";
import PanoramaPatternStrip from "@/components/PanoramaPatternStrip";
import MovieThumbnail from "@/components/MovieThumbnail";
import { panoramaImages, getPanoramaImageSrc } from "@/lib/panorama";
import { getMovieBySlug } from "@/lib/data";

/** Detail page: portrait orientation 693×800 (inverted from strip 800×693), height 265px */
const DETAIL_ASPECT = 693 / 800;
const THUMB_HEIGHT = 265;
const THUMB_WIDTH = Math.round(THUMB_HEIGHT * DETAIL_ASPECT);

const CONTENT_TOP_GAP = 85;
const CONTENT_RIGHT = 35;
const GAP_EVENT_IMAGE = 80;
const GAP_IMAGE_DESC = 22;
const GAP_DESC_CREDITS = 24;
const CREDITS_WIDTH = 142;
const CONTENT_LEFT = 20;
const COMPETITION_NAME = "פנורמה";

const fontTheBasics = "var(--font-the-basics), sans-serif";

type Props = { params: Promise<{ slug: string }> };

export default async function PanoramaMoviePage({ params }: Props) {
  const { slug } = await params;
  const item = panoramaImages.find((p) => p.slug === slug);
  if (!item) notFound();

  const movie = getMovieBySlug(slug);
  const headerText = movie?.screenings?.[0]
    ? `${movie.screenings[0].time} ${movie.screenings[0].date}`
    : COMPETITION_NAME;

  return (
    <main className="min-h-screen bg-black">
      <div className="relative z-10 h-[130px] overflow-hidden">
        <BackgroundPattern fixed={false} />
        <StripTitleMarquee text={headerText} speed={200} repeat={100} spacesBetween={2} />
      </div>
      <div className="relative z-10">
        <PanoramaPatternStrip />
      </div>
      <div
        className="relative z-10 min-h-[calc(100vh-130px-56px)]"
        style={{ paddingTop: CONTENT_TOP_GAP, paddingRight: CONTENT_RIGHT, paddingLeft: CONTENT_LEFT, marginLeft: "auto" }}
      >
        {/* Horizontal row, RTL: [event type] 80px [image] 22px [description] 2px [credits] */}
        <div
          className="flex flex-nowrap items-start text-white"
          style={{ flexDirection: "row", direction: "rtl" }}
        >
          {/* 1. Event type (rightmost) — link back to panorama movies */}
          <Link
            href="/movies/panorama"
            className="navbar-font text-[15px] shrink-0 text-white hover:opacity-80 transition-opacity"
            style={{ marginLeft: GAP_EVENT_IMAGE }}
          >
            {COMPETITION_NAME}
          </Link>

          {/* 2. Image */}
          <div className="shrink-0" style={{ marginLeft: GAP_IMAGE_DESC }}>
            <MovieThumbnail
              slug={slug}
              src={getPanoramaImageSrc(item.filename)}
              width={THUMB_WIDTH}
              height={THUMB_HEIGHT}
            />
          </div>

          {/* 3. Description column (title, metadata, then synopsis | credits row) | 4. Credits beside synopsis, no overlap */}
          {movie && (
            <div
              className="flex flex-col items-stretch min-w-0 flex-1"
              style={{ marginLeft: GAP_DESC_CREDITS }}
            >
              <h1
                style={{
                  color: "#FFF",
                  textAlign: "right",
                  fontFamily: fontTheBasics,
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: "normal",
                  letterSpacing: -0.64,
                }}
              >
                {movie.title} | {movie.directors}
              </h1>
              <p
                className="mt-3"
                style={{
                  color: "#FFF",
                  textAlign: "right",
                  fontFamily: fontTheBasics,
                  fontSize: 18,
                  fontWeight: 100,
                  lineHeight: "normal",
                  letterSpacing: -0.36,
                }}
              >
                {movie.year} | {movie.duration} דקות | {movie.languages} | {movie.genre}
              </p>
              <div
                className="flex flex-row flex-nowrap items-start mt-6"
                style={{ gap: GAP_DESC_CREDITS, direction: "rtl" }}
              >
                <p
                  className="flex-1 min-w-0 whitespace-pre-line"
                  style={{
                    color: "#FFF",
                    textAlign: "right",
                    fontFamily: fontTheBasics,
                    fontSize: 32,
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {movie.synopsis}
                </p>
                {movie.credits?.length > 0 && (
                  <div
                    className="flex flex-col gap-y-1 shrink-0"
                    style={{ width: CREDITS_WIDTH, textAlign: "right" }}
                  >
                    {movie.credits.map((c) => (
                      <p key={c.role} style={{ lineHeight: "normal" }}>
                        <span
                          style={{
                            color: "#FFF",
                            fontFamily: fontTheBasics,
                            fontSize: 15,
                            fontWeight: 400,
                          }}
                        >
                          {c.role}:{" "}
                        </span>
                        <span
                          style={{
                            color: "#FFF",
                            fontFamily: fontTheBasics,
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          {c.name}
                        </span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
