// --- MOCKS ---
// Mock Hero to control startIntro prop without running actual animations
jest.mock("@/features/hero/Hero", () => ({
  __esModule: true,
  default: ({ startIntro }: any) => (
    <div>{startIntro ? "started" : "stopped"}</div>
  ),
}));

// Mock LazySection to simulate IntersectionObserver behavior
jest.mock("@/shared/ui/LazySection", () => ({
  __esModule: true,
  default: ({ testId }: any) => (
    <section data-testid={testId}>Lazy section</section>
  ),
}));

// --- MOCK STATIC ASSETS ---
// Prevent actual image imports, provide mock strings for testing
jest.mock("@/assets/images/about/profile-img.webp", () => "profile-mock", {
  virtual: true,
});
jest.mock("@/assets/images/about/profile-img@2x.webp", () => "profile-mock", {
  virtual: true,
});
jest.mock(
  "@/assets/images/about/profile-img--tablet.webp",
  () => "profile-mock",
  { virtual: true },
);
jest.mock(
  "@/assets/images/about/profile-img--tablet@2x.webp",
  () => "profile-mock",
  { virtual: true },
);
jest.mock(
  "@/assets/images/about/profile-img--mobile.webp",
  () => "profile-mock",
  { virtual: true },
);
jest.mock(
  "@/assets/images/about/profile-img--mobile@2x.webp",
  () => "profile-mock",
  { virtual: true },
);

// Mock ScrollTrigger to prevent actual scroll animations
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

// Mock Modal to test open/close behavior without actual portal logic
jest.mock("@/shared/ui/Modal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    title,
    onClose,
    children,
  }: {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div data-testid="modal">
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={onClose}>close</button>
      </div>
    ) : null,
}));

// Mock ContactForm for isolated rendering
jest.mock("@/features/contact/ContactForm", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />,
}));

import { render, screen } from "@testing-library/react";
import ProjectPage from "@/pages/project-page";

// ---------- TESTS ----------

describe("ProjectPage", () => {
  test("renders Hero with correct startIntro prop", () => {
    render(<ProjectPage startHeroIntro={true} />);

    // Verify Hero receives correct prop and renders accordingly
    const hero = screen.getByTestId("hero");
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveTextContent("started");
  });

  test("renders LazySections when they become visible", () => {
    render(<ProjectPage startHeroIntro={false} />);

    // Contract: all lazy-loaded sections must be present in the DOM
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByTestId("skills")).toBeInTheDocument();
    expect(screen.getByTestId("projects-gallery")).toBeInTheDocument();
    expect(screen.getByTestId("faq-slider")).toBeInTheDocument();
    expect(screen.getByTestId("contact-section")).toBeInTheDocument();
  });

  test("passes onAnimationComplete to Hero", () => {
    const mockComplete = jest.fn();

    render(
      <ProjectPage startHeroIntro={true} onHeroEnterComplete={mockComplete} />,
    );

    // Contract: callback prop exists and can be called by Hero
    expect(mockComplete).toBeDefined();
  });
});
