import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className, textSize }: { className?: string; textSize?: string }) => {
  return (
    <div className="flex flex-row items-center gap-x-1 font-bold">
      <Image
        src="/ccc_logo.png"
        className={cn("invert dark:invert-0 w-7 h-7 md:w-10 md:h-10", className)}
        width={100}
        height={100}
        alt="Coding Club CUH"
      />
      <span className={cn("text-xl md:text-2xl font-bold font-handjet", textSize)}>
        CODING CLUB
      </span>
    </div>
  );
};
