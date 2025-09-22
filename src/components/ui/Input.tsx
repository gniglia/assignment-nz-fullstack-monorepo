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
            "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors",
            error && "border-red-300 focus:border-red-500 focus:ring-red-500",
            success &&
              "border-green-300 focus:border-green-500 focus:ring-green-500",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {success && !error && (
          <p className="mt-1 text-sm text-green-600">✓ Valid</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
