const FOOTER_SVGS = [
  "nfcf  לוגו 1.svg",
  "לוגו המועצה הישראלית לקולנוע 1.svg",
  "לוגו משרד התרבות והספורט 1.svg",
  "לוגו ספיר שחור_ 1.svg",
  "לוגו שדרות שחור לבן 1.svg",
  "שחור לוגו סינמטק שדרות 1.svg",
];

const PADDING_LEFT = 40;
const GAP = 50;

function getFooterSvgSrc(filename: string): string {
  return `/api/landing-footer/${encodeURIComponent(filename)}`;
}

export default function LandingFooter() {
  return (
    <footer
      className="flex flex-wrap items-center justify-start py-8"
      dir="ltr"
      style={{ paddingLeft: PADDING_LEFT, gap: GAP }}
      aria-label="Footer logos"
    >
      {FOOTER_SVGS.map((filename) => (
        <img
          key={filename}
          src={getFooterSvgSrc(filename)}
          alt=""
          className="h-12 w-auto object-contain"
          loading="lazy"
        />
      ))}
    </footer>
  );
}
