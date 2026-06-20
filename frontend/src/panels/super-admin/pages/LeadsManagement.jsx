import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Phone, MapPin, Building2, Clock, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';

const STATUS_COLORS = {
  'New': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Contacted': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Qualified': 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30',
  'Converted': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Lost': 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function LeadsManagement() {
  const { leads, updateLeadStatus } = useSuperAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
            <Users className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Leads Management</h1>
            <p className="text-gray-400 text-sm">Tracking {leads.length} total demo requests</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10 text-sm text-gray-400">
                <th className="py-4 px-6 font-medium">Lead Details</th>
                <th className="py-4 px-6 font-medium">Contact Info</th>
                <th className="py-4 px-6 font-medium">Location & Size</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={lead.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10">
                          <span className="font-bold text-[#D4AF37]">{lead.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{lead.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            {lead.business}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-white">
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {lead.city}
                        </div>
                        <div className="text-xs text-gray-400">
                          Team: {lead.teamSize}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[lead.status]}`}>
                        {lead.status}
                      </span>
                      <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(lead.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="bg-black border border-white/10 text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#D4AF37]/50 cursor-pointer"
                      >
                        <option value="New">Mark New</option>
                        <option value="Contacted">Mark Contacted</option>
                        <option value="Qualified">Mark Qualified</option>
                        <option value="Converted">Convert to Tenant</option>
                        <option value="Lost">Mark Lost</option>
                      </select>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-12 h-12 mb-3 text-gray-600" />
                      <p>No leads found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
