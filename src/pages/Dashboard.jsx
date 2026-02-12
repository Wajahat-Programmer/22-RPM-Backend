import React from "react";
import { Users, AlertTriangle, Heart, Activity } from "lucide-react";
import StatCard from "../components/StatCard";
import AlertItem from "../components/AlertItem";
import StatusItem from "../components/StatusItem";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <div className="mt-4 lg:mt-0 text-sm text-gray-600 dark:text-gray-400">
          Last updated: 2 min ago
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Active Alerts"
          value="23"
          change="-8% from last month"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-red-600 dark:text-red-400"
        />
        <StatCard
          title="Critical Cases"
          value="7"
          change="+2 from last month"
          changeType="positive"
          icon={Heart}
          iconColor="text-orange-600 dark:text-orange-400"
        />
        <StatCard
          title="ECG Readings Today"
          value="156"
          change="+24% from last month"
          changeType="positive"
          icon={Activity}
          iconColor="text-green-600 dark:text-green-400"
        />
      </div>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Cardiac Alerts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-100">
            Latest alerts requiring attention
          </p>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <AlertItem
            name="John Smith"
            condition="Irregular Heartbeat"
            severity="High"
            time="2 min ago"
          />
          <AlertItem
            name="Maria Garcia"
            condition="High Blood Pressure"
            severity="Medium"
            time="15 min ago"
          />
          <AlertItem
            name="Robert Johnson"
            condition="Low Oxygen Saturation"
            severity="High"
            time="32 min ago"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            System Status
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time monitoring status
          </p>
        </div>
        <div className="p-6 space-y-4">
          <StatusItem label="ECG Monitors" percentage={98} />
          <StatusItem label="Vital Signs Sensors" percentage={94} />
          <StatusItem label="Data Processing" percentage={100} />
          <StatusItem label="AI Analysis Engine" percentage={96} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
