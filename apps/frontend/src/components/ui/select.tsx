import * as React from "react";
import { cn } from "./utils";
import { useFormField } from "./Form";

type SelectOption = {
  value: string;
  label: string;
};

type SelectField = {
  onChange?: (value: string) => void;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  onValueChange?: (newValue: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
};

function Select({
  options,
  value,
  onValueChange,
  className,
  disabled = false,
  error = false,
  success = false,
}: SelectProps) {
  // Try to get form field context, but don't fail if not in a form
  let formError = null;
  let field: SelectField = {};
  try {
    const formField = useFormField();
    formError = formField.error;
    field = formField as SelectField;
  } catch {
    // Not in a form context, use empty field
  }

  const hasError = error || !!formError;

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onValueChange?.(newValue);
    field.onChange?.(newValue);
  };

  return (
    <select
      value={value || ""}
      onChange={handleValueChange}
      disabled={disabled}
      className={cn(
        "h-10 w-full rounded-md border pl-3 pr-10 py-2 text-sm",
        "bg-background text-foreground",
        "focus:outline-none focus:ring-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hasError
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-input focus:border-ring focus:ring-ring",
        success &&
          "border-green-500 focus:border-green-500 focus:ring-green-500",
        className,
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

Select.displayName = "Select";

export { Select };
