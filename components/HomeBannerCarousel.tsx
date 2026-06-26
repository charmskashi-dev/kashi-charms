"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export type Slide =
  | { type: "image"; src: string; alt: string; href: string }
  | { type: "video"; src: string; href: string };

const AUTOPLAY_DELAY = 5000; // ms between slides

export default function HomeBannerCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, current]
  );

  const next = useCallback(() => goTo((current + 1) % total), [goTo, current, total]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [goTo, current, total]);

  // Autoplay
  useEffect(() => {
    if (total <= 1 || paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next, total]);

  // Play / pause videos when slide changes
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === current) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [current]);

  if (total === 0) return null;

  // Single static banner (no controls needed)
  if (total === 1) {
    const slide = slides[0];
    return (
      <div className="relative overflow-hidden rounded-lg">
        <SlideContent slide={slide} videoRef={(el) => (videoRefs.current[0] = el)} />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative w-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`
              transition-all duration-500 ease-in-out
              ${i === current ? "opacity-100 translate-x-0 relative" : "opacity-0 absolute inset-0 pointer-events-none"}
            `}
            aria-hidden={i !== current}
          >
            <SlideContent
              slide={slide}
              videoRef={(el) => (videoRefs.current[i] = el)}
            />
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
          bg-white/70 hover:bg-white text-gray-800
          rounded-full w-9 h-9 flex items-center justify-center
          shadow-md transition hover:scale-110 hoverEffect"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
          bg-white/70 hover:bg-white text-gray-800
          rounded-full w-9 h-9 flex items-center justify-center
          shadow-md transition hover:scale-110 hoverEffect"
      >
        <ChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              rounded-full transition-all duration-300
              ${i === current
                ? "w-6 h-2.5 bg-shop-btn-dark-green"
                : "w-2.5 h-2.5 bg-gray-400/60 hover:bg-gray-500"}
            `}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-shop-btn-dark-green/40 w-full z-10">
          <div
            key={current}
            className="h-full bg-shop-btn-dark-green origin-left"
            style={{
              animation: `slideProgress ${AUTOPLAY_DELAY}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
  @keyframes slideProgress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
`}</style>
    </div>
  );
}

/* ─── Individual slide renderer ─────────────────────────────────────────── */
function SlideContent({
  slide,
  videoRef,
}: {
  slide: Slide;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  if (slide.type === "video") {
    return (
      <Link href={slide.href} className="block relative w-full aspect-[16/5] rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={slide.src}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </Link>
    );
  }

  // Image slide
  return (
    <Link href={slide.href} className="block relative w-full aspect-[16/5] rounded-lg overflow-hidden">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </Link>
  );
}

/* ─── Tiny inline SVG icons (no extra dep needed) ───────────────────────── */
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);