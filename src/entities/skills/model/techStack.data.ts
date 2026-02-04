import { SkillNode } from "./skills.types";

export const techStackSkills: SkillNode[] = [
  {
    id: "tech-stack",
    titleKey: "techStack.title",
    children: [
      {
        id: "programming-languages",
        titleKey: "techStack.programmingLanguages.title",
        children: [
          {
            id: "ts",
            titleKey: "techStack.programmingLanguages.ts.title",
            contentKey: "techStack.programmingLanguages.ts.points",
          },
          {
            id: "js",
            titleKey: "techStack.programmingLanguages.js.title",
            contentKey: "techStack.programmingLanguages.js.points",
          },
        ],
      },
      {
        id: "frontend-frameworks",
        titleKey: "techStack.frontendFrameworks.title",
        children: [
          {
            id: "react",
            titleKey: "techStack.frontendFrameworks.react.title",
            contentKey: "techStack.frontendFrameworks.react.points",
          },
          {
            id: "state-management",
            titleKey: "techStack.frontendFrameworks.stateManagement.title",
            contentKey: "techStack.frontendFrameworks.stateManagement.points",
          },
        ],
      },
      {
        id: "architecture-patterns",
        titleKey: "techStack.architecturePatterns.title",
        children: [
          {
            id: "fsd",
            titleKey: "techStack.architecturePatterns.fsd.title",
            contentKey: "techStack.architecturePatterns.fsd.points",
          },
          {
            id: "api-data-flow",
            titleKey: "techStack.architecturePatterns.apiDataFlow.title",
            contentKey: "techStack.architecturePatterns.apiDataFlow.points",
          },
          {
            id: "performance-rendering",
            titleKey:
              "techStack.architecturePatterns.performanceRendering.title",
            contentKey:
              "techStack.architecturePatterns.performanceRendering.points",
          },
          {
            id: "internationalization",
            titleKey:
              "techStack.architecturePatterns.internationalization.title",
            contentKey:
              "techStack.architecturePatterns.internationalization.points",
          },
        ],
      },
      {
        id: "best-practices",
        titleKey: "techStack.bestPractices.title",
        contentKey: "techStack.bestPractices.points",
      },
      {
        id: "styles-ui",
        titleKey: "techStack.stylesUI.title",
        children: [
          {
            id: "html-a11y",
            titleKey: "techStack.stylesUI.htmlA11y.title",
            contentKey: "techStack.stylesUI.htmlA11y.points",
          },
          {
            id: "css-preproc",
            titleKey: "techStack.stylesUI.cssPreproc.title",
            contentKey: "techStack.stylesUI.cssPreproc.points",
          },
          {
            id: "animations",
            titleKey: "techStack.stylesUI.animations.title",
            contentKey: "techStack.stylesUI.animations.points",
          },
          {
            id: "visualization",
            titleKey: "techStack.stylesUI.visualization.title",
            contentKey: "techStack.stylesUI.visualization.points",
          },
        ],
      },
      {
        id: "backend-used",
        titleKey: "techStack.backend.title",
        children: [
          {
            id: "mock-backend",
            titleKey: "techStack.backend.mockBackend.title",
            contentKey: "techStack.backend.mockBackend.points",
          },
        ],
      },
    ],
  },
];
