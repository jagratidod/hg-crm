import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { ClipboardList, Plus, Search, Calendar, Clock, BarChart4, ClipboardCheck, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to get label
  const getLabel = (val) => {
    const opt = options.find(o => typeof o === 'object' ? o.value === val : o === val);
    return opt ? (typeof opt === 'object' ? opt.label : opt) : val;
  };

  return (
    <div className="relative w-full" onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
    }} tabIndex={-1}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#161616] border transition-colors flex justify-between items-center rounded-lg py-2 px-3 text-white text-xs cursor-pointer min-w-[140px] ${isOpen ? 'border-[#D4AF37]' : 'border-[#8E7A5A]/20 hover:border-[#D4AF37]/50'}`}
      >
        <span className="truncate">{getLabel(value)}</span>
        <ChevronDown size={14} className={`shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#161616] border border-[#D4AF37]/40 rounded-lg overflow-hidden z-50 shadow-2xl shadow-black/50 py-1 max-h-60 overflow-y-auto scrollbar-thin">
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <div
                key={optVal}
                onMouseDown={(e) => { e.preventDefault(); onChange(optVal); setIsOpen(false); }}
                className={`py-2 px-3 text-xs cursor-pointer transition-colors ${
                  optVal === value 
                    ? 'bg-[#D4AF37] text-black font-semibold' 
                    : 'text-white hover:bg-[#D4AF37]/15 hover:text-[#D4AF37]'
                }`}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Worklog = () => {
  const { jobCards, users } = useErpStore();
  const [shiftFilter, setShiftFilter] = useState('All');
  const [selectedCraftsman, setSelectedCraftsman] = useState('All');

  // Hardcoded shifts
  const shifts = ['Shift A (09:00 - 18:00)', 'Shift B (18:00 - 03:00)', 'General Shift'];

  // Generated productivity mock list based on job card timeline
  const worklogEntries = useMemo(() => {
    const list = [];
    jobCards.forEach(jc => {
      jc.timeline.forEach(step => {
        list.push({
          jobCardId: jc.id,
          productName: jc.productName,
          date: step.date,
          craftman: step.craftman,
          stage: step.stage,
          status: step.status,
          loss: step.loss || 0,
          shift: step.craftman.includes('Rajesh') ? shifts[0] : step.craftman.includes('Mansoor') ? shifts[1] : shifts[2]
        });
      });
    });
    
    return list.filter(e => {
      const matchesShift = shiftFilter === 'All' ? true : e.shift.includes(shiftFilter);
      const matchesCraftsman = selectedCraftsman === 'All' ? true : e.craftman === selectedCraftsman;
      return matchesShift && matchesCraftsman;
    });
  }, [jobCards, shiftFilter, selectedCraftsman]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Worklog Registers</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Daily craftsman productivity & shift auditing</p>
      </div>

      {/* Filter panel */}
      <div className="relative z-20 glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5B396] font-mono">Shift:</span>
            <CustomSelect
              value={shiftFilter}
              onChange={setShiftFilter}
              options={[
                { value: 'All', label: 'All Shifts' },
                { value: 'Shift A', label: 'Shift A' },
                { value: 'Shift B', label: 'Shift B' },
                { value: 'General', label: 'General Shift' }
              ]}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5B396] font-mono">Craftsman:</span>
            <CustomSelect
              value={selectedCraftsman}
              onChange={setSelectedCraftsman}
              options={[
                { value: 'All', label: 'All Craftsmen' },
                ...users.map(u => ({ value: u.name, label: u.name }))
              ]}
            />
          </div>
        </div>

        <span className="text-xs text-gray-500 font-mono">Total Log Entries: <strong>{worklogEntries.length}</strong></span>
      </div>

      {/* Worklog data table */}
      <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7A5A]/20 bg-black/60 text-[#C5B396] uppercase tracking-wider font-mono">
                <th className="p-4 font-semibold">Log Date</th>
                <th className="p-4 font-semibold">Job Card ID</th>
                <th className="p-4 font-semibold">Craftsman</th>
                <th className="p-4 font-semibold">Work Stage</th>
                <th className="p-4 font-semibold">Shift Schedule</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Registered Scrap (g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7A5A]/10">
              {worklogEntries.map((log, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors text-white font-sans">
                  <td className="p-4 font-mono">{log.date}</td>
                  <td className="p-4 font-mono font-bold text-[#D4AF37]">{log.jobCardId}</td>
                  <td className="p-4 font-medium">{log.craftman}</td>
                  <td className="p-4 text-gray-400">{log.stage.replace(' Department', '')}</td>
                  <td className="p-4 text-xs font-mono text-gray-500">{log.shift}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      log.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                      log.status === 'Rework' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-[#D4AF37]'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-semibold text-[#D4AF37]">
                    {log.loss > 0 ? `${log.loss.toFixed(2)} g` : '—'}
                  </td>
                </tr>
              ))}

              {worklogEntries.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No shift log entries recorded for active filter constraints.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Worklog;

