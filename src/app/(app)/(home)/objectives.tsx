import { Code2, Cpu, Globe, Layout, Lightbulb, Users } from "lucide-react";

const objectives = [
  {
    title: "Peer Learning",
    description: "Learn from seniors and peers in a collaborative, ego-free environment.",
    icon: Users,
  },
  {
    title: "Web Development",
    description: "Master modern frameworks like React, Next.js, and Node.js.",
    icon: Globe,
  },
  {
    title: "DSA & Problem Solving",
    description: "Crack coding interviews with daily practice and logic building.",
    icon: Code2,
  },
  {
    title: "AI & Machine Learning",
    description: "Explore the future of tech with hands-on AI model training.",
    icon: Cpu,
  },
  {
    title: "UI/UX Design",
    description: "Design beautiful, user-centric interfaces before writing code.",
    icon: Layout,
  },
  {
    title: "Workshops & Hackathons",
    description: "Participate in regular events to build projects under pressure.",
    icon: Lightbulb,
  },
];

export default function ObjectivesSection() {
  return (
    <section className="py-12 md:py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">What We Do</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Our core objectives and focus areas.</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <div key={i} className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{obj.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{obj.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
