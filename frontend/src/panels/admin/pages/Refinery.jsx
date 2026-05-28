import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { Landmark, TrendingUp, Plus, ArrowRight, ClipboardCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Refinery = () => {
  const { refineryLogs, completeRefineryRecovery, goldRate } = useErpStore();
  const [isProcessingOpen, setIsProcessingOpen] = useState(null);
  const [actualRecovered, setActualRecovered] = useState('');

  const activeProcessing = useMemo(() => {
    return refineryLogs.filter(log => log.status === 'In Progress');
  }, [refineryLogs]);

  const finishedProcessing = useMemo(() => {
    return refineryLogs.filter(log => log.status === 'Completed');
  }, [refineryLogs]);

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (!isProcessingOpen || !actualRecovered) {
      toast.error('Please enter the exact fine metal recovered weight');
      return;
    }

    const logId = isProcessingOpen.id;
    const expected = isProcessingOpen.expectedRecovery;
    const actual = parseFloat(actualRecovered);
    const ledgerCredit = Math.round(actual * goldRate);

    completeRefineryRecovery(logId, expected, actual, actual, ledgerCredit);
    setIsProcessingOpen(null);
    setActualRecovered('');
    toast.success(`Assay Complete! Credited ₹ ${ledgerCredit.toLocaleString()} to ledger.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Refinery Audit Desk</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Sweeping slime assays, pure gold recovery, and financial credits</p>
      </div>

      {/* Refinery Ledger Credits summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 bg-black/40 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Refined Gold Asset Credit</span>
            <div className="text-2xl font-light text-white font-mono mt-1">
              ₹ {refineryLogs.reduce((sum, log) => sum + (log.refineryLedgerCredit || 0), 0).toLocaleString()}
            </div>
            <span className="text-[9px] text-gray-500 mt-2 block">Total fine metal financial recovery value</span>
          </div>
          <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl"><Landmark size={24} /></div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Total Fine Metal Yield</span>
            <div className="text-2xl font-light text-white font-mono mt-1">
              {refineryLogs.reduce((sum, log) => sum + (log.actualGoldRecovered || 0), 0).toFixed(2)} g
            </div>
            <span className="text-[9px] text-gray-500 mt-2 block">Recovered fine gold returned to Vault Vaults</span>
          </div>
          <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl"><Sparkles size={24} /></div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Active Batches in Process</span>
            <div className="text-2xl font-light text-white font-mono mt-1">{activeProcessing.length} Batches</div>
            <span className="text-[9px] text-gray-500 mt-2 block">Dust currently undergoing high acid dissolution</span>
          </div>
          <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl"><TrendingUp size={24} /></div>
        </div>

      </div>

      {/* Active Assay Processing Queue */}
      {activeProcessing.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-[10px] border-b border-[#8E7A5A]/20 pb-1">Assaying in Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProcessing.map((batch) => (
              <div key={batch.id} className="p-5 rounded-xl border border-[#D4AF37]/35 bg-black/40 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-[#D4AF37] font-mono font-bold">{batch.id}</span>
                    <h4 className="text-xs font-semibold text-white mt-1">{batch.dustCategory}</h4>
                  </div>
                  <span className="text-[9px] bg-yellow-500/10 text-[#D4AF37] px-2 py-0.5 rounded font-bold uppercase animate-pulse">UNDER ACID TEST</span>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
                  <div>
                    <span className="text-[9px] text-gray-500 block">Gross Dust</span>
                    <strong className="text-white mt-1 block">{batch.grossCollectionWeight}g</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block">Estimated Assay</span>
                    <strong className="text-white mt-1 block">{batch.simulatedAssay}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block">Est Fine Metal</span>
                    <strong className="text-white mt-1 block">{batch.expectedRecovery}g</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsProcessingOpen(batch)}
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <ClipboardCheck size={14} /> Log Recovery Assay Results
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refinery ledger tables */}
      <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden">
        <div className="p-4 border-b border-[#8E7A5A]/20 bg-black/20">
          <h3 className="text-sm font-semibold text-white">Completed Refinery Recoveries Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7A5A]/25 bg-black/60 text-[#C5B396] uppercase tracking-wider font-mono">
                <th className="p-4 font-semibold">Assay Date</th>
                <th className="p-4 font-semibold">Refinery Batch ID</th>
                <th className="p-4 font-semibold">Collection Period</th>
                <th className="p-4 font-semibold">Sludge / Category</th>
                <th className="p-4 font-semibold text-right">Gross Dust Wt</th>
                <th className="p-4 font-semibold text-right">Estimated Assay</th>
                <th className="p-4 font-semibold text-right">Expected Recovery</th>
                <th className="p-4 font-semibold text-right">Actual Pure Metal Yield</th>
                <th className="p-4 font-semibold text-right">Financial Credit Ledger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7A5A]/10">
              {finishedProcessing.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors text-white font-sans">
                  <td className="p-4 font-mono">{log.date}</td>
                  <td className="p-4 font-mono font-bold text-[#D4AF37]">{log.id}</td>
                  <td className="p-4 text-gray-400">{log.collectionPeriod}</td>
                  <td className="p-4 font-medium">{log.dustCategory}</td>
                  <td className="p-4 text-right font-mono text-gray-400">{log.grossCollectionWeight} g</td>
                  <td className="p-4 text-right font-mono text-[#D4AF37]">{log.simulatedAssay}</td>
                  <td className="p-4 text-right font-mono text-gray-500">{log.expectedRecovery} g</td>
                  <td className="p-4 text-right font-mono font-bold text-green-400">{log.actualGoldRecovered} g</td>
                  <td className="p-4 text-right font-mono font-semibold text-green-400">
                    ₹ {log.refineryLedgerCredit.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ASSAY LOG RESULTS MODAL */}
      {isProcessingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsProcessingOpen(null)}></div>
          
          <div className="relative w-full max-w-[420px] bg-[#0F0F0F] border border-[#D4AF37]/35 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-4">
              <div>
                <h3 className="text-base font-light text-white">Refinery Assay Log: {isProcessingOpen.id}</h3>
                <p className="text-[10px] text-[#C5B396]">Estimate: {isProcessingOpen.expectedRecovery}g Pure gold expected</p>
              </div>
              <button onClick={() => setIsProcessingOpen(null)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
            </div>

            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Actual Pure Gold Recovered (g)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    max={isProcessingOpen.grossCollectionWeight * 0.1}
                    placeholder="Enter final bullion bar weight"
                    value={actualRecovered}
                    onChange={(e) => setActualRecovered(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white font-mono text-right text-lg pr-12 outline-none"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5B396] text-xs">grams</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest mt-4"
              >
                Approve Bullion Return & Credit Books
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Refinery;

