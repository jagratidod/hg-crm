import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Clock } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ServiceRequest = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: '',
    type: 'Repair',
    description: '',
    pickup: true,
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("Service Request Submitted Successfully!");
      // Reset or redirect
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-4 mb-6">
          <button onClick={() => step > 1 ? setStep(step - 1) : null} className={`text-hg-gold-beige ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'}`}>
             ← Back
          </button>
          <h2 className="text-xl font-medium text-hg-cream">New Service Request</h2>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-hg-accent' : 'bg-hg-dark-gold/30'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-hg-accent' : 'bg-hg-dark-gold/30'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-hg-accent' : 'bg-hg-dark-gold/30'}`}></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg text-hg-gold-light">Select Product & Issue</h3>
            
            <div className="space-y-2">
               <label className="text-sm text-hg-gold-beige">Select Product</label>
               <select 
                 className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl py-3 px-4 text-hg-cream focus:border-hg-accent outline-none"
                 value={formData.product}
                 onChange={(e) => setFormData({...formData, product: e.target.value})}
                 required
               >
                 <option value="">Choose a registered product...</option>
                 <option value="PRD-001">💍 Diamond Engagement Ring</option>
                 <option value="PRD-002">📿 Gold Chain Necklace</option>
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-sm text-hg-gold-beige">Service Type</label>
               <div className="grid grid-cols-2 gap-3">
                  {['Repair', 'Polish', 'Stone Fix', 'Size Adjust'].map(type => (
                    <div 
                      key={type}
                      onClick={() => setFormData({...formData, type})}
                      className={`p-3 rounded-xl border text-center text-sm cursor-pointer transition-all ${
                        formData.type === type 
                          ? 'border-hg-accent bg-hg-accent/10 text-hg-accent' 
                          : 'border-hg-dark-gold/30 text-hg-gold-beige bg-[#2A2621] hover:border-hg-gold-beige'
                      }`}
                    >
                      {type}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
             <h3 className="text-lg text-hg-gold-light">Describe the Problem</h3>
             
             <textarea 
               className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl py-3 px-4 text-hg-cream focus:border-hg-accent outline-none min-h-[120px]"
               placeholder="Please describe the issue in detail..."
               value={formData.description}
               onChange={(e) => setFormData({...formData, description: e.target.value})}
               required
             ></textarea>

             <div className="p-6 border-2 border-dashed border-hg-dark-gold/30 rounded-xl flex flex-col items-center justify-center gap-3 text-hg-gold-beige hover:border-hg-accent hover:text-hg-accent cursor-pointer transition-all bg-[#2A2621]/50">
                <div className="w-12 h-12 rounded-full bg-[#1A1610] flex items-center justify-center">
                    <Camera size={24} />
                </div>
                <div className="text-sm font-medium">Upload Photos/Videos</div>
                <div className="text-xs opacity-70">Show us the damage (Optional)</div>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
             <h3 className="text-lg text-hg-gold-light">Pickup & Schedule</h3>
             
             <div className="glass-panel p-4 rounded-xl border border-hg-dark-gold/30 flex justify-between items-center">
                <div>
                   <div className="font-medium text-hg-cream mb-1">Require Home Pickup?</div>
                   <div className="text-xs text-hg-gold-beige">Our tech will collect it securely</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={formData.pickup} onChange={(e) => setFormData({...formData, pickup: e.target.checked})} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hg-accent"></div>
                </label>
             </div>

             {formData.pickup && (
               <>
                 <div className="bg-[#2A2621] p-4 rounded-xl border border-hg-dark-gold/30 flex items-start gap-3">
                    <MapPin className="text-hg-accent shrink-0 mt-0.5" size={18} />
                    <div>
                      <div className="text-sm font-medium text-hg-cream mb-1">Home Address</div>
                      <div className="text-xs text-hg-gold-beige leading-relaxed">
                        12A, Phase 2, Diamond Valley, <br/>
                        Mumbai, 400053
                      </div>
                      <button type="button" className="text-xs text-hg-accent mt-2 font-medium">Change Address</button>
                    </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm text-hg-gold-beige flex items-center gap-2"><Calendar size={16}/> Preferred Date</label>
                   <input 
                     type="date" 
                     className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl py-3 px-4 text-hg-cream focus:border-hg-accent outline-none"
                     value={formData.date}
                     onChange={(e) => setFormData({...formData, date: e.target.value})}
                     required
                   />
                 </div>
               </>
             )}
          </div>
        )}

        <div className="pt-6">
           <Button type="submit" className="w-full py-4 text-lg">
             {step === 3 ? 'Submit Request' : 'Continue'}
           </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceRequest;
