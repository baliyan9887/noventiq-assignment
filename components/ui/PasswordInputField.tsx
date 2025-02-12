"use client";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  label,
  className,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <div className="relative">
        <InputField
          label={label}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={className}
          icon={Lock}
          required
        />
        <div className="absolute right-3 top-[75%] transform -translate-y-1/2">
          {/* Tooltip Container */}
          <div className="relative group">
            <button
              type="button"
              className="text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {/* Tooltip Text */}
            <div className="absolute right-0 top-full  mt-1 text-xs bg-black/10 text-gray-600 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {showPassword ? t("hide") : t("show")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
