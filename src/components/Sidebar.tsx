import { NavLink } from "react-router-dom";
import { BarChart3, Home, Users as UsersIcon, X } from "lucide-react";
import { useCallback } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: UsersIcon },
];

type SidebarProps = {
  onClose?: () => void;
};

export function Sidebar({ onClose }: SidebarProps) {
  const handleNavClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <div className="h-full w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Header with close button for mobile */}
      <div className="p-4 sm:p-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="mt-4 sm:mt-6 flex-1"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isActive
                    ? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
