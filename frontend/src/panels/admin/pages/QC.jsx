import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { ShieldCheck, ShieldAlert, Award, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const QC = () => {
  const { jobCards, approveJobQC, rejectJobQC } = useErpStore();
  const [selectedJcId, setSelectedJcId] = useState(null);
  
  // Checklist states
  const [checks, setChecks] = useState({
    prongAlignment: false,
    bezelTightness: false,
    solderStrength: false,
    stoneCountVerify: false,
    weightTolerance: false,
  });

  const [qcRemarks, setQcRemarks] = useState('');

  // Filter jobs pending in QC department or with QCFailed status
  const qcQueue = useMemo(() => {
    return jobCards.filter(jc => 
      jc.currentDept === 'Quality Check (QC) Department' || 
      jc.status === 'QC Failed' || 
      jc.status === 'Rework'
    );
  }, [jobCards]);

  const selectedJc = useMemo(() => {
    return jobCards.find(j => j.id === selectedJcId) || (qcQueue.length > 0 ? qcQueue[0] : null);
  }, [jobCards, selectedJcId, qcQueue]);

  const handleCheckboxToggle = (field) => {
    setChecks({ ...checks, [field]: !checks[field] });
  };

  const handleQCPass = () => {
    if (!selectedJc) return;

    // Check all criteria checked
    const allChecked = Object.values(checks).every(val => val === true);
    if (!allChecked) {
      toast.error('All quality audit checklist items must be verified & passed first!');
      return;
    }

    approveJobQC(selectedJc.id, qcRemarks);
    resetForm();
    toast.success(`Job Card ${selectedJc.id} approved. Transferred to Hallmark queue.`);
  };

  const handleQCFail = () => {
    if (!selectedJc) return;
    if (!qcRemarks) {
      toast.error('Please enter failure remarks to instruct the rework Karigar!');
      return;
    }

    rejectJobQC(selectedJc.id, qcRemarks);
    resetForm();
    toast.success(`Job Card ${selectedJc.id} failed QC check. Returned to Rework queue.`);
  };

  const resetForm = () => {
    setChecks({
      prongAlignment: false,
      bezelTightness: false,
      solderStrength: false,
      stoneCountVerify: false,
      weightTolerance: false,
    });
    setQcRemarks('');
    setSelectedJcId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">QC Assurance Gate</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Audit bezel tightness, diamond prongs alignment & stone tolerances</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: QC queue Selector */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-2 max-h-[580px] overflow-y-auto scrollbar-thin">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">QC Review Queue ({qcQueue.length})</span>
          {qcQueue.map((c) => {
            const isSelected = selectedJc && c.id === selectedJc.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedJcId(c.id);
                  setChecks({
                    prongAlignment: false,
                    bezelTightness: false,
                    solderStrength: false,
                    stoneCountVerify: false,
                    weightTolerance: false,
                  });
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                  isSelected 
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15' 
                    : 'bg-black/40 border-[#8E7A5A]/15 text-[#C5B396] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold truncate max-w-[150px]">{c.productName}</div>
                  <div className={`text-[9px] font-mono mt-1 ${isSelected ? 'text-black/85' : 'text-gray-500'}`}>{c.id} • Due: {c.dueDate}</div>
                </div>
                <span className={`text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  c.status === 'Rework' || c.status === 'QC Failed' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/25 text-[#D4AF37]'
                }`}>
                  {c.status}
                </span>
              </button>
            );
          })}

          {qcQueue.length === 0 && (
            <div className="text-center text-xs text-gray-500 py-10">QC Queue is empty. No jobs currently pending quality checks.</div>
          )}
        </div>

        {/* Right Side: Selected Job Card checklist and pass/fail triggers */}
        {selectedJc ? (
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-6">
            
            <div className="flex justify-between items-start border-b border-[#8E7A5A]/15 pb-4">
              <div>
                <span className="text-[10px] text-[#C5B396] font-mono uppercase tracking-widest">{selectedJc.id}</span>
                <h3 className="text-lg font-light text-white mt-1">{selectedJc.productName}</h3>
                <span className="text-[9px] text-gray-500 font-mono mt-1 block">Assigned Karigar: <strong>{selectedJc.assignedCraftman}</strong></span>
              </div>
              
              <div className="text-right">
                <span className="text-[10px] font-mono text-white bg-black/60 border border-[#8E7A5A]/20 px-3 py-1 rounded-full font-bold">
                  Weight: {selectedJc.grossWeight.toFixed(2)} g
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider text-[10px] border-b border-[#8E7A5A]/20 pb-1">Quality verification Checklist</h3>
              
              <div className="space-y-3 text-xs">
                <QCCheckRow 
                  id="prongAlignment" 
                  label="Diamond Prongs Alignment Check" 
                  desc="Verify under magnifier that all metal prongs are perfectly centered and hold stones securely." 
                  checked={checks.prongAlignment} 
                  onToggle={handleCheckboxToggle} 
                />
                <QCCheckRow 
                  id="bezelTightness" 
                  label="Bezel Tightness & Calibration" 
                  desc="Verify that bezel walls are completely flush with stones edges. Rubies/Emeralds must not rotate." 
                  checked={checks.bezelTightness} 
                  onToggle={handleCheckboxToggle} 
                />
                <QCCheckRow 
                  id="solderStrength" 
                  label="Soldering Joints & Porosity Strength" 
                  desc="Inspect solder points. Verify zero surface bubble porosity or micro cracks under welding." 
                  checked={checks.solderStrength} 
                  onToggle={handleCheckboxToggle} 
                />
                <QCCheckRow 
                  id="stoneCountVerify" 
                  label="Stone Counter Audit Verification" 
                  desc="Re-verify stone counts matching job card spec sheets. Count: Burmese rubies and diamonds check." 
                  checked={checks.stoneCountVerify} 
                  onToggle={handleCheckboxToggle} 
                />
                <QCCheckRow 
                  id="weightTolerance" 
                  label="Weight Margin Tolerance check" 
                  desc="Weigh completed jewelry. Variance must stay within +/- 0.05g of theoretical gross weight." 
                  checked={checks.weightTolerance} 
                  onToggle={handleCheckboxToggle} 
                />
              </div>
            </div>

            {/* Remarks and Buttons */}
            <div className="space-y-4 pt-4 border-t border-[#8E7A5A]/15">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Audit Remarks / Rework Instructions</label>
                <input
                  type="text"
                  placeholder="Enter custom comments or specific fault reports..."
                  value={qcRemarks}
                  onChange={(e) => setQcRemarks(e.target.value)}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleQCFail}
                  className="bg-black hover:bg-red-500/10 text-red-500 border border-red-500/35 font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert size={14} /> Reject & Return to Rework
                </button>
                <button
                  onClick={handleQCPass}
                  className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck size={14} /> Pass Quality Check
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-8 glass-panel border border-[#8E7A5A]/20 bg-black/40">
            <Award className="text-gray-600 mb-2" size={36} />
            <p className="text-sm text-gray-500 font-medium">QC reviews checklist is clean</p>
            <p className="text-xs text-gray-700 mt-1">Select an active QC item in the left queue to audit specifications.</p>
          </div>
        )}

      </div>

    </div>
  );
};

// Reusable Checklist Row component
const QCCheckRow = ({ id, label, desc, checked, onToggle }) => (
  <div 
    onClick={() => onToggle(id)}
    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
      checked 
        ? 'bg-green-500/5 border-green-500/40 text-white' 
        : 'bg-black/25 border-[#8E7A5A]/10 text-gray-400 hover:border-[#D4AF37]/20'
    }`}
  >
    <div className="min-w-0 flex-1 pr-4">
      <div className={`font-semibold text-xs ${checked ? 'text-green-400' : 'text-white'}`}>{label}</div>
      <div className="text-[9px] text-gray-500 mt-0.5 leading-relaxed">{desc}</div>
    </div>
    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
      checked ? 'bg-green-500 border-green-500 text-white' : 'border-[#8E7A5A]/30 text-transparent'
    }`}>
      <CheckCircle2 size={14} />
    </div>
  </div>
);

export default QC;

