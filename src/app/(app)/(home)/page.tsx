import HeroSection from "./hero";
import AboutSection from "./about";
import StatsSection from "./stats";
import ObjectivesSection from "./objectives";
import EventsSection from "./events";
import ProjectsSection from "./projects";
import AchievementsSection from "./achievements";
import TeamSection from "./team";
import TeachersSection from "./teachers";
import GallerySection from "./gallery";
import RecentPostsSection from "./recent-posts";
import WallOfLoveSection from "./testimonial";
import Faq from "./faq";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const siteSettings: any = await (payload as any).findGlobal({
    slug: 'site-settings',
  }).catch(() => null);

  const isMaintenanceActive = Boolean(siteSettings?.maintenanceMode);

  return (
    <div className="overflow-hidden">
      {isMaintenanceActive && (
        <div className="bg-gradient-to-r from-amber-950/90 via-red-950/80 to-amber-950/90 border-b border-amber-500/30 text-amber-200 py-3.5 px-4 text-center text-sm sticky top-16 z-40 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-lg shadow-amber-950/20">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 animate-pulse" />
          <span className="font-bold text-amber-300 tracking-wide">MAINTENANCE NOTICE:</span>
          <span className="text-amber-100/90">
            {siteSettings?.maintenanceMessage ||
              "The student portal is currently undergoing scheduled maintenance. Student login is temporarily disabled."}
          </span>
        </div>
      )}
      <HeroSection />

      <div className="relative">
        {/* Subtle section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <AboutSection />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <StatsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ObjectivesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <EventsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ProjectsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <AchievementsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <TeamSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <TeachersSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <GallerySection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <RecentPostsSection />

      <WallOfLoveSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Faq />
    </div>
  );
}
