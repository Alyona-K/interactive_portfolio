import { render, screen } from "@testing-library/react";
import { Portal } from "@shared/ui/Portal";

describe("Portal", () => {
  afterEach(() => {
    // Clean up DOM after each test to avoid side effects
    document.body.innerHTML = "";
  });

  // --- PORTAL RENDERING ---
  it("renders children into portal-root", () => {
    // Setup portal root for mounting children
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);

    render(
      <Portal>
        <div data-testid="portal-content">Hello</div>
      </Portal>,
    );

    // Verify children are rendered inside the portal root
    expect(screen.getByTestId("portal-content")).toBeInTheDocument();
    expect(portalRoot).toContainElement(screen.getByTestId("portal-content"));
  });

  // --- FALLBACK IF PORTAL ROOT MISSING ---
  it("renders nothing if portal-root is missing", () => {
    // If portal root does not exist, component should render nothing
    const { container } = render(
      <Portal>
        <div>Hello</div>
      </Portal>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
