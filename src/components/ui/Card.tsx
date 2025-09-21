import { ReactNode } from "react";
import { cn } from "./utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: boolean;
};

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200",
        padding && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
