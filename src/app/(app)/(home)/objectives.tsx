import { Code2, Cpu, Globe, Layout, Lightbulb, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const objectives = [
  {
    title: "Peer Learning",
    description: "Learn from seniors and peers in a collaborative, ego-free environment.",
    icon: Users,
    colorClass: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Web Development",
    description: "Master modern frameworks like React, Next.js, and Node.js.",
    icon: Globe,
    colorClass: "bg-violet-500/10 text-violet-500",
  },
  {
    title: "DSA & Problem Solving",
    description: "Crack coding interviews with daily practice and logic building.",
    icon: Code2,
    colorClass: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "AI & Machine Learning",
    description: "Explore the future of tech with hands-on AI model training.",
    icon: Cpu,
    colorClass: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "UI/UX Design",
    description: "Design beautiful, user-centric interfaces before writing code.",
    icon: Layout,
    colorClass: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Workshops & Hackathons",
    description: "Participate in regular events to build projects under pressure.",
    icon: Lightbulb,
    colorClass: "bg-cyan-500/10 text-cyan-500",
  },
];

export default function ObjectivesSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading 
          title="What We Do" 
          subtitle="Our core objectives and focus areas." 
          badge="Focus Areas" 
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <div key={i} className="bg-card border-border p-6 rounded-2xl glow-hover gradient-border group relative">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${obj.colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-foreground">{obj.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{obj.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
