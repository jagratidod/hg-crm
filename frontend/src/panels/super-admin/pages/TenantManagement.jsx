import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, Plus, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

export default function TenantManagement() {
  const { tenants, addTenant, updateTenantStatus, deleteTenant } = useSuperAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [formData, setFormData] = useState({ company: '', owner: '', email: '', plan: 'Free' });

  const filteredTenants = tenants.filter(t => 
    t.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.email) return toast.error('Please fill required fields');
    addTenant(formData);
    toast.success('Tenant created successfully');
    setIsModalOpen(false);
    setFormData({ company: '', owner: '', email: '', plan: 'Free' });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20"><CheckCircle className="w-3.5 h-3.5" /> Active</span>;
      case 'Suspended': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20"><XCircle className="w-3.5 h-3.5" /> Suspended</span>;
      case 'Trial': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20"><Clock className="w-3.5 h-3.5" /> Trial</span>;
      case 'Expired': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20"><XCircle className="w-3.5 h-3.5" /> Expired</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenant Management</h1>
          <p className="text-gray-400">Manage all registered companies and their plans</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          Create Tenant
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search companies, emails..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black/40 text-gray-400 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Owner & Contact</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Usage</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">No tenants found.</td>
                </tr>
              ) : filteredTenants.map((tenant, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={tenant.id} 
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-black border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold">
                        {tenant.company.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{tenant.company}</div>
                        <div className="text-xs text-gray-500">{tenant.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{tenant.owner}</div>
                    <div className="text-xs text-gray-500">{tenant.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white text-xs">
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex justify-between w-24">Users: <span className="text-white">{tenant.users}</span></span>
                      <span className="flex justify-between w-24">Storage: <span className="text-white">{tenant.storage}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(tenant.status)}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === tenant.id ? null : tenant.id)}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {activeMenu === tenant.id && (
                      <div className="absolute right-6 top-10 w-40 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl z-10 py-1 overflow-hidden">
                        <button onClick={() => { updateTenantStatus(tenant.id, 'Active'); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-white/5">Mark Active</button>
                        <button onClick={() => { updateTenantStatus(tenant.id, 'Suspended'); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-white/5">Suspend</button>
                        <div className="h-px w-full bg-white/5 my-1"></div>
                        <button onClick={() => { deleteTenant(tenant.id); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5">Delete Tenant</button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Tenant Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Create New Tenant</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Company Name</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="Acme Corp" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Owner Name</label>
                  <input type="text" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="john@acme.com" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Subscription Plan</label>
                  <select value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none">
                    <option>Free</option>
                    <option>Starter</option>
                    <option>Professional</option>
                    <option>Enterprise</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full py-2 bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#AA8A2A] transition-colors">
                    Create Tenant
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
