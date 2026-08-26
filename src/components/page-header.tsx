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
    <div className={cn(className, textSize)}>
    <div className="w-full text-center p-10">
      <div className="relative hidden lg:block">
        <div className=" p-2 border border-black/55 dark:border-white/55 rounded-2xl absolute w-15 right-[10vw] top-0 z-50">
          {image1 && (
            <Image
              src={image1}
              className="dark:invert"
              width={200}
              height={200}
              alt="arrow"
            />
          )}
        </div>
        <div className=" p-2 border border-black/55 dark:border-white/55 rounded-2xl absolute w-15 left-[10vw] top-0 z-50">
          {image2 && (
            <Image
              src={image2}
              className="dark:invert"
              width={200}
              height={200}
              alt="arrow"
            />
          )}
        </div>
      </div>
      <h2 className="font-handjet font-black text-2xl md:text-5xl mb-4 text-black dark:text-white">
        {pagetitle}
      </h2>
      <p className="font-jersey text-neutral-700 dark:text-neutral-300 text-sm md:text-xl ">
        {pagedescription}
      </p>
    </div>
    </div>
  );
};

export default PageHeader;
