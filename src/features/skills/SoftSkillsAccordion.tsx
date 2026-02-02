import React from "react";
import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
import { softSkills } from "@/entities/skills/model/softSkills.data";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const SoftSkillsAccordion: React.FC<Props> = ({ isOpen, onToggle }) => {
  return (
    <AccordionDropdown
      items={softSkills}
      level={1}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
};

export default SoftSkillsAccordion;

// import React from "react";
// import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
// import { useAccordionBehavior } from "@/shared/hooks/useAccordionBehavior";
// import { softSkills } from "@/entities/skills/model/softSkills.data";

// export const SoftSkillsAccordion: React.FC = () => {
//   const { multiple } = useAccordionBehavior();
//   return <AccordionDropdown items={softSkills} multiple={multiple} level={1} />;
// };

// export default SoftSkillsAccordion;
