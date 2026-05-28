import React, { useState, useMemo } from 'react';
import useErpStore, { DEPARTMENTS } from '../../../store/erpStore';
import { ArrowRight, UserPlus, Wrench, RefreshCw, BadgeAlert, AlertCircle, Sparkles, History, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Manufacturing = () => {
  const { jobCards, users, transferJobCardDept } = useErpStore();
  const [selectedDeptId, setSelectedDeptId] = useState(1);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [activeJcId, setActiveJcId] = useState('');
  const [nextDeptName, setNextDeptName] = useState('');
  const [assignedCraftman, setAssignedCraftman] = useState('');
  const [metalLoss, setMetalLoss] = useState('0');

  // Filter 22 main production departments (excluding refinery and accounts)
  const prodDepts = useMemo(() => {
    return DEPARTMENTS.filter(d => d.id <= 22);
  }, []);

  const selectedDept = useMemo(() => {
    return prodDepts.find(d => d.id === selectedDeptId) || prodDepts[0];
  }, [selectedDeptId, prodDepts]);

  // Jobs currently in the selected department
  const jobsInDept = useMemo(() => {
    return jobCards.filter(jc => jc.currentDept === selectedDept.name);
  }, [jobCards, selectedDept]);

  // Calculate active jobs for all departments to show counters in bubble
  const deptJobCounts = useMemo(() => {
    const counts = {};
    jobCards.forEach(jc => {
      counts[jc.currentDept] = (counts[jc.currentDept] || 0) + 1;
    });
    return counts;
  }, [jobCards]);

  // List of craftsmen matching the department
  const availableCraftsmen = useMemo(() => {
    return users.filter(u => u.department === selectedDept.name || u.designation.includes('Karigar') || u.designation.includes('Setter') || u.designation.includes('Designer'));
  }, [users, selectedDept]);

  const handleOpenTransfer = (jcId) => {
    const currentJc = jobCards.find(j => j.id === jcId);
    if (!currentJc) return;

    setActiveJcId(jcId);
    
    // Auto-predict next department in index sequence
    const currentIndex = prodDepts.findIndex(d => d.name === currentJc.currentDept);
    const nextDept = currentIndex !== -1 && currentIndex + 1 < prodDepts.length 
      ? prodDepts[currentIndex + 1].name 
      : prodDepts[currentIndex].name;
    
    setNextDeptName(nextDept);

    // Auto-predict craftsmen for next department
    const nextCraftsmen = users.filter(u => u.department === nextDept);
    setAssignedCraftman(nextCraftsmen.length > 0 ? nextCraftsmen[0].name : users[0].name);
    setMetalLoss('0.15');
    setIsTransferOpen(true);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!activeJcId || !nextDeptName || !assignedCraftman) {
      toast.error('Please fill in all details');
      return;
    }

    transferJobCardDept(activeJcId, nextDeptName, assignedCraftman, parseFloat(metalLoss));
    setIsTransferOpen(false);
    toast.success(`Job Card ${activeJcId} transferred successfully to ${nextDeptName}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Jewellery Manufacturing Workflow</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">22-Stage Production Pipeline Tracker</p>
      </div>

      {/* Sequential Horizontal Flow Pipeline Widget */}
      <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/30 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {prodDepts.map((dept, index) => {
            const isActive = dept.id === selectedDeptId;
            const jobCount = deptJobCounts[dept.name] || 0;
            const isFinished = dept.id < selectedDeptId;

            return (
              <React.Fragment key={dept.id}>
                {/* Department Node Bubble */}
                <button
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all select-none min-w-[125px] ${
                    isActive 
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15' 
                      : jobCount > 0
                        ? 'bg-black/60 border-[#D4AF37]/50 text-white'
                        : 'bg-black/20 border-[#8E7A5A]/20 text-[#C5B396] hover:border-[#8E7A5A]/40'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-85">STAGE {dept.id}</span>
                  <span className="text-xs font-semibold mt-1 truncate max-w-[110px]">{dept.name.replace(' Department', '')}</span>
                  
                  {/* Job count badge inside stage */}
                  {jobCount > 0 && (
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full mt-2 font-bold ${isActive ? 'bg-black text-[#D4AF37]' : 'bg-[#D4AF37] text-black'}`}>
                      {jobCount} Active
                    </span>
                  )}
                  {jobCount === 0 && (
                    <span className="text-[9px] font-sans opacity-40 mt-2">Idle</span>
                  )}
                </button>

                {/* Arrow spacer between stages */}
                {index < prodDepts.length - 1 && (
                  <ArrowRight size={14} className={isFinished ? 'text-[#D4AF37]' : 'text-gray-700'} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Jobs active inside current department */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 flex flex-col min-h-[460px]">
          <div className="flex justify-between items-center mb-6 border-b border-[#8E7A5A]/10 pb-4">
            <div>
              <h3 className="text-lg font-light text-white">{selectedDept.name} Overview</h3>
              <p className="text-xs text-[#C5B396]">Process type: <strong>{selectedDept.process}</strong> | Limit Margin: <strong>{selectedDept.autoLoss}% Auto Loss</strong></p>
            </div>
            <span className="text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-xl">
              {jobsInDept.length} Active Job Cards
            </span>
          </div>

          {jobsInDept.length > 0 ? (
            <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin">
              {jobsInDept.map((jc) => (
                <div key={jc.id} className="p-4 rounded-xl border border-[#8E7A5A]/10 bg-black/60 hover:border-[#D4AF37]/35 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-white tracking-wider">{jc.id}</span>
                      <span className={`text-[9px] font-sans px-2 py-0.5 rounded-full font-bold uppercase ${jc.priority === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/25 text-[#D4AF37]'}`}>
                        {jc.priority} PRIORITY
                      </span>
                    </div>
                    <div className="text-xs text-[#C5B396] font-medium truncate">{jc.productName}</div>
                    <div className="flex items-center gap-4 text-[10px] text-gray-500">
                      <span>Design: <strong>{jc.designNo}</strong></span>
                      <span>Assigned Craftsman: <strong>{jc.assignedCraftman}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-xs font-mono text-white font-bold">{jc.grossWeight.toFixed(2)} g</div>
                      <div className="text-[9px] text-[#C5B396]">Gross Weight</div>
                    </div>
                    <button
                      onClick={() => handleOpenTransfer(jc.id)}
                      className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-2 px-4 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ArrowRight size={14} /> Transfer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="p-4 rounded-full bg-[#8E7A5A]/10 text-[#C5B396]/60 mb-3"><Wrench size={32} /></div>
              <p className="text-sm text-gray-400 font-medium">No job cards are currently active inside {selectedDept.name}</p>
              <p className="text-xs text-gray-600 mt-1">Select other stage categories in the horizontal tracker to inspect active workloads.</p>
            </div>
          )}
        </div>

        {/* Right Column: Stage Analytics and Assigned Staff List */}
        <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-6">
          
          {/* Department stats */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Stage Analytics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/35 border border-[#8E7A5A]/10">
                <div className="text-[10px] text-[#C5B396] uppercase tracking-wider">Queue Progress</div>
                <div className="text-lg font-mono font-bold text-white mt-1">{selectedDept.progress}%</div>
              </div>
              <div className="p-4 rounded-xl bg-black/35 border border-[#8E7A5A]/10">
                <div className="text-[10px] text-[#C5B396] uppercase tracking-wider">Auto Profit Bounds</div>
                <div className="text-lg font-mono font-bold text-white mt-1">{selectedDept.autoProfit}%</div>
              </div>
            </div>
          </div>

          {/* Assigned Craftsmen list */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-[#8E7A5A]/15 pb-2">Assigned Staff ({availableCraftsmen.length})</h3>
            {availableCraftsmen.length > 0 ? (
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {availableCraftsmen.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-xl bg-black/20 hover:bg-black/50 border border-transparent hover:border-[#D4AF37]/15 transition-all">
                    <img src={user.image} alt={user.name} className="w-9 h-9 rounded-lg object-cover border border-[#8E7A5A]/20" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                      <div className="text-[9px] text-[#C5B396] truncate">{user.designation}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[9px] text-gray-500">Active Jobs</div>
                      <div className="text-xs font-mono font-bold text-[#D4AF37]">{user.activeJobsCount}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500 py-4 text-center">No staff assigned to this specific department.</div>
            )}
          </div>
        </div>

      </div>

      {/* QUICK TRANSFER SLIDE-OUT DRAWER */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTransferOpen(false)}></div>
          
          <div className="relative w-full max-w-[420px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/20 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-light text-white">Transfer Pipeline</h2>
                <p className="text-xs text-[#C5B396]">Move Job Card {activeJcId} to next stage</p>
              </div>
              <button onClick={() => setIsTransferOpen(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
            </div>

            <form onSubmit={handleTransferSubmit} className="space-y-5 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Target Stage selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#C5B396] uppercase tracking-wider">Target Stage</label>
                  <select
                    value={nextDeptName}
                    onChange={(e) => setNextDeptName(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                  >
                    {prodDepts.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Craftsman Assignment */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#C5B396] uppercase tracking-wider">Assign Craftsman / Karigar</label>
                  <select
                    value={assignedCraftman}
                    onChange={(e) => setAssignedCraftman(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.name}>{u.name} ({u.department.replace(' Department', '')})</option>
                    ))}
                  </select>
                </div>

                {/* Metal Scrap Loss (Gram) */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#C5B396] uppercase tracking-wider">Metal Scrap Loss (g)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={metalLoss}
                      onChange={(e) => setMetalLoss(e.target.value)}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none text-right font-mono pr-12"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5B396] text-xs">grams</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> Scrap is tracked and transferred to refinery dust extractors automatically.</p>
                </div>

              </div>

              <div className="pt-6 border-t border-[#8E7A5A]/20">
                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest"
                >
                  Verify & Execute Transfer
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Manufacturing;

