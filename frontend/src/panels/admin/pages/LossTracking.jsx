import React, { useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { ShieldAlert, Trash2, ArrowUpRight, TrendingDown, Percent, Award } from 'lucide-react';

const LossTracking = () => {
  const { lossLogs, goldRate } = useErpStore();

  const summary = useMemo(() => {
    const grossLoss = lossLogs.reduce((sum, log) => sum + (log.scrapWeight || 0), 0);
    const dustCaptured = lossLogs.reduce((sum, log) => sum + (log.dustCaptured || 0), 0);
    const meltingLoss = lossLogs.reduce((sum, log) => sum + (log.meltingLoss || 0), 0);
    const stoneDamaged = lossLogs.reduce((sum, log) => sum + (log.stoneDamage || 0), 0);
    const netLossVal = lossLogs.reduce((sum, log) => sum + (log.netLoss || 0), 0);

    return {
      grossLoss: Math.round(grossLoss * 100) / 100,
      dustCaptured: Math.round(dustCaptured * 100) / 100,
      meltingLoss: Math.round(meltingLoss * 100) / 100,
      stoneDamaged: Math.round(stoneDamaged * 100) / 100,
      netLossVal: Math.round(netLossVal * 100) / 100,
    };
  }, [lossLogs]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Fine Metal Loss Registry</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Audit sweepings scrap weight, casting spillages & stone damages</p>
      </div>

      {/* Loss Summary Analytics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-red-500/20 bg-black/40">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Gross Floor Loss</span>
            <TrendingDown className="text-red-500" size={16} />
          </div>
          <div className="text-2xl font-light text-white font-mono mt-2">{summary.grossLoss} g</div>
          <div className="text-[10px] text-gray-500 mt-2">₹{(summary.grossLoss * goldRate).toLocaleString()} Net Metal Value</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-green-500/20 bg-black/40">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Extractor Dust Captured</span>
            <span className="text-green-500 text-xs">✔ 70% Recovery</span>
          </div>
          <div className="text-2xl font-light text-white font-mono mt-2">{summary.dustCaptured} g</div>
          <div className="text-[10px] text-gray-500 mt-2">Routed to Refinery Crucible</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Melting Burn Losses</span>
            <Percent className="text-[#D4AF37]" size={16} />
          </div>
          <div className="text-2xl font-light text-white font-mono mt-2">{summary.meltingLoss} g</div>
          <div className="text-[10px] text-gray-500 mt-2">Irrecoverable processing burns</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-red-500/25 bg-black/40">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#C5B396] uppercase tracking-wider">Chipped Stone Loss</span>
            <ShieldAlert className="text-red-500" size={16} />
          </div>
          <div className="text-2xl font-light text-white font-mono mt-2">{summary.stoneDamaged} cts</div>
          <div className="text-[10px] text-gray-500 mt-2">Gems shattered during setting</div>
        </div>

      </div>

      {/* Loss Records Table */}
      <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden">
        <div className="p-4 border-b border-[#8E7A5A]/20 bg-black/20">
          <h3 className="text-sm font-semibold text-white">Metal Loss & Damage Vouchers Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7A5A]/25 bg-black/60 text-[#C5B396] uppercase tracking-wider font-mono">
                <th className="p-4 font-semibold">Audit Date</th>
                <th className="p-4 font-semibold">Loss ID</th>
                <th className="p-4 font-semibold">Job Card ID</th>
                <th className="p-4 font-semibold">Stage Category</th>
                <th className="p-4 font-semibold">Craftsman</th>
                <th className="p-4 font-semibold">Metal Type</th>
                <th className="p-4 font-semibold text-right">Floor Scrap</th>
                <th className="p-4 font-semibold text-right">Burn Loss</th>
                <th className="p-4 font-semibold text-right">Net Waste Loss</th>
                <th className="p-4 font-semibold">Remarks / Incidents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7A5A]/10">
              {lossLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors text-white font-sans">
                  <td className="p-4 font-mono">{log.date}</td>
                  <td className="p-4 font-mono font-bold text-red-400">{log.id}</td>
                  <td className="p-4 font-mono text-[#D4AF37]">{log.jobCardId}</td>
                  <td className="p-4">{log.department.replace(' Department', '')}</td>
                  <td className="p-4 font-medium">{log.craftman}</td>
                  <td className="p-4 text-xs">{log.metalType}</td>
                  <td className="p-4 text-right font-mono text-gray-400">{log.scrapWeight.toFixed(2)}g</td>
                  <td className="p-4 text-right font-mono text-gray-500">{log.meltingLoss.toFixed(2)}g</td>
                  <td className="p-4 text-right font-mono font-bold text-red-400">
                    {log.stoneDamage > 0 ? `${log.stoneDamage} cts (Gems)` : `${log.netLoss.toFixed(2)}g`}
                  </td>
                  <td className="p-4 text-gray-500 italic max-w-[200px] truncate">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LossTracking;

