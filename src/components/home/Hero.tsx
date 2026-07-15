"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1668689517032-612c2ed975e4?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "New Season",
    headline: "New Season, New Silhouettes",
    subheadline:
      "Curated apparel from independent labels, restocked weekly.",
    ctaLabel: "Shop New Arrivals",
    ctaHref: "/products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572251328450-19c5082bc582?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Womenswear",
    headline: "Dress for the Life You're Living",
    subheadline:
      "Womenswear built for movement, texture, and everyday wear.",
    ctaLabel: "Shop Women",
    ctaHref: "/products?category=women",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579542118107-6976d510a95c?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Menswear",
    headline: "Tailored, Not Trendy",
    subheadline: "Menswear staples designed to outlast the season.",
    ctaLabel: "Shop Men",
    ctaHref: "/products?category=men",
  },
] as const;

const AUTO_ADVANCE_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-[65vh] min-h-110 w-full items-end overflow-hidden">
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.image}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              active ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={!active}
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
          </div>
        );
      })}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative max-w-xl">
          {SLIDES.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.headline}
                className={cn(
                  "transition-all duration-500 ease-out",
                  active ? "opacity-100" : "opacity-0",
                  !active && "pointer-events-none absolute inset-0 translate-y-3"
                )}
                aria-hidden={!active}
                inert={!active}
              >
                <span className="text-sm font-medium uppercase tracking-wide text-white/80">
                  {slide.eyebrow}
                </span>
                <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
                  {slide.headline}
                </h1>
                <p className="mt-4 text-base text-white/90 sm:text-lg">
                  {slide.subheadline}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={slide.ctaHref}
                    tabIndex={active ? 0 : -1}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-brand text-brand-foreground hover:bg-brand/90"
                    )}
                  >
                    {slide.ctaLabel}
                  </Link>
                  <Link
                    href="/products"
                    tabIndex={active ? 0 : -1}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-white/40 bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    Explore All
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.headline}
              type="button"
              aria-label={`Go to slide ${i + 1}: ${s.headline}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 opacity-80"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
