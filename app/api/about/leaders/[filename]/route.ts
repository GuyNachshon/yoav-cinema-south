import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const ALLOWED = [
  "Danielle Cohen 1.png",
  "Tamir Hod_0 1.png",
  "אסף יעיש ביטון 1.png",
  "ליאור הנגבי 1.png",
  "ליהיא בנימין מנהלת אמנותית 1.png",
  "רני בלייר איש צוות 1.png",
];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const decoded = decodeURIComponent(filename ?? "");
  if (!decoded || !ALLOWED.includes(decoded)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), "content", "assets", "about", decoded);
  try {
    const body = await readFile(filePath);
    return new NextResponse(body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
