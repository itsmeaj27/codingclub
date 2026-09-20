import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { CarouselPlugin } from "./carousel";

export default function HeroSection() {
  return (
    <main className="overflow-hidden relative pt-24 pb-16 lg:pt-36 lg:pb-28">
      {/* Dot grid background */}
      <div aria-hidden className="absolute inset-0 dot-grid opacity-50" />

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center sm:mx-auto max-w-4xl">
          {/* Announcement pill */}
          <Link
            href="/events"
            className="group mx-auto flex w-fit items-center gap-3 rounded-full border border-border bg-card/80 backdrop-blur-sm p-1 pl-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 mb-8"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-foreground text-sm font-medium">
              See Upcoming Events
            </span>
            <span className="block h-4 w-px bg-border" />
            <div className="bg-primary/10 group-hover:bg-primary/20 size-7 overflow-hidden rounded-full transition-colors duration-300 flex items-center justify-center">
              <ArrowRight className="size-3.5 text-primary" />
            </div>
          </Link>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-handjet font-bold tracking-tight text-gradient leading-[1.1]">
            CODING CLUB CUH
          </h1>

          <h2 className="mt-4 text-xl md:text-3xl font-semibold text-muted-foreground tracking-wide">
            By Students. For Students.
          </h2>

          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.3}
            as="p"
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            {`Founded in 2022, Coding Club CUH is the campus hotspot for coding, creativity, and cutting-edge tech. We fuel a culture of programming, innovation, and peer-to-peer learning.`}
          </TextEffect>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <Link href="/auth/signup">
                <UserPlus className="w-5 h-5" />
                <span>Join Coding Club</span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto gap-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Link href="/events">
                <CalendarDays className="w-5 h-5" />
                <span>Explore Events</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Image showcase */}
        <div className="relative mt-16 md:mt-24 overflow-hidden px-2 z-20">
          <div
            aria-hidden
            className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
          />
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl shadow-primary/5 ring-1 ring-border aspect-15/8 glow-hover">
            <CarouselPlugin />
          </div>
        </div>
      </section>
    </main>
  );
}
