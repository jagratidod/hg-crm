import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Home, Package, User, LogOut } from 'lucide-react';
import ServiceRequest from './pages/ServiceRequest';
import MyProducts from './pages/MyProducts';
import CustomerProfile from './pages/Profile';
import TrackService from './pages/TrackService';

const CustomerDashboard = () => (
    <>
        <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/50 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-hg-accent opacity-10 blur-2xl rounded-full"></div>
            <h2 className="text-xl font-medium mb-1 text-white">Need a Service?</h2>
            <p className="text-sm text-hg-gold-beige mb-4">Raise a repair or polish request</p>
            <Link to="/customer/request" className="inline-block bg-hg-accent text-black px-6 py-2 rounded-lg font-semibold shadow-lg shadow-hg-accent/20">Book Now</Link>
        </div>

        <h3 className="font-medium mb-4 text-hg-gold-light">Active Requests</h3>
        <Link to="/customer/track/REQ-092" className="glass-panel p-4 rounded-xl border border-hg-dark-gold/30 flex items-center gap-4 hover:border-hg-accent/50 transition-colors">
            <div className="w-12 h-12 bg-hg-dark-gold/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">💍</span>
            </div>
            <div className="flex-1">
                <div className="font-medium text-white text-sm">Diamond Ring Polish</div>
                <div className="text-xs text-hg-gold-beige">Status: Assigned to tech</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-hg-accent animate-pulse"></div>
        </Link>
    </>
);

const CustomerLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/customer', icon: Home },
    { name: 'Products', path: '/customer/products', icon: Package },
    { name: 'Profile', path: '/customer/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-hg-bg text-hg-cream flex-col md:flex-row justify-center">
      {/* Mobile Container wrapper */}
      <div className="w-full max-w-[480px] h-full bg-[#1A1610] shadow-2xl relative flex flex-col border-x border-hg-dark-gold/20">
          
        {/* Topbar */}
        <div className="p-4 flex justify-between items-center bg-[#1F1B14] border-b border-hg-dark-gold/30">
            <div className="flex items-center gap-3">
                <img src="/image.png" alt="HG" className="w-8 h-8 object-contain" />
                <span className="font-semibold text-hg-gold-light">Welcome, User</span>
            </div>
            <button onClick={logout} className="text-hg-danger text-sm font-medium flex items-center gap-1">
                <LogOut size={16} /> Logout
            </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto pb-24">
           <Routes>
               <Route path="/" element={<CustomerDashboard />} />
               <Route path="/request" element={<ServiceRequest />} />
               <Route path="/products" element={<MyProducts />} />
               <Route path="/track/:id" element={<TrackService />} />
               <Route path="/profile" element={<CustomerProfile />} />
           </Routes>
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 w-full h-16 bg-[#1F1B14] border-t border-hg-dark-gold/30 flex justify-around items-center px-4 rounded-t-xl z-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                  <Link 
                      key={item.name} 
                      to={item.path} 
                      className={`flex flex-col items-center ${isActive ? 'text-hg-accent' : 'text-hg-gold-beige opacity-60 hover:opacity-100 transition-opacity'}`}
                  >
                      <Icon size={22} />
                      <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                  </Link>
              );
            })}
        </nav>
      </div>
    </div>
  );
};

export default CustomerLayout;
