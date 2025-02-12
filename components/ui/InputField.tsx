import { LucideIcon } from "lucide-react";
import { cn } from "@/utils";

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  error?: string;
  required?: boolean;
  icon?: LucideIcon; // Lucide icon component
  className?: string;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  icon: Icon,
  className,
  id = "input-field",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon size={18} />
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={cn(
            className,
            `w-full border p-2 ${Icon ? "pl-10" : "pl-2"} rounded`
          )}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
