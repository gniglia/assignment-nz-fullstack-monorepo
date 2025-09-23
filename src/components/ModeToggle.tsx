import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/Button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleThemeChange() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function getLabel() {
    return theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleThemeChange}
      className="h-9 w-9 relative overflow-hidden transition-all duration-300 hover:scale-105"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {/* Sun Icon */}
      <Sun
        className={`h-4 w-4 absolute transition-all duration-500 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />

      {/* Moon Icon */}
      <Moon
        className={`h-4 w-4 absolute transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      <span className="sr-only">{getLabel()}</span>
    </Button>
  );
}
