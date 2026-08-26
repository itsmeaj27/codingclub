import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import { Award, Trophy, Star } from "lucide-react";

export default async function AchievementsSection() {
  const payload = await getPayload({ config: configPromise });
  
  const achievementsReq = await payload.find({
    collection: "achievements",
    limit: 6,
    sort: '-date',
  });
  const achievements = achievementsReq.docs || [];

  if (achievements.length === 0) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">Achievements & Milestones</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">Celebrating the wins of our community members.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <div key={item.id} className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500 shrink-0">
                  {item.category === 'hackathon' ? <Trophy className="w-6 h-6" /> : 
                   item.category === 'award' ? <Award className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                    {item.category.replace('-', ' ')}
                  </p>
                </div>
              </div>
              
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 flex-grow">
                {item.description}
              </p>
              
              {item.image && typeof item.image === 'object' && item.image.url && (
                <div className="mt-auto relative h-32 w-full rounded-xl overflow-hidden bg-zinc-100 mb-4">
                  <Image src={item.image.url} alt={item.title} fill className="object-cover" />
                </div>
              )}
              
              <div className="flex justify-between items-center mt-auto border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <span className="text-xs font-mono text-zinc-500">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
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
}
