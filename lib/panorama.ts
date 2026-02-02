import panoramaData from "@/content/panorama.json";

export type PanoramaImage = { slug: string; filename: string };

export const panoramaImages: PanoramaImage[] = (
  panoramaData as { panoramaImages: PanoramaImage[] }
).panoramaImages;

export function getPanoramaImageSrc(filename: string): string {
  return `/api/panorama/${encodeURIComponent(filename)}`;
}
