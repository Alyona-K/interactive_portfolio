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


// import { SkillNode } from "./skills.types";

// export const toolsSkills: SkillNode[] = [
//   {
//     id: "tools-workflow",
//     title: "Tools & Workflow",
//     children: [
//       // 1. Dev Tools & Environment
//       {
//         id: "dev-tools-env",
//         title: "Dev Tools & Environment",
//         children: [
//           {
//             id: "vite",
//             title: "Vite",
//             content: [
//               "fast builds",
//               "hot-reloading",
//               "optimized production bundles",
//             ],
//           },
//           {
//             id: "node-npm",
//             title: "Node.js & npm",
//             content: ["package management", "scripts", "local servers"],
//           },
//           {
//             id: "git-github",
//             title: "Git & GitHub",
//             content: [
//               "branching",
//               "merging",
//               "rebasing",
//               "pull requests",
//               "code review",
//             ],
//           },
//           {
//             id: "eslint-prettier",
//             title: "ESLint & Prettier",
//             content: ["linting", "formatting", "code consistency"],
//           },
//           {
//             id: "browser-devtools",
//             title: "Browser DevTools",
//             content: ["debugging", "network monitoring", "performance audits"],
//           },
//         ],
//       },

//       // 2. Testing & QA
//       {
//         id: "testing-qa",
//         title: "Testing & QA",
//         children: [
//           {
//             id: "jest",
//             title: "Jest",
//             content: ["unit", "integration", "snapshot testing"],
//           },
//           {
//             id: "rtl",
//             title: "React Testing Library (RTL)",
//             content: ["component testing", "UI state verification"],
//           },
//           {
//             id: "mock-api",
//             title: "Mocking & API testing",
//             content: ["simulating backend responses", "edge-case coverage"],
//           },
//         ],
//       },

//       // 3. CI/CD & Deployment
//       {
//         id: "ci-cd",
//         title: "CI/CD & Deployment",
//         children: [
//           {
//             id: "github-actions",
//             title: "GitHub Actions",
//             content: ["automated linting", "testing", "builds"],
//           },
//           {
//             id: "vercel",
//             title: "Vercel",
//             content: [
//               "preview deployments",
//               "production hosting",
//               "build optimization",
//             ],
//           },
//         ],
//       },

//       // 4. Design & Prototyping
//       {
//         id: "design-prototyping",
//         title: "Design & Prototyping",
//         children: [
//           {
//             id: "figma",
//             title: "Figma",
//             content: [
//               "working with layouts",
//               "pixel-perfect implementation",
//               "design handoff",
//             ],
//           },
//         ],
//       },

//       // 5. Build & Optimization
//       {
//         id: "build-optimization",
//         title: "Build & Optimization",
//         children: [
//           {
//             id: "webpack-vite",
//             title: "Webpack / Vite",
//             content: [
//               "tree shaking",
//               "code splitting",
//               "image optimization (WebP)",
//               "build performance tuning",
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
