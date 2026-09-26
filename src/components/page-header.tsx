import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const PageHeader = ({
  className,
  textSize,
  image1,
  image2,
  pagetitle,
  pagedescription,
}: {
  className?: string;
  textSize?: string;
  pagetitle?: string;
  image1?: string;
  image2?: string;
  pagedescription?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden dot-grid flex items-center justify-center",
        className,
        textSize
      )}
    >
      {/* Decorative Floating Left Badge */}
      {image2 && (
        <div
          className="hidden lg:flex items-center justify-center glass-card p-2.5 lg:p-3 rounded-2xl absolute left-4 lg:left-8 xl:left-14 2xl:left-24 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 z-0 pointer-events-none select-none -rotate-6 shadow-xl shadow-black/5 dark:shadow-black/40 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <Image
            src={image2}
            className="dark:invert w-full h-auto object-contain"
            width={120}
            height={120}
            alt="decorative element left"
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 w-full text-center px-6 pt-24 pb-12 md:pt-32 md:pb-16 max-w-3xl lg:max-w-4xl mx-auto">
        <h2 className="font-handjet font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 text-gradient uppercase tracking-tight">
          {pagetitle}
        </h2>

        {pagedescription && (
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {pagedescription}
          </p>
        )}
      </div>

      {/* Decorative Floating Right Badge */}
      {image1 && (
        <div className="hidden lg:flex items-center justify-center glass-card p-2.5 lg:p-3 rounded-2xl absolute right-4 lg:right-8 xl:right-14 2xl:right-24 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 z-0 pointer-events-none select-none rotate-6 shadow-xl shadow-black/5 dark:shadow-black/40 animate-fade-in">
          <Image
            src={image1}
            className="dark:invert w-full h-auto object-contain"
            width={120}
            height={120}
            alt="decorative element right"
          />
        </div>
      )}
    </div>
  );
};

export default PageHeader;

