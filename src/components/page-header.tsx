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
    <div className={cn("relative w-full overflow-hidden dot-grid", className, textSize)}>
      <div className="w-full text-center px-6 pt-24 pb-12 md:pt-32 md:pb-16 max-w-5xl mx-auto">
        <div className="relative hidden lg:block">
          {image1 && (
            <div className="glass-card p-3 rounded-2xl absolute w-16 md:w-20 right-[5vw] xl:right-[10vw] top-4 z-10 animate-fade-in">
              <Image
                src={image1}
                className="dark:invert w-full h-auto object-contain"
                width={200}
                height={200}
                alt="decorative element"
              />
            </div>
          )}
          {image2 && (
            <div className="glass-card p-3 rounded-2xl absolute w-16 md:w-20 left-[5vw] xl:left-[10vw] top-12 z-10 animate-fade-in" style={{ animationDelay: "150ms" }}>
              <Image
                src={image2}
                className="dark:invert w-full h-auto object-contain"
                width={200}
                height={200}
                alt="decorative element"
              />
            </div>
          )}
        </div>
        
        <h2 className="font-handjet font-black text-4xl md:text-6xl lg:text-7xl mb-6 text-gradient uppercase tracking-tight">
          {pagetitle}
        </h2>
        
        {pagedescription && (
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {pagedescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
