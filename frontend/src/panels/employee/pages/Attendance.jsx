import React, { useState } from 'react';
import { MapPin, Clock, Fingerprint } from 'lucide-react';
import Button from '../../../components/ui/Button';

const EmployeeAttendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

  const handleToggle = () => {
    // In a real app, this would get GPS coordinates and send to backend
    setIsCheckedIn(!isCheckedIn);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-hg-cream">Attendance & GPS</h2>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-hg-dark-gold/30 flex flex-col items-center text-center">
         <div className="text-5xl font-light text-hg-gold-light mb-2 font-mono tracking-wider">{time}</div>
         <div className="text-hg-gold-beige text-sm mb-8">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>

         <button 
           onClick={handleToggle}
           className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 text-white font-semibold text-lg transition-all shadow-2xl ${
             isCheckedIn 
               ? 'bg-hg-danger hover:bg-red-600 shadow-hg-danger/30' 
               : 'bg-hg-success hover:bg-green-600 shadow-hg-success/30'
           }`}
         >
            <Fingerprint size={48} className="opacity-80" />
            {isCheckedIn ? 'CHECK OUT' : 'CHECK IN'}
         </button>

         <div className="mt-8 flex items-center gap-2 text-sm text-hg-gold-beige bg-[#2A2621] px-4 py-2 rounded-full border border-hg-dark-gold/30">
            <MapPin size={16} className="text-hg-accent" />
            Location Tracking Active
         </div>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/30 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 bg-[#1A1610]">
             <h3 className="font-medium text-hg-cream">Recent Activity</h3>
         </div>
         <div className="p-4 space-y-4">
             <div className="flex justify-between items-center border-b border-hg-dark-gold/20 pb-3">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-hg-success/20 text-hg-success flex items-center justify-center"><Clock size={16}/></div>
                    <div>
                       <div className="text-sm font-medium text-hg-cream">Checked In</div>
                       <div className="text-xs text-hg-gold-beige">Diamond Enclave Branch</div>
                    </div>
                 </div>
                 <div className="text-sm text-hg-gold-light">09:00 AM</div>
             </div>
             
             {/* Previous days mock data */}
             <div className="flex justify-between items-center opacity-60">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-hg-danger/20 text-hg-danger flex items-center justify-center"><Clock size={16}/></div>
                    <div>
                       <div className="text-sm font-medium text-hg-cream">Checked Out (Yesterday)</div>
                       <div className="text-xs text-hg-gold-beige">Diamond Enclave Branch</div>
                    </div>
                 </div>
                 <div className="text-sm text-hg-gold-light">06:30 PM</div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
