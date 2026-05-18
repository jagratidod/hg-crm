import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { LayoutDashboard, Wrench, PackageSearch, Users, ListCollapse } from 'lucide-react';
import InventoryTools from './pages/Tools';
import InventoryConsumables from './pages/Consumables';
import InventoryVendors from './pages/Vendors';
import InventoryLogs from './pages/StockLogs';

const InventoryDashboard = () => (
    <>
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-semibold">Inventory Control</h1>
           <button className="bg-hg-accent text-black px-4 py-2 rounded-lg font-medium shadow-lg shadow-hg-accent/20">Issue Tool</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/50 hover:border-hg-danger/50 transition-colors cursor-pointer">
             <div className="text-hg-gold-beige text-sm mb-2">Low Stock Alerts</div>
             <div className="text-4xl font-light text-hg-danger">4</div>
           </div>
           <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/50 hover:border-hg-accent/50 transition-colors cursor-pointer">
             <div className="text-hg-gold-beige text-sm mb-2">Tools Currently Out</div>
             <div className="text-4xl font-light text-hg-accent">12</div>
           </div>
        </div>
    </>
);

const InventoryLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/inventory', icon: LayoutDashboard },
    { name: 'Tools (Out)', path: '/inventory/tools', icon: Wrench },
    { name: 'Consumables', path: '/inventory/consumables', icon: PackageSearch },
    { name: 'Logs', path: '/inventory/logs', icon: ListCollapse },
    { name: 'Vendors', path: '/inventory/vendors', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-hg-bg text-hg-cream">
      {/* Sidebar */}
      <aside className="w-64 border-r border-hg-dark-gold/30 bg-hg-card flex flex-col">
        <div className="p-6 border-b border-hg-dark-gold/30 flex items-center gap-4">
           <img src="/image.png" alt="HG" className="w-10 h-10 object-contain" />
           <span className="font-semibold text-hg-gold-light text-lg">Inventory</span>
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
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
           <Route path="/" element={<InventoryDashboard />} />
           <Route path="/tools" element={<InventoryTools />} />
           <Route path="/consumables" element={<InventoryConsumables />} />
           <Route path="/logs" element={<InventoryLogs />} />
           <Route path="/vendors" element={<InventoryVendors />} />
        </Routes>
      </main>
    </div>
  );
};

export default InventoryLayout;
