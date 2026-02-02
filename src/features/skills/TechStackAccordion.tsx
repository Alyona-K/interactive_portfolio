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


// import React from "react";
// import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
// import { useAccordionBehavior } from "@/shared/hooks/useAccordionBehavior";
// import { techStackSkills } from "@/entities/skills/model/techStack.data";

// export const TechStackAccordion: React.FC = () => {
//   const { multiple } = useAccordionBehavior();

//   return (
//     <AccordionDropdown items={techStackSkills} multiple={multiple} level={1} />
//   );
// };
// export default TechStackAccordion;