"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";

function Divider() {
  return (
    <span
      className="w-px h-12 py-1.5 box-border shrink-0 bg-white bg-clip-content"
      aria-hidden
    />
  );
}

type TravelInfo = { distanceKm: number | null; estimatedArrival: string | null };

export default function Navbar() {
  const t = useTranslations("common.nav");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "he";
  const nextLocale = locale === "he" ? "en" : "he";

  const [travel, setTravel] = useState<TravelInfo>({
    distanceKm: null,
    estimatedArrival: null,
  });

  useEffect(() => {
    fetch("/api/travel-info")
      .then((r) => r.json())
      .then((data: TravelInfo & { error?: string }) => {
        if (!data.error && data.distanceKm != null && data.estimatedArrival)
          setTravel({
            distanceKm: data.distanceKm,
            estimatedArrival: data.estimatedArrival,
          });
      })
      .catch(() => {});
  }, []);

  const estimatedArrivalRaw = travel.estimatedArrival ?? "—";
  const estimatedArrival =
    typeof estimatedArrivalRaw === "string"
      ? estimatedArrivalRaw.replace(/\s*H\s*$/i, " ש׳").replace(/\s*min\s*$/i, " דק׳")
      : estimatedArrivalRaw;
  const distanceKm = travel.distanceKm != null ? String(travel.distanceKm) : "—";

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-white/10">
      <div className="relative h-12 flex items-center justify-between">
        {/* Left group (visual left): הסרטים | לוח אירועים | אודות */}
        <nav
          className="relative z-10 flex items-center gap-0 shrink-0"
          aria-label="Main"
        >
          <Link
            href="/"
            className="text-[15px] text-white navbar-font break-words hover:underline rounded focus:outline-none focus-visible:outline py-1 px-5 shrink-0"
          >
            {t("movies")}
          </Link>
          <Divider />
          <Link
            href="/events"
            className="text-[15px] text-white navbar-font break-words hover:underline rounded focus:outline-none focus-visible:outline py-1 px-5 shrink-0"
          >
            {t("events")}
          </Link>
          <Divider />
          <Link
            href="/about"
            className="text-[15px] text-white navbar-font break-words hover:underline rounded focus:outline-none focus-visible:outline py-1 px-5 shrink-0"
          >
            {t("about")}
          </Link>
        </nav>

        {/* Right group: back (SVG) | separator | EN/عر | Estimated arrival | Distance */}
        <div className="relative z-10 flex items-center gap-0 shrink-0" dir="ltr">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center shrink-0 rounded focus:outline-none focus-visible:outline py-1 px-5 hover:opacity-80"
            aria-label="Back"
          >
            <svg width={30} height={16} viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
              <g opacity="0.8" clipPath="url(#nav-back-clip)">
                <path d="M9.10083 10.2281L16.4632 10.4549L16.6515 10.4353V6.9979L29.9971 11.499L16.6515 16L16.6457 12.5822L9.23411 12.8118C3.80143 12.9713 0 10.1414 0 7.14906V5.52554C0 2.49405 3.90574 0.0475857 9.25439 0.0559832L28.9772 0L28.9859 2.85514L8.15337 3.0035C5.61232 2.89153 3.52038 4.25472 3.51458 5.59272L3.50879 7.56893C3.50299 9.03289 5.62681 10.2253 8.20842 10.2253H9.10373L9.10083 10.2281Z" fill="white" />
              </g>
              <defs>
                <clipPath id="nav-back-clip">
                  <rect width={30} height={16} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <Divider />
          <button
            type="button"
            onClick={() => router.replace(pathname || "/", { locale: nextLocale })}
            className="navbar-lang break-words hover:underline rounded focus:outline-none focus-visible:outline py-1 px-5 shrink-0"
            aria-label={locale === "he" ? "Switch to English" : "החלף לעברית"}
          >
            EN/عر
          </button>
          <Divider />
          <span className="text-[15px] text-white navbar-font break-words shrink-0 py-1 px-5 whitespace-nowrap">
            זמן הגעה משוער: {estimatedArrival}
          </span>
          <Divider />
          <span className="text-[15px] text-white navbar-font break-words shrink-0 py-1 px-5 whitespace-nowrap">
            מרחק: {distanceKm} ק״מ
          </span>
        </div>
      </div>
    </header>
  );
}
