import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import PageHeader from "@/components/page-header";

export default function TimelineDemo() {
  const data = [

    // {
    //   title: "Find The Treasure",
    //   content: (
    //     <div>
    //       <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-xl font-normal mb-8">
    //         Built and launched Aceternity UI and Aceternity UI Pro from scratch
    //       </p>
    //     </div>
    //   ),
    // },
    {
      title: "Full Stack Development",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 font-normal mb-8">
         Learn to create complete web applications with front-end, back-end, and database skills.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/events/full-stack.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
        {
      title: "C and Python Classes",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200  font-normal mb-8">
     Interactive sessions to build strong programming fundamentals using C and Python.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/events/c-python.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <PageHeader
        pagetitle={`Coding Club Events`}
        image1={"/images/icons/calendar.png"}
        image2={"/images/icons/time.png"}
        pagedescription={`Bringing Coders Together to Learn, Build, and Grow.`}
      />
      <Timeline data={data} />
    </div>
  );
}
