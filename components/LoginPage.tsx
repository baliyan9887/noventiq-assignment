"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { MailIcon } from "lucide-react";
import { validateEmail, getBrowserLanguage } from "@/utils";
import InputField from "./ui/InputField";
import PasswordInput from "./ui/PasswordInputField";
import LanguageSelector from "./ui/LanguageSelector";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const browserLang = getBrowserLanguage(
      Object.keys(i18n.services.resourceStore.data)
    );
    i18n.changeLanguage(browserLang);
  }, [i18n]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    setError("");
    setFormSubmitted(true);
    console.log("Login successful with email:", email);
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setFormSubmitted(false);
  };

  return (
    <>
      {formSubmitted ? (
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl font-semibold"> {t("successMessage")}</h1>
          <span className="text-gray-600">{email}</span>
          <button
            type="button"
            className="w-full bg-[#2DB5E9] text-white p-2 mt-4 rounded"
            onClick={handleLogout}
          >
            {t("logout")}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg  w-full max-w-lg"
        >
          <Image
            src="/assets/logo.png"
            width={200}
            height={200}
            alt="Noventiq logo"
            className="mx-auto mb-4"
          />

          <h2 className="text-xl font-bold mb-4">{t("login")}</h2>

          <InputField
            id="email"
            type="email"
            value={email}
            label={t("email")}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@yourcompany.com"
            icon={MailIcon}
            error={error}
            required
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={t("password")}
          />

          <LanguageSelector />

          <button
            type="submit"
            className="w-full bg-[#2DB5E9] text-white p-2 mt-4 rounded"
          >
            {t("login")}
          </button>
        </form>
      )}
    </>
  );
};

export default LoginPage;
