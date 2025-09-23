import { NavLink } from "react-router-dom";
import { BarChart3, Home, Users as UsersIcon, X } from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: UsersIcon },
];

type SidebarProps = {
  onClose?: () => void;
};

export function Sidebar({ onClose }: SidebarProps) {
  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <motion.div
      className="h-full w-64 bg-card border-r border-border flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header with close button for mobile */}
      <motion.div
        className="p-5 flex items-center justify-between border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        </div>
        {onClose && (
          <motion.button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            aria-label="Close sidebar"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
      </motion.div>

      {/* Navigation */}
      <nav
        className="mt-8 flex-1 px-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isActive
                    ? "text-primary-foreground bg-primary"
                    : "text-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center space-x-3 w-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <motion.div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </motion.div>
      </nav>
    </motion.div>
  );
}
