import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, AlertCircle } from 'lucide-react';

export default function BillingInvoices() {
  const invoices = [
    { id: 'INV-2024-001', company: 'Acme Corp', amount: '$299.00', date: 'Oct 12, 2024', status: 'Paid', plan: 'Enterprise' },
    { id: 'INV-2024-002', company: 'Stark Ind.', amount: '$99.00', date: 'Oct 10, 2024', status: 'Paid', plan: 'Professional' },
    { id: 'INV-2024-003', company: 'Wayne Ent.', amount: '$49.00', date: 'Oct 05, 2024', status: 'Failed', plan: 'Starter' },
    { id: 'INV-2024-004', company: 'Oscorp', amount: '$99.00', date: 'Oct 01, 2024', status: 'Paid', plan: 'Professional' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Invoices</h1>
        <p className="text-gray-400">Track revenue, payment history, and failed transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm mb-1">Total Revenue (YTD)</p>
          <h2 className="text-3xl font-bold text-white">$452,100</h2>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm mb-1">MRR</p>
          <h2 className="text-3xl font-bold text-[#D4AF37]">$38,500</h2>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-red-500/20">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-red-400 text-sm">Failed Payments</p>
          </div>
          <h2 className="text-3xl font-bold text-white">$489.00</h2>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black/40 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={inv.id} 
                  className="hover:bg-white/5"
                >
                  <td className="px-6 py-4 font-mono text-xs">{inv.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{inv.company}</td>
                  <td className="px-6 py-4">{inv.plan}</td>
                  <td className="px-6 py-4 font-medium">{inv.amount}</td>
                  <td className="px-6 py-4">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs border ${
                      inv.status === 'Paid' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
