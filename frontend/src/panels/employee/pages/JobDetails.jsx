import React, { useState } from 'react';
import { Camera, MapPin, Wrench, CheckCircle2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

const JobDetails = () => {
  const [status, setStatus] = useState('In Progress');
  const [toolsRequested, setToolsRequested] = useState(false);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-hg-accent/20 text-hg-accent flex items-center justify-center font-bold">R</div>
              <div>
                 <h2 className="text-xl font-medium text-hg-cream">Rahul Sharma</h2>
                 <p className="text-xs text-hg-gold-beige">Customer</p>
              </div>
          </div>
          <div className="text-right">
              <div className="text-sm font-medium text-hg-gold-light">REQ-092</div>
              <div className="text-xs text-hg-accent font-medium">{status}</div>
          </div>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-hg-dark-gold/30">
          <h3 className="text-lg font-medium text-hg-cream mb-4 border-b border-hg-dark-gold/20 pb-3">Service Information</h3>
          
          <div className="space-y-4">
              <div>
                  <div className="text-xs text-hg-gold-beige mb-1">Service Type</div>
                  <div className="font-medium text-hg-gold-light">Polish & Cleaning</div>
              </div>
              
              <div>
                  <div className="text-xs text-hg-gold-beige mb-1">Product Details</div>
                  <div className="bg-[#2A2621] p-3 rounded-xl border border-hg-dark-gold/20 text-sm mt-1">
                      <div className="font-medium text-hg-cream mb-1">💍 Diamond Engagement Ring</div>
                      <div className="text-hg-gold-beige">18K Gold, 12g</div>
                  </div>
              </div>

              <div>
                  <div className="text-xs text-hg-gold-beige mb-1">Customer Notes</div>
                  <div className="text-sm bg-[#2A2621] p-3 rounded-xl border border-hg-dark-gold/20 italic">
                      "Ring has lost its shine, needs deep cleaning and polishing."
                  </div>
              </div>

              <div>
                  <div className="text-xs text-hg-gold-beige mb-1">Location</div>
                  <div className="flex items-start gap-2 text-sm bg-[#2A2621] p-3 rounded-xl border border-hg-dark-gold/20">
                      <MapPin size={16} className="text-hg-accent shrink-0 mt-0.5"/>
                      12A, Phase 2, Diamond Valley, Mumbai
                  </div>
              </div>
          </div>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-hg-dark-gold/30">
          <h3 className="text-lg font-medium text-hg-cream mb-4 border-b border-hg-dark-gold/20 pb-3">Actions</h3>
          
          <div className="space-y-3">
              <Button 
                 variant="secondary" 
                 className="w-full flex items-center justify-center gap-2 py-3"
                 onClick={() => setToolsRequested(true)}
                 disabled={toolsRequested}
              >
                  <Wrench size={18} /> {toolsRequested ? 'Tools Requested' : 'Request Tools for this Job'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-hg-dark-gold/20">
                  <div className="flex flex-col items-center justify-center gap-2 p-4 bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl cursor-pointer hover:border-hg-accent transition-colors">
                      <Camera size={24} className="text-hg-gold-beige" />
                      <span className="text-xs font-medium text-hg-cream">Before Photo</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 p-4 bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl cursor-pointer hover:border-hg-accent transition-colors">
                      <Camera size={24} className="text-hg-gold-beige" />
                      <span className="text-xs font-medium text-hg-cream">After Photo</span>
                  </div>
              </div>

              <Button 
                className="w-full mt-4 py-4 text-lg font-semibold flex items-center justify-center gap-2"
                onClick={() => setStatus('Completed')}
              >
                  <CheckCircle2 /> Mark as Completed
              </Button>
          </div>
      </div>
    </div>
  );
};

export default JobDetails;
