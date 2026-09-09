import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ExternalLink, Github } from "lucide-react";

export default async function ProjectsSection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const projectsReq = await payload.find({
      collection: "projects",
      limit: 4,
    });
    const projects = projectsReq.docs || [];

    if (projects.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">Student Projects</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Discover what our community has built.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[16/10] w-full bg-zinc-100 relative overflow-hidden">
                {project.screenshot && typeof project.screenshot === 'object' && project.screenshot.url && (
                  <Image 
                    src={project.screenshot.url} 
                    alt={project.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-2xl">{project.name}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <Github className="w-4 h-4" />
                      </Link>
                    )}
                    {project.liveDemo && (
                      <Link href={project.liveDemo} target="_blank" className="p-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-full hover:opacity-90 transition-opacity">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 font-mono">{project.techStack}</p>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">Built by:</span> {project.members}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  } catch (e) {
    console.error("Error loading projects section:", e);
    return null;
  }
}
