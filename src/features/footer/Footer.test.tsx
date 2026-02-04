// --- MOCK ASSETS ---
// Mock static image import to avoid actual file resolution
jest.mock("@/assets/images/profile-img-2.webp", () => "profile-img-mock", {
  virtual: true,
});

// --- MOCK TRANSLATION ---
// Mock useTranslation to provide consistent keys and language
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
    },
  }),
}));

import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer heading", () => {
    render(<Footer />);
    // Ensure footer main heading is rendered
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    // Verify presence of all expected social links
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /telegram/i })).toBeInTheDocument();
  });
});
