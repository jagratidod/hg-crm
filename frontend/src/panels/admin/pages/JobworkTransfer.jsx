import React, { useState, useEffect, useMemo } from 'react';
import useErpStore, { DEPARTMENTS } from '../../../store/erpStore';
import { 
  ScanBarcode, QrCode, Truck, ArrowRight, ShieldCheck, Layers, Scale, 
  TrendingDown, Plus, FolderOpen, FileCheck, History, UserCheck, Coins, 
  Gem, Percent, ClipboardCheck, AlertCircle, Calendar, Clock, Sparkles, 
  HelpCircle, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import toast from 'react-hot-toast';

const JobworkTransfer = () => {
  const { jobCards, users, transferJobCardDept, addNotification } = useErpStore();

  // Basic Transfer States
  const [transferId, setTransferId] = useState(`JWQ-${Math.floor(100 + Math.random() * 900)}`);
  const [tagInput, setTagInput] = useState('');
  const [selectedJc, setSelectedJc] = useState(null);
  
  // Department & User Assignment States
  const [fromDept, setFromDept] = useState('');
  const [toDept, setToDept] = useState('');
  const [fromUser, setFromUser] = useState('Super Admin');
  const [toUser, setToUser] = useState('');
  
  // Date & Time states
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
  const [transferTime, setTransferTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5));

  // Dynamic Loss / Calculation states
  const [scrapLoss, setScrapLoss] = useState(0.12);
  const [itemWeight, setItemWeight] = useState(10.25);
  
  // Stepper Sign-off States
  const [approvalStep, setApprovalStep] = useState(1); // 1: Created, 2: Supervisor Approved, 3: Operator Accepted
  
  // Visual Simulator States
  const [isScanning, setIsScanning] = useState(false);
  const [showQrDrawer, setShowQrDrawer] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);

  // Auto-fill time on load
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTransferTime(now.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Filter 22 main production departments
  const prodDepts = useMemo(() => {
    return DEPARTMENTS.filter(d => d.id <= 22);
  }, []);

  // Pre-load users who match To-Department
  const availableToUsers = useMemo(() => {
    if (!toDept) return users;
    return users.filter(u => u.department === toDept || u.designation.includes('Karigar') || u.designation.includes('Setter') || u.designation.includes('Designer'));
  }, [users, toDept]);

  // Set first user when To-Department changes
  useEffect(() => {
    if (availableToUsers.length > 0) {
      setToUser(availableToUsers[0].name);
    } else {
      setToUser('');
    }
  }, [availableToUsers]);

  // Tag Scan Handler
  const handleTagScan = (tagId) => {
    setIsScanning(true);
    setTimeout(() => {
      const match = jobCards.find(
        (jc) => jc.id.toLowerCase() === tagId.toLowerCase() || 
               jc.barcode.toLowerCase() === tagId.toLowerCase() || 
               jc.rfid.toLowerCase() === tagId.toLowerCase()
      );

      setIsScanning(false);
      if (match) {
        setSelectedJc(match);
        setTagInput(match.barcode);
        setFromDept(match.currentDept);
        setItemWeight(match.grossWeight);
        
        // Auto-predict next department in index sequence
        const currentIndex = prodDepts.findIndex(d => d.name === match.currentDept);
        const predictedNextDept = currentIndex !== -1 && currentIndex + 1 < prodDepts.length 
          ? prodDepts[currentIndex + 1].name 
          : prodDepts[currentIndex].name;
        
        setToDept(predictedNextDept);
        setApprovalStep(1); // Reset approval steps on new load

        toast.success(`Barcode Scanned: Scans resolved for ${match.id}`, {
          icon: '🏷️',
          style: {
            background: '#0F0F0F',
            color: '#D4AF37',
            border: '1px solid #D4AF37'
          }
        });
      } else {
        toast.error(`Invalid barcode tag. Workpiece not registered on floor.`);
      }
    }, 1200); // Simulated scanning duration
  };

  // Math Calculations for details grid
  const calculations = useMemo(() => {
    const gross = itemWeight;
    const loss = parseFloat(scrapLoss) || 0;
    const netWeight = Math.max(0, gross - loss);
    
    // Stone / Diamond weight subtraction
    const stoneWeightGrams = selectedJc ? (selectedJc.stoneWeight || 0) : 0;
    const diamondWeightCarats = selectedJc ? (selectedJc.diamondWeight || 0) : 0;
    const diamondWeightGrams = diamondWeightCarats * 0.2; // 1 carat = 0.2 grams
    const totalGemsWeight = stoneWeightGrams + diamondWeightGrams;
    
    // Net metal weight
    const metalWeight = Math.max(0, netWeight - totalGemsWeight);
    
    // Purity calculations
    let purityPercentage = 0.916; // Default 22K (91.6% purity)
    if (selectedJc) {
      if (selectedJc.productName.toLowerCase().includes('18k') || selectedJc.notes?.toLowerCase().includes('18k')) purityPercentage = 0.750;
      else if (selectedJc.productName.toLowerCase().includes('14k') || selectedJc.notes?.toLowerCase().includes('14k')) purityPercentage = 0.585;
      else if (selectedJc.productName.toLowerCase().includes('24k')) purityPercentage = 0.999;
    }
    const pureMetalWeight = metalWeight * purityPercentage;

    return {
      netWeight: Math.round(netWeight * 1000) / 1000,
      metalWeight: Math.round(metalWeight * 1000) / 1000,
      pureMetalWeight: Math.round(pureMetalWeight * 1000) / 1000,
      stoneWeightGrams: Math.round(stoneWeightGrams * 1000) / 1000,
      diamondWeightCarats,
      purityPercent: purityPercentage * 100
    };
  }, [itemWeight, scrapLoss, selectedJc]);

  // Form Submission
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedJc) {
      toast.error('No workpiece scanned. Scan a tag to begin.');
      return;
    }

    if (fromDept === toDept) {
      toast.error('From Department and To Department cannot be identical.');
      return;
    }

    if (approvalStep < 3) {
      toast.error('Sign-off required. Complete Supervisor Approval and Operator Acceptance!');
      return;
    }

    // Execute transfer in Zustand state store
    transferJobCardDept(selectedJc.id, toDept, toUser, scrapLoss);
    
    // Custom simulated notification
    addNotification(
      'Jobwork Transfer Handshake',
      `Transferred ${selectedJc.id} from ${fromDept.replace(' Department', '')} to ${toDept.replace(' Department', '')}.`,
      'success'
    );

    toast.success(`Success! Voucher ${transferId} registered. Gold balance audited.`, {
      duration: 4000,
      style: {
        background: '#0F0F0F',
        color: '#FFFFFF',
        border: '2px solid #D4AF37'
      }
    });

    // Reset Form
    setTransferId(`JWQ-${Math.floor(100 + Math.random() * 900)}`);
    setSelectedJc(null);
    setTagInput('');
    setApprovalStep(1);
  };

  // Quick Catalogue Addition simulator
  const handleCreateCatalogue = () => {
    setShowCatalogModal(true);
    setTimeout(() => {
      setShowCatalogModal(false);
      toast.success('Workpiece catalog card locked in gallery registry!');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Jobwork Department Transfer Desk</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Industrial Jewellery Routing & Scrap Audit Screen</p>
        </div>

        {/* Transfer ID Stamp */}
        <div className="flex items-center gap-3 bg-black/45 border border-[#D4AF37]/25 p-3.5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37] opacity-5 blur-[20px] rounded-full pointer-events-none"></div>
          <div className="leading-none text-left">
            <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block font-medium">Jobwork Voucher</span>
            <span className="text-base font-mono font-bold text-white mt-1.5 block tracking-widest text-[#D4AF37]">{transferId}</span>
          </div>
        </div>
      </div>

      {/* Main Form Dashboard Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main Auditing & Routing Inputs */}
        <div className="lg:col-span-2 space-y-6">

          {/* A. Barcode Tag Scanner Simulator Box */}
          <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/10 pb-3">
              <div className="flex items-center gap-2">
                <ScanBarcode className="text-[#D4AF37]" size={18} />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">RFID / Barcode Laser Scanner</h3>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Bypass manual typing by selecting a card below</span>
            </div>

            {/* Input & Scan Button */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Scan tag or type JC barcode (e.g. BC-JC001)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                />
                {isScanning && (
                  <div className="absolute inset-y-0 right-4 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleTagScan(tagInput)}
                disabled={isScanning || !tagInput}
                className="bg-[#D4AF37] hover:bg-[#C59F2D] disabled:opacity-50 text-black font-semibold text-xs py-3 px-6 rounded-xl transition-all shadow-md uppercase tracking-wider shrink-0"
              >
                {isScanning ? 'Scanning...' : 'Laser Scan'}
              </button>
            </div>

            {/* Simulated Tags Fast Selector Grid */}
            <div className="space-y-2">
              <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block font-bold">Floor Job Cards Ready for Handshake:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {jobCards.filter(jc => ['In Progress', 'Pending', 'Rework'].includes(jc.status)).map(jc => (
                  <button
                    key={jc.id}
                    type="button"
                    onClick={() => handleTagScan(jc.barcode)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden select-none hover:border-[#D4AF37]/50 ${
                      selectedJc?.id === jc.id 
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' 
                        : 'bg-black/45 border-[#8E7A5A]/25 text-[#C5B396]'
                    }`}
                  >
                    <div className="text-[9px] font-mono font-bold text-white tracking-widest">{jc.id}</div>
                    <div className="text-[9px] truncate text-gray-500 mt-1">{jc.productName}</div>
                    <div className="text-[8px] font-mono text-[#D4AF37] mt-1 bg-black/60 px-1.5 py-0.5 rounded inline-block">
                      {jc.currentDept.replace(' Department', '')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SCANNING LASER EFFECT SIMULATOR SCREEN */}
            {isScanning && (
              <div className="absolute inset-0 bg-[#0F0F0F]/85 z-50 flex flex-col items-center justify-center rounded-2xl animate-pulse">
                <div className="w-[85%] h-px bg-red-600 shadow-[0_0_12px_3px_rgba(220,38,38,0.85)] animate-bounce"></div>
                <ScanBarcode className="text-[#D4AF37] animate-spin mt-4" size={36} />
                <span className="text-xs font-mono text-[#C5B396] mt-2 uppercase tracking-widest">Simulating Barcode Laser Sweep...</span>
              </div>
            )}
          </div>

          {/* B. Transfer Details & validation forms */}
          <form onSubmit={handleTransferSubmit} className="space-y-6">
            
            {/* Dept Handshake & User Panel */}
            <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#8E7A5A]/10 pb-3">
                <Layers className="text-[#D4AF37]" size={18} />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sans">Handshake Router</h3>
              </div>

              {/* Selection Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* From Department */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">From Department</label>
                  <select
                    value={fromDept}
                    onChange={(e) => setFromDept(e.target.value)}
                    className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                    required
                  >
                    <option value="">-- Auto-scanned Department --</option>
                    {prodDepts.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* To Department */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">To Department (Receiving Stage)</label>
                  <select
                    value={toDept}
                    onChange={(e) => setToDept(e.target.value)}
                    className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                    required
                  >
                    <option value="">-- Select Target Stage --</option>
                    {prodDepts.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  {fromDept && toDept && fromDept === toDept && (
                    <div className="text-[9px] text-red-500 font-sans mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> To Department must be different from source department!
                    </div>
                  )}
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* From User */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">From User (Sender operator)</label>
                  <input
                    type="text"
                    value={fromUser}
                    onChange={(e) => setFromUser(e.target.value)}
                    className="w-full bg-[#121212] border border-[#8E7A5A]/20 rounded-xl py-3 px-4 text-white text-xs outline-none cursor-not-allowed"
                    readOnly
                  />
                </div>

                {/* To User */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">To User (Assign Receiver)</label>
                  <select
                    value={toUser}
                    onChange={(e) => setToUser(e.target.value)}
                    className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                    required
                  >
                    {availableToUsers.map(u => (
                      <option key={u.id} value={u.name}>{u.name} ({u.designation})</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Transfer Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-4 text-white text-xs outline-none font-mono"
                    />
                    <Calendar size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Transfer Time</label>
                  <div className="relative">
                    <input
                      type="time"
                      value={transferTime}
                      onChange={(e) => setTransferTime(e.target.value)}
                      className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-4 text-white text-xs outline-none font-mono"
                    />
                    <Clock size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>

            </div>

            {/* C. Dynamic Gold Weights audit Table */}
            <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/10 pb-3">
                <div className="flex items-center gap-2">
                  <Scale className="text-[#D4AF37]" size={18} />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Workpiece Weights & Scrap audit</h3>
                </div>
                <span className="text-[9px] bg-red-500/10 border border-red-500/25 text-red-400 px-2 py-0.5 rounded font-mono uppercase">Loss Registry</span>
              </div>

              {/* Design/Product Table with values */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#8E7A5A]/25 bg-black/40 text-[#C5B396] uppercase tracking-wider font-mono">
                      <th className="p-3">Design / Tag</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Order Ref</th>
                      <th className="p-3 text-right">Total Wt (g)</th>
                      <th className="p-3 text-center">Loss/Scrap (g)</th>
                      <th className="p-3 text-right">Net Wt (g)</th>
                      <th className="p-3 text-right">Metal Wt (g)</th>
                      <th className="p-3 text-center">Carat Purity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedJc ? (
                      <tr className="border-b border-white/5 font-sans">
                        <td className="p-3">
                          <div className="font-mono font-bold text-white">{selectedJc.designNo}</div>
                          <div className="text-[9px] font-mono text-gray-500">{selectedJc.id}</div>
                        </td>
                        <td className="p-3 text-gray-400 truncate max-w-[120px]">{selectedJc.productName}</td>
                        <td className="p-3 font-mono font-semibold text-gray-500">{selectedJc.id.slice(-4)}</td>
                        <td className="p-3 text-right font-mono font-semibold">
                          <input
                            type="number"
                            step="0.01"
                            value={itemWeight}
                            onChange={(e) => setItemWeight(parseFloat(e.target.value) || 0)}
                            className="bg-black/60 border border-[#8E7A5A]/20 focus:border-[#D4AF37] rounded p-1 w-16 text-right font-mono text-white text-xs outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={scrapLoss}
                            onChange={(e) => setScrapLoss(parseFloat(e.target.value) || 0)}
                            className="bg-black border border-red-500/30 focus:border-red-500 rounded p-1 w-16 text-center font-mono text-red-400 text-xs outline-none"
                          />
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-white">{calculations.netWeight.toFixed(3)}</td>
                        <td className="p-3 text-right font-mono text-[#D4AF37] font-semibold">{calculations.metalWeight.toFixed(3)}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] font-mono font-bold uppercase text-[9px]">
                            {selectedJc.productName.toLowerCase().includes('18k') ? '18K' : selectedJc.productName.toLowerCase().includes('14k') ? '14K' : '22K'}
                          </span>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="8" className="p-6 text-center text-xs text-gray-600">
                          Scan a floor tag above to display jewelry weight distributions and compute scrap losses.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Real time loss monitoring math preview */}
              {selectedJc && (
                <div className="p-4 rounded-xl bg-black/40 border border-[#8E7A5A]/15 space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold">
                    <span>Audit Breakdown Calculations</span>
                    <span className="font-mono text-gray-500">Formulas: Net = Total - Loss</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mt-1">
                    <div>
                      <span className="text-gray-500 block">Gem/Stone Wt:</span>
                      <strong className="text-white font-mono mt-0.5 block">{(selectedJc.stoneWeight || 0).toFixed(3)} g</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Diamond Wt:</span>
                      <strong className="text-white font-mono mt-0.5 block">{(selectedJc.diamondWeight || 0).toFixed(2)} cts <span className="text-[10px] text-gray-600">({(selectedJc.diamondWeight * 0.2).toFixed(3)}g)</span></strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Karat Purity Rate:</span>
                      <strong className="text-white font-mono mt-0.5 block">{calculations.purityPercent.toFixed(1)}% Pure</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Estimated Fine Gold:</span>
                      <strong className="text-[#D4AF37] font-mono mt-0.5 block font-bold">{calculations.pureMetalWeight.toFixed(3)} g</strong>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* D. Stepper approval workflows */}
            <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#8E7A5A]/10 pb-3 justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-[#D4AF37]" size={18} />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Dual-Signoff Stepper Gate</h3>
                </div>
                <span className="text-[9px] border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded font-mono uppercase">Security Handshake</span>
              </div>

              {/* Three Steps visual map */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-2 relative">
                
                {/* Step 1 */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="text-left leading-none">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block">Phase 1</span>
                    <span className="text-xs font-semibold text-white mt-1 block">Transfer Created</span>
                  </div>
                </div>

                <ChevronRight className="text-gray-700 hidden sm:block" size={14} />

                {/* Step 2 */}
                <div className="flex-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedJc) {
                        toast.error('Scan a job card to activate the signoff chain.');
                        return;
                      }
                      setApprovalStep(2);
                      toast.success('Supervisor security code accepted. Transfer authorized.');
                    }}
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border transition-all ${
                      approvalStep >= 2
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : 'bg-black/40 border-[#8E7A5A]/35 text-[#C5B396] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {approvalStep >= 2 ? <CheckCircle2 size={16} /> : 2}
                  </button>
                  <div className="text-left leading-none">
                    <span className={`text-[10px] font-mono uppercase font-bold block ${approvalStep >= 2 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Phase 2</span>
                    <span className={`text-xs font-semibold mt-1 block ${approvalStep >= 2 ? 'text-white' : 'text-gray-500'}`}>Supervisor Approved</span>
                  </div>
                </div>

                <ChevronRight className="text-gray-700 hidden sm:block" size={14} />

                {/* Step 3 */}
                <div className="flex-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (approvalStep < 2) {
                        toast.error('Supervisor authorization (Phase 2) is required first.');
                        return;
                      }
                      setApprovalStep(3);
                      toast.success('Operator accepted checklist handoff.');
                    }}
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border transition-all ${
                      approvalStep >= 3
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : 'bg-black/40 border-[#8E7A5A]/35 text-[#C5B396] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {approvalStep >= 3 ? <CheckCircle2 size={16} /> : 3}
                  </button>
                  <div className="text-left leading-none">
                    <span className={`text-[10px] font-mono uppercase font-bold block ${approvalStep >= 3 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Phase 3</span>
                    <span className={`text-xs font-semibold mt-1 block ${approvalStep >= 3 ? 'text-white' : 'text-gray-500'}`}>Operator Accepted</span>
                  </div>
                </div>

              </div>

              {/* Stepper feedback message */}
              {selectedJc && approvalStep === 1 && (
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-3.5 rounded-xl text-xs text-left text-[#C5B396] flex items-start gap-2">
                  <AlertCircle size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Awaiting Supervisor Authorization Code</span>
                    <span className="mt-0.5 block text-[10px]">Verify all design weights and scrap losses, then click the **Phase 2** button to sign off.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Form actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedJc(null);
                  setTagInput('');
                  setApprovalStep(1);
                  toast.success('Fields cleared.');
                }}
                className="flex-1 bg-black border border-[#8E7A5A]/30 hover:border-[#D4AF37]/45 text-[#C5B396] hover:text-white font-semibold text-xs py-4 rounded-xl transition-all uppercase tracking-widest"
              >
                Reset Board
              </button>
              <button
                type="submit"
                className="flex-2 bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-bold text-xs py-4 px-12 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 uppercase tracking-widest"
              >
                Verify & Execute Transfer
              </button>
            </div>

          </form>

        </div>

        {/* Right 1 Column: Catalog Visualizer & Loss Gauges Dashboard */}
        <div className="space-y-6">

          {/* I. Catalog Image Visual Card */}
          <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/10 pb-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="text-[#D4AF37]" size={16} />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Catalogue Card Verification</h3>
              </div>
              {selectedJc && (
                <button
                  onClick={() => setShowQrDrawer(true)}
                  className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 font-mono font-bold"
                >
                  <QrCode size={12} /> Scan QR History
                </button>
              )}
            </div>

            {selectedJc ? (
              <div className="space-y-4 text-left">
                {/* Scanned Image Display */}
                <div className="relative rounded-xl overflow-hidden border border-[#8E7A5A]/25 aspect-video bg-black/40 group">
                  <img
                    src={selectedJc.grossWeight > 30 
                      ? 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400' 
                      : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400'}
                    alt="Jewellery Design Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded font-mono text-[9px] text-[#D4AF37] uppercase tracking-wider font-bold">
                    {selectedJc.designNo}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-gray-500 uppercase tracking-widest text-[9px] font-bold">Design Parameters</div>
                  <div className="font-semibold text-white truncate text-sm">{selectedJc.productName}</div>
                  <div className="text-[10px] text-[#C5B396] leading-relaxed italic">{selectedJc.stones}</div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleCreateCatalogue}
                    className="w-full bg-black border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-[10px] py-2 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={12} /> Create Catalogue
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center text-gray-600">
                <FolderOpen className="opacity-20 mb-3" size={40} />
                <span className="text-xs font-semibold">No visual data.</span>
                <span className="text-[10px] text-gray-500 mt-1">Please scan a tag barcode to trigger optical visual verification cards.</span>
              </div>
            )}
          </div>

          {/* II. Loss Monitoring mini dashboard widgets */}
          <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#8E7A5A]/10 pb-3">
              <TrendingDown className="text-[#D4AF37]" size={16} />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Floor Loss Gauges</h3>
            </div>

            {/* Gold Loss Dial Widget */}
            <div className="space-y-3 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-[#C5B396] font-medium">Auto Loss Limit margin:</span>
                <span className="font-mono font-bold text-white">4.0% Max</span>
              </div>
              <div className="h-2 w-full bg-black/50 border border-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-right from-green-500 via-[#D4AF37] to-red-500 transition-all duration-500" 
                  style={{ width: `${selectedJc ? Math.min(100, (scrapLoss / itemWeight) * 100 * 25) : 30}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>Safe Range (0 - 1%)</span>
                <span>Limit Breached ({">"} 4%)</span>
              </div>
            </div>

            {/* Department Wastage parameters */}
            <div className="space-y-2 text-left pt-2">
              <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block font-bold">Wastage logs (Today):</span>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs py-1 px-2.5 rounded bg-black/25 font-mono">
                  <span className="text-gray-500">Casting Floor:</span>
                  <span className="text-red-400 font-semibold">+0.450 g</span>
                </div>
                <div className="flex justify-between text-xs py-1 px-2.5 rounded bg-black/25 font-mono">
                  <span className="text-gray-500">Filing Bench:</span>
                  <span className="text-green-400 font-semibold">+0.120 g</span>
                </div>
                <div className="flex justify-between text-xs py-1 px-2.5 rounded bg-black/25 font-mono">
                  <span className="text-gray-500">Setting Desk:</span>
                  <span className="text-red-400 font-semibold">+0.400 g</span>
                </div>
              </div>
            </div>

            {/* Employee Efficiency index */}
            <div className="space-y-2 text-left pt-2">
              <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block font-bold">Operator Purity Index:</span>
              <div className="p-3 bg-black/40 border border-[#8E7A5A]/10 rounded-xl flex items-center justify-between gap-3">
                <div className="leading-none">
                  <span className="text-xs font-bold text-white block">Rajesh Karigar</span>
                  <span className="text-[9px] text-gray-500 font-mono mt-1 block">Casting Department</span>
                </div>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/35 py-1 px-2 rounded-lg font-mono text-xs text-[#D4AF37] font-bold">
                  98.6% Acc.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* III. QR CODE TIMELINE HISTORY SLIDE-OUT DRAWER */}
      {showQrDrawer && selectedJc && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQrDrawer(false)}></div>
          
          <div className="relative w-full max-w-[420px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Production QR Registry</h2>
                  <p className="text-xs text-[#C5B396]">Full audit log timeline of {selectedJc.id}</p>
                </div>
                <button onClick={() => setShowQrDrawer(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              {/* QR Image Visual container */}
              <div className="flex flex-col items-center justify-center p-6 bg-black/40 border border-[#D4AF37]/25 rounded-2xl mb-6">
                <div className="bg-white p-3.5 rounded-xl border-4 border-[#D4AF37] shadow-xl">
                  {/* Styled CSS QR Code representing details */}
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="black">
                    <rect width="20" height="20"/>
                    <rect x="80" width="20" height="20"/>
                    <rect y="80" width="20" height="20"/>
                    <rect x="25" y="25" width="10" height="10"/>
                    <rect x="45" y="10" width="15" height="15"/>
                    <rect x="15" y="55" width="20" height="10"/>
                    <rect x="65" y="45" width="25" height="25"/>
                    <rect x="80" y="80" width="10" height="10"/>
                    <rect x="40" y="70" width="15" height="20"/>
                  </svg>
                </div>
                <span className="text-[10px] text-gray-500 font-mono mt-3 uppercase tracking-wider">HUID Tag: {selectedJc.barcode}</span>
              </div>

              {/* Timeline Logs registry */}
              <div className="space-y-4 text-left">
                <span className="text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold block mb-2 font-mono">Floor Scans Timeline ({selectedJc.timeline.length})</span>
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                  {selectedJc.timeline.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start relative">
                      {/* Left dot timeline connector */}
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-black shrink-0 mt-0.5"></div>
                        {idx < selectedJc.timeline.length - 1 && (
                          <div className="w-px h-10 bg-gray-800"></div>
                        )}
                      </div>
                      <div className="leading-tight flex-1">
                        <div className="text-xs font-semibold text-white">{step.stage.replace(' Department', '')}</div>
                        <div className="text-[10px] text-[#C5B396] mt-0.5">Operator: {step.craftman}</div>
                        <div className="flex justify-between items-center text-[9px] text-gray-500 mt-1 font-mono">
                          <span>{step.date}</span>
                          {step.loss > 0 && <span className="text-red-400 font-semibold">-{step.loss.toFixed(3)}g Loss</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#8E7A5A]/20">
              <button
                type="button"
                onClick={() => setShowQrDrawer(false)}
                className="w-full bg-[#D4AF37] text-black font-semibold py-3 rounded-xl transition-all text-xs uppercase tracking-wider"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IV. CATALOG CREATION SUCCESS SPLASH OVERLAY */}
      {showCatalogModal && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <div className="glass-panel border-2 border-[#D4AF37] p-8 rounded-2xl max-w-[340px] text-center bg-[#0F0F0F] relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 blur-[45px] rounded-full pointer-events-none"></div>
            
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <FileCheck size={28} />
            </div>

            <h3 className="text-lg font-serif font-black text-white tracking-tight uppercase text-[#D4AF37]">Catalogue Registered</h3>
            <p className="text-xs text-[#C5B396] mt-2 leading-relaxed">
              Optical tags and gross-weight metrics recorded! Design files locked into master Jewellery gallery.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobworkTransfer;
