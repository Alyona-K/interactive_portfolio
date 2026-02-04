import React from "react";
import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
import { techStackSkills } from "@/entities/skills/model/techStack.data";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const TechStackAccordion: React.FC<Props> = ({ isOpen, onToggle }) => {
  return (
    <AccordionDropdown
      items={techStackSkills}
      level={1}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
};

export default TechStackAccordion;
