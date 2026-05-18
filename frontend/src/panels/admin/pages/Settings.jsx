import React from 'react';
import { User, Shield, Building, Bell } from 'lucide-react';
import Button from '../../../components/ui/Button';

const AdminSettings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">System Settings</h1>
         <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="md:col-span-1 space-y-2">
             <button className="w-full text-left px-4 py-3 rounded-xl bg-hg-accent/10 text-hg-accent border border-hg-accent/30 font-medium flex items-center gap-3">
                <Building size={18} /> Company Profile
             </button>
             <button className="w-full text-left px-4 py-3 rounded-xl text-hg-gold-beige hover:bg-white/5 hover:text-hg-cream font-medium transition-colors flex items-center gap-3">
                <User size={18} /> User Management
             </button>
             <button className="w-full text-left px-4 py-3 rounded-xl text-hg-gold-beige hover:bg-white/5 hover:text-hg-cream font-medium transition-colors flex items-center gap-3">
                <Shield size={18} /> Roles & Permissions
             </button>
             <button className="w-full text-left px-4 py-3 rounded-xl text-hg-gold-beige hover:bg-white/5 hover:text-hg-cream font-medium transition-colors flex items-center gap-3">
                <Bell size={18} /> Notifications
             </button>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 glass-panel rounded-2xl border border-hg-dark-gold/50 p-6 space-y-6 bg-[#1A1610]">
             <h2 className="text-xl font-medium text-hg-cream border-b border-hg-dark-gold/30 pb-4 mb-6">Company Profile</h2>
             
             <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                     <label className="text-sm text-hg-gold-beige block">Company Name</label>
                     <input type="text" defaultValue="HG Enterprises" className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2.5 px-4 text-hg-cream focus:border-hg-accent outline-none" />
                 </div>
                 <div className="space-y-2">
                     <label className="text-sm text-hg-gold-beige block">GST Number</label>
                     <input type="text" defaultValue="27AADCH1234E1Z9" className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2.5 px-4 text-hg-cream focus:border-hg-accent outline-none" />
                 </div>
                 <div className="space-y-2 col-span-2">
                     <label className="text-sm text-hg-gold-beige block">Registered Address</label>
                     <textarea rows="3" defaultValue="12th Floor, Diamond Enclave, BKC, Mumbai - 400051" className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2.5 px-4 text-hg-cream focus:border-hg-accent outline-none"></textarea>
                 </div>
             </div>

             <h2 className="text-xl font-medium text-hg-cream border-b border-hg-dark-gold/30 pb-4 mb-6 mt-10">Application Settings</h2>
             
             <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-[#2A2621] rounded-xl border border-hg-dark-gold/20">
                     <div>
                         <div className="font-medium text-hg-cream mb-1">Auto-Assign Jobs</div>
                         <div className="text-xs text-hg-gold-beige">Automatically assign incoming requests to the nearest available employee.</div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hg-accent"></div>
                     </label>
                 </div>
                 
                 <div className="flex items-center justify-between p-4 bg-[#2A2621] rounded-xl border border-hg-dark-gold/20">
                     <div>
                         <div className="font-medium text-hg-cream mb-1">Require OTP for Service Completion</div>
                         <div className="text-xs text-hg-gold-beige">Employees must enter customer OTP to close a job.</div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hg-accent"></div>
                     </label>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default AdminSettings;
