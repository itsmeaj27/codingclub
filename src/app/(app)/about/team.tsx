import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { User } from "lucide-react";

export default async function TeamSection() {
  const payload = await getPayload({ config: configPromise });

  const teamReq = await payload.find({
    collection: "teams",
    where: {
      category: {
        equals: "faculty",
      },
    },
    limit: 10,
  });

  const facultyMembers = teamReq.docs || [];

  if (facultyMembers.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          Faculty Coordinators
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">Club Mentors</h2>
          </div>
          <div className="mt-6 sm:mt-0 text-xl">
            <p className="text-zinc-600 dark:text-zinc-400">
              Guiding and mentoring the students of Central University of Haryana.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {facultyMembers.map((member, index) => {
              const photoUrl =
                member.photo && typeof member.photo === "object" && member.photo.url
                  ? member.photo.url
                  : null;

              return (
                <div key={member.id} className="group overflow-hidden">
                  <div className="h-96 w-full rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl">
                    {photoUrl ? (
                      <Image
                        className="h-full w-full object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
                        src={photoUrl}
                        alt={member.name}
                        width={826}
                        height={1239}
                      />
                    ) : (
                      <User className="w-20 h-20 text-zinc-400" />
                    )}
                  </div>
                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between">
                      <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                        {member.name}
                      </h3>
                      <span className="text-xs">_0{index + 1}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {member.position}
                      </span>
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          Profile
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
