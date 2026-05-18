import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import { Search, Plus, Filter, AlertTriangle } from 'lucide-react';
import inventoryData from '../../../data/inventory.json';

const InventoryConsumables = () => {
  const [consumables] = useState(inventoryData.consumables);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Consumables Inventory</h1>
         <Button><Plus size={16} className="inline mr-2" />Add Stock</Button>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         {consumables.filter(c => c.stock <= c.minStock).map(alertItem => (
            <div key={`alert-${alertItem.id}`} className="bg-hg-danger/10 border border-hg-danger/30 rounded-xl p-4 flex gap-3 items-start">
               <AlertTriangle className="text-hg-danger shrink-0" />
               <div>
                  <h4 className="font-medium text-hg-danger mb-1">Low Stock Alert: {alertItem.name}</h4>
                  <p className="text-sm text-hg-gold-beige">Current stock ({alertItem.stock} {alertItem.unit}) is at or below the minimum threshold ({alertItem.minStock} {alertItem.unit}). Please reorder.</p>
               </div>
            </div>
         ))}
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search consumables..." 
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
                         <th className="px-6 py-4 font-medium">Item ID</th>
                         <th className="px-6 py-4 font-medium">Name</th>
                         <th className="px-6 py-4 font-medium">Stock Level</th>
                         <th className="px-6 py-4 font-medium">Min Threshold</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {consumables.map((item) => (
                         <tr key={item.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-hg-gold-beige">{item.id}</td>
                             <td className="px-6 py-4 text-hg-cream font-medium">{item.name}</td>
                             <td className="px-6 py-4">
                                <span className={`text-lg font-mono ${item.stock <= item.minStock ? 'text-hg-danger font-semibold' : 'text-hg-gold-light'}`}>
                                  {item.stock}
                                </span>
                                <span className="text-hg-gold-beige ml-1 text-xs">{item.unit}</span>
                             </td>
                             <td className="px-6 py-4 text-hg-gold-beige font-mono">{item.minStock} {item.unit}</td>
                             <td className="px-6 py-4">
                                {item.stock <= item.minStock 
                                  ? <Badge variant="danger">Low Stock</Badge>
                                  : <Badge variant="success">Optimal</Badge>
                                }
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <Button variant="ghost" className="text-hg-accent px-3 py-1 hover:bg-hg-accent/20">Update</Button>
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

export default InventoryConsumables;
