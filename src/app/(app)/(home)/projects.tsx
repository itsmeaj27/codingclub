import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

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
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading 
          title="Student Projects" 
          subtitle="Discover what our community has built." 
          badge="Showcase" 
        />
        
        <div className="grid gap-8 md:grid-cols-2 mt-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-card border-border rounded-2xl overflow-hidden glow-hover gradient-border transition-all duration-300 group">
              <div className="aspect-[16/10] w-full bg-muted relative overflow-hidden">
                {project.screenshot && typeof project.screenshot === 'object' && project.screenshot.url && (
                  <Image 
                    src={project.screenshot.url} 
                    alt={project.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                {/* Dark overlay on hover for better focus */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-2xl text-foreground">{project.name}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="p-2 bg-muted rounded-full hover:bg-secondary text-foreground transition-colors">
                        <Github className="w-4 h-4" />
                      </Link>
                    )}
                    {project.liveDemo && (
                      <Link href={project.liveDemo} target="_blank" className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
                
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.split(',').map((tech, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium border border-border">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {project.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Built by:</span> {project.members}
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
