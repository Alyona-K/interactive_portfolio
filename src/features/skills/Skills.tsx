import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TechStackAccordion from "@/features/skills/TechStackAccordion";
import ToolsAccordion from "@/features/skills/ToolsAccordion";
import SoftSkillsAccordion from "@/features/skills/SoftSkillsAccordion";
import CrossFunctionalSkillsAccordion from "@/features/skills/CrossFunctionalSkillsAccordion";
import { animateSkills } from "./skillsAnimation";
import "./Skills.scss";

/**
 * --- SKILLS SECTION ---
 *
 * Responsible for rendering all skill categories with accordions.
 * Ensures that only one root accordion is open at a time.
 * Triggers scroll-based entry animations for skills on mount.
 */
const Skills: React.FC = () => {
  const { t } = useTranslation("skills");

  // --- ROOT ACCORDION STATE: TRACKS OPEN CATEGORY ---
  const [openRootId, setOpenRootId] = useState<string | null>(null);

  // --- EFFECT: INITIALIZE SKILLS ANIMATION ON MOUNT ---
  useEffect(() => {
    animateSkills();
  }, []);

  return (
    <section className="skills scroll-section" id="skills">
      {/* --- ACCESSIBILITY: HIDDEN TITLE FOR SCREEN READERS --- */}
      <h1 className="visually-hidden">Skills section</h1>

      {/* --- SECTION VISIBLE TITLE --- */}
      <h2 className="skills__title">{t("skillsTitle")}</h2>

      {/* --- ACCORDIONS CONTAINER --- */}
      <div className="skills__accordions">
        {/* --- TECH STACK ACCORDION --- */}
        <TechStackAccordion
          isOpen={openRootId === "tech"}
          onToggle={() =>
            setOpenRootId((prev) => (prev === "tech" ? null : "tech"))
          }
        />

        {/* --- TOOLS ACCORDION --- */}
        <ToolsAccordion
          isOpen={openRootId === "tools"}
          onToggle={() =>
            setOpenRootId((prev) => (prev === "tools" ? null : "tools"))
          }
        />

        {/* --- SOFT SKILLS ACCORDION --- */}
        <SoftSkillsAccordion
          isOpen={openRootId === "soft"}
          onToggle={() =>
            setOpenRootId((prev) => (prev === "soft" ? null : "soft"))
          }
        />

        {/* --- CROSS-FUNCTIONAL SKILLS ACCORDION --- */}
        <CrossFunctionalSkillsAccordion
          isOpen={openRootId === "cross"}
          onToggle={() =>
            setOpenRootId((prev) => (prev === "cross" ? null : "cross"))
          }
        />
      </div>
    </section>
  );
};

export default Skills;
