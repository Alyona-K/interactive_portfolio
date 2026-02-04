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
