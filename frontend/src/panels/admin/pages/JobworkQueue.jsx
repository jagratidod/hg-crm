import React, { useState, useMemo } from 'react';
import useErpStore, { DEPARTMENTS } from '../../../store/erpStore';
import { Clock, AlertTriangle, Layers, Calendar, ArrowRight, ArrowDownWideNarrow, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const JobworkQueue = () => {
  const { jobCards, transferJobCardDept, users } = useErpStore();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Multi-department lists (prod stage only)
  const mfgDepts = useMemo(() => {
    return DEPARTMENTS.filter(d => d.id <= 22);
  }, []);

  // Filter queue jobs based on active selection
  const queueJobs = useMemo(() => {
    return jobCards.filter(jc => {
      const isDeptMatch = selectedDeptFilter === 'All' ? true : jc.currentDept === selectedDeptFilter;
      // Jobs are in queue if active
      return isDeptMatch && jc.status !== 'Completed' && jc.status !== 'Dispatched';
    });
  }, [jobCards, selectedDeptFilter]);

  // Priority jobs calculation
  const priorityJobsCount = useMemo(() => {
    return jobCards.filter(j => j.priority === 'High' && j.status !== 'Completed' && j.status !== 'Dispatched').length;
  }, [jobCards]);

  const handleQuickBypass = (jcId) => {
    const jc = jobCards.find(j => j.id === jcId);
    if (!jc) return;
    
    const currentIndex = mfgDepts.findIndex(d => d.name === jc.currentDept);
    if (currentIndex !== -1 && currentIndex + 1 < mfgDepts.length) {
      const nextDept = mfgDepts[currentIndex + 1];
      const matchingStaff = users.filter(u => u.department === nextDept.name);
      const nextStaff = matchingStaff.length > 0 ? matchingStaff[0].name : 'Super Admin';
      
      transferJobCardDept(jcId, nextDept.name, nextStaff, 0.1);
      toast.success(`Job Card ${jcId} bypassed to ${nextDept.name.replace(' Department', '')}`);
    } else {
      toast.success(`Job Card ${jcId} reached last stage.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Jobwork Queue Board</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Real-time floor scheduling & delay alerts</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/25 rounded-xl shrink-0">
            <AlertTriangle className="text-red-500 animate-pulse" size={16} />
            <div className="text-left leading-none">
              <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block">Delayed Priority Jobs</span>
              <span className="text-sm font-bold text-red-500 mt-1 block">{priorityJobsCount} Delayed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout: department filter tabs + queue */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Department list selector */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-2 max-h-[580px] overflow-y-auto scrollbar-thin">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">Manufacturing Stages</span>
          
          <button
            onClick={() => setSelectedDeptFilter('All')}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-semibold transition-all uppercase tracking-wider ${
              selectedDeptFilter === 'All' 
                ? 'bg-[#D4AF37] text-black shadow' 
                : 'text-[#C5B396] hover:bg-white/5 hover:text-white'
            }`}
          >
            All Active Queues
          </button>
          
          {mfgDepts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDeptFilter(d.name)}
              className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-semibold transition-all truncate flex justify-between items-center ${
                selectedDeptFilter === d.name
                  ? 'bg-[#D4AF37] text-black shadow' 
                  : 'text-[#C5B396] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{d.name.replace(' Department', '')}</span>
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full font-bold ${selectedDeptFilter === d.name ? 'bg-black text-[#D4AF37]' : 'bg-black/40 border border-[#8E7A5A]/20 text-[#C5B396]'}`}>
                {jobCards.filter(j => j.currentDept === d.name && j.status !== 'Completed' && j.status !== 'Dispatched').length}
              </span>
            </button>
          ))}
        </div>

        {/* Right Side: The actual queue list cards */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 flex flex-col min-h-[480px]">
          
          <div className="flex justify-between items-center border-b border-[#8E7A5A]/15 pb-4 mb-6">
            <h3 className="text-lg font-light text-white">Active Queue List ({queueJobs.length})</h3>
            <span className="text-[10px] font-mono text-[#C5B396]">Sorted by Priority & Wait time</span>
          </div>

          {queueJobs.length > 0 ? (
            <div className="space-y-4 overflow-y-auto max-h-[460px] pr-2 scrollbar-thin">
              {queueJobs.map((jc) => (
                <div 
                  key={jc.id}
                  className="p-4 rounded-xl border border-[#8E7A5A]/10 bg-black/60 hover:border-[#D4AF37]/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden"
                >
                  {/* Left priority tag bar */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                    jc.priority === 'High' ? 'bg-red-500' : 'bg-[#D4AF37]'
                  }`}></div>

                  <div className="space-y-1.5 flex-1 min-w-0 pl-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-white tracking-widest">{jc.id}</span>
                      <span className="text-[9px] text-[#C5B396] font-mono uppercase bg-black border border-[#8E7A5A]/20 px-2 py-0.5 rounded-full">
                        {jc.currentDept.replace(' Department', '')}
                      </span>
                    </div>
                    <div className="text-xs text-[#C5B396] font-medium truncate">{jc.productName}</div>
                    <div className="flex items-center gap-4 text-[10px] text-gray-500">
                      <span>Assigned Karigar: <strong>{jc.assignedCraftman}</strong></span>
                      <span className="flex items-center gap-1"><Clock size={12} className="text-[#D4AF37]" /> Due: {jc.dueDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center font-mono">
                    <div className="text-right">
                      <span className="text-xs text-white font-bold block">{jc.grossWeight.toFixed(2)}g</span>
                      <span className="text-[8px] text-[#C5B396] uppercase tracking-wider block">Gross gold issue</span>
                    </div>
                    <button
                      onClick={() => handleQuickBypass(jc.id)}
                      className="bg-black border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-xs py-2 px-3 rounded-lg transition-all flex items-center gap-1 font-sans uppercase tracking-wider"
                    >
                      <Zap size={12} /> Bypass Stage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <Layers className="text-[#8E7A5A]/30 mb-2" size={36} />
              <p className="text-sm text-gray-500 font-medium">No queue items match selection</p>
              <p className="text-xs text-gray-700 mt-1">This department's floor queue is currently clean.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default JobworkQueue;

