import React, { useState } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  FileText, Download, Printer, Filter, Calendar, 
  Layers, TrendingUp, Sliders, CheckSquare, Award 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const { goldRate } = useErpStore();
  const [selectedReport, setSelectedReport] = useState('Production');
  const [startDate, setStartDate] = useState('2026-05-01');
  const [endDate, setEndDate] = useState('2026-05-31');

  const reportOptions = [
    { name: 'Production Report', value: 'Production', desc: 'Completed casting weights vs polished items logs' },
    { name: 'Department Report', value: 'Department', desc: 'Bottleneck indices and queue transfer logs' },
    { name: 'Worklog Report', value: 'Worklog', desc: 'Craftsmen shift productivity indexes' },
    { name: 'Job Card Report', value: 'JobCard', desc: 'Active vs delayed Job Card timelines' },
    { name: 'Refinery Report', value: 'Refinery', desc: 'Acid recoveries pure bullion metal gains' },
    { name: 'Wastage Report', value: 'Wastage', desc: 'Casting crucible losses & sweeps dust audits' },
    { name: 'Profit Report', value: 'Profit', desc: 'Conolidated sales revenue vs wages ledgers' },
    { name: 'Inventory Report', value: 'Inventory', desc: 'Gold vaults & diamonds vault stock counts' },
    { name: 'Dispatch Report', value: 'Dispatch', desc: 'Secured courier shipments logs' }
  ];

  const handleExportCSV = () => {
    toast.success(`${selectedReport} Report CSV Sheet compiled and downloaded successfully!`);
  };

  const handleExportPDF = () => {
    toast.success(`${selectedReport} Report Luxury PDF Layout compiled and sent to printer queue!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Enterprise Reporting</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Compile and print high-fidelity production, wastage, and inventory ledgers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Report selector */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-2">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">Select Report Category</span>
          {reportOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedReport(opt.value)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col ${
                selectedReport === opt.value
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15'
                  : 'bg-black/40 border-[#8E7A5A]/15 text-[#C5B396] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xs font-semibold">{opt.name}</span>
              <span className={`text-[9px] mt-1 ${selectedReport === opt.value ? 'text-black/75' : 'text-gray-500'}`}>{opt.desc}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Filters, Preview & Export */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-6 flex flex-col justify-between min-h-[460px]">
          
          <div className="space-y-5 flex-1">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/15 pb-4 mb-4">
              <h3 className="text-lg font-light text-white">{selectedReport} Report Compiler</h3>
              <span className="text-[10px] border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded-full font-mono uppercase">SECURE COMPILATION</span>
            </div>

            {/* Filter inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Date Range Start</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Date Range End</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white font-mono"
                />
              </div>
            </div>

            {/* Simulated Data Preview box */}
            <div className="p-5 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-4 font-mono text-[10px] text-gray-400">
              <span className="text-white font-semibold text-xs block uppercase border-b border-[#8E7A5A]/15 pb-1">Report Mock Preview</span>
              <div className="space-y-1.5">
                <div>AUDIT INTERVAL: <strong>{startDate} TO {endDate}</strong></div>
                <div>GOLD RATE REFERENCE: <strong>₹{goldRate.toLocaleString()}/g</strong></div>
                {selectedReport === 'Production' && (
                  <>
                    <div>Casting Gold Melted: <strong>14.50 kg Fine</strong></div>
                    <div>Polished Gold Yield: <strong>12.85 kg Fine (88.6%)</strong></div>
                    <div>Floor Recovery Extractor: <strong>1.45 kg Fine</strong></div>
                  </>
                )}
                {selectedReport === 'Wastage' && (
                  <>
                    <div>Filing Dust Shavings: <strong>3.42 kg Gross</strong></div>
                    <div>Refined Fine Bullion Returned: <strong>3.38 kg Fine</strong></div>
                    <div>Total Process Wastage Variance: <strong>1.12% (Within limit)</strong></div>
                  </>
                )}
                {selectedReport === 'Profit' && (
                  <>
                    <div>Showroom POS Sales Inflow: <strong>₹ 12,690,000</strong></div>
                    <div>Karigar labour Wage Outflow: <strong>₹ 840,000</strong></div>
                    <div>Material Purchases: <strong>₹ 4,500,000</strong></div>
                  </>
                )}
                {!(selectedReport === 'Production' || selectedReport === 'Wastage' || selectedReport === 'Profit') && (
                  <>
                    <div>Active records compiled: <strong>1,420 items</strong></div>
                    <div>Audit Security clearance: <strong>PASS - SECURED</strong></div>
                    <div>Signature validation: <strong>Factory Owner verified</strong></div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Export triggers */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#8E7A5A]/20 pt-6">
            <button
              onClick={handleExportCSV}
              className="bg-black hover:bg-white/5 border border-[#8E7A5A]/35 text-white font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
            >
              <Download size={14} /> Download Excel CSV Sheet
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-1.5"
            >
              <Printer size={14} /> Export Custom PDF Report
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;

