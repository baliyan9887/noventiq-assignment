/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/components/ui/InputField";
import "@testing-library/jest-dom";

// Mock the icon component for testing purposes
jest.mock("lucide-react", () => ({
  MailIcon: () => <svg data-testid="mock-icon" />,
}));

describe("InputField UI Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders the input field with a label", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={() => {}}
        label="Email"
        id="email"
      />
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
  it("renders the input field with a placeholder", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Enter your email"
        label="Email"
      />
    );
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("renders the input field with an icon", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={() => {}}
        label="Email"
        icon={require("lucide-react").MailIcon}
      />
    );
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument(); // Assuming the icon is rendered as an image or SVG
  });

  it("renders the input field as required", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={() => {}}
        label="Username"
        required
      />
    );
    const input = screen.getByLabelText("Username");
    expect(input).toBeRequired();
  });

  it("should display error message if error prop is provided", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={mockOnChange}
        label="Username"
        error="This field is required"
      />
    );

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should call onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputField type="text" value="" onChange={handleChange} label="Email" />
    );
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "email@noventiq.com" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should apply custom className when className prop is passed", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={mockOnChange}
        label="Username"
        className="custom-class"
      />
    );

    const input = screen.getByLabelText("Username");
    expect(input).toHaveClass("custom-class");
  });

  it("should not add padding when no icon is provided", () => {
    render(
      <InputField
        type="text"
        value=""
        onChange={mockOnChange}
        label="Username"
      />
    );

    const input = screen.getByLabelText("Username");
    expect(input).toHaveClass("pl-2");
  });
});
