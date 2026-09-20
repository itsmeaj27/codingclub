import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className, textSize }: { className?: string; textSize?: string }) => {
  return (
    <div className="flex flex-row items-center gap-x-2 font-bold group">
      <div className="relative w-7 h-7 md:w-9 md:h-9 overflow-hidden transition-transform group-hover:scale-105">
        <Image
          src="/ccc_logo.png"
          className={cn("object-contain invert dark:invert-0", className)}
          fill
          sizes="(max-width: 768px) 28px, 36px"
          alt="Coding Club CUH"
        />
      </div>
      <span className={cn("text-xl md:text-2xl font-bold font-handjet tracking-wide text-foreground transition-colors group-hover:text-primary", textSize)}>
        CODING CLUB
      </span>
    </div>
  );
};
