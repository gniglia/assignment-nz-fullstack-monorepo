import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "./utils";

type SelectOption = {
  value: string;
  label: string;
};

/* eslint-disable no-unused-vars */
type SelectProps = {
  options: SelectOption[];
  onValueChange?: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};
/* eslint-enable no-unused-vars */

function Select({
  options,
  onValueChange,
  placeholder = "Select an option...",
  className,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");

  const selectedOption = options.find(
    (option) => option.value === internalValue,
  );

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Remove useEffect since we're not using external value prop

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors",
          "hover:border-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleValueChange(option.value)}
              className={cn(
                "flex w-full items-center px-3 py-2 text-sm text-gray-900 hover:bg-gray-100",
                internalValue === option.value &&
                  "bg-primary-50 text-primary-600",
              )}
            >
              <span className="flex-1 text-left">{option.label}</span>
              {internalValue === option.value && (
                <Check className="h-4 w-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

Select.displayName = "Select";

export { Select };
