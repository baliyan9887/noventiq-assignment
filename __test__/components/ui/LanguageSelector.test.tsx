import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "@/components/ui/LanguageSelector"; // Adjust the path if needed
import * as NextI18Next from "next-i18next";
import "@testing-library/jest-dom";

// Mock the whole next-i18next module
jest.mock("next-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("LanguageSelector", () => {
  let mockChangeLanguage: jest.Mock;
  let mockT: jest.Mock;

  beforeEach(() => {
    mockChangeLanguage = jest.fn();
    mockT = jest.fn((key) => key); // Simple translation mock
    // Setting up mock for useTranslation
    (NextI18Next.useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
      i18n: {
        language: "en",
        changeLanguage: mockChangeLanguage,
        services: {
          resourceStore: {
            data: {
              en: {},
              hi: {},
              ta: {},
              te: {},
            },
          },
        },
      },
    });
  });

  test("renders the component with the correct language", () => {
    render(<LanguageSelector />);
    const select = screen.getByRole("combobox");

    expect(select).toHaveValue("en");
  });

  test("displays language options correctly", () => {
    render(<LanguageSelector />);

    // Check if language options are displayed correctly
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4); // One for each language
    expect(options[0]).toHaveTextContent("languages.en");
    expect(options[1]).toHaveTextContent("languages.hi");
    expect(options[2]).toHaveTextContent("languages.ta");
    expect(options[3]).toHaveTextContent("languages.te");
  });

  test("calls i18n.changeLanguage when a new language is selected", () => {
    render(<LanguageSelector />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "hi" } });

    // Check if changeLanguage was called with the correct language
    expect(mockChangeLanguage).toHaveBeenCalledWith("hi");
  });
});
