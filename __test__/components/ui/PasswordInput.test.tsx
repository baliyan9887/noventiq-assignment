/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "@/components/ui/PasswordInputField";
import "@testing-library/jest-dom";

// Mock the icon components for testing purposes
jest.mock("lucide-react", () => ({
  Lock: () => <svg data-testid="mock-lock-icon" />,
  Eye: () => <svg data-testid="mock-eye-icon" />,
  EyeOff: () => <svg data-testid="mock-eyeoff-icon" />,
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        hide: "Hide",
        show: "Show",
      }[key]),
  }),
}));

describe("Password Input Field UI Component", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    value: "password123",
    onChange: mockOnChange,
    label: "Password",
    icon: require("lucide-react").Lock,
  };

  it("renders correctly with default props", () => {
    render(<PasswordInput {...defaultProps} />);

    const inputElement = screen.getByLabelText(defaultProps.label);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");

    expect(screen.getByTestId("mock-lock-icon")).toBeInTheDocument();

    const eyeIcon = screen.getByRole("button");
    expect(eyeIcon).toBeInTheDocument();
  });

  it("toggles password visibility when the eye icon is clicked", () => {
    render(<PasswordInput {...defaultProps} />);

    const eyeIcon = screen.getByRole("button");
    const inputElement = screen.getByLabelText(defaultProps.label);

    expect(inputElement).toHaveAttribute("type", "password");

    fireEvent.click(eyeIcon);
    expect(inputElement).toHaveAttribute("type", "text");

    fireEvent.click(eyeIcon);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("displays the correct tooltip text based on password visibility", () => {
    render(<PasswordInput {...defaultProps} />);

    const eyeIcon = screen.getByRole("button");

    fireEvent.mouseOver(eyeIcon);
    expect(screen.getByText("Show")).toBeInTheDocument();

    fireEvent.click(eyeIcon);

    fireEvent.mouseOver(eyeIcon);
    expect(screen.getByText("Hide")).toBeInTheDocument();
  });

  it("calls the onChange handler when the input value changes", () => {
    render(<PasswordInput {...defaultProps} />);

    const inputElement = screen.getByLabelText(defaultProps.label);

    fireEvent.change(inputElement, { target: { value: "newPassword123" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
