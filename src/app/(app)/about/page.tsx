import React from "react";
import ContentSection from "./group";
import PageHeader from "@/components/page-header";
import TeamSection from "./team";
import AboutUsSection from "./top-content";

export default function HeroSection() {
  return (
    <div className="w-screen overflow-hidden bg-background">
      <PageHeader
        pagetitle={`About Us`}
        image1={"/images/icons/aboutus.png"}
        image2={"/images/icons/info.png"}
      />

      <AboutUsSection/>
      <TeamSection/>
      <ContentSection />

      <div className="mt-20"></div>
    </div>
  );
}
