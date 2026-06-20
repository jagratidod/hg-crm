import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronDown, Check } from 'lucide-react';

export default function RolesPermissions() {
  const roles = [
    { name: 'Super Admin', level: 1, permissions: 'All System Access' },
    { name: 'Tenant Admin', level: 2, permissions: 'Full Tenant Access' },
    { name: 'Sales Manager', level: 3, permissions: 'Manage Leads, Deals, Team' },
    { name: 'Sales Executive', level: 4, permissions: 'View/Edit Assigned Leads' },
    { name: 'Support Manager', level: 3, permissions: 'Manage Tickets, Team' },
    { name: 'Support Agent', level: 4, permissions: 'Reply to Assigned Tickets' },
    { name: 'Accountant', level: 3, permissions: 'Manage Invoices, Payments' },
    { name: 'Employee', level: 5, permissions: 'Basic Access, Internal Tools' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Roles & Permissions</h1>
        <p className="text-gray-400">Configure access control levels globally.</p>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden max-w-4xl">
        <div className="p-6 border-b border-white/5 bg-black/20">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            Hierarchy Definition
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#D4AF37]/20 before:to-transparent">
            {roles.map((role, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={role.name} 
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1A1A1A] bg-[#D4AF37] text-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="font-bold text-sm">{role.level}</span>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-black/40 hover:border-[#D4AF37]/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white">{role.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{role.permissions}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
