import { lazy } from "react";
import { render, screen, act } from "@testing-library/react";
import LazySection from "@shared/ui/LazySection";
import { IntersectionObserverMock } from "@/setupTests";

// --- MOCK COMPONENT FOR LAZY LOAD ---
// Simulates a lazy-loaded component to test IntersectionObserver behavior
const MockComponent = () => <div data-testid="lazy-content">Loaded</div>;

// Lazy-loaded mock using React.lazy
const LazyMock = lazy(async () => ({
  default: MockComponent,
}));

// ---------- TESTS ----------

describe("LazySection", () => {
  let observerInstance: IntersectionObserverMock | null = null;

  beforeEach(() => {
    observerInstance = null;

    const Original = window.IntersectionObserver;

    // --- MOCK INTERSECTION OBSERVER ---
    // Intercept constructor to capture observer instance for triggering intersections
    (window as any).IntersectionObserver = function (
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      observerInstance = new Original(callback, options) as IntersectionObserverMock;
      return observerInstance;
    };
  });

  // --- COMPONENT RENDER BEFORE INTERSECTION ---
  it("does not render component before intersection", () => {
    render(<LazySection Component={LazyMock} testId="lazy-section" />);
    // Root wrapper renders immediately
    expect(screen.getByTestId("lazy-section")).toBeInTheDocument();
    // Lazy-loaded content should not render yet
    expect(screen.queryByTestId("lazy-content")).toBeNull();
  });

  // --- COMPONENT RENDER AFTER INTERSECTION ---
  it("renders component after intersection", async () => {
    render(<LazySection Component={LazyMock} />);

    await act(async () => {
      // Trigger the intersection manually to simulate visibility
      observerInstance?.trigger(true);
    });

    expect(screen.getByTestId("lazy-content")).toBeInTheDocument();
  });

  // --- INTERSECTION OBSERVER OPTIONS PROPAGATION ---
  it("passes rootMargin to IntersectionObserver", () => {
    render(<LazySection Component={LazyMock} rootMargin="300px" />);
    // Ensure rootMargin prop is forwarded to observer
    expect(observerInstance?.rootMargin).toBe("300px");
  });
});

//----------

// import { lazy } from "react";
// import { render, screen, act } from "@testing-library/react";
// import LazySection from "@shared/ui/LazySection";
// import { IntersectionObserverMock } from "@/setupTests";

// // ---------- MOCKS ----------

// const MockComponent = () => <div data-testid="lazy-content">Loaded</div>;

// const LazyMock = lazy(async () => ({
//   default: MockComponent,
// }));

// // ---------- TESTS ----------

// describe("LazySection", () => {
//   let observerInstance: IntersectionObserverMock | null = null;

//   beforeEach(() => {
//     observerInstance = null;

//     const Original = window.IntersectionObserver;

//     // перехватываем конструктор, чтобы поймать наш мок
//     (window as any).IntersectionObserver = function (
//       callback: IntersectionObserverCallback,
//       options?: IntersectionObserverInit
//     ) {
//       observerInstance = new Original(callback, options) as IntersectionObserverMock;
//       return observerInstance;
//     };
//   });

//   test("does not render component before intersection", () => {
//     render(<LazySection Component={LazyMock} testId="lazy-section" />);
//     expect(screen.getByTestId("lazy-section")).toBeInTheDocument();
//     expect(screen.queryByTestId("lazy-content")).toBeNull();
//   });

//   test("renders component after intersection", async () => {
//     render(<LazySection Component={LazyMock} />);

//     await act(async () => {
//       observerInstance?.trigger(true); // TS теперь знает, что это IntersectionObserverMock
//     });

//     expect(screen.getByTestId("lazy-content")).toBeInTheDocument();
//   });

//   test("passes rootMargin to IntersectionObserver", () => {
//     render(<LazySection Component={LazyMock} rootMargin="300px" />);
//     expect(observerInstance?.rootMargin).toBe("300px"); // TS тоже понимает
//   });
// });
