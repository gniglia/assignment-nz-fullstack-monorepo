import { ReactNode } from "react";
import { cn } from "./utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
};

export function Card({
  children,
  className,
  padding = true,
  hover = false,
  variant = "default",
}: CardProps) {
  const baseClasses = "bg-white rounded-lg transition-all duration-200";

  const variantClasses = {
    default: "shadow-sm border border-gray-200",
    elevated: "shadow-md border border-gray-100",
    outlined: "shadow-none border-2 border-gray-200",
  };

  const hoverClasses = hover
    ? "hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5 hover:border-gray-300"
    : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        padding && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
