// --- MOCKS ---
// Mock ContactForm to isolate ContactSection behavior
jest.mock("@/features/contact/ContactForm", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />,
}));

// Mock contact animations to avoid executing GSAP timelines during tests
jest.mock("@/features/contact/contactAnimation", () => ({
  animateContactBg: jest.fn(),
}));

import { render, screen, cleanup } from "@testing-library/react";
import ContactSection from "./ContactSection";
import { animateContactBg } from "@/features/contact/contactAnimation";

/* --------------------------------------------------
   CONTACT SECTION TESTS
   Verify rendering, animation initialization, and cleanup
-------------------------------------------------- */
describe("ContactSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders contact section with ContactForm", () => {
    render(<ContactSection />);

    // Ensure ContactForm is rendered
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();

    // Ensure section and background elements exist
    const section = document.querySelector("section#contact");
    expect(section).toBeInTheDocument();

    const bg = document.querySelector(".contact-section__bg");
    expect(bg).toBeInTheDocument();
  });

  it("calls animateContactBg with section and bg elements on mount", () => {
    render(<ContactSection />);

    const section = document.querySelector("section#contact");
    const bg = document.querySelector(".contact-section__bg");

    // Verify animation initialized with correct elements
    expect(animateContactBg).toHaveBeenCalledTimes(1);
    expect(animateContactBg).toHaveBeenCalledWith(section, bg);
  });

  it("calls cleanup function on unmount", () => {
    const cleanupFn = jest.fn();

    // Return a mock cleanup function from animation hook
    (animateContactBg as jest.Mock).mockReturnValue(cleanupFn);

    const { unmount } = render(<ContactSection />);

    unmount();

    // Ensure animation cleanup is called on unmount
    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });
});
