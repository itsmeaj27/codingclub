import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import { Award, Trophy, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export default async function AchievementsSection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const achievementsReq = await payload.find({
      collection: "achievements",
      limit: 6,
      sort: '-date',
    });
    const achievements = achievementsReq.docs || [];

    if (achievements.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading 
          title="Achievements & Milestones" 
          subtitle="Celebrating the wins of our community members." 
          badge="🏆 Achievements" 
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {achievements.map((item) => (
            <div key={item.id} className="bg-card border-border p-6 rounded-2xl flex flex-col glow-hover transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  {item.category === 'hackathon' ? <Trophy className="w-6 h-6 text-gradient-gold" /> : 
                   item.category === 'award' ? <Award className="w-6 h-6 text-gradient-gold" /> : <Star className="w-6 h-6 text-gradient-gold" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">
                    {item.category.replace('-', ' ')}
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {item.description}
              </p>
              
              {item.image && typeof item.image === 'object' && item.image.url && (
                <div className="mt-auto relative h-32 w-full rounded-xl overflow-hidden bg-muted mb-4">
                  <Image src={item.image.url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              
              <div className="flex justify-between items-center mt-auto border-t border-border pt-4">
                <span className="text-xs font-mono text-muted-foreground">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-medium hover:underline">
                    Read More →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  } catch (e) {
    console.error("Error loading achievements section:", e);
    return null;
  }
}
