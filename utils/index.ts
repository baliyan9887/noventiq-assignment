import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { publicDomains } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBrowserLanguage = (supportedLanguages: string[]): string => {
  const browserLang = navigator.language.split("-")[0]; // Extract "en" from "en-US"
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  const domain = email.split("@")[1]?.toLowerCase();

  if (!domain) {
    return "Invalid email address";
  }

  if (publicDomains.has(domain)) {
    return "Public email addresses are not allowed";
  }

  return null; // Valid corporate email
};
