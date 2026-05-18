import React from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Search, Download, FileText, CheckCircle2 } from 'lucide-react';

const mockInvoices = [
  { id: 'INV-2026-001', customer: 'Rahul Sharma', amount: '₹4,500', date: '15 May 2026', status: 'Paid', type: 'Repair' },
  { id: 'INV-2026-002', customer: 'Priya Desai', amount: '₹12,000', date: '14 May 2026', status: 'Pending', type: 'Custom Order' },
  { id: 'INV-2026-003', customer: 'Amit Patel', amount: '₹2,500', date: '12 May 2026', status: 'Paid', type: 'Polish' },
];

const AdminBilling = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <div>
            <h1 className="text-3xl font-semibold text-hg-gold-light">Billing & Invoices</h1>
            <p className="text-sm text-hg-gold-beige mt-1">Manage payments, GST, and receipts</p>
         </div>
         <Button>Generate Invoice</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/30">
              <div className="text-sm text-hg-gold-beige mb-2">Total Revenue (MTD)</div>
              <div className="text-3xl font-semibold text-hg-cream">₹1,45,000</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-hg-danger/30">
              <div className="text-sm text-hg-gold-beige mb-2">Pending Payments</div>
              <div className="text-3xl font-semibold text-hg-danger">₹24,500</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-hg-success/30">
              <div className="text-sm text-hg-gold-beige mb-2">Completed Invoices</div>
              <div className="text-3xl font-semibold text-hg-success">42</div>
          </div>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search invoices..." 
                   className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2 pl-10 pr-4 text-sm text-hg-cream placeholder-hg-gold-beige focus:border-hg-accent outline-none transition-colors"
                 />
             </div>
             <button className="flex items-center gap-2 text-hg-gold-beige hover:text-hg-cream text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                 <Download size={16} /> Export CSV
             </button>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                 <thead className="bg-[#1A1610] text-hg-gold-beige border-b border-hg-dark-gold/30">
                     <tr>
                         <th className="px-6 py-4 font-medium">Invoice ID</th>
                         <th className="px-6 py-4 font-medium">Customer</th>
                         <th className="px-6 py-4 font-medium">Service Type</th>
                         <th className="px-6 py-4 font-medium">Date</th>
                         <th className="px-6 py-4 font-medium">Amount</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {mockInvoices.map((inv) => (
                         <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-hg-gold-light">{inv.id}</td>
                             <td className="px-6 py-4 text-hg-cream">{inv.customer}</td>
                             <td className="px-6 py-4 text-hg-gold-beige">{inv.type}</td>
                             <td className="px-6 py-4 text-hg-gold-beige">{inv.date}</td>
                             <td className="px-6 py-4 font-mono text-hg-cream font-medium">{inv.amount}</td>
                             <td className="px-6 py-4">
                                {inv.status === 'Paid' ? <Badge variant="success"><CheckCircle2 size={12} className="inline mr-1"/> Paid</Badge> : <Badge variant="danger">Pending</Badge>}
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <button className="text-hg-accent hover:text-hg-cream transition-colors p-2 rounded hover:bg-white/5">
                                     <FileText size={18} />
                                 </button>
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

export default AdminBilling;
