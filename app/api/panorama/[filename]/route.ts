import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import panoramaData from "@/content/panorama.json";

const ALLOWED = (panoramaData as { panoramaImages: { filename: string }[] }).panoramaImages.map(
  (p) => p.filename
);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const decoded = decodeURIComponent(filename ?? "");
  if (!decoded || !ALLOWED.includes(decoded)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), "content", "assets", "panorama", decoded);
  try {
    const body = await readFile(filePath);
    const ext = path.extname(decoded).toLowerCase();
    const contentType =
      ext === ".png" ? "image/png" : ext === ".jpeg" || ext === ".jpg" ? "image/jpeg" : "image/png";
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
