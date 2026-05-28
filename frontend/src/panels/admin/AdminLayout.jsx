import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useErpStore, { ROLES, BRANCHES } from '../../store/erpStore';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, Wrench, Layers, ClipboardList, Hourglass, 
  History, ShieldAlert, Package, Calculator, ShoppingCart, 
  Users, Landmark, Award, PackageCheck, Truck, BookOpen, 
  BarChart4, Settings, Menu, Bell, LogOut, ChevronDown,
  Share2, Sun, Moon, X, ChevronRight
} from 'lucide-react';

// Import all premium modular pages from panels/admin/pages/
import Dashboard from './pages/Dashboard';
import Manufacturing from './pages/Manufacturing';
import Departments from './pages/Departments';
import JobCards from './pages/JobCards';
import JobworkQueue from './pages/JobworkQueue';
import JobworkTransfer from './pages/JobworkTransfer';
import Worklog from './pages/Worklog';
import LossTracking from './pages/LossTracking';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import POSBilling from './pages/POSBilling';
import CRM from './pages/CRM';
import Refinery from './pages/Refinery';
import QC from './pages/QC';
import Hallmark from './pages/Hallmark';
import Dispatch from './pages/Dispatch';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import AdminSettings from './pages/Settings';

const AdminLayout = () => {
  const { 
    user, role, branch, goldRate, silverRate, rateDirection, tickRates, 
    switchRole, switchBranch, logout, notifications, markAllNotificationsRead,
    theme, toggleTheme
  } = useErpStore();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const branchRef = useRef(null);
  const notifRef = useRef(null);

  // Live gold ticker update simulation
  useEffect(() => {
    const interval = setInterval(() => { tickRates(); }, 5000);
    return () => clearInterval(interval);
  }, [tickRates]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (branchRef.current && !branchRef.current.contains(e.target)) setBranchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manufacturing', path: '/admin/manufacturing', icon: Wrench },
    { name: 'Departments', path: '/admin/departments', icon: Layers },
    { name: 'Job Cards', path: '/admin/jobcards', icon: ClipboardList },
    { name: 'Jobwork Queue', path: '/admin/queue', icon: Hourglass },
    { name: 'Jobwork Transfer', path: '/admin/transfer', icon: Share2 },
    { name: 'Worklog', path: '/admin/worklog', icon: History },
    { name: 'Loss Tracking', path: '/admin/losstracking', icon: ShieldAlert },
    { name: 'Inventory', path: '/admin/inventory', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: Calculator },
    { name: 'POS Billing', path: '/admin/billing', icon: ShoppingCart },
    { name: 'CRM', path: '/admin/crm', icon: Users },
    { name: 'Refinery', path: '/admin/refinery', icon: Landmark },
    { name: 'QC Checklist', path: '/admin/qc', icon: Award },
    { name: 'Hallmark', path: '/admin/hallmark', icon: PackageCheck },
    { name: 'Dispatch', path: '/admin/dispatch', icon: Truck },
    { name: 'Accounts', path: '/admin/accounts', icon: BookOpen },
    { name: 'Reports', path: '/admin/reports', icon: BarChart4 },
    { name: 'Administration', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  // Auto-close everything when route changes
  useEffect(() => {
    setProfileOpen(false);
    setBranchOpen(false);
    setNotificationsOpen(false);
    setMobileOpen(false);
  }, [location]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Short branch name for mobile
  const shortBranch = branch?.split(' ')[0] || 'Branch';

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden select-none">
      
      {/* BG GLOW */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ─────────────────────────────────────────
          MOBILE BACKDROP OVERLAY
      ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─────────────────────────────────────────
          LEFT SIDEBAR
      ───────────────────────────────────────── */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-40
          flex flex-col h-screen max-h-screen w-72
          border-r border-[#8E7A5A]/25 bg-[#0F0F0F]
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'md:w-[72px]' : 'md:w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#8E7A5A]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-black border border-[#D4AF37]/35 flex items-center justify-center shrink-0">
              <span className="text-[#D4AF37] text-sm font-serif font-black">HG</span>
            </div>
            {(!sidebarCollapsed || mobileOpen) && (
              <div className="leading-none text-left min-w-0">
                <span className="text-[#D4AF37] font-serif font-black tracking-tight text-xs block truncate">HG ENTERPRISES</span>
                <span className="text-[7px] text-gray-500 block uppercase mt-0.5 font-sans tracking-widest">Enterprise Suite</span>
              </div>
            )}
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-2.5 py-2 px-3 rounded-lg transition-all
                  font-semibold text-[10px] uppercase tracking-wider relative group
                  ${isActive 
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15 font-bold' 
                    : 'text-[#C5B396] hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <Icon size={15} className="shrink-0" />
                {(!sidebarCollapsed || mobileOpen) && <span className="truncate">{item.name}</span>}
                
                {/* Tooltip when sidebar collapsed on desktop */}
                {sidebarCollapsed && !mobileOpen && (
                  <span className="absolute left-[76px] bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#C5B396] py-1.5 px-3 rounded-lg text-[9px] opacity-0 group-hover:opacity-100 transition-opacity z-[60] pointer-events-none uppercase whitespace-nowrap shadow-xl">
                    {item.name}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#1A1A1A] border-l border-b border-[#D4AF37]/30 rotate-45" />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Demo Role Bypass */}
        {(!sidebarCollapsed || mobileOpen) && (
          <div className="py-2.5 px-3.5 border-t border-[#8E7A5A]/20 bg-black/40 text-left shrink-0">
            <span className="text-[8px] text-[#C5B396] uppercase tracking-wider font-semibold block mb-1.5">Demo Role Bypass</span>
            <select
              value={role}
              onChange={(e) => {
                switchRole(e.target.value);
                toast.success(`Role → ${e.target.value}`);
              }}
              className="w-full bg-[#161616] border border-[#8E7A5A]/30 rounded-lg py-1.5 px-2 text-white text-[9px] outline-none focus:border-[#D4AF37]/50 cursor-pointer"
            >
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {/* Logout Footer */}
        <div className="py-2.5 px-3 border-t border-[#8E7A5A]/20 shrink-0">
          <button 
            onClick={logout} 
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/15 transition-colors font-bold text-[10px] uppercase tracking-widest"
          >
            <LogOut size={13} />
            {(!sidebarCollapsed || mobileOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────
          RIGHT CONTENT AREA
      ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0">
        
        {/* STICKY TOP NAVBAR */}
        <header className="h-14 md:h-16 border-b border-[#8E7A5A]/25 bg-[#0F0F0F]/90 backdrop-blur-md flex items-center justify-between px-3 md:px-5 shrink-0 sticky top-0 z-30 gap-2">
          
          {/* Left: Hamburger + Branch */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Desktop collapse toggle */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-[#C5B396] hover:text-white rounded-lg hover:bg-white/5 transition-colors hidden md:flex shrink-0"
            >
              <Menu size={18} />
            </button>
            {/* Mobile open toggle */}
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 text-[#C5B396] hover:text-white rounded-lg hover:bg-white/5 transition-colors md:hidden shrink-0"
            >
              <Menu size={18} />
            </button>

            {/* Branch Selector */}
            <div className="relative" ref={branchRef}>
              <button
                onClick={() => setBranchOpen(!branchOpen)}
                className="flex items-center gap-1 text-[10px] md:text-xs text-[#C5B396] hover:text-white uppercase tracking-wider font-semibold py-1.5 px-2 md:px-3 rounded-xl bg-black/45 border border-[#8E7A5A]/25 transition-colors max-w-[110px] md:max-w-none truncate"
              >
                <span className="truncate hidden sm:inline">{branch}</span>
                <span className="sm:hidden truncate">{shortBranch}</span>
                <ChevronDown size={10} className="shrink-0 ml-0.5" />
              </button>
              {branchOpen && (
                <div className="absolute top-10 left-0 w-52 rounded-xl bg-[#0F0F0F] border border-[#D4AF37]/35 shadow-2xl p-2 space-y-1 z-50">
                  {BRANCHES.map(b => (
                    <button
                      key={b}
                      onClick={() => {
                        switchBranch(b);
                        setBranchOpen(false);
                        toast.success(`Branch → ${b}`);
                      }}
                      className={`w-full text-left py-2 px-3.5 rounded-lg text-xs font-medium transition-colors ${
                        branch === b ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#C5B396] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Metal ticker + actions */}
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            
            {/* Metal price ticker – only large screens */}
            <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono border border-[#8E7A5A]/20 py-1.5 px-3 bg-black/40 rounded-full select-none">
              <div className="flex items-center gap-1">
                <span className="text-[#C5B396]">GOLD:</span>
                <strong className="text-white">₹{goldRate.toLocaleString()}</strong>
                <span className={rateDirection === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {rateDirection === 'up' ? '▲' : '▼'}
                </span>
              </div>
              <div className="w-px h-3 bg-gray-800" />
              <div className="flex items-center gap-1">
                <span className="text-[#C5B396]">AG:</span>
                <strong className="text-white">₹{silverRate.toLocaleString()}</strong>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 md:p-2 text-[#C5B396] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1.5 md:p-2 text-[#C5B396] hover:text-white rounded-lg hover:bg-white/5 transition-colors relative"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-[7px] border border-[#0F0F0F]">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute top-11 right-0 w-[min(320px,90vw)] rounded-xl bg-[#0F0F0F] border border-[#D4AF37]/35 shadow-2xl p-4 space-y-3 z-50 text-left">
                  <div className="flex justify-between items-center border-b border-[#8E7A5A]/20 pb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Alert Center</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllNotificationsRead} className="text-[10px] text-[#D4AF37] hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-lg border text-xs leading-normal ${n.read ? 'bg-black/20 border-[#8E7A5A]/10 text-gray-500' : 'bg-black/60 border-[#D4AF37]/20 text-[#C5B396]'}`}>
                        <div className="font-semibold text-white">{n.title}</div>
                        <p className="text-[10px] mt-0.5">{n.desc}</p>
                        <span className="text-[8px] text-gray-500 mt-1 block font-mono">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                  alt="Avatar" 
                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-cover border border-[#D4AF37]/30" 
                />
                <div className="text-left hidden sm:block leading-none">
                  <span className="text-xs font-semibold text-white block truncate max-w-[80px] md:max-w-[100px]">{user?.name}</span>
                  <span className="text-[9px] text-[#C5B396] font-mono block mt-0.5 uppercase tracking-wider truncate max-w-[80px]">{role}</span>
                </div>
                <ChevronDown size={11} className="text-gray-500 hidden sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute top-11 right-0 w-48 rounded-xl bg-[#0F0F0F] border border-[#D4AF37]/35 shadow-2xl p-2 space-y-1 z-50 text-left">
                  <Link 
                    to="/admin/settings"
                    className="w-full flex items-center gap-2 py-2 px-3 text-[#C5B396] hover:bg-white/5 hover:text-white rounded-lg text-xs"
                  >
                    <Settings size={13} /> Settings
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 py-2 px-3 text-red-400 hover:bg-red-500/10 rounded-lg text-xs"
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto relative bg-black/10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/jobcards" element={<JobCards />} />
            <Route path="/queue" element={<JobworkQueue />} />
            <Route path="/transfer" element={<JobworkTransfer />} />
            <Route path="/worklog" element={<Worklog />} />
            <Route path="/losstracking" element={<LossTracking />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/billing" element={<POSBilling />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/refinery" element={<Refinery />} />
            <Route path="/qc" element={<QC />} />
            <Route path="/hallmark" element={<Hallmark />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
