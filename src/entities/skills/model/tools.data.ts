import { SkillNode } from "./skills.types";

export const toolsSkills: SkillNode[] = [
  {
    id: "tools-workflow",
    titleKey: "tools.title",
    children: [
      // 1. Dev Tools & Environment
      {
        id: "dev-tools-env",
        titleKey: "tools.devToolsEnv.title",
        children: [
          {
            id: "vite",
            titleKey: "tools.devToolsEnv.vite.title",
            contentKey: "tools.devToolsEnv.vite.points",
          },
          {
            id: "node-npm",
            titleKey: "tools.devToolsEnv.nodeNpm.title",
            contentKey: "tools.devToolsEnv.nodeNpm.points",
          },
          {
            id: "git-github",
            titleKey: "tools.devToolsEnv.gitGithub.title",
            contentKey: "tools.devToolsEnv.gitGithub.points",
          },
          {
            id: "eslint-prettier",
            titleKey: "tools.devToolsEnv.eslintPrettier.title",
            contentKey: "tools.devToolsEnv.eslintPrettier.points",
          },
          {
            id: "browser-devtools",
            titleKey: "tools.devToolsEnv.browserDevtools.title",
            contentKey: "tools.devToolsEnv.browserDevtools.points",
          },
        ],
      },

      // 2. Testing & QA
      {
        id: "testing-qa",
        titleKey: "tools.testingQA.title",
        children: [
          {
            id: "jest",
            titleKey: "tools.testingQA.jest.title",
            contentKey: "tools.testingQA.jest.points",
          },
          {
            id: "rtl",
            titleKey: "tools.testingQA.rtl.title",
            contentKey: "tools.testingQA.rtl.points",
          },
          {
            id: "mock-api",
            titleKey: "tools.testingQA.mockApi.title",
            contentKey: "tools.testingQA.mockApi.points",
          },
          {
            id: "playwright",
            titleKey: "tools.testingQA.playwright.title",
            contentKey: "tools.testingQA.playwright.points",
          },
        ],
      },

      // 3. CI/CD & Deployment
      {
        id: "ci-cd",
        titleKey: "tools.ciCD.title",
        children: [
          {
            id: "github-actions",
            titleKey: "tools.ciCD.githubActions.title",
            contentKey: "tools.ciCD.githubActions.points",
          },
          {
            id: "vercel",
            titleKey: "tools.ciCD.vercel.title",
            contentKey: "tools.ciCD.vercel.points",
          },
        ],
      },

      // 4. Design & Prototyping
      {
        id: "design-prototyping",
        titleKey: "tools.designPrototyping.title",
        children: [
          {
            id: "figma",
            titleKey: "tools.designPrototyping.figma.title",
            contentKey: "tools.designPrototyping.figma.points",
          },
        ],
      },

      // 5. Build & Optimization
      {
        id: "build-optimization",
        titleKey: "tools.buildOptimization.title",
        children: [
          {
            id: "webpack-vite",
            titleKey: "tools.buildOptimization.webpackVite.title",
            contentKey: "tools.buildOptimization.webpackVite.points",
          },
        ],
      },
    ],
  },
];
