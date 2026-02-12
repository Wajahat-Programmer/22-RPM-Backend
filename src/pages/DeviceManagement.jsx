import React from "react";
import DeviceStatus from "../components/DeviceStatus";

const DeviceManagement = () => {
  const devices = [
    {
      id: 1,
      name: "Sensorian LD20 #001",
      status: "Online",
      battery: 85,
      patient: "John Smith",
    },
    {
      id: 2,
      name: "Sensorian LD20 #002",
      status: "Online",
      battery: 92,
      patient: "Maria Garcia",
    },
    {
      id: 3,
      name: "Sensorian LD20 #003",
      status: "Offline",
      battery: 12,
      patient: "Robert Johnson",
    },
    {
      id: 4,
      name: "Sensorian LD20 #004",
      status: "Online",
      battery: 78,
      patient: "Emily Davis",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Device Management
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Connected Devices
          </h3>
          <div className="space-y-3">
            {devices.map((device) => (
              <DeviceStatus
                key={device.id}
                device={device.name}
                status={device.status}
                battery={device.battery}
                patient={device.patient}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            System Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">
                  Signal Quality
                </span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Excellent
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 dark:bg-green-400 h-2 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">
                  Data Transmission
                </span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Good
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 dark:bg-green-400 h-2 rounded-full"
                  style={{ width: "88%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">
                  Device Connectivity
                </span>
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  Fair
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Device Activity Log
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Device LD20 #001 connected
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                2 min ago
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Battery low alert - Device #003
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                15 min ago
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Data sync completed
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                32 min ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
