import React, { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Search, Filter, Mail, Phone, MoreVertical } from 'lucide-react';
import usersData from '../../../data/users.json';

const AdminCustomers = () => {
  const [customers] = useState(usersData.filter(u => u.role === 'customer'));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Customers Directory</h1>
         <Button>Add Customer</Button>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search by name or phone..." 
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
                         <th className="px-6 py-4 font-medium">Customer Name</th>
                         <th className="px-6 py-4 font-medium">Contact</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {customers.map((customer) => (
                         <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-hg-gold-beige">CUST-{customer.id.toString().padStart(3, '0')}</td>
                             <td className="px-6 py-4 font-medium text-hg-cream flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-hg-accent/20 text-hg-accent flex items-center justify-center font-semibold">
                                  {customer.name.charAt(0)}
                                </div>
                                {customer.name}
                             </td>
                             <td className="px-6 py-4 text-hg-gold-light">
                                <div className="flex items-center gap-2"><Phone size={14} className="text-hg-dark-gold"/> {customer.phone}</div>
                             </td>
                             <td className="px-6 py-4"><Badge variant="success">Active</Badge></td>
                             <td className="px-6 py-4 text-right space-x-2">
                                 <button className="text-hg-gold-beige hover:text-hg-accent transition-colors p-1 rounded hover:bg-white/5">
                                     <Mail size={16} />
                                 </button>
                                 <button className="text-hg-gold-beige hover:text-hg-cream transition-colors p-1 rounded hover:bg-white/5">
                                     <MoreVertical size={16} />
                                 </button>
                             </td>
                         </tr>
                     ))}
                     {customers.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-hg-gold-beige">No customers found.</td>
                        </tr>
                     )}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
