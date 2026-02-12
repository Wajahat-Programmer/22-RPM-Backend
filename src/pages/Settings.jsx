// import React, { useState } from "react";

// const SettingsPage = () => {
//   const [activeTab, setActiveTab] = useState("account");
//   const [sessionTime, setSessionTime] = useState(60);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         {/* Tab Navigation */}
//         {/* <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab("account")}
//               className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                 activeTab === "account"
//                   ? "bg-primary text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               Account Setting
//             </button>
//             <button
//               onClick={() => setActiveTab("followup")}
//               className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                 activeTab === "followup"
//                   ? "bg-primary text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               Follow Up Setting
//             </button>
//           </div>
//         </div> */}

//         {/* Account Settings Tab */}
//         {
//           <div className="p-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-6">
//               Account Settings
//             </h3>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     User Name
//                   </label>
//                   <input
//                     type="text"
//                     defaultValue="Washington Teegan"
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     defaultValue="test"
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     defaultValue="nuroxum@mailinator.com"
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     defaultValue="+1 (934) 963-6707"
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Fax
//                   </label>
//                   <input
//                     type="tel"
//                     defaultValue="+1 (494) 339-8315"
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
//                   />
//                 </div> */}

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Two Way Authentication
//                   </label>
//                   <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">
//                     Disabled
//                   </button>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Clear Cache
//                   </label>
//                   <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600">
//                     Refresh
//                   </button>
//                 </div> */}
//               </div>
//             </div>

//             {/* <div className="mt-6 pt-4 border-t border-gray-200">
//               <div className="flex items-center space-x-4">
//                 <div className="text-sm text-gray-700">
//                   Current Session Time: 60 minutes
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4 mt-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Session Time (minutes):
//                 </label>
//                 <input
//                   type="number"
//                   value={sessionTime}
//                   onChange={(e) => setSessionTime(e.target.value)}
//                   className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm"
//                 />
//                 <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
//                   Update
//                 </button>
//               </div>
//             </div> */}
//           </div>
//         }

//         {/* End of Account Settings Tab */}

//         {/* Follow Up Settings Tab */}
//         {activeTab === "followup" && (
//           <div className="p-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-6">
//               Follow Up Settings
//             </h3>

//             <div className="space-y-6">
//               <div>
//                 <h4 className="text-md font-medium text-gray-800 mb-4">
//                   Alert Thresholds
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Heart Rate (BPM)
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         type="number"
//                         placeholder="Min: 60"
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                       />
//                       <input
//                         type="number"
//                         placeholder="Max: 100"
//                         className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Blood Pressure (mmHg)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="120/80"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-md font-medium text-gray-800 mb-4">
//                   Notification Preferences
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-700">Email Alerts</span>
//                     <input type="checkbox" defaultChecked className="rounded" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-700">
//                       SMS Notifications
//                     </span>
//                     <input type="checkbox" defaultChecked className="rounded" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-700">
//                       Critical Alert Sounds
//                     </span>
//                     <input type="checkbox" defaultChecked className="rounded" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-700">
//                       Push Notifications
//                     </span>
//                     <input type="checkbox" className="rounded" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_API;

const SettingsPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered with auth:", auth);
    if (auth?.user) {
      const newFormData = {
        name: auth.user.name || "",
        username: auth.user.userName || auth.user.username || "",
        email: auth.user.email || "",
        phoneNumber: auth.user.phoneNumber || "",
      };
      console.log("Setting formData with auth.user:", newFormData);
      setFormData(newFormData);
    }
  }, [auth]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const changes = {};
      if (formData.name !== (auth.user?.name || ""))
        changes.name = formData.name;
      if (
        formData.username !== (auth.user?.userName || auth.user?.username || "")
      )
        changes.username = formData.username;
      if (formData.email !== (auth.user?.email || ""))
        changes.email = formData.email;
      if (formData.phoneNumber !== (auth.user?.phoneNumber || ""))
        changes.phoneNumber = formData.phoneNumber;

      if (Object.keys(changes).length === 0) {
        setSuccess("No changes to save");
        setLoading(false);
        return;
      }

      console.log("Sending changes to /api/settings:", changes);
      const response = await axios.patch(`${API_BASE}/api/settings`, changes, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Settings update response:", response.data);
        const updatedUser = response.data.user;
        // Update formData immediately from /api/settings response
        const newFormData = {
          name: updatedUser.name || "",
          username: updatedUser.userName || updatedUser.username || "",
          email: updatedUser.email || "",
          phoneNumber: updatedUser.phoneNumber || "",
        };
        console.log("Setting formData after save:", newFormData);
        setFormData(newFormData);

        // Update auth state with /api/auth/check-me to ensure consistency
        const checkResponse = await fetch(`${API_BASE}/api/auth/check-me`, {
          credentials: "include",
        });
        if (checkResponse.ok) {
          const data = await checkResponse.json();
          console.log("Check-me response:", data);
          setAuth({
            ...auth,
            user: {
              ...data.user,
              userName: data.user.username || data.user.userName,
            },
            isAuthenticated: true,
          });
        } else {
          console.warn("Check-me failed:", checkResponse.status);
        }

        setSuccess("Profile updated successfully");
        setErrors({});
      }
    } catch (error) {
      console.error("Save error:", error);
      setErrors({
        api: error.response?.data?.error || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (auth?.user) {
      console.log("Resetting form with auth.user:", auth.user);
      setFormData({
        name: auth.user.name || "",
        username: auth.user.userName || auth.user.username || "",
        email: auth.user.email || "",
        phoneNumber: auth.user.phoneNumber || "",
      });
    }
    setErrors({});
    setSuccess("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Settings
      </h2>

      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          User Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.phoneNumber}
              </p>
            )}
          </div>
        </div>
        {errors.api && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">
            {errors.api}
          </p>
        )}
        {success && (
          <p className="mt-4 text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 bg-primary dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-accent dark:hover:bg-blue-500 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
