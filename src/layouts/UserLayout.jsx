import React, { useState } from "react";
import {
  Users,
  Activity,
  Heart,
  AlertTriangle,
  Settings,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  Monitor,
  Bell,
  BarChart3,
  Droplets,
  Thermometer,
  Stethoscope,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import VitalSigns from "../pages/VitalSigns";
import ECGMonitoring from "../pages/ECGMonitoring";
import Alerts from "../pages/Alerts";
import PatientCommunication from "../pages/PatientCommunication";
import DeviceManagement from "../pages/DeviceManagement";
import SettingsPage from "../pages/Settings";

const UserLayout = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "patients":
        return <Patients setCurrentPage={setCurrentPage} />;
      case "vital-signs":
        return <VitalSigns />;
      case "ecg-monitoring":
        return <ECGMonitoring />;
      case "alerts":
        return <Alerts />;
      case "communication":
        return <PatientCommunication />;
      case "device-management":
        return <DeviceManagement />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkModeBackGround font-sans transition-colors">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
          <div className="p-4 lg:p-6">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
