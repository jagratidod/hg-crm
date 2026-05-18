import React, { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Search, Filter, Wrench } from 'lucide-react';

import inventoryData from '../../../data/inventory.json';

const InventoryTools = () => {
  const [tools] = useState(inventoryData.tools);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available': return <Badge variant="success">Available</Badge>;
      case 'In Use': return <Badge variant="warning">In Use</Badge>;
      case 'Maintenance': return <Badge variant="danger">Maintenance</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Tools Registry</h1>
         <Button>+ Add New Tool</Button>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search tools by name or ID..." 
                   className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2 pl-10 pr-4 text-sm text-hg-cream placeholder-hg-gold-beige focus:border-hg-accent outline-none transition-colors"
                 />
             </div>
             <div className="flex gap-2">
                 <select className="bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2 px-3 text-sm text-hg-gold-beige outline-none focus:border-hg-accent">
                     <option>All Statuses</option>
                     <option>Available</option>
                     <option>In Use</option>
                 </select>
             </div>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                 <thead className="bg-[#1A1610] text-hg-gold-beige border-b border-hg-dark-gold/30">
                     <tr>
                         <th className="px-6 py-4 font-medium">Tool ID</th>
                         <th className="px-6 py-4 font-medium">Tool Name</th>
                         <th className="px-6 py-4 font-medium">Category</th>
                         <th className="px-6 py-4 font-medium">QR Code</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium text-right">Assigned To</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {tools.map((tool) => (
                         <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-hg-cream flex items-center gap-2">
                                <Wrench size={16} className="text-hg-dark-gold" /> {tool.id}
                             </td>
                             <td className="px-6 py-4 text-hg-gold-light">{tool.name}</td>
                             <td className="px-6 py-4 text-hg-gold-beige">{tool.category}</td>
                             <td className="px-6 py-4 text-xs font-mono">{tool.qrCode}</td>
                             <td className="px-6 py-4">{getStatusBadge(tool.status)}</td>
                             <td className="px-6 py-4 text-right text-hg-gold-beige">
                                 {tool.assignedTo ? `EMP-${tool.assignedTo}` : '-'}
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};

export default InventoryTools;
