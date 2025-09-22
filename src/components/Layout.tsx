import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useConditionalBodyLock } from "@/hooks/useConditionalBodyLock";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when sidebar is open on mobile
  useConditionalBodyLock(sidebarOpen);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={handleCloseSidebar}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar - Mobile */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        lg:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar onClose={handleCloseSidebar} />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:transform lg:translate-x-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-screen lg:ml-64">
        <Header onMenuClick={handleOpenSidebar} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
