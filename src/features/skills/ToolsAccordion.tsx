import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
import { toolsSkills } from "@/entities/skills/model/tools.data";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const ToolsAccordion: React.FC<Props> = ({ isOpen, onToggle }) => {
  return (
    <AccordionDropdown
      items={toolsSkills}
      level={1}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
};

export default ToolsAccordion;

// import { AccordionDropdown } from "@/shared/ui/AccordionDropdown";
// import { useAccordionBehavior } from "@/shared/hooks/useAccordionBehavior";
// import { toolsSkills } from "@/entities/skills/model/tools.data";

// const ToolsAccordion = () => {
//   const { multiple } = useAccordionBehavior();
//   return (
//     <AccordionDropdown items={toolsSkills} multiple={multiple} level={1} />
//   );
// };

// export default ToolsAccordion;
