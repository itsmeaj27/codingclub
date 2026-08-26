import PageHeader from "@/components/page-header";
import { teamMembers } from "@/lib/constants";
import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="">
      <PageHeader
        pagetitle={`Our Team`}
        image1={"/images/icons/calendar.png"}
        image2={"/images/icons/time.png"}
        pagedescription={`Here is our team structure`}
      />
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <div className="mt-6">
          {Object.entries(teamMembers).map(([category, members]) => {
            return (
              <div key={category}>
                <h3 className="mb-6 text-lg font-medium">
                  {category.toUpperCase()}
                </h3>
                <div
                  data-rounded="full"
                  className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4"
                >
                  {members.map((member, index) => (
                    <div key={index}>
                      <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                        <Image
                          className="aspect-square rounded-full object-cover"
                          src={member.avatar}
                          alt={member.name}
                          height={460}
                          width={460}
                          loading="lazy"
                        />
                      </div>
                      <span className="mt-2 block text-sm">{member.name}</span>
                      <span className="text-muted-foreground block text-xs">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
