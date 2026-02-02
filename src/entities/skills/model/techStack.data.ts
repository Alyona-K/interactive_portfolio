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

// export const techStackSkills: SkillNode[] = [
//   {
//     id: "tech-stack",
//     title: "Tech Stack",
//     children: [
//       {
//         id: "programming-languages",
//         title: "Programming Languages",
//         children: [
//           {
//             id: "ts",
//             title: "TypeScript",
//             content: [
//               "Strict mode, generics, utility types",
//               "Interfaces, types, discriminated unions",
//               "Modularity and reusable abstractions",
//               "Error-safe API handling",
//               "Integration with React & Zustand",
//               "Strong typing for forms, schemas, async logic",
//             ],
//           },
//           {
//             id: "js",
//             title: "JavaScript (ES6+)",
//             content: [
//               "Modules, arrow functions, destructuring",
//               "Array pipelines (map, filter, reduce)",
//               "Async/await, Promises, event loop",
//               "DOM & forms control",
//             ],
//           },
//         ],
//       },

//       {
//         id: "frontend-frameworks",
//         title: "Frontend Frameworks",
//         children: [
//           {
//             id: "react",
//             title: "React (18/19)",
//             content: [
//               "Functional components, hooks",
//               "Component composition & modular architecture",
//               "Performance optimizations (memo, lazy, Suspense)",
//               "Routing (React Router)",
//               "Reusable UI components",
//               "Patterns: Presentational / Container, smart/dumb components",
//             ],
//           },
//           {
//             id: "state-management",
//             title: "State Management",
//             content: [
//               "Zustand (selectors, slices, domain-based structure)",
//               "Local & session persistence",
//               "JWT + refresh flow",
//               "Business logic separation",
//             ],
//           },
//         ],
//       },

//       {
//         id: "architecture-patterns",
//         title: "Architecture & Patterns",
//         children: [
//           {
//             id: "fsd",
//             title: "Feature-Sliced Design (FSD)",
//             content: [
//               "Layered architecture (entities, features, shared)",
//               "Modules isolation",
//               "Scalable project structure",
//             ],
//           },
//           {
//             id: "api-data-flow",
//             title: "API & Data Flow",
//             content: [
//               "REST API integration",
//               "Axios instance with interceptors",
//               "Token handling (access + refresh)",
//               "Error boundaries",
//             ],
//           },
//           {
//             id: "performance-rendering",
//             title: "Performance & Rendering",
//             content: [
//               "Lazy-loaded pages",
//               "Selective optimization with React.memo",
//               "Smooth page transitions using Framer Motion",
//               "Client-Side Rendering (CSR) with protected routes",
//             ],
//           },
//         ],
//       },

//       {
//         id: "styles-ui",
//         title: "Styles & UI",
//         children: [
//           {
//             id: "html-a11y",
//             title: "HTML & Accessibility",
//             content: [
//               "Semantic markup",
//               "Accessibility best practices (a11y)",
//               "SEO-friendly structure",
//               "Optimized rendering (Lighthouse, Core Web Vitals)",
//             ],
//           },
//           {
//             id: "css-preproc",
//             title: "CSS & Preprocessors",
//             content: [
//               "SCSS modules",
//               "BEM methodology",
//               "Responsive & adaptive layouts",
//               "Dark/Light mode toggling",
//             ],
//           },
//           {
//             id: "animations",
//             title: "Animations",
//             content: [
//               "Framer Motion",
//               "GSAP",
//               "Custom keyframes",
//               "Microinteractions",
//               "Multi-step & chained animations",
//             ],
//           },
//           {
//             id: "visualization",
//             title: "Visualization",
//             content: [
//               "Recharts (line charts, bar charts, custom tooltips)",
//               "Data transformation pipelines",
//             ],
//           },
//         ],
//       },

//       {
//         id: "backend-used",
//         title: "Backend",
//         children: [
//           {
//             id: "mock-backend",
//             title: "Mock & Custom Backend",
//             content: [
//               "JSON-server, json-server-auth",
//               "bcrypt",
//               "Custom refresh token logic",
//               "LocalStorage persistence",
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
