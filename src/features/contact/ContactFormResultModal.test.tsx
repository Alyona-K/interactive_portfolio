// --------------------
// MOCKS
// --------------------

// Mock i18n to return key as text for predictable rendering
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock Modal component to isolate ContactFormResultModal behavior
// Ensures tests do not depend on actual Modal implementation
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

import { render, screen, fireEvent } from "@testing-library/react";
import ContactFormResultModal from "./ContactFormResultModal";

/* --------------------------------------------------
   CONTACT FORM RESULT MODAL TESTS
   Verify correct rendering of success/error states and modal interactions
-------------------------------------------------- */
describe("ContactFormResultModal", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when result is null", () => {
    // Modal should not render if result is null
    const { container } = render(
      <ContactFormResultModal isOpen={true} result={null} onClose={onClose} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders success modal correctly", () => {
    render(
      <ContactFormResultModal isOpen={true} result="success" onClose={onClose} />
    );

    // Modal wrapper exists
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    // Verify translated titles and messages
    expect(screen.getByText("formMessages.successTitle")).toBeInTheDocument();
    expect(screen.getByText("formMessages.success")).toBeInTheDocument();

    // Success-specific CSS class applied
    const resultBlock = document.querySelector(".contact-result--success");
    expect(resultBlock).toBeInTheDocument();

    // SVG icon is correct
    const useEl = document.querySelector("use");
    expect(useEl?.getAttribute("xlink:href")).toContain("#icon-success");
  });

  it("renders error modal correctly", () => {
    render(
      <ContactFormResultModal isOpen={true} result="error" onClose={onClose} />
    );

    // Verify translated titles and messages
    expect(screen.getByText("formMessages.errorTitle")).toBeInTheDocument();
    expect(screen.getByText("formMessages.error")).toBeInTheDocument();

    // Error-specific CSS class applied
    const resultBlock = document.querySelector(".contact-result--error");
    expect(resultBlock).toBeInTheDocument();

    // SVG icon is correct
    const useEl = document.querySelector("use");
    expect(useEl?.getAttribute("xlink:href")).toContain("#icon-error");
  });

  it("calls onClose when modal close button is clicked", () => {
    render(
      <ContactFormResultModal isOpen={true} result="success" onClose={onClose} />
    );

    // Trigger modal close action
    fireEvent.click(screen.getByText("close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});


//-----

// // --------------------
// // mocks
// // --------------------

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//   }),
// }));

// jest.mock("@/shared/ui/Modal", () => ({
//   __esModule: true,
//   default: ({
//     isOpen,
//     title,
//     onClose,
//     children,
//   }: {
//     isOpen: boolean;
//     title: string;
//     onClose: () => void;
//     children: React.ReactNode;
//   }) =>
//     isOpen ? (
//       <div data-testid="modal">
//         <h2>{title}</h2>
//         <div>{children}</div>
//         <button onClick={onClose}>close</button>
//       </div>
//     ) : null,
// }));


// import { render, screen, fireEvent } from "@testing-library/react";
// import ContactFormResultModal from "./ContactFormResultModal";


// describe("ContactFormResultModal", () => {
//   const onClose = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("returns null when result is null", () => {
//     const { container } = render(
//       <ContactFormResultModal
//         isOpen={true}
//         result={null}
//         onClose={onClose}
//       />
//     );

//     expect(container.firstChild).toBeNull();
//   });

//   it("renders success modal correctly", () => {
//     render(
//       <ContactFormResultModal
//         isOpen={true}
//         result="success"
//         onClose={onClose}
//       />
//     );

//     expect(screen.getByTestId("modal")).toBeInTheDocument();

//     expect(
//       screen.getByText("formMessages.successTitle")
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText("formMessages.success")
//     ).toBeInTheDocument();

//     const resultBlock = document.querySelector(
//       ".contact-result--success"
//     );
//     expect(resultBlock).toBeInTheDocument();

//     const useEl = document.querySelector("use");
//     expect(useEl?.getAttribute("xlink:href")).toContain(
//       "#icon-success"
//     );
//   });

//   it("renders error modal correctly", () => {
//     render(
//       <ContactFormResultModal
//         isOpen={true}
//         result="error"
//         onClose={onClose}
//       />
//     );

//     expect(
//       screen.getByText("formMessages.errorTitle")
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText("formMessages.error")
//     ).toBeInTheDocument();

//     const resultBlock = document.querySelector(
//       ".contact-result--error"
//     );
//     expect(resultBlock).toBeInTheDocument();

//     const useEl = document.querySelector("use");
//     expect(useEl?.getAttribute("xlink:href")).toContain(
//       "#icon-error"
//     );
//   });

//   it("calls onClose when modal close button is clicked", () => {
//     render(
//       <ContactFormResultModal
//         isOpen={true}
//         result="success"
//         onClose={onClose}
//       />
//     );

//     fireEvent.click(screen.getByText("close"));

//     expect(onClose).toHaveBeenCalledTimes(1);
//   });
// });
