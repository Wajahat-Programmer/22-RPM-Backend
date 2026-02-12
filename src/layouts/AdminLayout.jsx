import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Lock,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
} from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import ResetPasswordModal from "../components/ResetPasswordModal";
import DeleteUserModal from "../components/DeleteUserModal";
import ThemeToggle from "../components/ThemeToggle"; // Import ThemeToggle

const API_BASE = import.meta.env.VITE_BACKEND_API;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/admin/getAllusers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Unexpected response: ${text.slice(0, 50)}...`);
        }

        const data = await response.json();
        console.log("data", data);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Please log in to access this resource");
          } else if (response.status === 403) {
            throw new Error("Admin access required");
          } else {
            throw new Error(
              data.message || `HTTP error! Status: ${response.status}`
            );
          }
        }

        if (!data.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        const formattedUsers = data.users.map((user) => ({
          id: user.id,
          name: user.name || "Unknown",
          email: user.email || "N/A",
          phone: user.phoneNumber || "N/A",
          role: user.role_type || "Unknown",
          status: user.is_active ? "Active" : "Inactive",
          lastLogin: user.last_login || "Never",
          createdAt: user.created_at || new Date().toISOString().split("T")[0],
          avatar: user.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            : "NA",
        }));

        setUsers(formattedUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(
          err.message ||
            "Failed to fetch users. Please check your network or try again later."
        );
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "All" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = async (userData) => {
    try {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          ...userData,
          createdAt: new Date().toISOString().split("T")[0],
          lastLogin: "Never",
          avatar: userData.name
            .split(" ")
            .map((n) => n[0])
            .join(""),
        },
      ]);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Please try again.");
    }
  };

  const handleEditUser = (userData) => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...userData } : user
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleResetPassword = () => {
    setShowPasswordModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const toggleUserStatus = async (userId) => {
    try {
      const user = users.find((u) => u.id === userId);
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Failed to update user status");
      }

      setUsers(
        users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error("Error toggling user status:", err);
      setError(
        err.message || "Failed to update user status. Please try again."
      );
    }
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
    doctors: users.filter((u) => u.role === "clinician").length,
    patients: users.filter((u) => u.role === "patient").length,
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 dark:bg-darkModeBackGround min-h-screen transition-colors">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-blue-400">
            User Management
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Manage system users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <ThemeToggle />

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors bg-primary dark:bg-blue-600"
          >
            <Plus size={20} className="mr-2" />
            Add New User
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading users...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-innerDarkColor p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.total}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Total Users
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-innerDarkColor p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.active}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Active
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-innerDarkColor p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.inactive}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Inactive
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-innerDarkColor p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary dark:text-blue-400">
                {stats.doctors}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Doctors
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-innerDarkColor p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.patients}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Patients
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      {!loading && !error && (
        <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-300"
              />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="All">All Roles</option>
                <option value="clinician">Doctors</option>
                <option value="admin">Admins</option>
                <option value="patient">Patients</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="bg-white dark:bg-innerDarkColor rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-primary dark:text-blue-400">
              Users ({filteredUsers.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 text-white rounded-full flex items-center justify-center text-sm font-medium bg-primary dark:bg-blue-600">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm mb-1 text-gray-900 dark:text-gray-100">
                        <Mail size={14} className="mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone size={14} className="mr-1" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === user.id ? null : user.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {activeDropdown === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-innerDarkColor rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowEditModal(true);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-900 dark:text-gray-100"
                              >
                                <Edit size={16} className="mr-2" />
                                Edit User
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowPasswordModal(true);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-900 dark:text-gray-100"
                              >
                                <Lock size={16} className="mr-2" />
                                Reset Password
                              </button>
                              <button
                                onClick={() => {
                                  toggleUserStatus(user.id);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-900 dark:text-gray-100"
                              >
                                {user.status === "Active" ? (
                                  <>
                                    <UserX size={16} className="mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <UserCheck size={16} className="mr-2" />
                                    Activate
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 w-full text-left"
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete User
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users
                size={48}
                className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
              />
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                No users found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddUser}
        />
      )}

      {showEditModal && selectedUser && (
        <EditUserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSubmit={handleEditUser}
        />
      )}

      {showPasswordModal && selectedUser && (
        <ResetPasswordModal
          isOpen={showPasswordModal}
          onClose={() => {
            setShowPasswordModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onConfirm={handleResetPassword}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onDelete={handleDeleteUser}
        />
      )}

      {activeDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};

export default AdminUsers;
