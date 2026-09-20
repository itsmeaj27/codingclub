import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { User } from "lucide-react";
import { CLOUDINARY_TEAM_MEMBERS } from "@/lib/cloudinary-teams";

export default async function TeamSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let facultyMembers: any[] = [];

  try {
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

    facultyMembers = teamReq.docs || [];
  } catch (err) {
    console.error("Error fetching faculty members from CMS:", err);
  }

  // Fallback to Cloudinary faculty members if CMS has none or on query failure
  if (facultyMembers.length === 0) {
    facultyMembers = CLOUDINARY_TEAM_MEMBERS.filter((m) => m.category === "faculty");
  }

  return (
    <section className="bg-background py-16 md:py-32">
      <div className="mx-auto max-w-5xl border-t border-border px-6">
        <span className="text-sm font-medium -ml-6 -mt-3.5 block w-max bg-background px-6 text-muted-foreground">
          Faculty Coordinators
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl text-foreground font-handjet tracking-wider">Club Mentors</h2>
          </div>
          <div className="mt-6 sm:mt-0 text-xl">
            <p className="text-muted-foreground">
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
                  : (typeof member.photo === "string" ? member.photo : member.photoUrl || null);

              return (
                <div key={member.id} className="group overflow-hidden rounded-xl bg-card border border-border p-3 glass-card glow-hover hover:border-primary/30 transition-all">
                  <div className="h-80 w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center transition-all duration-500 group-hover:h-[20rem]">
                    {photoUrl ? (
                      <Image
                        className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                        src={photoUrl}
                        alt={member.name}
                        width={826}
                        height={1239}
                      />
                    ) : (
                      <User className="w-20 h-20 text-muted-foreground" />
                    )}
                  </div>
                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-semibold text-foreground transition-all duration-500 group-hover:tracking-wider">
                        {member.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">_0{index + 1}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-primary text-sm font-medium opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-gradient">
                        {member.position}
                      </span>
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          className="text-muted-foreground hover:text-primary text-sm opacity-0 translate-y-2 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
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
