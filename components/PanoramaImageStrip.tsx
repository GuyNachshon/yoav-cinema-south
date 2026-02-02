"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { panoramaImages, getPanoramaImageSrc } from "@/lib/panorama";
import { movieThumbLayoutId } from "@/components/MovieThumbnail";

const LAYOUT_TRANSITION = {
  layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] as const },
};

const IMAGE_HEIGHT_MAX = 693;
const IMAGE_WIDTH = 800;
const GAP = 0;
const FIRST_IMAGE_RIGHT_SPACE = 240;
const EDGE_ZONE = 80;
const EDGE_SCROLL_SPEED = 12;

export default function PanoramaImageStrip() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [edgeDir, setEdgeDir] = useState<"left" | "right" | null>(null);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const didDrag = useRef(false);
  const isDraggingRef = useRef(false);
  const pendingNavRef = useRef<string | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      if (e.clientX < EDGE_ZONE) setEdgeDir("left");
      else if (e.clientX > w - EDGE_ZONE) setEdgeDir("right");
      else setEdgeDir(null);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const hasScrolledToRight = useRef(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || hasScrolledToRight.current) return;
    const scrollToRight = () => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth - el.clientWidth;
        hasScrolledToRight.current = true;
      }
    };
    scrollToRight();
    const t1 = setTimeout(scrollToRight, 150);
    const t2 = setTimeout(scrollToRight, 600);
    const ro = new ResizeObserver(() => {
      if (!hasScrolledToRight.current) scrollToRight();
    });
    ro.observe(el);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    didDrag.current = false;
    const link = (e.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    pendingNavRef.current = href ?? null;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current.scrollLeft };
    scrollRef.current.setPointerCapture(e.pointerId);
    e.preventDefault();
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!scrollRef.current || !isDraggingRef.current) return;
    const dx = dragStart.current.x - e.clientX;
    if (Math.abs(dx) > 3) didDrag.current = true;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft + dx;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      isDraggingRef.current = false;
      try {
        scrollRef.current?.releasePointerCapture(e.pointerId);
      } catch {}
      if (!didDrag.current && pendingNavRef.current) {
        const href = pendingNavRef.current;
        const link = document.querySelector<HTMLAnchorElement>(`a[href="${href}"]`);
        const thumb = link?.querySelector("[data-panorama-thumb]");
        const img = thumb?.querySelector("img");
        if (thumb && img) {
          const rect = thumb.getBoundingClientRect();
          try {
            sessionStorage.setItem(
              "panorama-transition",
              JSON.stringify({
                slug: href.split("/").pop(),
                src: img.getAttribute("src") ?? "",
                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
              })
            );
          } catch {}
        }
        router.push(href);
      }
      pendingNavRef.current = null;
      setIsDragging(false);
    },
    [router]
  );

  const handlePointerLeave = useCallback(() => {
    isDraggingRef.current = false;
    pendingNavRef.current = null;
    setIsDragging(false);
    setEdgeDir(null);
  }, []);

  useEffect(() => {
    if (!scrollRef.current || !edgeDir) return;
    const el = scrollRef.current;
    let raf = 0;
    const tick = () => {
      if (!el) return;
      el.scrollLeft += edgeDir === "left" ? -EDGE_SCROLL_SPEED : EDGE_SCROLL_SPEED;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [edgeDir]);

  return (
    <section
      className="h-full min-h-0 min-w-0 flex flex-col select-none"
      aria-label="Panorama films"
    >
      <div
        className="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col"
        style={{ maxHeight: IMAGE_HEIGHT_MAX }}
      >
        <div
          ref={scrollRef}
          className="panorama-strip h-full w-full min-w-0 overflow-x-auto overflow-y-hidden flex items-center flex-nowrap"
          dir="ltr"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        >
          <style>{`.panorama-strip::-webkit-scrollbar { display: none; }`}</style>
          <div
            className="flex flex-nowrap items-center h-full shrink-0"
            style={{ paddingRight: FIRST_IMAGE_RIGHT_SPACE }}
          >
            <div className="flex flex-nowrap items-center h-full shrink-0" style={{ gap: GAP }}>
              {[...panoramaImages].reverse().map(({ slug, filename }) => (
                <Link
                  key={slug}
                  href={`/movies/panorama/${slug}`}
                  className="shrink-0 block h-full overflow-hidden"
                  style={{ width: IMAGE_WIDTH, height: "100%" }}
                >
                  <motion.div
                    layoutId={movieThumbLayoutId(slug)}
                    data-panorama-thumb
                    className="h-full w-full overflow-hidden"
                    transition={LAYOUT_TRANSITION}
                  >
                    <img
                      src={getPanoramaImageSrc(filename)}
                      alt=""
                      className="h-full w-full object-cover object-center block"
                      draggable={false}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
