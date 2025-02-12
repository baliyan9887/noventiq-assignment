/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { useTranslation } from "next-i18next";
import LoginPage from "@/components/LoginPage";
import { validateEmail, getBrowserLanguage } from "@/utils";
import "@testing-library/jest-dom";

// Mock the useTranslation hook with appropriate type
jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      services: {
        resourceStore: {
          data: {
            en: {},
            fr: {},
          },
        },
      },
    },
  }),
}));

// Mock other components with correct types
jest.mock("lucide-react", () => ({
  MailIcon: () => <svg data-testid="mock-icon" />,
}));

jest.mock("@/components/ui/InputField", () => ({
  __esModule: true,
  default: ({ label, value, onChange, ...props }: any) => (
    <input
      aria-label={label}
      value={value}
      onChange={onChange}
      {...props}
      data-testid="mock-input-field"
    />
  ),
}));

jest.mock("@/components/ui/PasswordInputField", () => ({
  __esModule: true,
  default: ({ label, value, onChange }: any) => (
    <input
      aria-label={label}
      value={value}
      onChange={onChange}
      data-testid="mock-password-input"
    />
  ),
}));

jest.mock("@/components/ui/LanguageSelector", () => ({
  __esModule: true,
  default: () => <select data-testid="mock-language-selector" />,
}));

// Mock the utils with correct types
jest.mock("@/utils", () => ({
  validateEmail: jest.fn(),
  getBrowserLanguage: jest.fn(),
  cn: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    // Mock the browser language to 'en'
    (getBrowserLanguage as jest.Mock).mockReturnValue("en");
  });

  it("renders the login form", () => {
    render(<LoginPage />);

    // Check that the login form elements are rendered
    const heading = screen.getByRole("heading", { name: /login/i });
    const submitButton = screen.getByRole("button", { name: /login/i });
    const logoImage = screen.getByAltText(/noventiq logo/i);

    expect(heading).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
    expect(screen.getByTestId("mock-input-field")).toBeInTheDocument();
    expect(screen.getByTestId("mock-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("mock-language-selector")).toBeInTheDocument();
  });

  it("submits form with valid email", async () => {
    render(<LoginPage />);
    const emailInput = screen.getByTestId(
      "mock-input-field"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "mock-password-input"
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@domain.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(validateEmail).toHaveBeenCalled());
    expect(screen.queryByText("invalid email")).not.toBeInTheDocument();
  });
});
