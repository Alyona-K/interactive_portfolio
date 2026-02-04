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
  const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(
    null,
  );

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
