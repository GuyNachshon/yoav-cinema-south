import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const ALLOWED = [
  "nfcf  לוגו 1.svg",
  "לוגו המועצה הישראלית לקולנוע 1.svg",
  "לוגו משרד התרבות והספורט 1.svg",
  "לוגו ספיר שחור_ 1.svg",
  "לוגו שדרות שחור לבן 1.svg",
  "שחור לוגו סינמטק שדרות 1.svg",
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
  const filePath = path.join(process.cwd(), "content", "assets", "landing-footer", decoded);
  try {
    const body = await readFile(filePath);
    return new NextResponse(body, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
