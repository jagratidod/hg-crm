import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Lock, Ban, Search } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

export default function GlobalUserManagement() {
  const { users, toggleUserStatus } = useSuperAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetPassword = (email) => {
    toast.success(`Password reset link sent to ${email}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Global User Management</h1>
          <p className="text-gray-400">Oversee all users across all tenants.</p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-white/5">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-black/40 text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">No users found.</td>
              </tr>
            ) : filteredUsers.map((user, idx) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={user.id} 
                className="hover:bg-white/5"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">{user.company}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs w-max">
                    <Shield className="w-3 h-3 text-[#D4AF37]" />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={user.status === 'Active' ? 'text-green-400' : 'text-red-400'}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleResetPassword(user.email)} className="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors" title="Reset Password">
                    <Lock className="w-4 h-4" />
                  </button>
                  <button onClick={() => toggleUserStatus(user.id)} className={`p-2 rounded-lg transition-colors ${user.status === 'Blocked' ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'}`} title={user.status === 'Blocked' ? 'Unblock User' : 'Block User'}>
                    <Ban className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
