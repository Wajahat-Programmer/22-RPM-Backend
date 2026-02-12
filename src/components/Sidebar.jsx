import React, { useContext } from "react";
import {
  Users,
  Activity,
  Heart,
  AlertTriangle,
  Settings,
  ChevronRight,
  MessageSquare,
  Monitor,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const API_BASE = import.meta.env.VITE_BACKEND_API;

const Sidebar = ({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "patients", label: "Patients", icon: Users },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    {
      id: "communication",
      label: "Patient Communication",
      icon: MessageSquare,
    },
    { id: "device-management", label: "Device Management", icon: Monitor },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-innerDarkColor border-r border-gray-200 dark:border-gray-700 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center space-x-3 p-3 bg-primary dark:darkModeBackGround rounded-lg text-white dark:text-gray-100">
                <div className="w-8 h-8 bg-primary dark:bg-blue-600 rounded flex items-center justify-center">
                  <Monitor
                    size={16}
                    className="text-white dark:text-gray-100"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">22 LLC</div>
                  <div className="text-xs text-gray-300 dark:text-gray-400">
                    Enterprise
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Platform
              </h3>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${
                        currentPage === item.id
                          ? "bg-primary dark:bg-blue-600 text-white dark:text-gray-100"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {item.hasSubmenu && (
                      <ChevronRight
                        size={16}
                        className="text-gray-400 dark:text-gray-500"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 dark:bg-gray-500 rounded-full flex items-center justify-center text-white dark:text-gray-100 text-sm font-medium">
                {auth?.user?.name?.charAt(0) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {auth?.user?.email || "Guest"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {auth?.user?.username || "Guest"}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
