import PageHeader from "@/components/page-header";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Github, Linkedin, User } from "lucide-react";

export default async function TeamSection() {
  const payload = await getPayload({ config: configPromise });

  const teamReq = await payload.find({
    collection: "teams",
    limit: 100,
  });
  const teams = teamReq.docs || [];

  const categoryLabels: Record<string, string> = {
    faculty: "Faculty Coordinators",
    core: "Core Team",
    technical: "Technical Team",
    design: "Design & Media",
    outreach: "Event & Outreach",
  };

  const categoryOrder = ["faculty", "core", "technical", "design", "outreach"];

  const groupedTeams = categoryOrder.reduce((acc, cat) => {
    acc[cat] = teams.filter((m) => m.category === cat);
    return acc;
  }, {} as Record<string, typeof teams>);

  return (
    <section className="min-h-screen pb-16">
      <PageHeader
        pagetitle={`Our Team`}
        image1={"/images/icons/calendar.png"}
        image2={"/images/icons/time.png"}
        pagedescription={`Meet the minds powering Coding Club CUH`}
      />
      <div className="mx-auto max-w-5xl px-6 lg:px-8 mt-8">
        {teams.length === 0 ? (
          <div className="text-center py-16 text-zinc-500">
            <p className="text-lg">No team members added yet.</p>
            <p className="text-sm mt-1 text-zinc-400">Team members added via Payload CMS will appear here dynamically.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categoryOrder.map((categoryKey) => {
              const members = groupedTeams[categoryKey];
              if (!members || members.length === 0) return null;

              return (
                <div key={categoryKey} className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
                  <h3 className="text-xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
                    {categoryLabels[categoryKey] || categoryKey}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {members.map((member) => {
                      const photoUrl =
                        member.photo && typeof member.photo === "object" && member.photo.url
                          ? member.photo.url
                          : null;

                      return (
                        <div
                          key={member.id}
                          className="flex flex-col items-center text-center p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
                        >
                          <div className="size-20 rounded-full border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                            {photoUrl ? (
                              <Image
                                className="aspect-square rounded-full object-cover w-full h-full"
                                src={photoUrl}
                                alt={member.name}
                                height={160}
                                width={160}
                                loading="lazy"
                              />
                            ) : (
                              <User className="w-8 h-8 text-zinc-400" />
                            )}
                          </div>
                          <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{member.name}</span>
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                            {member.position}
                          </span>
                          {member.courseYear && (
                            <span className="text-[11px] text-zinc-500 mt-1">{member.courseYear}</span>
                          )}
                          <div className="flex gap-2 mt-3">
                            {member.github && (
                              <Link
                                href={member.github}
                                target="_blank"
                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                              >
                                <Github className="w-4 h-4" />
                              </Link>
                            )}
                            {member.linkedin && (
                              <Link
                                href={member.linkedin}
                                target="_blank"
                                className="text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <Linkedin className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
