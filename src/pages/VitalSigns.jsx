import React from "react";
import { Heart, Droplets, Activity, Stethoscope } from "lucide-react";
import VitalSignCard from "../components/VitalSignCard";
import ECGMonitoring from "./ECGMonitoring";

const VitalSigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Vital Signs Monitoring
        </h2>
        <div className="mt-4 lg:mt-0 text-sm text-gray-600 dark:text-gray-400">
          Real-time patient vital signs - Last updated: 2 min ago
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VitalSignCard
          title="Heart Rate"
          value="72"
          unit="BPM"
          range="60-100"
          status="normal"
          icon={Heart}
          percentage={72}
        />
        <VitalSignCard
          title="Blood Pressure"
          value="120/80"
          unit="mmHg"
          range="<120/80"
          status="normal"
          icon={Droplets}
          percentage={75}
        />
        <VitalSignCard
          title="Respiratory Rate"
          value="16"
          unit="breaths/min"
          range="12-20"
          status="normal"
          icon={Activity}
          percentage={80}
        />
        <VitalSignCard
          title="Oxygen Saturation"
          value="98"
          unit="%"
          range=">95"
          status="normal"
          icon={Stethoscope}
          percentage={98}
        />
      </div>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Patient: John Smith
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current monitoring session
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Normal
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Overall Status
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                4.5hrs
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Monitoring Duration
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                98%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Signal Quality
              </div>
            </div>
          </div>
        </div>
      </div>
      <ECGMonitoring />
    </div>
  );
};

export default VitalSigns;
