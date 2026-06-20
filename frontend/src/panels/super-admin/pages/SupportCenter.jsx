import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, AlertTriangle, Search, X } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

export default function SupportCenter() {
  const { tickets, updateTicketStatus } = useSuperAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredTickets = tickets.filter(t => 
    t.tenant.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Support Center</h1>
          <p className="text-gray-400">Manage support tickets from all tenants.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400">
            <LifeBuoy className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Open Tickets</p>
            <h2 className="text-2xl font-bold text-white">{tickets.filter(t => t.status === 'Open').length}</h2>
          </div>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">High Priority</p>
            <h2 className="text-2xl font-bold text-white">{tickets.filter(t => t.priority === 'High' && t.status !== 'Resolved').length}</h2>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-white/5">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
        </div>
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-black/40 text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Ticket ID</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTickets.map((t, idx) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={t.id} 
                className="hover:bg-white/5"
              >
                <td className="px-6 py-4 font-mono text-xs">{t.id}</td>
                <td className="px-6 py-4 font-medium text-white">{t.tenant}</td>
                <td className="px-6 py-4">{t.subject}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    t.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                    t.priority === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{t.status}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setSelectedTicket(t)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors text-xs">
                    View
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedTicket && (
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
              className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Ticket Details</h2>
                <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400">Ticket ID</label>
                  <p className="text-white font-mono">{selectedTicket.id}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Subject</label>
                  <p className="text-white">{selectedTicket.subject}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Tenant</label>
                  <p className="text-white">{selectedTicket.tenant}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Description</label>
                  <p className="text-white bg-black/30 p-3 rounded-lg mt-1 text-sm">{selectedTicket.description || 'No description provided.'}</p>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex gap-4">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => {
                      updateTicketStatus(selectedTicket.id, e.target.value);
                      setSelectedTicket({ ...selectedTicket, status: e.target.value });
                      toast.success(`Ticket status updated to ${e.target.value}`);
                    }}
                    className="w-full px-4 py-2 bg-black/50 border border-[#D4AF37]/50 rounded-xl text-white focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
