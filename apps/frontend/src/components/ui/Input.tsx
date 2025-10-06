import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "./utils";
import { useFormField } from "./Form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, success, ...props }, ref) => {
    // Try to get form field context, but don't fail if not in a form
    let formError = null;
    try {
      const formField = useFormField();
      formError = formField.error;
    } catch {
      // Not in a form context, use empty field
    }

    const hasError = !!error || !!formError;

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "block w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors",
            hasError
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-input focus:border-primary focus:ring-primary",
            success &&
              "border-green-500 focus:border-green-500 focus:ring-green-500",
            className,
          )}
          {...props}
        />
        {/* Don't render error message here - let FormMessage handle it */}
        {success && !hasError && (
          <p className="mt-1 text-sm text-success">✓ Valid</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
