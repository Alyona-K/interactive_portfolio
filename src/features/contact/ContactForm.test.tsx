// --------------------
// MOCKS
// --------------------

// Mock EmailJS to isolate form submission logic and avoid real network requests
jest.mock("@emailjs/browser", () => ({
  send: jest.fn(),
}));

// Mock i18n to return key as text for predictable rendering in tests
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Provide mock config for EmailJS to avoid relying on real credentials
jest.mock("./emailjsConfig", () => ({
  SERVICE_ID: "test_service",
  TEMPLATE_ID: "test_template",
  PUBLIC_KEY: "test_public",
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";
import emailjs from "@emailjs/browser";

/* --------------------------------------------------
   CONTACT FORM TESTS
   Verify form submission, success/error handling, button state, and modal interactions
-------------------------------------------------- */
describe("ContactForm", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    // suppress console.error output for cleaner test logs
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  /**
   * Fills the form with valid inputs
   * Ensures consistent setup for multiple test cases
   */
  const fillValidForm = async () => {
    await userEvent.type(screen.getByLabelText("formLabels.name"), "John Doe");
    await userEvent.type(screen.getByLabelText("formLabels.company"), "Acme Inc");
    await userEvent.type(screen.getByLabelText("Email:"), "john@example.com");
    await userEvent.type(
      screen.getByPlaceholderText("formLabels.placeholder"),
      "This is a valid message",
    );
  };

  it("submits form successfully and shows success modal", async () => {
    // Mock EmailJS success response
    (emailjs.send as jest.Mock).mockResolvedValueOnce({});

    render(<ContactForm />);
    await fillValidForm();

    // Trigger form submission
    await waitFor(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "buttons.submit" }));
    });

    expect(emailjs.send).toHaveBeenCalledTimes(1);

    // Verify success message is displayed
    await waitFor(() => {
      expect(screen.getByText("formMessages.success")).toBeInTheDocument();
    });
  });

  it("shows error modal when emailjs fails", async () => {
    // Mock EmailJS failure response
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error("EmailJS error"));

    render(<ContactForm />);
    await fillValidForm();

    await waitFor(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "buttons.submit" }));
    });

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText("formMessages.error")).toBeInTheDocument();
    });
  });

  it("disables submit button while sending", async () => {
    let resolvePromise: (value?: void) => void;

    // Delay promise resolution to test "sending" state
    (emailjs.send as jest.Mock).mockImplementation(
      () => new Promise((resolve) => { resolvePromise = resolve; }),
    );

    render(<ContactForm />);
    await fillValidForm();

    const submitButton = screen.getByRole("button", { name: "buttons.submit" });
    fireEvent.submit(submitButton);

    // Verify button is disabled and shows sending state
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole("button", { name: "states.sending" })).toBeInTheDocument();

    // Resolve promise to avoid hanging test
    resolvePromise!();
  });

  it("closes modal when onClose is triggered", async () => {
    (emailjs.send as jest.Mock).mockResolvedValueOnce({});

    render(<ContactForm />);
    await fillValidForm();

    await waitFor(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "buttons.submit" }));
    });

    const modalText = await screen.findByText("formMessages.success");
    expect(modalText).toBeInTheDocument();

    // Trigger modal close
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText("formMessages.success")).not.toBeInTheDocument();
    });
  });
});



//---------

// // --------------------
// // mocks
// // --------------------

// jest.mock("@emailjs/browser", () => ({
//   send: jest.fn(),
// }));

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//   }),
// }));

// jest.mock("./emailjsConfig", () => ({
//   SERVICE_ID: "test_service",
//   TEMPLATE_ID: "test_template",
//   PUBLIC_KEY: "test_public",
// }));

// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
// } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import ContactForm from "./ContactForm";
// import emailjs from "@emailjs/browser";

// describe("ContactForm", () => {
//   const originalConsoleError = console.error;
//   beforeEach(() => {
//     jest.clearAllMocks();
//     console.error = jest.fn(); // убираем вывод ошибок в консоль
//   });

//   afterEach(() => {
//     console.error = originalConsoleError; 
//   });

//   const fillValidForm = async () => {
//     await userEvent.type(screen.getByLabelText("formLabels.name"), "John Doe");
//     await userEvent.type(
//       screen.getByLabelText("formLabels.company"),
//       "Acme Inc",
//     );
//     await userEvent.type(screen.getByLabelText("Email:"), "john@example.com");
//     await userEvent.type(
//       screen.getByPlaceholderText("formLabels.placeholder"),
//       "This is a valid message",
//     );
//   };

//   it("submits form successfully and shows success modal", async () => {
//     (emailjs.send as jest.Mock).mockResolvedValueOnce({});

//     render(<ContactForm />);

//     await fillValidForm();

//     await waitFor(async () => {
//       fireEvent.submit(screen.getByRole("button", { name: "buttons.submit" }));
//     });

//     expect(emailjs.send).toHaveBeenCalledTimes(1);

//     await waitFor(() => {
//       expect(screen.getByText("formMessages.success")).toBeInTheDocument();
//     });
//   });

//   it("shows error modal when emailjs fails", async () => {
//     (emailjs.send as jest.Mock).mockRejectedValueOnce(
//       new Error("EmailJS error"),
//     );

//     render(<ContactForm />);

//     await fillValidForm();

//     await waitFor(async () => {
//       fireEvent.submit(screen.getByRole("button", { name: "buttons.submit" }));
//     });

//     await waitFor(() => {
//       expect(screen.getByText("formMessages.error")).toBeInTheDocument();
//     });
//   });

//   it("disables submit button while sending", async () => {
//     let resolvePromise: (value?: void) => void;

//     (emailjs.send as jest.Mock).mockImplementation(
//       () =>
//         new Promise((resolve) => {
//           resolvePromise = resolve;
//         }),
//     );

//     render(<ContactForm />);

//     await fillValidForm();

//     const submitButton = screen.getByRole("button", { name: "buttons.submit" });

//     fireEvent.submit(submitButton);

//     expect(submitButton).toBeDisabled();
//     expect(
//       screen.getByRole("button", { name: "states.sending" }),
//     ).toBeInTheDocument();

//     // "разморозка" промиса
//     resolvePromise!();
//   });

//   it("closes modal when onClose is triggered", async () => {
//     (emailjs.send as jest.Mock).mockResolvedValueOnce({});

//     render(<ContactForm />);

//     await fillValidForm();

//     await waitFor(async () => {
//       fireEvent.submit(screen.getByRole("button", { name: "buttons.submit" }));
//     });

//     const modalText = await screen.findByText("formMessages.success");

//     expect(modalText).toBeInTheDocument();

//     fireEvent.click(screen.getByRole("button", { name: /close/i }));

//     await waitFor(() => {
//       expect(
//         screen.queryByText("formMessages.success"),
//       ).not.toBeInTheDocument();
//     });
//   });
// });
