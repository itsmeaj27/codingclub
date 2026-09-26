"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Code2,
  Rocket,
  Users,
  Globe,
  Cpu,
  Lightbulb,
  Layout,
  LucideIcon,
} from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Code2,
  Rocket,
  Users,
  Globe,
  Cpu,
  Lightbulb,
  Layout,
};

export interface ObjectiveItem {
  id: string | number;
  title: string;
  description: string;
  icon?: string | null;
  image?: string | null;
}

export default function FaqClient({ items }: { items: ObjectiveItem[] }) {
  const [activeItemTitle, setActiveItemTitle] = useState<string>(
    items[0]?.title || "Classes By Students"
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const currentItem =
    items.find((item) => item.title === activeItemTitle) || items[0];

  if (!items || items.length === 0) return null;

  const CurrentIcon =
    (currentItem?.icon && ICON_MAP[currentItem.icon]) || BookOpen;

  const hasImage =
    currentItem?.image && !imageErrors[currentItem.id || currentItem.title];

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

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

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-start">
          <Accordion
            type="single"
            value={activeItemTitle}
            onValueChange={(value: string) => {
              if (value) setActiveItemTitle(value);
            }}
            className="w-full"
          >
            {items.map((item, index) => {
              const Icon = (item.icon && ICON_MAP[item.icon]) || BookOpen;
              return (
                <AccordionItem
                  key={item.id || index}
                  value={item.title}
                  className="border-border"
                >
                  <AccordionTrigger className="hover:text-primary transition-colors py-4">
                    <div className="flex items-center gap-3 text-base text-left">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <span className="font-semibold text-foreground">
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-12 whitespace-pre-line text-sm">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="relative flex overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-lg">
            <div className="aspect-[4/3] bg-muted/40 relative w-full rounded-xl overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItemTitle}-preview`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-xl border border-border shadow-md relative"
                >
                  {hasImage ? (
                    <Image
                      src={currentItem.image!}
                      className="size-full object-cover object-center"
                      alt={currentItem.title}
                      width={1200}
                      height={900}
                      onError={() => {
                        setImageErrors((prev) => ({
                          ...prev,
                          [currentItem.id || currentItem.title]: true,
                        }));
                      }}
                    />
                  ) : (
                    <div className="size-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary/10 via-background to-card">
                      <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 shadow-sm">
                        <CurrentIcon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-bold text-xl text-foreground font-handjet tracking-wider mb-2">
                        {currentItem.title}
                      </h4>
                      <p className="text-xs text-muted-foreground max-w-xs line-clamp-3">
                        {currentItem.description}
                      </p>
                    </div>
                  )}
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
