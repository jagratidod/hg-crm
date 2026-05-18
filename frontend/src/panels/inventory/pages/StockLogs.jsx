import React from 'react';
import Badge from '../../../components/ui/Badge';
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

const mockLogs = [
  { id: 'LOG-001', type: 'OUT', tool: 'TL-002 Diamond Kit', emp: 'Rahul (EMP-003)', date: '16 May 2026 10:30 AM' },
  { id: 'LOG-002', type: 'IN', tool: 'TL-005 Ultrasonic Cleaner', emp: 'Amit (EMP-005)', date: '16 May 2026 09:15 AM' },
  { id: 'LOG-003', type: 'OUT', tool: 'CS-001 Gold Solution (2L)', emp: 'Suresh (EMP-008)', date: '15 May 2026 04:00 PM' },
];

const InventoryLogs = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Stock In/Out Logs</h1>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search logs..." 
                   className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2 pl-10 pr-4 text-sm text-hg-cream placeholder-hg-gold-beige focus:border-hg-accent outline-none transition-colors"
                 />
             </div>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                 <thead className="bg-[#1A1610] text-hg-gold-beige border-b border-hg-dark-gold/30">
                     <tr>
                         <th className="px-6 py-4 font-medium">Log ID</th>
                         <th className="px-6 py-4 font-medium">Type</th>
                         <th className="px-6 py-4 font-medium">Item</th>
                         <th className="px-6 py-4 font-medium">Assigned To/From</th>
                         <th className="px-6 py-4 font-medium">Timestamp</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {mockLogs.map((log) => (
                         <tr key={log.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-hg-gold-beige">{log.id}</td>
                             <td className="px-6 py-4">
                                {log.type === 'OUT' 
                                  ? <span className="flex items-center gap-1 text-hg-danger font-medium"><ArrowUpRight size={14}/> OUT</span>
                                  : <span className="flex items-center gap-1 text-hg-success font-medium"><ArrowDownLeft size={14}/> IN</span>
                                }
                             </td>
                             <td className="px-6 py-4 text-hg-cream">{log.tool}</td>
                             <td className="px-6 py-4 text-hg-gold-light">{log.emp}</td>
                             <td className="px-6 py-4 text-hg-gold-beige">{log.date}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};

export default InventoryLogs;
