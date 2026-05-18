import React from 'react';
import useAuthStore from '../../../store/authStore';
import { User, Shield, Package, ChevronRight, LogOut, Heart } from 'lucide-react';
import Button from '../../../components/ui/Button';

const CustomerProfile = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-hg-cream">My Profile</h2>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/30 flex flex-col items-center text-center mb-6">
         <div className="w-20 h-20 rounded-full bg-hg-accent/20 text-hg-accent flex items-center justify-center text-3xl font-bold mb-4 border-2 border-hg-accent/50 shadow-[0_0_15px_rgba(201,168,76,0.3)]">
            {user?.name?.charAt(0) || 'C'}
         </div>
         <h3 className="text-xl font-medium text-hg-cream mb-1">{user?.name || 'Customer'}</h3>
         <p className="text-hg-gold-beige text-sm mb-4">{user?.identifier || '+91 98765 43210'}</p>
         <Badge>Gold Member</Badge>
      </div>

      {/* Loyalty Points */}
      <div className="bg-gradient-to-r from-[#1A1610] to-[#2A2621] p-5 rounded-2xl border border-hg-accent/30 flex justify-between items-center mb-6 shadow-lg shadow-hg-accent/5">
         <div>
            <div className="text-xs text-hg-gold-beige mb-1 uppercase tracking-wider">Loyalty Points</div>
            <div className="text-3xl font-light text-hg-accent flex items-baseline gap-2">
                1,450 <span className="text-sm font-medium">pts</span>
            </div>
         </div>
         <div className="w-12 h-12 bg-hg-accent/10 rounded-full flex items-center justify-center text-hg-accent">
            <Heart size={24} className="fill-hg-accent/20" />
         </div>
      </div>

      <div className="space-y-3 mb-8">
         <ProfileMenuItem icon={<User size={18} />} title="Personal Information" />
         <ProfileMenuItem icon={<Shield size={18} />} title="Warranty Cards" badge="2" />
         <ProfileMenuItem icon={<Package size={18} />} title="Service History" />
      </div>

      <Button variant="danger" className="w-full flex items-center justify-center gap-2 py-4" onClick={logout}>
         <LogOut size={18} /> Logout
      </Button>
    </div>
  );
};

const ProfileMenuItem = ({ icon, title, badge }) => (
  <div className="glass-panel p-4 rounded-xl border border-hg-dark-gold/30 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors">
     <div className="flex items-center gap-3">
         <div className="text-hg-gold-beige">{icon}</div>
         <div className="font-medium text-hg-cream">{title}</div>
     </div>
     <div className="flex items-center gap-2">
         {badge && <span className="bg-hg-accent text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
         <ChevronRight size={18} className="text-hg-dark-gold" />
     </div>
  </div>
);

const Badge = ({ children }) => (
  <span className="bg-hg-accent/10 text-hg-accent border border-hg-accent/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
    {children}
  </span>
);

export default CustomerProfile;
