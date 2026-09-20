"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Creating Practical Learning Environments"
          subtitle="Igniting a passion for coding since 2022 — learn, build, and innovate with CUH's hub of programming and technology."
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            { value: 500, label: "Active Members", suffix: "+" },
            { value: 10, label: "Events Organised", suffix: "+" },
            { value: 15, label: "Projects Built", suffix: "+" },
            { value: 20, label: "Workshops Held", suffix: "+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-border bg-card/50 glow-hover transition-all"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl font-bold text-gradient block"
                duration={2.5}
              />
              <p className="mt-2 text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Shaping the future of programmers through coding, creativity, and collaboration. Our peer-driven model ensures every student has the support to grow and excel.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl border border-border bg-card/50">
                <span className="text-3xl font-bold text-gradient">3+</span>
                <p className="text-sm text-muted-foreground mt-1">Years of Excellence</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card/50">
                <span className="text-3xl font-bold text-gradient">50+</span>
                <p className="text-sm text-muted-foreground mt-1">Student Mentors</p>
              </div>
            </div>
          </div>

          <div className="relative bg-card rounded-2xl border border-border p-6 shadow-sm">
            <blockquote>
              <p className="text-lg font-medium leading-relaxed text-foreground">
                {`"The Coding Club was established with a vision to spark curiosity and passion for programming among students of CUH. Together, we are building a community of learners who will shape the digital future."`}
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
                <Image
                  alt="Dr. Sunil Kumar"
                  className="size-14 rounded-full border-2 border-primary/20 object-cover"
                  src="https://res.cloudinary.com/azzisskq/image/upload/v1789927151/codingclub/teams/coordinators/dr_sunil_kumar.jpg"
                  loading="lazy"
                  width={120}
                  height={120}
                />
                <div>
                  <cite className="block font-semibold text-foreground not-italic">
                    Dr. Sunil Kumar
                  </cite>
                  <span className="text-sm text-muted-foreground">
                    Faculty Coordinator, Coding Club CUH
                  </span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
