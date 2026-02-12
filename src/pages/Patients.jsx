// // src/pages/Patients.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Patients = ({ setCurrentPage }) => {
//   const navigate = useNavigate();
//   const patients = [
//     {
//       id: 1,
//       name: "John Smith",
//       status: "Normal",
//       lastReading: "2 min ago",
//       heartRate: 72,
//     },
//     {
//       id: 2,
//       name: "Maria Garcia",
//       status: "Alert",
//       lastReading: "15 min ago",
//       heartRate: 95,
//     },
//     {
//       id: 3,
//       name: "Robert Johnson",
//       status: "Critical",
//       lastReading: "32 min ago",
//       heartRate: 45,
//     },
//     {
//       id: 4,
//       name: "Emily Davis",
//       status: "Normal",
//       lastReading: "1 hour ago",
//       heartRate: 68,
//     },
//     {
//       id: 5,
//       name: "Michael Brown",
//       status: "Normal",
//       lastReading: "30 min ago",
//       heartRate: 75,
//     },
//     {
//       id: 6,
//       name: "Sarah Wilson",
//       status: "Alert",
//       lastReading: "45 min ago",
//       heartRate: 88,
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
//         <button className="mt-4 lg:mt-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
//           Add New Patient
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">Active Patients</h3>
//           <p className="text-sm text-gray-600">Currently monitored patients</p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Patient
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Heart Rate
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Last Reading
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Initiate chat
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {patients.map((patient) => (
//                 <tr key={patient.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                         {patient.name.charAt(0)}
//                       </div>
//                       <div className="ml-3">
//                         <div className="text-sm font-medium text-gray-900">
//                           {patient.name}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         patient.status === "Normal"
//                           ? "bg-green-100 text-green-800"
//                           : patient.status === "Alert"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {patient.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {patient.heartRate} BPM
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {patient.lastReading}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button
//                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#005685fe]"
//                       onClick={() => setCurrentPage("communication")}
//                     >
//                       send message
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button
//                       className="text-primary hover:text-accent"
//                       onClick={() => setCurrentPage("vital-signs")}
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Patients;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_BACKEND_API;

const Patients = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/messages/patients`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setPatients(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (patient) => {
    localStorage.setItem("selectedPatient", JSON.stringify(patient));
    setCurrentPage("communication");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading patients...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Patients
        </h2>
        <button className="mt-4 lg:mt-0 px-4 py-2 bg-primary dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-accent dark:hover:bg-blue-500 transition-colors">
          Add New Patient
        </button>
      </div>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Active Patients
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Currently monitored patients ({patients.length})
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Heart Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Reading
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Initiate Chat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white dark:text-gray-100 text-sm font-medium">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {patient.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.status === "Normal"
                          ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                          : patient.status === "Alert"
                          ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300"
                          : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {patient.heartRate} BPM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.lastReading}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      className="px-4 py-2 bg-primary dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-accent dark:hover:bg-blue-500 transition-colors"
                      onClick={() => handleSendMessage(patient)}
                    >
                      Send Message
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      className="text-primary dark:text-blue-400 hover:text-accent dark:hover:text-blue-300"
                      onClick={() => setCurrentPage("vital-signs")}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
