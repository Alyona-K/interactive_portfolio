// --- MOCK SKILLS ACCORDIONS ---
// Mock each accordion to allow toggle interactions in tests
jest.mock("@/features/skills/TechStackAccordion", () => ({
  __esModule: true,
  default: ({ isOpen, onToggle }: any) => (
    <>
      <button data-testid="tech-stack-toggle" onClick={onToggle}>tech</button>
      {isOpen && <div data-testid="tech-content">tech content</div>}
    </>
  ),
}));

jest.mock("@/features/skills/ToolsAccordion", () => ({
  __esModule: true,
  default: ({ isOpen, onToggle }: any) => (
    <>
      <button data-testid="tools-workflow-toggle" onClick={onToggle}>tools</button>
      {isOpen && <div data-testid="tools-content">tools content</div>}
    </>
  ),
}));

jest.mock("@/features/skills/SoftSkillsAccordion", () => ({
  __esModule: true,
  default: ({ isOpen, onToggle }: any) => (
    <>
      <button data-testid="soft-skills-toggle" onClick={onToggle}>soft</button>
      {isOpen && <div data-testid="soft-content">soft content</div>}
    </>
  ),
}));

jest.mock("@/features/skills/CrossFunctionalSkillsAccordion", () => ({
  __esModule: true,
  default: ({ isOpen, onToggle }: any) => (
    <>
      <button data-testid="cross-functional-skills-toggle" onClick={onToggle}>cross</button>
      {isOpen && <div data-testid="cross-content">cross content</div>}
    </>
  ),
}));

// --- MOCK USETRANSLATION ---
// Return translation key directly for predictable test output
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// --- MOCK ANIMATION ---
// Prevent side effects from actual animations
jest.mock("./skillsAnimation", () => ({
  animateSkills: jest.fn(),
}));

// --- MOCK PORTAL ---
// Render Portal children directly to test modal/portal content
jest.mock("@/shared/ui/Portal", () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

// --- MOCK FRAMER MOTION ---
// Simplify motion.div and AnimatePresence for testing without animation
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "./Skills";
import * as skillsAnim from "./skillsAnimation";

// --- SETUP / TEARDOWN PORTAL ROOT ---
// Required for Portal-based components to render correctly in tests
beforeEach(() => {
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
});
afterEach(() => {
  const portalRoot = document.getElementById("portal-root");
  if (portalRoot) document.body.removeChild(portalRoot);
});

describe("Skills component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing and shows section title", () => {
    render(<Skills />);
    expect(screen.getByText("Skills section")).toBeInTheDocument();
    expect(screen.getByText("skillsTitle")).toBeInTheDocument();
  });

  it("calls animateSkills once on mount", () => {
    render(<Skills />);
    // Verify animation hook runs once on mount
    expect(skillsAnim.animateSkills).toHaveBeenCalledTimes(1);
  });

  it("toggles accordions correctly", async () => {
    render(<Skills />);

    const techToggle = screen.getByTestId("tech-stack-toggle");
    const toolsToggle = screen.getByTestId("tools-workflow-toggle");
    const softToggle = screen.getByTestId("soft-skills-toggle");
    const crossToggle = screen.getByTestId("cross-functional-skills-toggle");

    // Open tech accordion → content renders
    fireEvent.click(techToggle);
    const techContent = await screen.findByTestId("tech-content");
    expect(techContent).toBeVisible();

    // Open tools → tech closes, tools opens
    fireEvent.click(toolsToggle);
    const toolsContent = await screen.findByTestId("tools-content");
    expect(toolsContent).toBeVisible();
    expect(techContent).not.toBeVisible();

    // Open soft → tools closes
    fireEvent.click(softToggle);
    const softContent = await screen.findByTestId("soft-content");
    expect(softContent).toBeVisible();
    expect(toolsContent).not.toBeVisible();

    // Open cross → soft closes
    fireEvent.click(crossToggle);
    const crossContent = await screen.findByTestId("cross-content");
    expect(crossContent).toBeVisible();
    expect(softContent).not.toBeVisible();

    // Close cross accordion
    fireEvent.click(crossToggle);
    expect(crossContent).not.toBeVisible();
  });
});

//--------

// jest.mock("@/features/skills/TechStackAccordion", () => ({
//   __esModule: true,
//   default: ({ isOpen, onToggle }: any) => (
//     <>
//       <button data-testid="tech-stack-toggle" onClick={onToggle}>tech</button>
//       {isOpen && <div data-testid="tech-content">tech content</div>}
//     </>
//   ),
// }));

// jest.mock("@/features/skills/ToolsAccordion", () => ({
//   __esModule: true,
//   default: ({ isOpen, onToggle }: any) => (
//     <>
//       <button data-testid="tools-workflow-toggle" onClick={onToggle}>tools</button>
//       {isOpen && <div data-testid="tools-content">tools content</div>}
//     </>
//   ),
// }));

// jest.mock("@/features/skills/SoftSkillsAccordion", () => ({
//   __esModule: true,
//   default: ({ isOpen, onToggle }: any) => (
//     <>
//       <button data-testid="soft-skills-toggle" onClick={onToggle}>soft</button>
//       {isOpen && <div data-testid="soft-content">soft content</div>}
//     </>
//   ),
// }));

// jest.mock("@/features/skills/CrossFunctionalSkillsAccordion", () => ({
//   __esModule: true,
//   default: ({ isOpen, onToggle }: any) => (
//     <>
//       <button data-testid="cross-functional-skills-toggle" onClick={onToggle}>cross</button>
//       {isOpen && <div data-testid="cross-content">cross content</div>}
//     </>
//   ),
// }));

// // Мокаем useTranslation
// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({ t: (key: string) => key }),
// }));

// // Мокаем анимацию
// jest.mock("./skillsAnimation", () => ({
//   animateSkills: jest.fn(),
// }));

// jest.mock("@/shared/ui/Portal", () => {
//   return ({ children }: { children: React.ReactNode }) => <>{children}</>;
// });

// jest.mock("framer-motion", () => {
//   const actual = jest.requireActual("framer-motion");
//   return {
//     ...actual,
//     motion: {
//       ...actual.motion,
//       div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//     },
//     AnimatePresence: ({ children }: any) => <>{children}</>,
//   };
// });

// import { render, screen, fireEvent } from "@testing-library/react";
// import Skills from "./Skills";
// import * as skillsAnim from "./skillsAnimation";

// beforeEach(() => {
//   const portalRoot = document.createElement("div");
//   portalRoot.setAttribute("id", "portal-root");
//   document.body.appendChild(portalRoot);
// });
// afterEach(() => {
//   const portalRoot = document.getElementById("portal-root");
//   if (portalRoot) document.body.removeChild(portalRoot);
// });

// describe("Skills component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders without crashing and shows section title", () => {
//     render(<Skills />);
//     expect(screen.getByText("Skills section")).toBeInTheDocument();
//     expect(screen.getByText("skillsTitle")).toBeInTheDocument();
//   });

//   it("calls animateSkills once on mount", () => {
//     render(<Skills />);
//     expect(skillsAnim.animateSkills).toHaveBeenCalledTimes(1);
//   });

//   it("toggles accordions correctly", async () => {
//   render(<Skills />);

//   const techToggle = screen.getByTestId("tech-stack-toggle");
//   const toolsToggle = screen.getByTestId("tools-workflow-toggle");
//   const softToggle = screen.getByTestId("soft-skills-toggle");
//   const crossToggle = screen.getByTestId("cross-functional-skills-toggle");

//   // Открываем tech → теперь контент рендерится
//   fireEvent.click(techToggle);
//   const techContent = await screen.findByTestId("tech-content");
//   expect(techContent).toBeVisible();

//   // Открываем tools → tech закрывается, tools открывается
//   fireEvent.click(toolsToggle);
//   const toolsContent = await screen.findByTestId("tools-content");
//   expect(toolsContent).toBeVisible();
//   expect(techContent).not.toBeVisible();

//   // Открываем soft → tools закрывается
//   fireEvent.click(softToggle);
//   const softContent = await screen.findByTestId("soft-content");
//   expect(softContent).toBeVisible();
//   expect(toolsContent).not.toBeVisible();

//   // Открываем cross → soft закрывается
//   fireEvent.click(crossToggle);
//   const crossContent = await screen.findByTestId("cross-content");
//   expect(crossContent).toBeVisible();
//   expect(softContent).not.toBeVisible();

//   // Закрываем cross
//   fireEvent.click(crossToggle);
//   expect(crossContent).not.toBeVisible();
// });
// });
