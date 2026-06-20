import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, Plus, Search, X, CheckCircle2, Clock } from 'lucide-react';
import useErpStore from '../../../store/erpStore';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

export default function SupportTickets() {
  const { branch } = useErpStore();
  const { tickets, addTicket } = useSuperAdminStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', description: '', priority: 'Medium' });

  // Filter tickets by branch (acting as tenant) and search term
  const myTickets = tickets.filter(t => t.tenant === branch && (
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.description) {
      toast.error('Please fill in all fields');
      return;
    }
    
    addTicket({
      subject: newTicket.subject,
      description: newTicket.description,
      priority: newTicket.priority,
      tenant: branch
    });
    
    toast.success('Ticket submitted successfully');
    setIsModalOpen(false);
    setNewTicket({ subject: '', description: '', priority: 'Medium' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LifeBuoy className="text-[#D4AF37]" /> Helpdesk & Support
          </h1>
          <p className="text-gray-400">View and manage your support tickets.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#AA8A2A] transition-colors shadow-lg shadow-[#D4AF37]/20"
        >
          <Plus size={18} /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 relative z-10">
            <Clock className="w-8 h-8" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-400 text-sm">Open Tickets</p>
            <h2 className="text-2xl font-bold text-white">{myTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}</h2>
          </div>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
          <div className="p-4 bg-green-500/10 rounded-xl text-green-400 relative z-10">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-400 text-sm">Resolved</p>
            <h2 className="text-2xl font-bold text-white">{myTickets.filter(t => t.status === 'Resolved').length}</h2>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-white/5 bg-black/20">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search your tickets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
        </div>
        
        {myTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <LifeBuoy className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white">No tickets found</h3>
            <p className="text-gray-400 mt-1">You don't have any support tickets yet.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black/40 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Ticket ID</th>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {myTickets.map((t, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={t.id} 
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 font-mono text-xs text-[#D4AF37] group-hover:underline">{t.id}</td>
                  <td className="px-6 py-4 text-white font-medium">
                    {t.subject}
                    {t.description && <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{t.description}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      t.status === 'Resolved' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                      t.status === 'In Progress' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      t.priority === 'High' ? 'text-red-400' :
                      t.priority === 'Medium' ? 'text-orange-400' : 'text-blue-400'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{t.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A]" />
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-[#D4AF37]" /> Create New Ticket
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Subject</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                    placeholder="Brief description of the issue"
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={e => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</label>
                  <textarea
                    value={newTicket.description}
                    onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Provide detailed information about your issue..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all resize-none"
                  />
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 py-2.5 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#AA8A2A] transition-colors shadow-lg shadow-[#D4AF37]/20"
                  >
                    Submit Ticket
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
