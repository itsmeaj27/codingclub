import { SectionHeading } from "@/components/ui/section-heading";
import { Target, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              title="About Coding Club CUH"
              badge="Who We Are"
              align="left"
              className="mb-8"
            />
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Coding Club CUH was founded in 2022 with a clear vision: to create an ecosystem where students can learn, build, and grow together. We bridge the gap between academic theory and real-world software engineering.
            </p>
            <div className="space-y-4">
              <div className="bg-card p-5 rounded-2xl border border-border glow-hover transition-all">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Our Mission
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed pl-[52px]">
                  To foster a strong programming culture and equip students with modern tech skills through peer-to-peer learning and hands-on projects.
                </p>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border glow-hover transition-all">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  Students Teach, Students Learn
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed pl-[52px]">
                  We believe the best way to learn is to teach. Our club operates on a peer learning model where senior students guide and mentor juniors.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
            {/* Abstract decorative background */}
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-handjet font-bold text-gradient">
                  CC
                </div>
                <div className="text-lg font-medium text-muted-foreground mt-2">
                  Est. 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
