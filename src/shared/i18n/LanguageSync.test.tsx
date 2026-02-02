import { render } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { LanguageSync } from "./LanguageSync";

// --- MOCK useTranslation HOOK TO CONTROL RETURNED LANGUAGE ---
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("LanguageSync", () => {

  // --- RESET DOCUMENT LANGUAGE BEFORE EACH TEST ---
  beforeEach(() => {
    document.documentElement.lang = "en";
  });

  test("sets document.documentElement.lang according to i18n.language", () => {
    // Simulate Spanish language
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: { language: "es" },
    });

    render(<LanguageSync />);
    expect(document.documentElement.lang).toBe("es");

    // Simulate Russian language
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: { language: "ru" },
    });

    render(<LanguageSync />);
    expect(document.documentElement.lang).toBe("ru");
  });
});
