import React from 'react';
import useAuthStore from '../../../store/authStore';
import { User, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-hg-cream">Employee Profile</h2>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/30 flex flex-col items-center text-center">
         <div className="w-24 h-24 rounded-full bg-[#2A2621] text-hg-gold-light flex items-center justify-center text-4xl font-light mb-4 border border-hg-dark-gold">
            {user?.name?.charAt(0) || 'E'}
         </div>
         <h3 className="text-xl font-medium text-hg-cream mb-1">{user?.name || 'Technician Amit'}</h3>
         <p className="text-hg-gold-beige text-sm mb-4">EMP-003 • Senior Technician</p>
         
         <div className="flex gap-2">
            <span className="bg-hg-success/10 text-hg-success border border-hg-success/20 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
               <CheckCircle2 size={12} /> Active Duty
            </span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#2A2621] p-4 rounded-xl border border-hg-dark-gold/30 flex flex-col items-center text-center">
             <div className="text-2xl font-semibold text-hg-gold-light mb-1">450</div>
             <div className="text-xs text-hg-gold-beige">Total Jobs</div>
          </div>
          <div className="bg-[#2A2621] p-4 rounded-xl border border-hg-dark-gold/30 flex flex-col items-center text-center">
             <div className="text-2xl font-semibold text-hg-accent mb-1">4.8</div>
             <div className="text-xs text-hg-gold-beige">Avg Rating (★)</div>
          </div>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-hg-dark-gold/30 space-y-4">
         <h3 className="font-medium text-hg-cream border-b border-hg-dark-gold/20 pb-3">Information</h3>
         
         <InfoRow icon={<User size={16} />} label="Full Name" value={user?.name || "Amit Verma"} />
         <InfoRow icon={<Briefcase size={16} />} label="Skills" value="Polishing, Diamond Fixing" />
         <InfoRow icon={<MapPin size={16} />} label="Branch Base" value="Mumbai Central" />
         
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm">
      <div className="text-hg-dark-gold shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
          <div className="text-hg-gold-beige text-xs mb-0.5">{label}</div>
          <div className="text-hg-cream font-medium">{value}</div>
      </div>
  </div>
);

export default EmployeeProfile;
