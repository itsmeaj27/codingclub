import { cn } from "@/lib/utils"

interface BuiltWithLoveProps {
  by?: string
  className?: string
  heartClassName?: string
}

export function BuiltWithLove({ by = "Your Name", className, heartClassName }: BuiltWithLoveProps) {
  return (
    <div className={cn("flex items-center justify-center text-base text-muted-foreground p-2", className)}>
      Built with{" "}
      <span className={cn("inline-block mx-1 text-red-500 animate-pulse", heartClassName)} aria-hidden="true">
        ❤️
      </span>{" "}
      {" by "}
      <span className="mx-2 text-lg font-black">
        {by}
      </span>
    </div>
  )
}
