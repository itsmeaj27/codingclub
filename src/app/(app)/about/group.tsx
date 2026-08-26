import { BorderBeam } from "@/components/magicui/border-beam";
import Image from "next/image";
export default function ContentSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
      <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          Team
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">CCC Members</h2>
          </div>
          <div className="mt-6 sm:mt-0 text-xl">
            <p>
              A vibrant team of members to manage the coding club efficiently and
              effectively.
            </p>
          </div>
        </div>
      <div className="relative rounded-(--radius) ">
          <Image
            className="rounded-(--radius) grayscale w-full border-10"
            src="/cuhteam.jpeg"
            alt="team image"
            height={1000}
            width={1000}
            loading="lazy"
          />
          <BorderBeam
            duration={6}
            size={1000}
            className=" from-transparent via-red-700 to-transparent dark:via-white/50"
          />
        </div>

      </div>
    </section>
  );
}
