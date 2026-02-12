import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_API;

const EditUserModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        status: user.status || "Active",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE}/api/admin/users/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.data.ok) {
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          status: formData.status,
        };
        onSubmit(updatedUser);
        onClose();
      } else {
        setError(response.data.message || "Failed to update user");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";
      setError(errorMessage);
      if (err.response?.data?.details) {
        const details = err.response.data.details
          .map((d) => d.message)
          .join(", ");
        setError(`${errorMessage}: ${details}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-primary dark:text-blue-400">
            Edit User
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              placeholder="Enter full name"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              placeholder="Enter email address"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              placeholder="Enter phone number"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              disabled={loading}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-primary dark:bg-blue-600 hover:bg-accent dark:hover:bg-blue-500 transition-colors"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
