import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { ClipboardCheck, Download, MapPin, Clock, Search, ChevronDown, CheckCircle2, UserCheck, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`w-full bg-[#161616] border transition-colors flex justify-between items-center rounded-xl py-2.5 px-3 text-white text-sm cursor-pointer ${isOpen ? 'border-[#D4AF37]' : 'border-[#8E7A5A]/30 hover:border-[#D4AF37]/50'}`}
      >
        <span className="truncate">{getLabel(value)}</span>
        <ChevronDown size={14} className={`shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#161616] border border-[#D4AF37]/40 rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50 py-1 max-h-60 overflow-y-auto scrollbar-thin">
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <div
                key={optVal}
                onMouseDown={(e) => { e.preventDefault(); onChange(optVal); setIsOpen(false); }}
                className={`py-2.5 px-4 text-sm cursor-pointer transition-colors ${
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

const Attendance = () => {
  const { users, attendanceLogs, markAttendance } = useErpStore();

  // Mark Attendance State
  const [punchUser, setPunchUser] = useState(users[0]?.id || '');
  const [punchLocation, setPunchLocation] = useState('Inside Factory');

  // Report Filters State
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterUser, setFilterUser] = useState('All');

  // Compute filtered logs
  const filteredLogs = useMemo(() => {
    return attendanceLogs.filter(log => {
      const matchDate = filterDate ? log.date === filterDate : true;
      const matchUser = filterUser === 'All' ? true : log.userName === filterUser;
      return matchDate && matchUser;
    });
  }, [attendanceLogs, filterDate, filterUser]);

  const handlePunch = (type) => {
    if (!punchUser) return;
    const selectedUserObj = users.find(u => u.id === punchUser);
    if (!selectedUserObj) return;

    markAttendance(selectedUserObj.id, selectedUserObj.name, punchLocation, type);
  };

  const handleExportCSV = () => {
    if (filteredLogs.length === 0) {
      toast.error('No data to export!');
      return;
    }

    const headers = ['ID', 'Date', 'Employee', 'Time In', 'Location In', 'Time Out', 'Location Out', 'Status'];
    const rows = filteredLogs.map(log => [
      log.id,
      log.date,
      `"${log.userName}"`,
      log.timeIn || '—',
      `"${log.locationIn || '—'}"`,
      log.timeOut || '—',
      `"${log.locationOut || '—'}"`,
      log.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Attendance_Report_${filterDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Attendance report exported successfully!');
  };

  const selectedUserStatus = useMemo(() => {
    if (!punchUser) return null;
    const today = new Date().toISOString().split('T')[0];
    return attendanceLogs.find(log => log.userId === punchUser && log.date === today);
  }, [attendanceLogs, punchUser]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Workforce Attendance</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Manage Check-ins, Track Locations, and Export Daily Reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Mark Attendance Kiosk (Simulation) */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-6 max-h-[500px]">
          <div>
            <h3 className="text-lg font-light text-white flex items-center gap-2">
              <ClipboardCheck className="text-[#D4AF37]" size={20} />
              Attendance Kiosk
            </h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Employee Punch-In / Out</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Select Employee</label>
              <CustomSelect 
                value={punchUser} 
                onChange={setPunchUser} 
                options={users.map(u => ({ value: u.id, label: u.name }))} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Select Location</label>
              <CustomSelect 
                value={punchLocation} 
                onChange={setPunchLocation} 
                options={[
                  'Inside Factory',
                  'Outside Factory - Field Visit',
                  'Client Site',
                  'Exhibition / Trade Show'
                ]} 
              />
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => handlePunch('Punch In')}
                disabled={selectedUserStatus && !selectedUserStatus.timeOut} // Disabled if already punched in and not punched out
                className="w-full bg-[#161616] border border-green-500/30 hover:border-green-500 text-green-400 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserCheck size={16} /> Mark Punch In
              </button>

              <button
                onClick={() => handlePunch('Punch Out')}
                disabled={!selectedUserStatus || selectedUserStatus.timeOut} // Disabled if not punched in or already punched out
                className="w-full bg-[#161616] border border-red-500/30 hover:border-red-500 text-red-400 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={16} /> Mark Punch Out
              </button>
            </div>
            
            {selectedUserStatus && !selectedUserStatus.timeOut && (
              <p className="text-[10px] text-center text-green-400 uppercase tracking-wider font-semibold animate-pulse">
                Status: Active Shift Started at {selectedUserStatus.timeIn}
              </p>
            )}
            {selectedUserStatus && selectedUserStatus.timeOut && (
              <p className="text-[10px] text-center text-gray-500 uppercase tracking-wider font-semibold">
                Status: Shift Completed at {selectedUserStatus.timeOut}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Reports Table */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Filters & Export */}
          <div className="relative z-20 glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#C5B396] font-mono">Date:</span>
                <input 
                  type="date" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-lg py-2 px-3 text-white text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#C5B396] font-mono">Employee:</span>
                <div className="w-[180px]">
                  <CustomSelect
                    value={filterUser}
                    onChange={setFilterUser}
                    options={[
                      { value: 'All', label: 'All Employees' },
                      ...users.map(u => ({ value: u.name, label: u.name }))
                    ]}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleExportCSV}
              className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-2 px-4 rounded-lg text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
            >
              <Download size={14} /> Export Report (CSV)
            </button>
          </div>

          {/* Table Data */}
          <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#8E7A5A]/20 bg-black/60 text-[#C5B396] uppercase tracking-wider font-mono">
                    <th className="p-4 font-semibold">Employee</th>
                    <th className="p-4 font-semibold">Punch In</th>
                    <th className="p-4 font-semibold">Location In</th>
                    <th className="p-4 font-semibold">Punch Out</th>
                    <th className="p-4 font-semibold">Location Out</th>
                    <th className="p-4 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8E7A5A]/10">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors text-white font-sans">
                      <td className="p-4 font-medium flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-black border border-[#D4AF37]/30 flex items-center justify-center text-[8px] text-[#D4AF37]">
                          {log.userName.charAt(0)}
                        </div>
                        {log.userName}
                      </td>
                      <td className="p-4 font-mono text-[#D4AF37]">
                        {log.timeIn ? log.timeIn : '—'}
                      </td>
                      <td className="p-4 text-gray-400 text-[10px] uppercase">
                        {log.locationIn ? log.locationIn : '—'}
                      </td>
                      <td className="p-4 font-mono text-gray-300">
                        {log.timeOut ? log.timeOut : '—'}
                      </td>
                      <td className="p-4 text-gray-400 text-[10px] uppercase">
                        {log.locationOut ? log.locationOut : '—'}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                          log.status === 'Present' ? 'bg-green-500/10 text-green-400' :
                          log.status === 'Late' ? 'bg-red-500/10 text-red-400' : 
                          'bg-yellow-500/10 text-[#D4AF37]'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <Clock size={32} className="mb-2 opacity-50" />
                        <p>No attendance records found for this filter.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Attendance;
