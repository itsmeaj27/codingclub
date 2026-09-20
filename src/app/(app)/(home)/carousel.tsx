"use client";

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { CLOUDINARY_CAROUSEL_SLIDES } from "@/lib/cloudinary-gallery";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {CLOUDINARY_CAROUSEL_SLIDES.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative z-40">
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="flex items-center justify-center p-0 overflow-hidden rounded-xl">
                  <Image
                    className="w-full h-auto object-cover max-h-[520px] rounded-xl"
                    src={item.href}
                    alt={item.title}
                    width={2700}
                    height={1440}
                    priority={index === 0}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
