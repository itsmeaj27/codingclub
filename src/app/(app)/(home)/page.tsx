import HeroSection from "./hero";
import AboutSection from "./about";
import StatsSection from "./stats";
import ObjectivesSection from "./objectives";
import EventsSection from "./events";
import ProjectsSection from "./projects";
import AchievementsSection from "./achievements";
import TeamSection from "./team";
import GallerySection from "./gallery";
import RecentPostsSection from "./recent-posts";
import WallOfLoveSection from "./testimonial";
import Faq from "./faq";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <div className="overflow-hidden">
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
      <GallerySection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <RecentPostsSection />

      <WallOfLoveSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Faq />
    </div>
  );
}
