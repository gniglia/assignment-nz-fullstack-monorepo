import { useState } from "react";

type AvatarProps = {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  className = "",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClass = sizeClasses[size];
  const initials = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className={`${sizeClass} ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
          <span className="font-medium text-gray-600">{initials}</span>
        </div>
      )}
    </div>
  );
}
