import { BorderBeam } from "@/components/magicui/border-beam";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function ContentSection() {
  const payload = await getPayload({ config: configPromise });

  const galleryReq = await payload.find({
    collection: "gallery",
    where: {
      category: {
        equals: "team",
      },
    },
    limit: 1,
    sort: "-createdAt",
  });

  const teamGroupPhoto = galleryReq.docs?.[0];
  const photoUrl =
    teamGroupPhoto?.image && typeof teamGroupPhoto.image === "object" && teamGroupPhoto.image.url
      ? teamGroupPhoto.image.url
      : null;

  if (!photoUrl) return null;

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
            <p className="text-zinc-600 dark:text-zinc-400">
              {teamGroupPhoto.caption || "A vibrant team of members to manage the coding club efficiently and effectively."}
            </p>
          </div>
        </div>
        <div className="relative rounded-(--radius) overflow-hidden">
          <Image
            className="rounded-(--radius) grayscale hover:grayscale-0 transition-all duration-500 w-full object-cover max-h-[600px]"
            src={photoUrl}
            alt={teamGroupPhoto.caption || "Coding Club CUH Team"}
            height={1000}
            width={1000}
            loading="lazy"
          />
          <BorderBeam
            duration={6}
            size={1000}
            className="from-transparent via-blue-600 to-transparent dark:via-white/50"
          />
        </div>
      </div>
    </section>
  );
}
