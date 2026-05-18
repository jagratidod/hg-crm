import React from 'react';
import { CheckCircle2, Circle, Clock, Wrench } from 'lucide-react';

const TrackService = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-24">
      <div className="mb-6">
          <h2 className="text-xl font-medium text-hg-cream">Track Service</h2>
          <p className="text-sm text-hg-gold-beige">REQ-092 • Diamond Engagement Ring</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/30 mb-8">
          <div className="flex items-center justify-between mb-6">
             <div className="text-hg-cream font-medium">Status Timeline</div>
             <div className="text-xs bg-hg-accent/20 text-hg-accent px-2 py-1 rounded">In Progress</div>
          </div>

          <div className="relative border-l-2 border-hg-dark-gold/30 ml-3 space-y-8 pb-4">
             
             {/* Step 1: Completed */}
             <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 bg-hg-bg rounded-full p-0.5">
                   <CheckCircle2 size={16} className="text-hg-success bg-hg-success/20 rounded-full" />
                </div>
                <div className="text-sm font-medium text-hg-cream">Request Raised</div>
                <div className="text-xs text-hg-gold-beige">15 May, 10:00 AM</div>
             </div>

             {/* Step 2: Completed */}
             <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 bg-hg-bg rounded-full p-0.5">
                   <CheckCircle2 size={16} className="text-hg-success bg-hg-success/20 rounded-full" />
                </div>
                <div className="text-sm font-medium text-hg-cream">Item Picked Up</div>
                <div className="text-xs text-hg-gold-beige">15 May, 04:30 PM</div>
                <div className="mt-2 text-xs bg-[#2A2621] p-2 rounded-lg border border-hg-dark-gold/20 flex items-center gap-2 text-hg-gold-light">
                   <div className="w-6 h-6 rounded-full bg-hg-accent/20 text-hg-accent flex items-center justify-center font-bold">R</div>
                   Ramesh (Pickup Agent)
                </div>
             </div>

             {/* Step 3: Active */}
             <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 bg-hg-bg rounded-full p-0.5">
                   <div className="w-4 h-4 rounded-full bg-hg-accent animate-pulse shadow-[0_0_10px_rgba(201,168,76,0.8)]"></div>
                </div>
                <div className="text-sm font-medium text-hg-accent">Service in Progress</div>
                <div className="text-xs text-hg-gold-beige">Current Stage</div>
                <div className="mt-2 text-xs bg-[#2A2621] p-2 rounded-lg border border-hg-dark-gold/20 flex items-center gap-2 text-hg-gold-light">
                   <Wrench size={14} className="text-hg-dark-gold" /> Deep Polishing underway
                </div>
             </div>

             {/* Step 4: Pending */}
             <div className="relative pl-6 opacity-50">
                <div className="absolute -left-[9px] top-0 bg-hg-bg rounded-full p-0.5">
                   <Circle size={16} className="text-hg-dark-gold" />
                </div>
                <div className="text-sm font-medium text-hg-cream">Quality Check</div>
             </div>

             {/* Step 5: Pending */}
             <div className="relative pl-6 opacity-50">
                <div className="absolute -left-[9px] top-0 bg-hg-bg rounded-full p-0.5">
                   <Circle size={16} className="text-hg-dark-gold" />
                </div>
                <div className="text-sm font-medium text-hg-cream">Ready for Delivery</div>
             </div>

          </div>
      </div>
    </div>
  );
};

export default TrackService;
