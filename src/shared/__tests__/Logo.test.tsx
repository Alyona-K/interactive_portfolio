import { render } from "@testing-library/react";
import { Logo } from "@/shared/ui/Logo";

// --- MOCK GSAP ---
// Prevent actual GSAP animations from running during tests
jest.mock("gsap");

describe("Logo", () => {
  // --- ROOT CONTAINER RENDER ---
  it("renders logo container", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector(".logo")).toBeInTheDocument();
  });

  // --- SVG PARTS RENDER ---
  it("renders all svg parts", () => {
    const { container } = render(<Logo />);
    // Verify that all expected SVG elements are present
    expect(container.querySelectorAll("svg.logo__part-1")).toHaveLength(1);
    expect(container.querySelectorAll("svg.logo__part-2")).toHaveLength(1);
    expect(container.querySelectorAll("svg.logo__part-3")).toHaveLength(1);
  });

  // --- CUSTOM CLASSNAME PROP ---
  it("applies additional className if provided", () => {
    const { container } = render(<Logo className="custom" />);
    // Ensure that custom className is merged with default
    expect(container.firstChild).toHaveClass("logo", "custom");
  });
});

//----------
// import { render } from "@testing-library/react";
// import { Logo } from "@/shared/ui/Logo";

// jest.mock("gsap");

// describe("Logo", () => {
//   it("renders logo container", () => {
//   const { container } = render(<Logo />);
//   expect(container.querySelector(".logo")).toBeInTheDocument();
// });

//   it("renders all svg parts", () => {
//     const { container } = render(<Logo />);
//     expect(container.querySelectorAll("svg.logo__part-1")).toHaveLength(1);
//     expect(container.querySelectorAll("svg.logo__part-2")).toHaveLength(1);
//     expect(container.querySelectorAll("svg.logo__part-3")).toHaveLength(1);
//   });

//   it("applies additional className if provided", () => {
//     const { container } = render(<Logo className="custom" />);
//     expect(container.firstChild).toHaveClass("logo", "custom");
//   });
// });