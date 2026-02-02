import { NextRequest } from "next/server";

// Festival venue (Be'er Sheva area – adjust to actual venue)
const FESTIVAL_LAT = 31.2518;
const FESTIVAL_LON = 34.7913;
const AVG_SPEED_KMH = 55;

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    null
  );
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatEta(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m} דק׳`;
  return `${h}:${String(m).padStart(2, "0")} ש׳`;
}

export async function GET(request: NextRequest) {
  const clientIp = getClientIp(request);
  const isLocal =
    !clientIp || clientIp === "::1" || clientIp.startsWith("127.");

  // With no client IP (e.g. local dev), ip-api.com will geolocate the request IP (server) so we still get a result
  const url = isLocal
    ? "http://ip-api.com/json?fields=lat,lon,status"
    : `http://ip-api.com/json/${encodeURIComponent(clientIp)}?fields=lat,lon,status`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.status !== "success" || data.lat == null || data.lon == null) {
      return Response.json(
        { distanceKm: null, estimatedArrival: null, error: "geolocation_failed" },
        { status: 200 }
      );
    }

    const distanceKm = Math.round(
      haversineKm(data.lat, data.lon, FESTIVAL_LAT, FESTIVAL_LON)
    );
    const hours = distanceKm / AVG_SPEED_KMH;
    const estimatedArrival = formatEta(hours);

    return Response.json({ distanceKm, estimatedArrival });
  } catch (e) {
    return Response.json(
      { distanceKm: null, estimatedArrival: null, error: "fetch_error" },
      { status: 200 }
    );
  }
}
