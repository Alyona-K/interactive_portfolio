// --- MOCK GSAP AND PLUGINS ---
// Mock GSAP and ScrollTrigger to isolate animation logic
jest.mock("gsap", () => ({
  gsap: {
    registerPlugin: jest.fn(),
  },
}));

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import { animateFaq } from "./faqAnimation";

describe("animateFaq", () => {
  let track: HTMLDivElement;
  let section: HTMLElement;

  beforeEach(() => {
    track = document.createElement("div");
    section = document.createElement("section");

    // Create mock cards for cloning logic
    for (let i = 0; i < 3; i++) {
      const card = document.createElement("div");
      card.textContent = `card-${i}`;
      track.appendChild(card);
    }

    // Mock track scrollWidth for animation calculations
    Object.defineProperty(track, "scrollWidth", {
      value: 300,
      writable: true,
    });

    // Mock viewport height
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });

    document.body.appendChild(track);
    document.body.appendChild(section);
  });

  afterEach(() => {
    // Reset DOM and restore mocks
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("does nothing if refs are null", () => {
    // Edge case: animation should handle missing refs gracefully
    expect(() =>
      animateFaq({ current: null }, { current: null }),
    ).not.toThrow();
  });

  it("clones cards on both sides", () => {
    // Verify cards are cloned for infinite scroll effect
    const cleanup = animateFaq({ current: track }, { current: section });

    // 3 original cards → 9 elements after cloning left + original + right
    expect(track.children.length).toBe(9);

    cleanup?.();
  });

  it("adds and removes scroll listener", () => {
    // Ensure scroll listener is attached and cleaned up
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const cleanup = animateFaq({ current: track }, { current: section });

    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    cleanup?.();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("updates scrollLeft on scroll", () => {
    // Verify horizontal scroll is updated based on viewport scroll
    const cleanup = animateFaq({ current: track }, { current: section });

    // Mock section bounding rect to simulate visible area
    section.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      bottom: 500,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    track.scrollLeft = 0;

    // Mock scroll position
    Object.defineProperty(window, "scrollY", {
      value: 100,
      writable: true,
    });

    window.dispatchEvent(new Event("scroll"));

    expect(track.scrollLeft).not.toBe(0);

    cleanup?.();
  });
});
