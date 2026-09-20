import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Github, Linkedin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CLOUDINARY_TEAM_MEMBERS } from "@/lib/cloudinary-teams";

export default async function TeamSection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const teamReq = await payload.find({
      collection: "teams",
      limit: 50,
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let teams: any[] = teamReq.docs || [];

    // Seamless fallback to Cloudinary Team if CMS has no entries yet
    if (teams.length === 0) {
      teams = CLOUDINARY_TEAM_MEMBERS;
    }

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
      if (p.includes('patron') || p.includes('chancellor')) return 0;
      if (p.includes('coordinator')) return 1;
      if (p.includes('president')) return 2;
      if (p.includes('vice president') || p.includes('vice-president')) return 3;
      if (p.includes('lead') || p.includes('head')) return 4;
      return 5;
    };

    const sortedTeams = [...teams].sort((a, b) => {
      const catA = categoryWeight[a.category] || 99;
      const catB = categoryWeight[b.category] || 99;
      if (catA !== catB) return catA - catB;

      const posA = getPositionWeight(a.position || "");
      const posB = getPositionWeight(b.position || "");
      return posA - posB;
    });

    return (
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading 
            title="Meet the Team" 
            subtitle="The faculty mentors and passionate students behind Coding Club CUH." 
            badge="Our People" 
          />
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12">
            {sortedTeams.map((member) => (
              <div key={member.id} className="bg-card border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all group glass-card">
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-muted transition-all group-hover:ring-2 group-hover:ring-primary/20">
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
                <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-gradient mb-1">{member.position}</p>
                {member.courseYear && <p className="text-xs text-muted-foreground mb-4">{member.courseYear}</p>}
                
                <div className="mt-auto flex gap-3 pt-4">
                  {member.github && (
                    <Link href={member.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link href={member.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
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
