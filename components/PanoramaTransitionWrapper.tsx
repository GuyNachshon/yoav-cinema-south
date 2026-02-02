"use client";

import { usePathname } from "@/i18n/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { movieThumbLayoutId } from "@/components/MovieThumbnail";

const TRANSITION_KEY = "panorama-transition";
const GHOST_DURATION_MS = 320;

/** Short tween for layout; no spring to avoid jank */
const LAYOUT_TRANSITION = {
  layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] as const },
};

type TransitionData = {
  slug: string;
  src: string;
  rect: { x: number; y: number; width: number; height: number };
};

export default function PanoramaTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [ghost, setGhost] = useState<TransitionData | null>(null);

  useEffect(() => {
    const isDetailPage = /\/movies\/panorama\/[^/]+$/.test(pathname);
    if (isDetailPage) {
      try {
        const raw = sessionStorage.getItem(TRANSITION_KEY);
        if (raw) {
          sessionStorage.removeItem(TRANSITION_KEY);
          const data = JSON.parse(raw) as TransitionData;
          // if (data?.slug && data?.src && data?.rect) {
          //   // Wait for detail page to lay out so Framer measures correct target position
          //   let raf1 = 0;
          //   let raf2 = 0;
          //   raf1 = requestAnimationFrame(() => {
          //     raf2 = requestAnimationFrame(() => setGhost(data));
          //   });
          //   return () => {
          //     cancelAnimationFrame(raf1);
          //     cancelAnimationFrame(raf2);
          //   };
          // }
        }
      } catch {}
    } else {
      try {
        sessionStorage.removeItem(TRANSITION_KEY);
      } catch {}
      setGhost((g) => (g ? null : g));
    }
  }, [pathname]);

  useEffect(() => {
    if (!ghost) return;
    const t = setTimeout(() => setGhost(null), GHOST_DURATION_MS);
    return () => clearTimeout(t);
  }, [ghost]);

  return (
    <LayoutGroup id="panorama">
      {ghost && (
        <motion.div
          layoutId={movieThumbLayoutId(ghost.slug)}
          className="overflow-hidden"
          style={{
            position: "fixed",
            left: ghost.rect.x,
            top: ghost.rect.y,
            width: ghost.rect.width,
            height: ghost.rect.height,
            zIndex: 9999,
            pointerEvents: "none",
          }}
          transition={LAYOUT_TRANSITION}
        >
          <img
            src={ghost.src}
            alt=""
            className="h-full w-full object-cover object-center block"
          />
        </motion.div>
      )}
      {children}
    </LayoutGroup>
  );
}
