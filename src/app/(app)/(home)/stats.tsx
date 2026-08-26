import { Logo } from "@/components/logo";
import Image from "next/image";

export default function StatsSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 space-y-6">
          <div className="flex w-full">
            <h2 className="text-4xl font-medium lg:text-5xl w-[50%]">
              Create Practical Learning Environment.
            </h2>
            <div className="w-[50%]  justify-end hidden md:flex">
              <Image
                src={"/images/monitorsetup.png"}
                className="scale-x-[-1] mr-20 dark:invert  w-10 md:w-30 right-[0%]"
                width={200}
                height={200}
                alt="arrow"
              />
            </div>
          </div>

          {/* <Image
            src={"/images/pointer.png"}
            className="absolute w-10 md:w-18 top-10 right-[5%] animate-pulse -rotate-20"
            width={200}
            height={200}
            alt="arrow"
          /> */}

          <p>
           Igniting a passion for coding since 2022 — learn, build, and innovate with CUH’s hub of programming and technology.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div>
            <p>
              Shaping the future of programmers through coding, creativity, and collaboration
            </p>
            <div className="mb-12 mt-12 grid grid-cols-2 gap-2 md:mb-0">
              <div className="space-y-4">
                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">
                  +500
                </div>
                <p>Students</p>
              </div>
              <div className="space-y-4">
                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">
                  +10
                </div>
                <p>Events Organised</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <blockquote className="">
              <p className="text-lg font-semibold">{`The Coding Club was established with a vision to spark curiosity and passion for programming among students of CUH. Our goal is to nurture talent, encourage innovation, and provide a platform for hands-on learning in emerging fields like web development, machine learning, and beyond. Together, we are building a community of learners who will shape the digital future.`}</p>

              <div className="flex flex-row gap-x-5 items-center mt-5">
                <div className="">
                  <Image
                    alt="Dr. Sunil Kumar"
                    className="size-16 rounded-full border object-cover"
                    src="/cuh/sunilsir.jpeg"
                    loading="lazy"
                    width={120}
                    height={120}
                  />
                </div>
                <div className=" space-y-3 border-l-4 pl-4">
                  <cite className="block font-medium">
                    Dr. Sunil Kumar, Coordinator
                  </cite>
                  <Logo
                    className="invert-100 dark:invert-0 w-5 h-5 md:w-7 md:h-7"
                    textSize="text-md md:text-lg font-bold font-handjet"
                  />
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
