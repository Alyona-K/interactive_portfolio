import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/shared/ui/Modal";

// --- MOCK FRAMER-MOTION ---
// Prevent actual animations from running during tests and satisfy TS types
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  Variants: {}, // TypeScript support
  cubicBezier: () => undefined, // TypeScript support
}));

describe("Modal", () => {
  // --- CONDITIONAL RENDER ---
  test("does not render when isOpen is false", () => {
    render(<Modal isOpen={false}>Content</Modal>);
    // Modal should not be present in the DOM if closed
    expect(screen.queryByText("Content")).toBeNull();
  });

  // --- OPEN STATE RENDER ---
  test("renders when isOpen is true", () => {
    render(<Modal isOpen={true}>Content</Modal>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  // --- TITLE PROP RENDER ---
  test("renders title if provided", () => {
    render(<Modal isOpen={true} title="My Modal">Content</Modal>);
    // Verify title is correctly displayed
    expect(screen.getByText("My Modal")).toBeInTheDocument();
  });

  // --- CLOSE BUTTON CALLBACK ---
  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);
    const closeBtn = screen.getByLabelText("close");
    fireEvent.click(closeBtn);
    // Ensure external handler is triggered on close
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});


//----------

// import { render, screen, fireEvent } from "@testing-library/react";
// import Modal from "@/shared/ui/Modal";

// // Мокаем framer-motion
// jest.mock("framer-motion", () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   },
//   Variants: {}, // для TS
//   cubicBezier: () => undefined, // для TS
// }));

// describe("Modal", () => {
//   test("does not render when isOpen is false", () => {
//     render(<Modal isOpen={false}>Content</Modal>);
//     expect(screen.queryByText("Content")).toBeNull();
//   });

//   test("renders when isOpen is true", () => {
//     render(<Modal isOpen={true}>Content</Modal>);
//     expect(screen.getByText("Content")).toBeInTheDocument();
//   });

//   test("renders title if provided", () => {
//     render(<Modal isOpen={true} title="My Modal">Content</Modal>);
//     expect(screen.getByText("My Modal")).toBeInTheDocument();
//   });

//   test("calls onClose when close button is clicked", () => {
//     const onClose = jest.fn();
//     render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);
//     const closeBtn = screen.getByLabelText("close");
//     fireEvent.click(closeBtn);
//     expect(onClose).toHaveBeenCalledTimes(1);
//   });
// });