"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Code2, Rocket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";

const objectives = [
  {
    title: "Classes By Students",
    value: "cbs",
    description: `Peer-to-peer coding sessions. Hands-on workshops on programming & tech. Web development & ML tutorials. Coding contests & hackathons. Learn by teaching & sharing knowledge.`,
    image: "/images/hero1.jpg",
    icon: BookOpen,
  },
  {
    title: "Development Activities",
    value: "da",
    description: `Real-world project building. Open-source contributions. Campus-focused apps & websites. Tech seminars & industry talks. Networking with experts & alumni.`,
    image: "/images/icons/python.png",
    icon: Code2,
  },
  {
    title: "Other Objectives",
    value: "oo",
    description: `Promote coding culture & innovation. Encourage participation in competitions. Strengthen skills for placements & internships. Make coding fun, practical & impactful.`,
    image: "/images/icons/python.png",
    icon: Rocket,
  },
];

export default function Faq() {
  const [activeItem, setActiveItem] = useState(objectives[0].title);

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-muted/30" />

      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20">
            Objectives
          </span>
          <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl font-bold font-handjet tracking-wider">
            Key Objectives of Coding Club
          </h2>
          <p className="text-muted-foreground">
            The main objectives and functions of the Coding Club at Central University of Haryana.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value: string) => setActiveItem(value)}
            className="w-full"
          >
            {objectives.map((item, index) => {
              const Icon = item.icon;
              return (
                <AccordionItem key={index} value={item.title} className="border-border">
                  <AccordionTrigger className="hover:text-primary transition-colors">
                    <div className="flex items-center gap-3 text-base">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      {item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="relative flex overflow-hidden rounded-2xl border border-border bg-card p-2">
            <div className="aspect-[4/3] bg-card relative w-full rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-xl border border-border shadow-md"
                >
                  <Image
                    src={
                      (objectives.find((item) => item.title === activeItem) ?? objectives[0]).image
                    }
                    className="size-full object-cover object-left-top"
                    alt={
                      (objectives.find((item) => item.title === activeItem) ?? objectives[0]).title
                    }
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-primary to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
