import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Receipt, 
  Users, 
  Settings2, 
  LifeBuoy, 
  Activity, 
  ShieldCheck, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Monitor,
  Target
} from 'lucide-react';
import useErpStore from '../../store/erpStore';

// Import Pages
import Dashboard from './pages/Dashboard';
import TenantManagement from './pages/TenantManagement';
import SubscriptionPlans from './pages/SubscriptionPlans';
import BillingInvoices from './pages/BillingInvoices';
import GlobalUserManagement from './pages/GlobalUserManagement';
import FeatureManagement from './pages/FeatureManagement';
import SupportCenter from './pages/SupportCenter';
import AuditLogs from './pages/AuditLogs';
import SystemMonitoring from './pages/SystemMonitoring';
import RolesPermissions from './pages/RolesPermissions';
import LeadsManagement from './pages/LeadsManagement';
import SuperAdminSettings from './pages/SuperAdminSettings';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', path: '/super-admin', icon: LayoutDashboard },
  { name: 'Leads', path: '/super-admin/leads', icon: Target },
  { name: 'Tenant Management', path: '/super-admin/tenants', icon: Building2 },
  { name: 'Subscription Plans', path: '/super-admin/plans', icon: CreditCard },
  { name: 'Billing & Invoices', path: '/super-admin/billing', icon: Receipt },
  { name: 'Global Users', path: '/super-admin/users', icon: Users },
  { name: 'Feature Management', path: '/super-admin/features', icon: Settings2 },
  { name: 'Support Center', path: '/super-admin/support', icon: LifeBuoy },
  { name: 'Audit Logs', path: '/super-admin/audit-logs', icon: Activity },
  { name: 'System Monitoring', path: '/super-admin/system', icon: Monitor },
  { name: 'Roles & Permissions', path: '/super-admin/roles', icon: ShieldCheck },
  { name: 'Settings', path: '/super-admin/settings', icon: Settings2 },
];

export default function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useErpStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(true)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? '280px' : '0px' }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0F0F0F] border-r border-[#D4AF37]/20 shadow-[4px_0_24px_rgba(212,175,55,0.05)] lg:relative shrink-0 overflow-hidden"
      >
        <div className="flex items-center justify-center h-20 border-b border-[#D4AF37]/20 px-6 shrink-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ delay: sidebarOpen ? 0.2 : 0 }}
            className="flex items-center gap-3 w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA8A2A] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">SUPER ADMIN</span>
              <span className="text-xs text-gray-400">Master Control</span>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <nav className="space-y-1.5 w-[248px]">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/super-admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-r-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    />
                  )}
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#D4AF37]/20 w-[280px] shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout Server</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-[#0A0A0A] to-[#111111]">
        {/* Header */}
        <header className="h-20 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-[#D4AF37]/20 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-[#D4AF37]/50 focus-within:bg-white/10 transition-all w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
            </button>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">System Admin</p>
                <p className="text-xs text-[#D4AF37]">Root Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37]/30 flex items-center justify-center shadow-inner overflow-hidden group-hover:border-[#D4AF37] transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8 custom-scrollbar relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<LeadsManagement />} />
                <Route path="/tenants" element={<TenantManagement />} />
                <Route path="/plans" element={<SubscriptionPlans />} />
                <Route path="/billing" element={<BillingInvoices />} />
                <Route path="/users" element={<GlobalUserManagement />} />
                <Route path="/features" element={<FeatureManagement />} />
                <Route path="/support" element={<SupportCenter />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/system" element={<SystemMonitoring />} />
                <Route path="/roles" element={<RolesPermissions />} />
                <Route path="/settings" element={<SuperAdminSettings />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
