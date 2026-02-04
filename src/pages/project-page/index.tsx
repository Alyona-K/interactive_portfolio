import React, { lazy } from "react";
import Hero from "@/features/hero/Hero";
import LazySection from "@/shared/ui/LazySection";

// --- LAZY IMPORT OF FEATURE SECTIONS TO REDUCE INITIAL BUNDLE SIZE ---
const About = lazy(() => import("@/features/about/About"));
const Skills = lazy(() => import("@/features/skills/Skills"));
const ProjectsGallery = lazy(
  () => import("@/features/projectsGallery/ProjectsGallery"),
);
const FaqSlider = lazy(() => import("@/features/faq/FaqSlider"));
const ContactSection = lazy(() => import("@/features/contact/ContactSection"));

interface ProjectPageProps {
  startHeroIntro: boolean;
  onHeroEnterComplete?: () => void;
}

/**
 * --- PROJECT PAGE: COMPOSITE OF HERO AND FEATURE SECTIONS ---
 *
 * Responsible for rendering the full landing page, including:
 * - Hero section with entry animation
 * - Lazy-loaded main content sections
 *
 * Uses LazySection wrapper to defer loading and reduce initial bundle.
 * Provides test IDs for E2E and component testing.
 */
const ProjectPage: React.FC<ProjectPageProps> = ({
  startHeroIntro,
  onHeroEnterComplete,
}) => {
  return (
    <div className="project-page">
      {/* --- HERO SECTION: TRIGGERS CALLBACK ON ANIMATION COMPLETE --- */}
      <div data-testid="hero">
        <Hero
          startIntro={startHeroIntro}
          onAnimationComplete={onHeroEnterComplete}
        />
      </div>

      {/* --- LAZY-LOADED SECTIONS WITH TEST IDS --- */}
      <LazySection Component={About} testId="about" />
      <LazySection Component={Skills} testId="skills" />
      <LazySection Component={ProjectsGallery} testId="projects-gallery" />
      <LazySection Component={FaqSlider} testId="faq-slider" />
      <LazySection Component={ContactSection} testId="contact-section" />
    </div>
  );
};

export default ProjectPage;
