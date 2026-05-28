import React, { useState, useMemo } from 'react';
import useErpStore, { DEPARTMENTS } from '../../../store/erpStore';
import { 
  ClipboardList, Search, Filter, Printer, Download, Plus, 
  Trash2, ArrowRight, UserCheck, ShieldAlert, Award, Calendar, Sliders, Play, RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_COLUMNS = [
  'Pending',
  'Assigned',
  'In Progress',
  'Hold',
  'QC Failed',
  'Rework',
  'Completed',
  'Packed',
  'Dispatched'
];

const JobCards = () => {
  const { jobCards, addJobCard, updateJobCardStatus, users, departments } = useErpStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedJcId, setSelectedJcId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPrintView, setIsPrintView] = useState(null);

  // New JC form state
  const [newJc, setNewJc] = useState({
    designNo: 'DES-NC-3012',
    productName: 'Elysian Diamond Hoop Earrings',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    grossWeight: 14.50,
    netWeight: 13.80,
    stoneWeight: 0.70,
    diamondWeight: 0.50,
    stones: 'Round Diamonds: 0.5ct',
    assignedCraftman: 'Rajesh Karigar',
    notes: 'Premium collection launch piece'
  });

  // Fuzzy filter search query
  const filteredJcs = useMemo(() => {
    return jobCards.filter(jc => {
      const matchesSearch = jc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            jc.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            jc.designNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' ? true : jc.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [jobCards, searchQuery, priorityFilter]);

  // Group Job Cards by status for Kanban Board
  const kanbanGroups = useMemo(() => {
    const groups = {};
    STATUS_COLUMNS.forEach(status => {
      groups[status] = filteredJcs.filter(jc => jc.status === status);
    });
    return groups;
  }, [filteredJcs]);

  const handleCreateJc = (e) => {
    e.preventDefault();
    addJobCard(newJc);
    setIsAddOpen(false);
    toast.success('New Job Card created in queue!');
  };

  const handleStatusChange = (id, newStatus) => {
    updateJobCardStatus(id, newStatus);
    toast.success(`Job Card ${id} marked as ${newStatus}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Job Cards Board</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Kanban & Production Timeline Control</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-3 px-5 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Plus size={16} /> Create Job Card
          </button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search by Job Card No, Design SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161616] border border-[#8E7A5A]/20 focus:border-[#D4AF37] rounded-xl py-2.5 pl-11 pr-4 text-white text-xs outline-none"
          />
        </div>

        <div className="flex gap-4 items-center w-full md:w-auto shrink-0 justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5B396] font-mono">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-[#161616] border border-[#8E7A5A]/20 rounded-lg py-2 px-3 text-white text-xs outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 select-none hide-scrollbar">
        {STATUS_COLUMNS.map((status) => {
          const columnJobs = kanbanGroups[status] || [];
          return (
            <div key={status} className="w-[280px] shrink-0 flex flex-col max-h-[620px] rounded-2xl bg-black/40 border border-[#8E7A5A]/15 p-4 space-y-4">
              
              {/* Column Header */}
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/10 pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{status}</h3>
                <span className="text-[10px] font-mono bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                  {columnJobs.length}
                </span>
              </div>

              {/* Column Cards Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {columnJobs.map((jc) => (
                  <div 
                    key={jc.id} 
                    className="p-4 rounded-xl border border-[#8E7A5A]/15 bg-black/60 hover:border-[#D4AF37]/40 transition-all cursor-pointer relative group flex flex-col justify-between min-h-[145px]"
                    onClick={() => setSelectedJcId(jc.id)}
                  >
                    {/* Header: ID & Priority */}
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono font-bold text-white tracking-widest">{jc.id}</span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                        jc.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                        jc.priority === 'Medium' ? 'bg-yellow-500/20 text-[#D4AF37]' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {jc.priority}
                      </span>
                    </div>

                    {/* Body: Product details */}
                    <div className="my-3 space-y-1">
                      <div className="text-xs text-white font-medium truncate">{jc.productName}</div>
                      <div className="text-[9px] text-[#C5B396]">Design No: <strong>{jc.designNo}</strong></div>
                      <div className="text-[9px] text-gray-500">Stage: <strong>{jc.currentDept.replace(' Department', '')}</strong></div>
                    </div>

                    {/* Footer: weight / print shortcut */}
                    <div className="flex justify-between items-center border-t border-[#8E7A5A]/10 pt-2 text-[10px]">
                      <span className="text-gray-500 font-mono">Gross: <strong>{jc.grossWeight.toFixed(2)}g</strong></span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPrintView(jc);
                        }}
                        className="text-[#C5B396] hover:text-[#D4AF37]"
                      >
                        <Printer size={12} />
                      </button>
                    </div>
                  </div>
                ))}

                {columnJobs.length === 0 && (
                  <div className="text-center py-10 text-[10px] text-gray-600 font-mono">Empty Column</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* JOB CARD DETAIL DRAWER */}
      {selectedJcId && (() => {
        const jc = jobCards.find(j => j.id === selectedJcId);
        if (!jc) return null;
        return (
          <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedJcId(null)}></div>
            
            <div className="relative w-full max-w-[450px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
              <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin">
                <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4">
                  <div>
                    <span className="text-xs text-[#D4AF37] font-mono tracking-widest">{jc.id}</span>
                    <h2 className="text-lg font-light text-white mt-1">{jc.productName}</h2>
                  </div>
                  <button onClick={() => setSelectedJcId(null)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
                </div>

                {/* Details Section */}
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-black border border-[#8E7A5A]/10">
                      <span className="text-[10px] text-[#C5B396]">Barcode Serial</span>
                      <div className="text-xs font-mono font-semibold text-white mt-1">{jc.barcode}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black border border-[#8E7A5A]/10">
                      <span className="text-[10px] text-[#C5B396]">RFID Code</span>
                      <div className="text-xs font-mono font-semibold text-white mt-1">{jc.rfid}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-2">
                    <h3 className="font-semibold text-white uppercase tracking-wider text-[10px] border-b border-[#8E7A5A]/15 pb-1">Spec Weight Sheet</h3>
                    <div className="grid grid-cols-3 gap-2 font-mono text-center">
                      <div>
                        <div className="text-[9px] text-[#C5B396]">Gross Weight</div>
                        <div className="text-xs text-white font-bold mt-1">{jc.grossWeight.toFixed(2)}g</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#C5B396]">Net Metal</div>
                        <div className="text-xs text-white font-bold mt-1">{jc.netWeight.toFixed(2)}g</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#C5B396]">Stones Weight</div>
                        <div className="text-xs text-white font-bold mt-1">{jc.stoneWeight.toFixed(2)}g</div>
                      </div>
                    </div>
                    {jc.diamondWeight > 0 && (
                      <div className="text-[10px] text-[#C5B396] pt-1 text-center border-t border-[#8E7A5A]/10">
                        Total Diamond Weight: <strong>{jc.diamondWeight} Carats</strong>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold">Active Craftsman Assignment</span>
                    <div className="p-3.5 rounded-xl bg-black border border-[#8E7A5A]/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">{jc.assignedCraftman}</div>
                        <div className="text-[10px] text-gray-500">Active Stage: {jc.currentDept.replace(' Department', '')}</div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] rounded uppercase font-bold">Assigned</span>
                    </div>
                  </div>

                  {/* Flow Timeline */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold">Production Timeline Audits</span>
                    <div className="relative pl-6 border-l border-[#8E7A5A]/20 space-y-4">
                      {jc.timeline.map((step, idx) => (
                        <div key={step.stage + idx} className="relative">
                          <span className={`absolute -left-[30px] top-1.5 w-2 h-2 rounded-full border border-black ${
                            step.status === 'Completed' ? 'bg-[#D4AF37]' : 'bg-red-500 animate-ping'
                          }`}></span>
                          <div>
                            <div className="flex justify-between items-center text-xs font-semibold text-white">
                              <span>{step.stage}</span>
                              <span className="text-[10px] font-mono text-gray-500">{step.date}</span>
                            </div>
                            <div className="text-[10px] text-[#C5B396] mt-0.5 flex justify-between">
                              <span>Staff: <strong>{step.craftman}</strong></span>
                              {step.loss > 0 && <span className="text-red-400">Scrap Loss: -{step.loss}g</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer actions: change status */}
              <div className="pt-6 border-t border-[#8E7A5A]/25 space-y-3">
                <div className="flex gap-2">
                  {jc.status !== 'Completed' && jc.status !== 'Dispatched' && (
                    <button
                      onClick={() => handleStatusChange(jc.id, 'Completed')}
                      className="flex-1 bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-3 rounded-xl text-xs uppercase tracking-wider"
                    >
                      ✓ Complete Stage
                    </button>
                  )}
                  {jc.status === 'Completed' && (
                    <button
                      onClick={() => handleStatusChange(jc.id, 'Dispatched')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-wider"
                    >
                      ✈ Dispatch Shipment
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setIsPrintView(jc)}
                  className="w-full bg-[#161616] hover:bg-black text-white border border-[#8E7A5A]/25 font-semibold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Printer size={14} /> Print Job Card Layout
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* NEW JOB CARD CREATION DRAWER */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
          
          <div className="relative w-full max-w-[420px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Create Job Card</h2>
                  <p className="text-xs text-[#C5B396]">Initiate manufacturing order tracking</p>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              <form onSubmit={handleCreateJc} className="space-y-4 text-xs">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Product Name</label>
                  <input
                    type="text"
                    value={newJc.productName}
                    onChange={(e) => setNewJc({...newJc, productName: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Design SKU Code</label>
                    <input
                      type="text"
                      value={newJc.designNo}
                      onChange={(e) => setNewJc({...newJc, designNo: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Job Priority</label>
                    <select
                      value={newJc.priority}
                      onChange={(e) => setNewJc({...newJc, priority: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Gross Weight (g)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newJc.grossWeight}
                      onChange={(e) => setNewJc({...newJc, grossWeight: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Fine Net Weight (g)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newJc.netWeight}
                      onChange={(e) => setNewJc({...newJc, netWeight: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Stone Specifications / Counts</label>
                  <input
                    type="text"
                    placeholder="e.g. Diamonds 12pcs Round Brilliant Cut"
                    value={newJc.stones}
                    onChange={(e) => setNewJc({...newJc, stones: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Assign Craftsman</label>
                  <select
                    value={newJc.assignedCraftman}
                    onChange={(e) => setNewJc({...newJc, assignedCraftman: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-4"
                >
                  Confirm Job Card Issue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* PRINT VIEW MODAL LAYOUT */}
      {isPrintView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-[620px] bg-white text-black p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Close Print */}
            <button 
              onClick={() => setIsPrintView(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold font-sans text-xl"
            >
              &times;
            </button>

            {/* Print Stamp Header */}
            <div className="border-4 border-double border-black p-6 space-y-6">
              
              <div className="flex justify-between items-start border-b-2 border-black pb-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase font-serif">HG JEWELLERS</h2>
                  <p className="text-[10px] tracking-wider font-mono">ESTD 2026 • ROYAL WORKSHOP VOUCHER</p>
                </div>
                <div className="text-right">
                  <span className="border-2 border-black px-3 py-1 font-mono font-bold text-sm bg-black text-white">{isPrintView.id}</span>
                  <p className="text-[8px] mt-1 font-mono">{isPrintView.dueDate} (DUE DATE)</p>
                </div>
              </div>

              {/* Barcode Display */}
              <div className="flex flex-col items-center py-4 bg-gray-100 border border-black rounded-lg">
                {/* Simulated scan barcode bars */}
                <div className="flex gap-[2px] items-stretch h-10 w-64 bg-black p-0.5">
                  <div className="bg-white w-[2px]"></div><div className="bg-white w-[4px]"></div>
                  <div className="bg-white w-[1px]"></div><div className="bg-white w-[5px]"></div>
                  <div className="bg-white w-[2px]"></div><div className="bg-white w-[2px]"></div>
                  <div className="bg-white w-[4px]"></div><div className="bg-white w-[1px]"></div>
                  <div className="bg-white w-[2px]"></div><div className="bg-white w-[4px]"></div>
                </div>
                <span className="text-[10px] font-mono mt-1 uppercase">SERIAL: {isPrintView.barcode} • RFID: {isPrintView.rfid}</span>
              </div>

              {/* Product Info Table */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="block text-gray-500 uppercase text-[9px]">Design No</span>
                  <strong className="text-sm border-b border-black block pb-1">{isPrintView.designNo}</strong>
                </div>
                <div>
                  <span className="block text-gray-500 uppercase text-[9px]">Item Name</span>
                  <strong className="text-sm border-b border-black block pb-1 truncate">{isPrintView.productName}</strong>
                </div>
              </div>

              {/* Weights Table */}
              <div className="grid grid-cols-3 gap-2 border border-black p-3 text-center text-xs font-mono bg-gray-50">
                <div>
                  <span className="block text-gray-500 text-[8px]">GROSS WEIGHT</span>
                  <strong>{isPrintView.grossWeight.toFixed(2)} g</strong>
                </div>
                <div>
                  <span className="block text-gray-500 text-[8px]">FINE METAL</span>
                  <strong>{isPrintView.netWeight.toFixed(2)} g</strong>
                </div>
                <div>
                  <span className="block text-gray-500 text-[8px]">STONE WT</span>
                  <strong>{isPrintView.stoneWeight.toFixed(2)} g</strong>
                </div>
              </div>

              {/* Stones detail */}
              <div className="p-3 border border-black rounded font-mono text-xs">
                <span className="block text-gray-500 text-[9px] uppercase">Allocated Gems Specifications</span>
                <span className="font-bold">{isPrintView.stones}</span>
              </div>

              <div className="border-t-2 border-black pt-4 flex justify-between items-center text-[10px] font-mono">
                <div>
                  <span>Issued By: <strong>Admin Desk</strong></span>
                  <span className="block mt-1">Status: <strong>{isPrintView.status.toUpperCase()}</strong></span>
                </div>
                <div className="text-right border-l border-black pl-4">
                  <span>QC STATUS: <strong>{isPrintView.qcStatus.toUpperCase()}</strong></span>
                  <span className="block mt-1">Rework Checks: <strong>{isPrintView.reworkCount}</strong></span>
                </div>
              </div>

              <button 
                onClick={() => {
                  window.print();
                }}
                className="w-full bg-black text-white hover:bg-gray-800 font-bold py-3 mt-4 rounded-xl text-xs uppercase tracking-widest transition-colors font-mono"
              >
                Trigger Systems Print Command
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default JobCards;

