import React, { useState } from 'react';
import { Phone, Mail, MoreHorizontal, Calendar, MessageSquare } from 'lucide-react';
import Button from '../../../components/ui/Button';

// Mock Leads Data
const mockLeads = [
  { id: 'L-01', name: 'Ramesh Jewellers', status: 'New', phone: '+91 98765 11111', date: '2026-05-16' },
  { id: 'L-02', name: 'Kalyan Diamonds', status: 'Contacted', phone: '+91 98765 22222', date: '2026-05-15' },
  { id: 'L-03', name: 'Gold Palace', status: 'Demo Scheduled', phone: '+91 98765 33333', date: '2026-05-14' },
  { id: 'L-04', name: 'City Pearls', status: 'Converted', phone: '+91 98765 44444', date: '2026-05-10' },
];

const AdminLeads = () => {
  const [leads] = useState(mockLeads);

  const columns = ['New', 'Contacted', 'Demo Scheduled', 'Negotiation', 'Converted'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-2">
         <div>
            <h1 className="text-3xl font-semibold text-hg-gold-light">Lead Pipeline</h1>
            <p className="text-sm text-hg-gold-beige mt-1">Manage landing page inquiries</p>
         </div>
         <Button>Add Lead Manually</Button>
      </div>

      <div className="flex gap-4 flex-1 overflow-x-auto pb-4 custom-scrollbar">
          {columns.map(colStatus => (
              <div key={colStatus} className="flex-none w-[300px] bg-[#1A1610] rounded-2xl border border-hg-dark-gold/30 flex flex-col h-full max-h-[700px]">
                  <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#2A2621]/50 rounded-t-2xl">
                     <h3 className="font-medium text-hg-cream">{colStatus}</h3>
                     <span className="bg-hg-accent/20 text-hg-accent text-xs px-2 py-0.5 rounded-full font-bold">
                        {leads.filter(l => l.status === colStatus).length}
                     </span>
                  </div>
                  
                  <div className="p-3 flex-1 overflow-y-auto space-y-3">
                     {leads.filter(l => l.status === colStatus).map(lead => (
                        <div key={lead.id} className="glass-panel p-4 rounded-xl border border-hg-dark-gold/40 hover:border-hg-accent cursor-grab transition-colors">
                           <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-hg-gold-beige bg-[#2A2621] px-2 py-0.5 rounded border border-hg-dark-gold/30">{lead.id}</span>
                              <button className="text-hg-gold-beige hover:text-hg-cream"><MoreHorizontal size={14} /></button>
                           </div>
                           <h4 className="font-medium text-hg-cream mb-3">{lead.name}</h4>
                           
                           <div className="space-y-1.5 mb-4">
                              <div className="flex items-center gap-2 text-xs text-hg-gold-light">
                                 <Phone size={12} className="text-hg-dark-gold" /> {lead.phone}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-hg-gold-beige">
                                 <Calendar size={12} className="text-hg-dark-gold" /> {lead.date}
                              </div>
                           </div>

                           <div className="flex gap-2 pt-3 border-t border-hg-dark-gold/20">
                              <button className="flex-1 py-1.5 bg-[#2A2621] hover:bg-hg-accent/20 hover:text-hg-accent rounded border border-hg-dark-gold/30 transition-colors text-hg-gold-beige text-xs flex items-center justify-center gap-1">
                                  <Phone size={12} /> Call
                              </button>
                              <button className="flex-1 py-1.5 bg-[#2A2621] hover:bg-hg-accent/20 hover:text-hg-accent rounded border border-hg-dark-gold/30 transition-colors text-hg-gold-beige text-xs flex items-center justify-center gap-1">
                                  <Mail size={12} /> Email
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default AdminLeads;
