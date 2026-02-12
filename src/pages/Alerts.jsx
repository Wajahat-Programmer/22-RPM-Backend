import React from "react";
import AlertItem from "../components/AlertItem";

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      patient: "John Smith",
      condition: "Irregular Heartbeat",
      severity: "High",
      time: "2 min ago",
    },
    {
      id: 2,
      patient: "Maria Garcia",
      condition: "High Blood Pressure",
      severity: "Medium",
      time: "15 min ago",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      condition: "Low Oxygen Saturation",
      severity: "High",
      time: "32 min ago",
    },
    {
      id: 4,
      patient: "Emily Davis",
      condition: "Elevated Heart Rate",
      severity: "Low",
      time: "1 hour ago",
    },
    {
      id: 5,
      patient: "Michael Brown",
      condition: "Blood Pressure Drop",
      severity: "Medium",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Alerts
      </h2>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Active Alerts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Alerts requiring immediate attention
          </p>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              name={alert.patient}
              condition={alert.condition}
              severity={alert.severity}
              time={alert.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
