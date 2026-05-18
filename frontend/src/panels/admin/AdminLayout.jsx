import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { LayoutDashboard, Users, Wrench, PackageSearch, Settings, PhoneCall, Receipt } from 'lucide-react';

import AdminDashboard from './pages/Dashboard';
import AdminServices from './pages/Services';
import AdminCustomers from './pages/Customers';
import AdminInventory from './pages/Inventory';
import AdminSettings from './pages/Settings';
import AdminLeads from './pages/Leads';
import AdminBilling from './pages/Billing';

const AdminLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Leads (CRM)', path: '/admin/leads', icon: PhoneCall },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Inventory', path: '/admin/inventory', icon: PackageSearch },
    { name: 'Billing', path: '/admin/billing', icon: Receipt },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-hg-bg text-hg-cream">
      {/* Sidebar */}
      <aside className="w-64 border-r border-hg-dark-gold/30 bg-hg-card flex flex-col">
        <div className="p-6 border-b border-hg-dark-gold/30 flex items-center gap-4">
           <img src="/image.png" alt="HG" className="w-10 h-10 object-contain" />
           <span className="font-semibold text-hg-gold-light text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-hg-accent/10 text-hg-accent' 
                    : 'text-hg-gold-beige hover:bg-white/5 hover:text-hg-cream'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-hg-dark-gold/30">
           <button onClick={logout} className="w-full p-3 text-hg-danger hover:bg-hg-danger/10 rounded-lg transition-colors font-medium">
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
         <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/leads" element={<AdminLeads />} />
            <Route path="/customers" element={<AdminCustomers />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/inventory" element={<AdminInventory />} />
            <Route path="/billing" element={<AdminBilling />} />
            <Route path="/settings" element={<AdminSettings />} />
         </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
