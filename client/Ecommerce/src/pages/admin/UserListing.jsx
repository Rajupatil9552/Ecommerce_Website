import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../api/getUserProfile';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { 
  UsersIcon, 
  UserCircleIcon, 
  EnvelopeIcon,
  ShieldCheckIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const roles = [
    { value: 'all', label: 'All Users', color: 'bg-gray-100 text-gray-700' },
    { value: 'admin', label: 'Admin', color: 'bg-purple-100 text-purple-700' },
    { value: 'user', label: 'User', color: 'bg-blue-100 text-blue-700' },
  ];

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        console.log(response);
        const usersData = response.data || [];
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error("Cannot fetch Users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllUsers();
  }, []);

  // Filter users based on search and role
  useEffect(() => {
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, selectedRole, users]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  const handleChangeRole = async (userId, newRole) => {
    if (window.confirm(`Change user role to ${newRole}?`)) {
      // Add your API call here to update user role
      console.log(`Change role of ${userId} to ${newRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
                <UsersIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">User Management</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Manage <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Users</span>
              </h1>
              <p className="text-gray-600 max-w-3xl">
                View and manage all registered users on your platform
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-sm text-gray-500">Admins</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'user').length}
                </div>
                <div className="text-sm text-gray-500">Regular Users</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.isActive !== false).length}
                </div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div className="lg:w-64">
                <div className="relative">
                  <FunnelIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {roles.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-200">
              <div className="col-span-3 lg:col-span-4">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">User</span>
              </div>
              <div className="col-span-3 lg:col-span-3">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Email</span>
              </div>
              <div className="col-span-3 lg:col-span-2">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Role</span>
              </div>
              <div className="col-span-3 lg:col-span-2">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Joined</span>
              </div>
              <div className="col-span-0 lg:col-span-1">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors items-center"
                >
                  {/* User Info */}
                  <div className="col-span-3 lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <UserCircleIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.userName || 'N/A'}</h4>
                        <p className="text-sm text-gray-500">ID: {user._id?.slice(-8) || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-span-3 lg:col-span-3">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 truncate">{user.email}</span>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-3 lg:col-span-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-gray-400" />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role?.toUpperCase() || 'USER'}
                      </span>
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div className="col-span-3 lg:col-span-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{formatDate(user.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-12 lg:col-span-1 mt-4 lg:mt-0">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleViewUserDetails(user)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </motion.button>
                      
                      {user.role === 'user' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleChangeRole(user._id, 'admin')}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                          title="Make Admin"
                        >
                          <CheckBadgeIcon className="w-5 h-5" />
                        </motion.button>
                      )}
                      
                      {user.role === 'admin' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleChangeRole(user._id, 'user')}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Remove Admin"
                        >
                          <ExclamationTriangleIcon className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <UsersIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {searchTerm ? `No users found for "${searchTerm}"` : 'No users registered yet'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRole('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
                      <UserCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">User Details</h2>
                      <p className="text-sm text-gray-500">Complete user information</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseDetails}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500">Full Name</label>
                    <div className="text-lg font-medium text-gray-900">{selectedUser.userName}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500">Email Address</label>
                    <div className="text-lg font-medium text-gray-900">{selectedUser.email}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500">Role</label>
                    <div className="text-lg font-medium">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedUser.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {selectedUser.role?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500">Joined Date</label>
                    <div className="text-lg font-medium text-gray-900">{formatDate(selectedUser.createdAt)}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleChangeRole(selectedUser._id, 
                        selectedUser.role === 'admin' ? 'user' : 'admin'
                      );
                      handleCloseDetails();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    {selectedUser.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCloseDetails}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserListing