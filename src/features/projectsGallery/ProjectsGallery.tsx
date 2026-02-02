import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "@/entities/project/projects.data"; 
import { ProjectConfig } from "@/entities/project/project.types";
import ProjectCard from "@/shared/ui/ProjectCard";
import ProjectModal from "@/shared/ui/ProjectModal";
import { animateProjectsGallery } from "./projectsAnimation";
import "./ProjectsGallery.scss";

/**
 * --- PROJECTS GALLERY SECTION ---
 *
 * Renders a scrollable gallery of project cards.
 * Handles project modal state and triggers scroll-based gallery animation on mount.
 */
const ProjectsGallery: React.FC = () => {
  const { t } = useTranslation("projects");

  // --- MODAL STATE: CURRENTLY SELECTED PROJECT ---
  const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(null);

  // --- MODAL OPEN STATE ---
  const [modalOpen, setModalOpen] = useState(false);

  // --- EFFECT: INITIALIZE SCROLL ANIMATION ON MOUNT ---
  useEffect(() => {
    const section = document.querySelector(".projects-gallery") as HTMLElement;
    if (!section) return;

    const cleanup = animateProjectsGallery(section);

    // --- CLEANUP GSAP / SCROLLTRIGGER ON UNMOUNT ---
    return () => cleanup?.();
  }, []);

  /**
   * --- HANDLE PROJECT CARD CLICK ---
   *
   * Opens modal and sets selected project from single source of truth.
   */
  const handleCardClick = (projectId: string) => {
    const projectData = projects.find((p) => p.id === projectId) || null;
    setSelectedProject(projectData);
    setModalOpen(true);
  };

  return (
    <section className="projects-gallery scroll-section" id="projects">
      {/* --- ACCESSIBILITY: HIDDEN TITLE FOR SCREEN READERS --- */}
      <h1 className="visually-hidden">Projects gallery section</h1>

      {/* --- SECTION VISIBLE TITLE --- */}
      <h2 className="projects-gallery__title">{t("projects.section.title")}</h2>

      {/* --- PROJECT CARDS STAGE --- */}
      <div className="projects-gallery__stage">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            titleKey={project.titleKey}
            altKey={project.altKey}
            image={project.image}
            onClick={() => handleCardClick(project.id)}
          />
        ))}
      </div>

      {/* --- PROJECT MODAL --- */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default ProjectsGallery;

//---------

// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { projects } from "@/entities/project/projects.data"; // новый единый источник правды
// import { ProjectConfig } from "@/entities/project/project.types";
// import ProjectCard from "@/shared/ui/ProjectCard";
// import ProjectModal from "@/shared/ui/ProjectModal";
// import { animateProjectsGallery } from "./projectsAnimation";
// import "./ProjectsGallery.scss";

// const ProjectsGallery: React.FC = () => {
//   const { t } = useTranslation("projects");
//   const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//   const section = document.querySelector(
//     ".projects-gallery"
//   ) as HTMLElement;

//   if (!section) return;

//   const cleanup = animateProjectsGallery(section);

//   return () => cleanup?.();
// }, []);

//   const handleCardClick = (projectId: string) => {
//     const projectData = projects.find((p) => p.id === projectId) || null;
//     setSelectedProject(projectData);
//     setModalOpen(true);
//   };

//   return (
//     <section className="projects-gallery scroll-section" id="projects">
//       <h1 className="visually-hidden">Projects gallery section</h1>
//       <h2 className="projects-gallery__title">{t("projects.section.title")}</h2>
//       <div className="projects-gallery__stage">
//         {projects.map((project) => (
//           <ProjectCard
//             key={project.id}
//             id={project.id}
//             titleKey={project.titleKey}
//             altKey={project.altKey}
//             image={project.image}
//             onClick={() => handleCardClick(project.id)}
//           />
//         ))}
//       </div>

//       <ProjectModal
//         project={selectedProject}
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//       />
//     </section>
//   );
// };

// export default ProjectsGallery;

//----------

// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { projects } from "@/features/projectsGallery/model/projects";
// import { ProjectsData } from "@/entities/project/projectsData";
// import { ProjectData } from "@/entities/project/project.types";
// import ProjectCard from "@/shared/ui/ProjectCard";
// import ProjectModal from "@/shared/ui/ProjectModal";
// import { animateProjectsGallery } from "./projectsAnimation";
// import "./ProjectsGallery.scss";

// const ProjectsGallery: React.FC = () => {
//   const { t } = useTranslation("projects");
//   const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
//     null
//   );
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const stage = document.querySelector(
//       ".projects-gallery__stage"
//     ) as HTMLElement;
//     if (!stage) return;

//     const resizeObserver = new ResizeObserver(() => {
//       animateProjectsGallery();
//     });

//     resizeObserver.observe(stage);
//     return () => resizeObserver.disconnect();
//   }, []);

//   const handleCardClick = (projectId: string) => {
//     const projectData = ProjectsData.find((p) => p.id === projectId) || null;
//     setSelectedProject(projectData);
//     setModalOpen(true);
//   };

//   return (
//     <section className="projects-gallery" id="projects">
//       <h2 className="projects-gallery__title">{t("sectionTitle")}</h2>
//       <div className="projects-gallery__stage">
//         {projects.map((project) => (
//           <ProjectCard
//             key={project.id}
//             titleKey={project.titleKey}
//             altKey={project.altKey}
//             image={project.image}
//             onClick={() => handleCardClick(project.projectId)}
//           />
//         ))}
//       </div>

//       <ProjectModal
//         project={selectedProject}
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//       />
//     </section>
//   );
// };

// export default ProjectsGallery;
