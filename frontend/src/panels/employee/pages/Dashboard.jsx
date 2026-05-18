import React from 'react';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  return (
    <div className="space-y-6 pb-20">
      {/* Welcome & Stats */}
      <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/50 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-medium text-hg-cream">Welcome back, Amit</h2>
            <p className="text-sm text-hg-gold-beige">You have 3 jobs assigned today.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2A2621] p-4 rounded-xl border border-hg-dark-gold/30">
                  <div className="text-2xl font-semibold text-hg-gold-light mb-1">03</div>
                  <div className="text-xs text-hg-gold-beige">Pending</div>
              </div>
              <div className="bg-[#2A2621] p-4 rounded-xl border border-hg-dark-gold/30">
                  <div className="text-2xl font-semibold text-hg-success mb-1">12</div>
                  <div className="text-xs text-hg-gold-beige">Completed (Week)</div>
              </div>
          </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
          <button className="bg-hg-accent text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-hg-accent/20">
              <Clock size={18} /> Check In
          </button>
          <button className="bg-[#2A2621] text-hg-cream border border-hg-dark-gold/30 py-3 rounded-xl font-medium">
              Request Tool
          </button>
      </div>

      {/* Jobs List */}
      <div>
          <h3 className="text-lg font-medium text-hg-gold-light mb-4">Today's Route</h3>
          <div className="space-y-4">
             <JobCard 
               id="REQ-092" 
               type="Polish & Cleaning" 
               customer="Rahul Sharma"
               address="12A, Phase 2, Diamond Valley"
               time="10:00 AM"
               status="next"
             />
             <JobCard 
               id="REQ-094" 
               type="Stone Fixing" 
               customer="Anita Roy"
               address="45B, Gold Enclave"
               time="01:30 PM"
               status="pending"
             />
             <JobCard 
               id="REQ-088" 
               type="Size Adjustment" 
               customer="Vikram Singh"
               address="11, Silver Heights"
               time="04:00 PM"
               status="pending"
             />
          </div>
      </div>
    </div>
  );
};

const JobCard = ({ id, type, customer, address, time, status }) => {
  const isNext = status === 'next';
  return (
    <div className={`glass-panel p-5 rounded-2xl border transition-all ${isNext ? 'border-hg-accent shadow-[0_0_15px_rgba(201,168,76,0.1)]' : 'border-hg-dark-gold/30'}`}>
        <div className="flex justify-between items-start mb-3">
            <div>
               <div className="flex items-center gap-2 mb-1">
                   <span className="text-xs text-hg-gold-beige px-2 py-0.5 rounded bg-[#2A2621] border border-hg-dark-gold/30">{id}</span>
                   {isNext && <span className="text-xs text-black bg-hg-accent px-2 py-0.5 rounded font-medium animate-pulse">Up Next</span>}
               </div>
               <h4 className="font-medium text-hg-cream text-lg">{type}</h4>
            </div>
            <div className="text-right">
                <div className="text-sm font-medium text-hg-gold-light">{time}</div>
            </div>
        </div>
        
        <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-hg-gold-beige">
                <div className="w-5 h-5 rounded-full bg-[#2A2621] flex items-center justify-center shrink-0">👤</div>
                {customer}
            </div>
            <div className="flex items-start gap-2 text-sm text-hg-gold-beige">
                <div className="w-5 h-5 rounded-full bg-[#2A2621] flex items-center justify-center shrink-0 mt-0.5"><MapPin size={12} className="text-hg-accent"/></div>
                {address}
            </div>
        </div>

        {isNext ? (
             <div className="grid grid-cols-2 gap-3">
                 <button className="bg-[#2A2621] text-hg-cream py-2 rounded-lg text-sm font-medium">Navigate</button>
                 <button className="bg-hg-accent text-black py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                     <CheckCircle2 size={16} /> Start Job
                 </button>
             </div>
        ) : (
             <Link to={`/employee/job/${id}`} className="block w-full text-center bg-[#2A2621] text-hg-gold-beige hover:text-hg-cream transition-colors py-2 rounded-lg text-sm font-medium border border-[#2A2621] hover:border-hg-dark-gold/30">
                 View Details
             </Link>
        )}
    </div>
  )
}

export default EmployeeDashboard;
