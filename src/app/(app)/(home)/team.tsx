import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Github, Linkedin } from "lucide-react";

export default async function TeamSection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const teamReq = await payload.find({
      collection: "teams",
      limit: 50,
    });
    const teams = teamReq.docs || [];

    if (teams.length === 0) return null;

  // Sorting logic based on hierarchy
  const categoryWeight: Record<string, number> = {
    faculty: 1,
    core: 2,
    technical: 3,
    design: 4,
    outreach: 5,
  };

  const getPositionWeight = (pos: string) => {
    const p = pos.toLowerCase();
    if (p.includes('president')) return 1;
    if (p.includes('vice president') || p.includes('vice-president')) return 2;
    if (p.includes('secretary')) return 3;
    if (p.includes('lead') || p.includes('head')) return 4;
    return 5;
  };

  const sortedTeams = [...teams].sort((a, b) => {
    // 1. Sort by category first
    const catA = categoryWeight[a.category] || 99;
    const catB = categoryWeight[b.category] || 99;
    if (catA !== catB) return catA - catB;

    // 2. Sort by position weight within the same category
    const posA = getPositionWeight(a.position);
    const posB = getPositionWeight(b.position);
    return posA - posB;
  });

  return (
    <section className="py-12 md:py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">Meet the Team</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">The passionate students behind Coding Club CUH.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedTeams.map((member) => (
            <div key={member.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-zinc-100">
                {member.photo && typeof member.photo === 'object' && member.photo.url && (
                  <Image 
                    src={member.photo.url} 
                    alt={member.name} 
                    width={96} 
                    height={96} 
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{member.position}</p>
              {member.courseYear && <p className="text-xs text-zinc-500 mb-4">{member.courseYear}</p>}
              
              <div className="mt-auto flex gap-3 pt-4">
                {member.github && (
                  <Link href={member.github} target="_blank" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                    <Github className="w-5 h-5" />
                  </Link>
                )}
                {member.linkedin && (
                  <Link href={member.linkedin} target="_blank" className="text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  } catch (e) {
    console.error("Error loading team section:", e);
    return null;
  }
}
