import React from "react";
import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
import { crossFunctionalSkills } from "@/entities/skills/model/crossFunctional.data";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const CrossFunctionalSkillsAccordion: React.FC<Props> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <AccordionDropdown
      items={crossFunctionalSkills}
      level={1}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
};

export default CrossFunctionalSkillsAccordion;
