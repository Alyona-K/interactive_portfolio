// --- MOCK MODULES ---
// Mock animation function to isolate component tests
jest.mock("./faqAnimation", () => ({
  animateFaq: jest.fn(),
}));

// Mock translation hook to provide consistent language and keys
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
    },
  }),
}));

// Mock FaqCard component to focus on FaqSlider logic
jest.mock("@/shared/ui/FaqCard", () => ({
  FaqCard: ({ index, currentLang }: { index: number; currentLang: string }) => (
    <div data-testid="faq-card">
      card-{index}-{currentLang}
    </div>
  ),
}));

import { render, screen, cleanup } from "@testing-library/react";
import FaqSlider from "./FaqSlider";
import { faqData } from "@/entities/faq/faqData";
import { animateFaq } from "./faqAnimation";

describe("FaqSlider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders FAQ section with title", () => {
    render(<FaqSlider />);

    // Verify main heading and section title are rendered
    expect(
      screen.getByRole("heading", { name: "FAQ section" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "section.sectionTitle" }),
    ).toBeInTheDocument();
  });

  it("renders faq cards based on faqData", () => {
    render(<FaqSlider />);

    // Ensure each data item is rendered as a card
    const cards = screen.getAllByTestId("faq-card");
    expect(cards).toHaveLength(faqData.length);
  });

  it("passes current language to FaqCard", () => {
    render(<FaqSlider />);

    // Verify language prop is correctly passed to child component
    expect(screen.getByText("card-0-en")).toBeInTheDocument();
  });

  it("calls animateFaq on mount", () => {
    render(<FaqSlider />);

    // Ensure animation initialization is triggered on mount
    expect(animateFaq).toHaveBeenCalledTimes(1);
    expect(animateFaq).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
    );
  });

  it("cleans up animation on unmount", () => {
    // Mock cleanup function to verify lifecycle handling
    const cleanupMock = jest.fn();
    (animateFaq as jest.Mock).mockReturnValueOnce(cleanupMock);

    const { unmount } = render(<FaqSlider />);

    unmount();

    // Ensure cleanup function is called on component unmount
    expect(cleanupMock).toHaveBeenCalledTimes(1);
  });
});
