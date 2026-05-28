import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { ClipboardList, Plus, Search, Calendar, Clock, BarChart4, ClipboardCheck } from 'lucide-react';
import toast from 'react-hot-toast';

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
      <div className="glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5B396] font-mono">Shift:</span>
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              className="bg-[#161616] border border-[#8E7A5A]/20 rounded-lg py-2 px-3 text-white text-xs outline-none"
            >
              <option value="All">All Shifts</option>
              <option value="Shift A">Shift A</option>
              <option value="Shift B">Shift B</option>
              <option value="General">General Shift</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5B396] font-mono">Craftsman:</span>
            <select
              value={selectedCraftsman}
              onChange={(e) => setSelectedCraftsman(e.target.value)}
              className="bg-[#161616] border border-[#8E7A5A]/20 rounded-lg py-2 px-3 text-white text-xs outline-none"
            >
              <option value="All">All Craftsmen</option>
              {users.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
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

