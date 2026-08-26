import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { CarouselPlugin } from "./carousel";

export default function HeroSection() {
  return (
    <main className="overflow-hidden relative pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>
      
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center sm:mx-auto max-w-4xl">
          <Link
            href="/events"
            className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950 mb-8"
          >
            <span className="text-foreground text-sm font-medium">
              See Upcoming Events
            </span>
            <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
              <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
              </div>
            </div>
          </Link>

          <h1 className="text-5xl md:text-8xl font-handjet font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            CODING CLUB CUH
          </h1>
          
          <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-zinc-600 dark:text-zinc-400 font-jersey tracking-wide">
            By Students. For Students.
          </h2>

          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.3}
            as="p"
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            {`Founded in 2022, Coding Club CUH is the campus hotspot for coding, creativity, and cutting-edge tech. We fuel a culture of programming, innovation, and peer-to-peer learning.`}
          </TextEffect>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto gap-2"
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
              className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto gap-2"
            >
              <Link href="/events">
                <CalendarDays className="w-5 h-5" />
                <span>Explore Events</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24 overflow-hidden px-2 z-20">
          <div
            aria-hidden
            className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
          />
          <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-2 shadow-lg shadow-zinc-950/15 ring-1 aspect-15/8">
            <CarouselPlugin />
          </div>
        </div>
      </section>
    </main>
  );
}
