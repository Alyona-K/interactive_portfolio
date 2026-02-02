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


//-------

// import React, { lazy } from "react";
// import Hero from "@/features/hero/Hero";
// import LazySection from "@/shared/ui/LazySection";

// const About = lazy(() => import("@/features/about/About"));
// const Skills = lazy(() => import("@/features/skills/Skills"));
// const ProjectsGallery = lazy(
//   () => import("@/features/projectsGallery/ProjectsGallery"),
// );
// const FaqSlider = lazy(() => import("@/features/faq/FaqSlider"));
// const ContactSection = lazy(() => import("@/features/contact/ContactSection"));

// interface ProjectPageProps {
//   startHeroIntro: boolean;
//   onHeroEnterComplete?: () => void;
// }

// const ProjectPage: React.FC<ProjectPageProps> = ({
//   startHeroIntro,
//   onHeroEnterComplete,
// }) => {
//   return (
//     <div className="project-page">
//       {/* Hero сразу, уведомляет App о завершении анимации */}
//       <div data-testid="hero">
//         <Hero
//           startIntro={startHeroIntro}
//           onAnimationComplete={onHeroEnterComplete}
//         />
//       </div>

//       {/* Lazy sections с data-testid */}
//       <LazySection Component={About} testId="about" />
//       <LazySection Component={Skills} testId="skills" />
//       <LazySection Component={ProjectsGallery} testId="projects-gallery" />
//       <LazySection Component={FaqSlider} testId="faq-slider" />
//       <LazySection Component={ContactSection} testId="contact-section" />
//     </div>
//   );
// };

// export default ProjectPage;



//---------------------

// import React, { lazy } from "react";
// import Hero from "@/features/hero/Hero";

// const About = lazy(() => import("@/features/about/About"));
// const Skills = lazy(() => import("@/features/skills/Skills"));
// const ProjectsGallery = lazy(
//   () => import("@/features/projectsGallery/ProjectsGallery"),
// );
// const FaqSlider = lazy(() => import("@/features/faq/FaqSlider"));
// const ContactSection = lazy(() => import("@/features/contact/ContactSection"));

// interface LazySectionProps {
//   Component: React.LazyExoticComponent<React.FC<any>>;
//   testId: string;
// }

// const LazySection: React.FC<LazySectionProps> = ({ Component, testId }) => {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const ref = React.useRef<HTMLDivElement>(null);

//   React.useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "200px" },
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div ref={ref} data-testid={testId}>
//       {isVisible && <Component />}
//     </div>
//   );
// };

// interface ProjectPageProps {
//   startHeroIntro: boolean;
//   onHeroEnterComplete?: () => void;
// }

// const ProjectPage: React.FC<ProjectPageProps> = ({
//   startHeroIntro,
//   onHeroEnterComplete,
// }) => {
//   return (
//     <div className="project-page">
//       {/* Hero сразу, уведомляет App о завершении анимации */}
//       <div data-testid="hero">
//         <Hero
//           startIntro={startHeroIntro}
//           onAnimationComplete={onHeroEnterComplete}
//         />
//       </div>

//       {/* Lazy sections с data-testid */}
//       <LazySection Component={About} testId="about" />
//       <LazySection Component={Skills} testId="skills" />
//       <LazySection Component={ProjectsGallery} testId="projects-gallery" />
//       <LazySection Component={FaqSlider} testId="faq-slider" />
//       <LazySection Component={ContactSection} testId="contact-section" />
//     </div>
//   );
// };

// export default ProjectPage;

//---------------

// import React, { lazy } from "react";
// import Hero from "@/features/hero/Hero";
// const About = lazy(() => import("@/features/about/About"));
// const Skills = lazy(() => import("@/features/skills/Skills"));
// const ProjectsGallery = lazy(
//   () => import("@/features/projectsGallery/ProjectsGallery")
// );
// const FaqSlider = lazy(() => import("@/features/faq/FaqSlider"));
// const ContactSection = lazy(() => import("@/features/contact/ContactSection"));
// interface LazySectionProps {
//   Component: React.LazyExoticComponent<React.FC<any>>;
// }
// const LazySection: React.FC<LazySectionProps> = ({ Component }) => {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const ref = React.useRef<HTMLDivElement>(null);
//   React.useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "200px" }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);
//   return <div ref={ref}>{isVisible && <Component />}</div>;
// };
// interface ProjectPageProps {
//   startHeroIntro: boolean;
//   onHeroEnterComplete?: () => void;
// }
// const ProjectPage: React.FC<ProjectPageProps> = ({
//   startHeroIntro,
//   onHeroEnterComplete,
// }) => {
//   return (
//     <div className="project-page">
//       {/* Hero сразу, уведомляет App о завершении анимации */}
//       <Hero
//         startIntro={startHeroIntro}
//         onAnimationComplete={onHeroEnterComplete}
//       />
//       <LazySection Component={About} /> <LazySection Component={Skills} />
//       <LazySection Component={ProjectsGallery} />
//       <LazySection Component={FaqSlider} />
//       <LazySection Component={ContactSection} />
//     </div>
//   );
// };
// export default ProjectPage;
