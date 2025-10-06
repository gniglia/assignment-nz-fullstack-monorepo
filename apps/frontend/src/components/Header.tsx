import { Bell, User, Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

type HeaderProps = {
  onMenuClick?: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="flex items-center justify-between lg:justify-end px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          {/* Theme toggle */}
          <ModeToggle />

          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Open user menu"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
