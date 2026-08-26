"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChartBarIncreasingIcon, IdCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";

const objectives = [
  {
    title: "Classes By Students",
    value: "cbs",
    description: `
    Peer-to-peer coding sessions.
Hands-on workshops on programming & tech.
Web development & ML tutorials.
Coding contests & hackathons.
Learn by teaching & sharing knowledge.

    `,
    image: "/images/hero1.jpg",
    logo: <IdCard className="size-4" />,
  },
  {
    title: "Development Activities",
    value: "da",
    description: `
    Real-world project building.
Open-source contributions.
Campus-focused apps & websites.
Tech seminars & industry talks.
Networking with experts & alumni.

    `,
    image: "/images/icons/python.png",
    logo: <ChartBarIncreasingIcon className="size-4" />,
  },
  {
    title: "Other Objectives",
    value: "oo",
    description: `
    Promote coding culture & innovation.
Encourage participation in competitions.
Strengthen skills for placements & internships.
Make coding fun, practical & impactful.
.

    `,
    image: "/images/icons/python.png",
    logo: <ChartBarIncreasingIcon className="size-4" />,
  },
];

export default function Faq() {
  const [activeItem, setActiveItem] = useState(objectives[0].title);

  return (
    <section className="relative py-12 md:py-20 lg:py-32">
      <Image
        src={"/images/clearobjective1.png"}
        className="absolute mr-20 dark:invert  w-10 md:w-30 left-[5vw]"
        width={200}
        height={200}
        alt="arrow"
      />
      <Image
        src={"/images/stepup.png"}
        className="absolute mr-20 dark:invert  w-10 md:w-35 right-[5vw]"
        width={200}
        height={200}
        alt="arrow"
      />

      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            Key Objectives of Coding Club
          </h2>
          <p>
            following are the main objectives and functions of the coding club
            at central University of haryana.following are the main objectives
            and functions of the coding club at central University of haryana.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value: string) =>
              setActiveItem(value)
            }
            className="w-full"
          >
            {objectives.map((item, index) => {
              return (
                <AccordionItem key={index} value={item.title}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base">
                      {item.logo}
                      {item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>{item.description}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
            <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  <Image
                    src={
                      (objectives.find((item) => item.title === activeItem) ?? objectives[0])
                        .image
                    }
                    className="size-full object-cover object-left-top dark:mix-blend-lighten"
                    alt={
                      (objectives.find((item) => item.title === activeItem) ?? objectives[0])
                        .title
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
              className="from-transparent via-red-700 to-transparent dark:via-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
