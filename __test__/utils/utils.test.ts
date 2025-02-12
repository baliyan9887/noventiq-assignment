import { cn, getBrowserLanguage, validateEmail } from "@/utils";

describe("cn function", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
    expect(cn("class1", { class2: true, class3: false })).toBe("class1 class2");
    expect(cn("class1", ["class2", "class3"])).toBe("class1 class2 class3");
    expect(cn("class1", null, undefined, false, "class2")).toBe(
      "class1 class2"
    );
  });

  it("should handle Tailwind CSS class merging", () => {
    expect(cn("p-2 p-4")).toBe("p-4"); // Tailwind classes should merge
    expect(cn("text-red-500 text-blue-500")).toBe("text-blue-500");
  });
});

describe("getBrowserLanguage function", () => {
  beforeEach(() => {
    // Mock navigator.language
    Object.defineProperty(global.navigator, "language", {
      value: "en",
      writable: true,
    });
  });

  it("should return the supported browser language", () => {
    expect(getBrowserLanguage(["en", "hi", "ta"])).toBe("en");
  });

  it('should return "en" if the browser language is not supported', () => {
    Object.defineProperty(global.navigator, "language", {
      value: "de",
    });
    expect(getBrowserLanguage(["en", "hi", "ta"])).toBe("en");
  });
});

describe("validateEmail function", () => {
  it("should return null for a valid corporate email", () => {
    expect(validateEmail("user@company.com")).toBeNull();
  });

  it('should return "Invalid email format" for invalid email formats', () => {
    expect(validateEmail("invalid-email")).toBe("Invalid email format");
    expect(validateEmail("user@.com")).toBe("Invalid email format");
    expect(validateEmail("user@domain")).toBe("Invalid email format");
  });

  it('should return "Invalid email format" for missing domain', () => {
    expect(validateEmail("user@")).toBe("Invalid email format");
  });

  it('should return "Public email addresses are not allowed" for public domains', () => {
    expect(validateEmail("user@gmail.com")).toBe(
      "Public email addresses are not allowed"
    );
    expect(validateEmail("user@yahoo.com")).toBe(
      "Public email addresses are not allowed"
    );
  });

  it("should handle case-insensitive domain validation", () => {
    expect(validateEmail("user@GMAIL.COM")).toBe(
      "Public email addresses are not allowed"
    );
  });
});
