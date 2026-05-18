import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Smartphone, PackageSearch, Wrench, User, LogOut, Clock } from 'lucide-react';
import EmployeeDashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import ToolRequest from './pages/ToolRequest';
import EmployeeProfile from './pages/Profile';
import EmployeeAttendance from './pages/Attendance';

const EmployeeLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const navItems = [
    { name: 'Jobs', path: '/employee', icon: Wrench },
    { name: 'Tools', path: '/employee/tools', icon: PackageSearch },
    { name: 'Attendance', path: '/employee/attendance', icon: Clock },
    { name: 'Profile', path: '/employee/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-hg-bg text-hg-cream flex-col md:flex-row">
      {/* Mobile-first Sidebar/Bottom Nav */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-hg-dark-gold/30 bg-hg-card flex flex-col order-last md:order-first h-16 md:h-full z-50 fixed md:relative bottom-0 left-0">
         <div className="hidden md:flex p-6 border-b border-hg-dark-gold/30 items-center gap-4">
           <img src="/image.png" alt="HG" className="w-10 h-10 object-contain" />
           <span className="font-semibold text-hg-gold-light text-lg">Employee App</span>
        </div>
        <nav className="flex-1 flex md:flex-col justify-around md:justify-start p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2">
           {navItems.map((item) => {
             const isActive = location.pathname === item.path;
             const Icon = item.icon;
             return (
               <Link 
                 key={item.name}
                 to={item.path}
                 className={`flex flex-col md:flex-row items-center md:gap-3 p-2 md:p-3 rounded-lg transition-colors font-medium flex-1 md:flex-none text-center md:text-left ${
                   isActive 
                     ? 'md:bg-hg-accent/10 text-hg-accent' 
                     : 'text-hg-gold-beige hover:bg-white/5 hover:text-hg-cream'
                 }`}
               >
                 <Icon size={20} className="mb-1 md:mb-0" />
                 <span className="text-[10px] md:text-base">{item.name}</span>
               </Link>
             )
           })}
        </nav>
        <div className="hidden md:block p-4 border-t border-hg-dark-gold/30">
           <button onClick={logout} className="w-full p-3 text-hg-danger hover:bg-hg-danger/10 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
             <LogOut size={18} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto mb-16 md:mb-0 relative">
        <div className="flex justify-between items-center mb-6 md:hidden">
           <div className="flex items-center gap-2">
               <img src="/image.png" alt="HG" className="w-8 h-8 object-contain" />
               <span className="font-semibold text-hg-gold-light">Employee</span>
           </div>
           <button onClick={logout} className="text-hg-danger text-sm flex items-center gap-1"><LogOut size={14}/> Logout</button>
        </div>
        
        <Routes>
           <Route path="/" element={<EmployeeDashboard />} />
           <Route path="/job/:id" element={<JobDetails />} />
           <Route path="/tools" element={<ToolRequest />} />
           <Route path="/attendance" element={<EmployeeAttendance />} />
           <Route path="/profile" element={<EmployeeProfile />} />
        </Routes>
      </main>
    </div>
  );
};

export default EmployeeLayout;
