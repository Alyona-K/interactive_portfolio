import { SkillNode } from "./skills.types";

export const softSkills: SkillNode[] = [
  {
    id: "soft-skills",
    titleKey: "softSkills.title",
    children: [
      {
        id: "system-thinking",
        titleKey: "softSkills.systemThinking.title",
        contentKey: "softSkills.systemThinking.points",
      },
      {
        id: "ownership-responsibility",
        titleKey: "softSkills.ownershipResponsibility.title",
        contentKey: "softSkills.ownershipResponsibility.points",
      },
      {
        id: "clear-communication",
        titleKey: "softSkills.clearCommunication.title",
        contentKey: "softSkills.clearCommunication.points",
      },
      {
        id: "collaboration-teamwork",
        titleKey: "softSkills.collaborationTeamwork.title",
        contentKey: "softSkills.collaborationTeamwork.points",
      },
      {
        id: "adaptability-learning",
        titleKey: "softSkills.adaptabilityLearning.title",
        contentKey: "softSkills.adaptabilityLearning.points",
      },
    ],
  },
];
