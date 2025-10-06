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
  const baseClasses = "bg-card rounded-lg transition-all duration-200";

  const variantClasses = {
    default: "shadow-sm border border-border",
    elevated: "shadow-md border border-border",
    outlined: "shadow-none border-2 border-border",
  };

  const hoverClasses = hover
    ? "hover:shadow-lg hover:shadow-foreground/10 hover:-translate-y-0.5 hover:border-border"
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
