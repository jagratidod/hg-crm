import React, { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Search, Filter, Wrench, Package, AlertCircle } from 'lucide-react';
import inventoryData from '../../../data/inventory.json';

const AdminInventory = () => {
  const [tools] = useState(inventoryData.tools);
  const [consumables] = useState(inventoryData.consumables);
  const [activeTab, setActiveTab] = useState('tools');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Inventory Overview</h1>
         <Button>Generate Report</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-hg-dark-gold/30 pb-px mb-6">
         <button 
           className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'tools' ? 'text-hg-accent border-hg-accent' : 'text-hg-gold-beige border-transparent hover:text-hg-cream'}`}
           onClick={() => setActiveTab('tools')}
         >
            <Wrench size={16} className="inline mr-2" />
            Tools & Equipment
         </button>
         <button 
           className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'consumables' ? 'text-hg-accent border-hg-accent' : 'text-hg-gold-beige border-transparent hover:text-hg-cream'}`}
           onClick={() => setActiveTab('consumables')}
         >
            <Package size={16} className="inline mr-2" />
            Consumables
         </button>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2 pl-10 pr-4 text-sm text-hg-cream placeholder-hg-gold-beige focus:border-hg-accent outline-none transition-colors"
                 />
             </div>
             <button className="flex items-center gap-2 text-hg-gold-beige hover:text-hg-cream text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                 <Filter size={16} /> Filter
             </button>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                 <thead className="bg-[#1A1610] text-hg-gold-beige border-b border-hg-dark-gold/30">
                     <tr>
                         <th className="px-6 py-4 font-medium">ID</th>
                         <th className="px-6 py-4 font-medium">Name</th>
                         <th className="px-6 py-4 font-medium">{activeTab === 'tools' ? 'Category' : 'Stock'}</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {activeTab === 'tools' ? (
                       tools.map((item) => (
                           <tr key={item.id} className="hover:bg-white/5 transition-colors">
                               <td className="px-6 py-4 font-medium text-hg-gold-beige">{item.id}</td>
                               <td className="px-6 py-4 text-hg-cream font-medium">{item.name}</td>
                               <td className="px-6 py-4 text-hg-gold-light">{item.category}</td>
                               <td className="px-6 py-4">
                                  {item.status === 'Available' ? <Badge variant="success">Available</Badge> : <Badge variant="warning">{item.status}</Badge>}
                               </td>
                           </tr>
                       ))
                     ) : (
                       consumables.map((item) => (
                           <tr key={item.id} className="hover:bg-white/5 transition-colors">
                               <td className="px-6 py-4 font-medium text-hg-gold-beige">{item.id}</td>
                               <td className="px-6 py-4 text-hg-cream font-medium">{item.name}</td>
                               <td className="px-6 py-4 text-hg-gold-light font-mono">{item.stock} {item.unit}</td>
                               <td className="px-6 py-4">
                                  {item.stock <= item.minStock ? (
                                     <span className="flex items-center gap-1 text-hg-danger font-medium text-xs"><AlertCircle size={14}/> Low Stock</span>
                                  ) : (
                                     <Badge variant="success">Optimal</Badge>
                                  )}
                               </td>
                           </tr>
                       ))
                     )}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};

export default AdminInventory;
