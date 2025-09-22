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
  value?: string;
  onValueChange?: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
};
/* eslint-enable no-unused-vars */

function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  className,
  disabled = false,
  error = false,
  success = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Handle external value changes (from react-hook-form)
  React.useEffect(() => {
    // This ensures the component updates when the value prop changes
    // from external sources like react-hook-form
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors",
          "hover:border-input/80 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error &&
            "border-destructive focus:border-destructive focus:ring-destructive",
          success &&
            "border-green-500 focus:border-green-500 focus:ring-green-500",
          className,
        )}
      >
        <span
          className={cn("truncate", !selectedOption && "text-muted-foreground")}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover py-1 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleValueChange(option.value)}
              className={cn(
                "flex w-full items-center px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                value === option.value &&
                  "bg-primary/10 text-primary font-medium",
              )}
            >
              <span className="flex-1 text-left">{option.label}</span>
              {value === option.value && (
                <Check className="h-4 w-4 text-primary" />
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
