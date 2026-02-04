import { render, screen } from "@testing-library/react";
import FaqCard from "@/shared/ui/FaqCard";

// --- MOCK I18N ---
// Return translation keys directly; avoids dependency on actual i18n implementation
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("FaqCard", () => {
  // --- RENDER QUESTION AND ANSWER ---  
  it("renders question and answer text", () => {
    render(
      <FaqCard
        id="q1"
        index={0}
        questionKey="faq.question1"
        answerKey="faq.answer1"
        currentLang="en"
      />
    );

    expect(screen.getByText("faq.question1")).toBeInTheDocument();
    expect(screen.getByText("faq.answer1")).toBeInTheDocument();
  });

  // --- APPLY STYLING FOR ODD INDEX ---  
  it("applies odd classes for odd index", () => {
    render(
      <FaqCard
        id="q2"
        index={1}
        questionKey="faq.question2"
        answerKey="faq.answer2"
        currentLang="en"
      />
    );

    const card = screen.getByTestId("q2");

    // Card and question should have odd modifier classes
    expect(card).toHaveClass("faq-card--odd");
    const question = card.querySelector(".faq-card__question");
    expect(question).toHaveClass("faq-card__question--odd");
  });

  // --- VERIFY DATA ATTRIBUTE ---  
  it("sets correct data-id attribute", () => {
    render(
      <FaqCard
        id="q3"
        index={0}
        questionKey="faq.question3"
        answerKey="faq.answer3"
        currentLang="en"
      />
    );

    const card = screen.getByTestId("q3");
    expect(card).toHaveAttribute("data-id", "q3");
  });

  // --- EVEN INDEX DOES NOT HAVE ODD CLASSES ---  
  it("renders even index without odd classes", () => {
    render(
      <FaqCard
        id="q4"
        index={2}
        questionKey="faq.question4"
        answerKey="faq.answer4"
        currentLang="en"
      />
    );

    const card = screen.getByTestId("q4");
    expect(card).not.toHaveClass("faq-card--odd");

    const question = card.querySelector(".faq-card__question");
    expect(question).not.toHaveClass("faq-card__question--odd");
  });
});

//---------------

// import { render, screen } from "@testing-library/react";
// import FaqCard from "@/shared/ui/FaqCard";

// // Mock i18n
// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//   }),
// }));

// describe("FaqCard", () => {
//   it("renders question and answer text", () => {
//     render(
//       <FaqCard
//         id="q1"
//         index={0}
//         questionKey="faq.question1"
//         answerKey="faq.answer1"
//         currentLang="en"
//       />
//     );

//     expect(screen.getByText("faq.question1")).toBeInTheDocument();
//     expect(screen.getByText("faq.answer1")).toBeInTheDocument();
//   });

//   it("applies odd classes for odd index", () => {
//     render(
//       <FaqCard
//         id="q2"
//         index={1}
//         questionKey="faq.question2"
//         answerKey="faq.answer2"
//         currentLang="en"
//       />
//     );

//     const card = screen.getByTestId("q2");
//     expect(card).toHaveClass("faq-card--odd");

//     const question = card.querySelector(".faq-card__question");
//     expect(question).toHaveClass("faq-card__question--odd");
//   });

//   it("sets correct data-id attribute", () => {
//     render(
//       <FaqCard
//         id="q3"
//         index={0}
//         questionKey="faq.question3"
//         answerKey="faq.answer3"
//         currentLang="en"
//       />
//     );

//     const card = screen.getByTestId("q3");
//     expect(card).toHaveAttribute("data-id", "q3");
//   });

//   it("renders even index without odd classes", () => {
//     render(
//       <FaqCard
//         id="q4"
//         index={2}
//         questionKey="faq.question4"
//         answerKey="faq.answer4"
//         currentLang="en"
//       />
//     );

//     const card = screen.getByTestId("q4");
//     expect(card).not.toHaveClass("faq-card--odd");

//     const question = card.querySelector(".faq-card__question");
//     expect(question).not.toHaveClass("faq-card__question--odd");
//   });
// });
