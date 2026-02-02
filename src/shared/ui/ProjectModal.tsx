import React, { useEffect } from "react";
import { motion, Variants, cubicBezier } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ProjectConfig, ProjectLink } from "@/entities/project/project.types";
import sprite from "@/assets/images/sprite.svg";
import "./ProjectModal.scss";

interface ProjectModalProps {
  project: ProjectConfig | null;
  isOpen: boolean;
  onClose: () => void;
}

// --- FRAMER-MOTION VARIANTS FOR BACKDROP ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// --- FRAMER-MOTION VARIANTS FOR MODAL ---
const modalVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

// --- UTILITY: GET MODIFIER CLASS FOR LINK TYPE ---
const getLinkModifier = (type?: ProjectLink["type"]) =>
  type ? `project-modal__link--${type}` : "";

/**
 * --- RESPONSIBILITY ---
 * Renders project details in a modal with image, description, challenges, tech stack, and links.
 * Manages keyboard escape, scroll lock, and framer-motion animations.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation("projects");

  // --- HANDLE ESCAPE KEY TO CLOSE MODAL ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // --- MANAGE BODY SCROLL LOCK WHEN MODAL IS OPEN ---
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const whatIBuilt = t(project.whatIBuiltKey, { returnObjects: true }) as string[];
  const challenges = t(project.challengesKey, { returnObjects: true }) as {
    challenge: string;
    solution: string;
  }[];

  // --- RENDER MODAL ---
  return (
    <motion.div
      className="project-modal__backdrop"
      onClick={onClose}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
    >
      <motion.div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
      >
        {/* --- CLOSE BUTTON --- */}
        <button className="project-modal__close" onClick={onClose}>
          <svg className="project-modal__close-icon" width={22} height={22}>
            <use xlinkHref={`${sprite}#close-icon`} />
          </svg>
        </button>

        {/* --- PROJECT IMAGE AND TITLE --- */}
        <div className="project-modal__image-wrapper">
          <img
            className="project-modal__img"
            src={project.modalImage}
            alt={project.altKey ? t(project.altKey) : t(project.titleKey)}
            loading="lazy"
          />
          <h3 className="project-modal__img-title">{t(project.titleKey)}</h3>
        </div>

        {/* --- PROJECT CONTENT --- */}
        <div className="project-modal__content">
          <h3 className="project-modal__title">{t(project.modalTitleKey)}</h3>

          {/* --- OVERVIEW SECTION --- */}
          <h4 className="project-modal__subtitle">
            {t("projects.sections.overview")}
          </h4>
          <p className="project-modal__description">{t(project.overviewKey)}</p>

          {/* --- WHAT I BUILT SECTION --- */}
          <h4 className="project-modal__subtitle">
            {t("projects.sections.whatIBuilt")}
          </h4>
          <ul className="project-modal__description project-modal__description--list">
            {whatIBuilt.map((item, i) => (
              <li className="project-modal__description-item" key={i}>
                {item}
              </li>
            ))}
          </ul>

          {/* --- CHALLENGES AND SOLUTIONS --- */}
          <h4 className="project-modal__subtitle">
            {t("projects.sections.challenges")}
          </h4>
          <ul className="project-modal__challenges-list project-modal__description">
            {challenges.map((c, i) => (
              <li className="project-modal__challenges-item" key={i}>
                <p className="project-modal__challenges-text">
                  <strong>{t("projects.sections.challenge")}:</strong> {c.challenge}
                </p>
                <p className="project-modal__challenges-text">
                  <strong>{t("projects.sections.solution")}:</strong> {c.solution}
                </p>
              </li>
            ))}
          </ul>

          {/* --- STACK SECTION --- */}
          <h4 className="project-modal__subtitle">
            {t("projects.sections.stack")}
          </h4>
          <p className="project-modal__description project-modal__description--center">
            {t(project.stackKey)}
          </p>

          {/* --- LINKS SECTION --- */}
          <h4 className="project-modal__subtitle">
            {t("projects.sections.links")}
          </h4>
          <div className="project-modal__links">
            {project.links.map((link, i) => (
              <a
                key={i}
                className={`project-modal__link ${getLinkModifier(link.type)}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;

//--------------

// import React, { useEffect } from "react";
// import { motion, Variants, cubicBezier } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { ProjectConfig, ProjectLink } from "@/entities/project/project.types";
// import sprite from "@/assets/images/sprite.svg";
// import "./ProjectModal.scss";

// interface ProjectModalProps {
//   project: ProjectConfig | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const modalVariants: Variants = {
//   hidden: { opacity: 0, y: -20, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.25,
//       ease: cubicBezier(0.25, 0.1, 0.25, 1),
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: 10,
//     scale: 0.97,
//     transition: { duration: 0.2 },
//   },
// };

// const getLinkModifier = (type?: ProjectLink["type"]) =>
//   type ? `project-modal__link--${type}` : "";

// export const ProjectModal: React.FC<ProjectModalProps> = ({
//   project,
//   isOpen,
//   onClose,
// }) => {
//   const { t } = useTranslation("projects");

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       const scrollBarWidth =
//         window.innerWidth - document.documentElement.clientWidth;
//       document.body.style.overflow = "hidden";
//       document.body.style.paddingRight = `${scrollBarWidth}px`;
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//     };
//   }, [isOpen]);

//   if (!isOpen || !project) return null;

//   const whatIBuilt = t(project.whatIBuiltKey, {
//     returnObjects: true,
//   }) as string[];
//   const challenges = t(project.challengesKey, { returnObjects: true }) as {
//     challenge: string;
//     solution: string;
//   }[];

//   return (
//     <motion.div
//       className="project-modal__backdrop"
//       onClick={onClose}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       variants={backdropVariants}
//     >
//       <motion.div
//         className="project-modal"
//         onClick={(e) => e.stopPropagation()}
//         variants={modalVariants}
//       >
//         <button className="project-modal__close" onClick={onClose}>
//           <svg className="project-modal__close-icon" width={22} height={22}>
//             <use xlinkHref={`${sprite}#close-icon`} />
//           </svg>
//         </button>

//         <div className="project-modal__image-wrapper">
//           <img
//             className="project-modal__img"
//             src={project.modalImage}
//             alt={project.altKey ? t(project.altKey) : t(project.titleKey)}
//             loading="lazy"
//           />
//           <h3 className="project-modal__img-title">{t(project.titleKey)}</h3>
//         </div>

//         <div className="project-modal__content">
//           <h3 className="project-modal__title">{t(project.modalTitleKey)}</h3>

//           <h4 className="project-modal__subtitle">
//             {t("projects.sections.overview")}
//           </h4>
//           <p className="project-modal__description">{t(project.overviewKey)}</p>

//           <h4 className="project-modal__subtitle">
//             {t("projects.sections.whatIBuilt")}
//           </h4>
//           <ul className="project-modal__description project-modal__description--list">
//             {whatIBuilt.map((item, i) => (
//               <li className="project-modal__description-item" key={i}>
//                 {item}
//               </li>
//             ))}
//           </ul>

//           <h4 className="project-modal__subtitle">
//             {t("projects.sections.challenges")}
//           </h4>
//           <ul className="project-modal__challenges-list project-modal__description">
//             {challenges.map((c, i) => (
//               <li className="project-modal__challenges-item" key={i}>
//                 <p className="project-modal__challenges-text">
//                   <strong>{t("projects.sections.challenge")}:</strong>{" "}
//                   {c.challenge}
//                 </p>
//                 <p className="project-modal__challenges-text">
//                   <strong>{t("projects.sections.solution")}:</strong>{" "}
//                   {c.solution}
//                 </p>
//               </li>
//             ))}
//           </ul>

//           <h4 className="project-modal__subtitle">
//             {t("projects.sections.stack")}
//           </h4>
//           <p className="project-modal__description project-modal__description--center">
//             {t(project.stackKey)}
//           </p>

//           <h4 className="project-modal__subtitle">
//             {t("projects.sections.links")}
//           </h4>
//           <div className="project-modal__links">
//             {project.links.map((link, i) => (
//               <a
//                 key={i}
//                 className={`project-modal__link ${getLinkModifier(link.type)}`}
//                 href={link.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProjectModal;


//---------

          //           <picture>
          //   {/* MOBILE */}
          //   <source
          //     media="(max-width: 767px)"
          //     srcSet={`${project.modalImage.mobile} 1x, ${project.modalImage.mobile2x} 2x`}
          //   />

          //   {/* TABLET */}
          //   <source
          //     media="(max-width: 1279px)"
          //     srcSet={`${project.modalImage.tablet} 1x, ${project.modalImage.tablet2x} 2x`}
          //   />

          //   {/* DESKTOP */}
          //   <img
          //     src={project.modalImage.desktop}
          //     srcSet={`${project.modalImage.desktop2x} 2x`}
          //     alt={project.altKey ? t(project.altKey) : t(project.titleKey)}
          //     className="project-modal__image"
          //     loading="lazy"
          //     decoding="async"
          //   />
          // </picture>

//-----------------

// import React, { useEffect } from "react";
// import { motion, Variants, cubicBezier } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { ProjectData, ProjectLink } from "@/entities/project/project.types";
// import sprite from "@/assets/images/sprite.svg";
// import "./ProjectModal.scss";

// interface ProjectModalProps {
//   project: ProjectData | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const modalVariants: Variants = {
//   hidden: { opacity: 0, y: -20, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.25,
//       ease: cubicBezier(0.25, 0.1, 0.25, 1),
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: 10,
//     scale: 0.97,
//     transition: { duration: 0.2 },
//   },
// };

// const getLinkModifier = (type?: ProjectLink["type"]) =>
//   type ? `project-modal__link--${type}` : "";

// export const ProjectModal: React.FC<ProjectModalProps> = ({
//   project,
//   isOpen,
//   onClose,
// }) => {
//   const { t } = useTranslation("projects");

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       const scrollBarWidth =
//         window.innerWidth - document.documentElement.clientWidth;
//       document.body.style.overflow = "hidden";
//       // document.body.style.paddingRight = scrollBarWidth + "px";
//       document.body.style.paddingRight = `${scrollBarWidth}px`;
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//     };
//   }, [isOpen]);

//   if (!isOpen || !project) return null;

//   const whatIBuilt = t(project.whatIBuiltKey, {
//     returnObjects: true,
//   }) as string[];

//   const challenges = t(project.challengesKey, {
//     returnObjects: true,
//   }) as { challenge: string; solution: string }[];

//   return (
//     <motion.div
//       className="project-modal__backdrop"
//       onClick={onClose}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       variants={backdropVariants}
//     >
//       <motion.div
//         className="project-modal"
//         onClick={(e) => e.stopPropagation()}
//         variants={modalVariants}
//       >
//         <button className="project-modal__close" onClick={onClose}>
//           <svg className="project-modal__close-icon" width={22} height={22}>
//             <use xlinkHref={`${sprite}#close-icon`} />
//           </svg>
//         </button>

//         <div className="project-modal__image-wrapper">
//           <img
//             className="project-modal__img"
//             src={project.image}
//             alt={t(project.titleKey)}
//             loading="lazy"
//           />
//         </div>

//         <div className="project-modal__content">
//           <h3 className="project-modal__title">{t(project.titleKey)}</h3>

//           <h4 className="project-modal__subtitle">{t("modal.overview")}w</h4>
//           <p className="project-modal__description">{t(project.overviewKey)}</p>

//           <h4 className="project-modal__subtitle">{t("modal.whatIBuilt")}</h4>
//           <ul className="project-modal__description project-modal__description--list">
//             {whatIBuilt.map((item, i) => (
//               <li className="project-modal__description-item" key={i}>
//                 {item}
//               </li>
//             ))}
//           </ul>

//           <h4 className="project-modal__subtitle">{t("modal.challenges")}</h4>
//           <ul className="project-modal__challenges-list project-modal__description">
//             {challenges.map((c, i) => (
//               <li className="project-modal__challenges-item" key={i}>
//                 <p className="project-modal__challenges-text">
//                   <strong>{t("modal.challenge")}:</strong> {c.challenge}
//                 </p>
//                 <p className="project-modal__challenges-text">
//                   <strong>{t("modal.solution")}:</strong> {c.solution}
//                 </p>
//               </li>
//             ))}
//           </ul>

//           <h4 className="project-modal__subtitle">{t("modal.stack")}</h4>
//           <p className="project-modal__description project-modal__description--center">
//             {t(project.stackKey)}
//           </p>

//           <h4 className="project-modal__subtitle">{t("modal.links")}</h4>
//           <div className="project-modal__links">
//             {project.links.map((link, i) => (
//               <a
//                 key={i}
//                 className={`project-modal__link ${getLinkModifier(link.type)}`}
//                 href={link.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProjectModal;
