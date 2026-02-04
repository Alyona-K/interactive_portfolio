import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProjectPreview } from "@/entities/project/project.types";
import "./ProjectCard.scss";

interface ProjectCardProps extends ProjectPreview {
  onClick?: () => void;
}

/**
 * --- RESPONSIBILITY ---
 * Card component to display a project with responsive images.
 * Handles hover interaction with a smooth cursor-follow effect.
 * Logic resides in the component due to DOM-dependent animation.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  titleKey,
  image,
  altKey,
  onClick,
}) => {
  // --- TRANSLATIONS ---
  const { t: tProjects } = useTranslation("projects");
  const { t: tCommon } = useTranslation("common");

  // --- LOCAL STATE ---
  const [hovered, setHovered] = useState(false);

  // --- REFS FOR DOM AND ANIMATION STATE ---
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const viewPos = useRef({ x: 0, y: 0 });
  const lastMoveTs = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // --- CONSTANTS FOR CURSOR ANIMATION ---
  const MAX_DIST = 50; // Maximum offset distance for cursor effect
  const LERP = 0.18; // Interpolation factor for smooth movement
  const STOP_DELAY = 100; // Time after which movement stops

  // --- UTILITY FUNCTIONS ---
  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  /**
   * --- EVENT HANDLER: MOUSE MOVE ---
   * Updates cursor position relative to the card element
   * and resets last move timestamp for smooth animation.
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cursor.current.x = e.clientX - rect.left;
    cursor.current.y = e.clientY - rect.top;
    lastMoveTs.current = performance.now();
  };

  /**
   * --- UPDATE FUNCTION: SMOOTH CURSOR FOLLOW ---
   * Applies linear interpolation to create smooth cursor movement.
   * Adjusts position to create a subtle offset effect on hover.
   * Continuously scheduled with requestAnimationFrame.
   */
  const update = () => {
    const now = performance.now();
    const moving = now - lastMoveTs.current < STOP_DELAY;

    let targetX = cursor.current.x;
    let targetY = cursor.current.y;

    if (moving && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      let vx = cursor.current.x - centerX;
      let vy = cursor.current.y - centerY;
      const len = Math.hypot(vx, vy) || 1;
      const dist = clamp(len * 0.12, 10, MAX_DIST);
      vx = (vx / len) * dist;
      vy = (vy / len) * dist;

      targetX = cursor.current.x + vx;
      targetY = cursor.current.y + vy - 3;
    }

    viewPos.current.x = lerp(viewPos.current.x, targetX, LERP);
    viewPos.current.y = lerp(viewPos.current.y, targetY, LERP);

    const viewEl = cardRef.current?.querySelector<HTMLDivElement>(
      ".project-card__view-cursor",
    );
    if (viewEl) {
      viewEl.style.left = `${viewPos.current.x}px`;
      viewEl.style.top = `${viewPos.current.y}px`;
    }

    rafRef.current = requestAnimationFrame(update);
  };

  /**
   * --- EFFECT: MANAGE HOVER STATE AND ANIMATION ---
   * Starts or cancels cursor-follow animation depending on hover state.
   * Resets view position and cleans up requestAnimationFrame on unmount.
   */
  useEffect(() => {
    if (hovered) {
      viewPos.current.x = cursor.current.x;
      viewPos.current.y = cursor.current.y;
      lastMoveTs.current = performance.now();
      rafRef.current = requestAnimationFrame(update);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      const viewEl = cardRef.current?.querySelector<HTMLDivElement>(
        ".project-card__view-cursor",
      );
      if (viewEl) {
        viewEl.style.left = `${cursor.current.x}px`;
        viewEl.style.top = `${cursor.current.y}px`;
      }

      viewPos.current = { x: 0, y: 0 };
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hovered]);

  // --- RENDER COMPONENT ---
  return (
    <div
      className="project-card"
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className="project-card__image-wrapper">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={`${image.mobile} 1x, ${image.mobile2x} 2x`}
          />
          <source
            media="(max-width: 1279px)"
            srcSet={`${image.tablet} 1x, ${image.tablet2x} 2x`}
          />
          <img
            src={image.desktop}
            srcSet={`${image.desktop2x} 2x`}
            alt={altKey ? tProjects(altKey) : tProjects("defaultAlt")}
            className="project-card__image"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <h3 className="project-card__title">{tProjects(titleKey)}</h3>
        <span className="project-card__cursor-hint">
          {tProjects("projects.section.projectCardHint")}
        </span>
      </div>

      {/* --- HOVER VIEW CURSOR --- */}
      {hovered && (
        <div className="project-card__view-cursor">
          {tCommon("buttons.view")}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
