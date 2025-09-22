import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "./utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive",
            success && "border-success focus:border-success focus:ring-success",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        {success && !error && (
          <p className="mt-1 text-sm text-success">✓ Valid</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
