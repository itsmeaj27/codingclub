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

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
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
        {[{href:"/cuh/sunilsir.jpeg"},{href:"/cuh/vcsir.jpeg"},{href:"/cuh/groupphoto.jpeg"},{href:"/cuh/danikbhashak.jpeg"}].map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative z-40">
              <Card>
                <CardContent className="flex items-center justify-center">
                  
                   <Image
                    className="bg-background  relative bg-cover bg-center"
                    src={item.href}
                    alt="app screen"
                    width="2700"
                    height="1440"
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
