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

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ObjectivesSection />
      <EventsSection />
      <ProjectsSection />
      <AchievementsSection />
      <TeamSection />
      <GallerySection />
      <RecentPostsSection />
      <WallOfLoveSection />
      <Faq />
    </>
  );
}
