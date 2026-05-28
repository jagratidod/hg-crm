import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { Award, ShieldAlert, Sparkles, Tag, Plus, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';

const Hallmark = () => {
  const { jobCards, registerHallmarkHUID } = useErpStore();
  const [selectedJcId, setSelectedJcId] = useState(null);
  const [huidInput, setHuidInput] = useState('');

  // Hallmark queue includes job cards that are QC Approved but not yet Packed or Dispatched
  const hallmarkQueue = useMemo(() => {
    return jobCards.filter(jc => 
      jc.qcStatus === 'Approved' && 
      !['Completed', 'Packed', 'Dispatched', 'Hallmarked'].includes(jc.status)
    );
  }, [jobCards]);

  const selectedJc = useMemo(() => {
    return jobCards.find(j => j.id === selectedJcId) || (hallmarkQueue.length > 0 ? hallmarkQueue[0] : null);
  }, [jobCards, selectedJcId, hallmarkQueue]);

  const handleScanHUID = () => {
    if (!selectedJc) return;
    
    // Auto-generate standard HUID code
    const generatedHuid = `HUID-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setHuidInput(generatedHuid);
    toast.success('HUID Laser Scan Code generated successfully!');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!selectedJc || !huidInput) {
      toast.error('Scan or enter the Hallmark HUID code first');
      return;
    }

    registerHallmarkHUID(selectedJc.id, huidInput);
    setSelectedJcId(null);
    setHuidInput('');
    toast.success(`HUID registered. Transferred to Packing & Dispatch.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Hallmark Certification Desk</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Laser scan BIS hallmarks & HUID database entries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Hallmark queue */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-2 max-h-[580px] overflow-y-auto scrollbar-thin">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">BIS Certification Queue ({hallmarkQueue.length})</span>
          {hallmarkQueue.map((c) => {
            const isSelected = selectedJc && c.id === selectedJc.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedJcId(c.id);
                  setHuidInput('');
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                  isSelected 
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15' 
                    : 'bg-black/40 border-[#8E7A5A]/15 text-[#C5B396] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold truncate max-w-[150px]">{c.productName}</div>
                  <div className={`text-[9px] font-mono mt-1 ${isSelected ? 'text-black/85' : 'text-gray-500'}`}>{c.id} • Wt: {c.grossWeight.toFixed(2)}g</div>
                </div>
                <span className="text-[8px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded uppercase font-bold shrink-0">QC OK</span>
              </button>
            );
          })}

          {hallmarkQueue.length === 0 && (
            <div className="text-center text-xs text-gray-500 py-10">Hallmark Queue is clean. No jobs pending BIS registration.</div>
          )}
        </div>

        {/* Right Side: Scan and Register HUID */}
        {selectedJc ? (
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-6">
            
            <div className="flex justify-between items-start border-b border-[#8E7A5A]/15 pb-4">
              <div>
                <span className="text-[10px] text-[#C5B396] font-mono uppercase tracking-widest">{selectedJc.id}</span>
                <h3 className="text-lg font-light text-white mt-1">{selectedJc.productName}</h3>
                <span className="text-[9px] text-gray-500 font-mono mt-1 block">Assigned Stage: Hallmark Department</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#C5B396] uppercase tracking-wider block font-mono">Assay purity rating</span>
                <strong className="text-[#D4AF37] text-sm font-mono font-bold mt-1 block">22K Gold (916 Fine)</strong>
              </div>
            </div>

            {/* Simulated BIS Status logs */}
            <div className="p-4 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-2 text-xs">
              <h4 className="font-semibold text-white uppercase text-[10px]">BIS Certificate Audit Specifications</h4>
              <div className="grid grid-cols-2 gap-3 text-gray-400">
                <div>Certification Agency: <strong>Bureau of Indian Standards</strong></div>
                <div>Testing Method: <strong>XRF Spectrometry & Cupellation</strong></div>
                <div>Weight Verified: <strong>{selectedJc.grossWeight.toFixed(2)} g</strong></div>
                <div>Jewellery Class: <strong>Royal Bespoke Necklaces</strong></div>
              </div>
            </div>

            {/* HUID Entry Form */}
            <form onSubmit={handleRegister} className="space-y-4 pt-4 border-t border-[#8E7A5A]/15 text-xs">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider block">BIS Hallmark HUID Scanning code</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><Tag size={16} /></span>
                    <input
                      type="text"
                      placeholder="e.g. HUID-D4AF37"
                      value={huidInput}
                      onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 pl-11 pr-4 text-white font-mono text-xs outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleScanHUID}
                    className="bg-[#161616] border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-xs px-5 rounded-xl transition-all"
                  >
                    Simulate Laser Scan
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-1.5 mt-4"
              >
                <Landmark size={14} /> Validate & Register BIS Hallmark
              </button>
            </form>

          </div>
        ) : (
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-8 glass-panel border border-[#8E7A5A]/20 bg-black/40">
            <Award className="text-gray-600 mb-2" size={36} />
            <p className="text-sm text-gray-500 font-medium">Hallmarking queue is clean</p>
            <p className="text-xs text-gray-700 mt-1">Select an active QC-passed item in the left queue to laser scan BIS hallmarks.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Hallmark;

