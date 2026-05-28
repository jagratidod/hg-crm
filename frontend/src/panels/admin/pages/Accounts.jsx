import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  Landmark, Receipt, TrendingUp, HandCoins, ArrowUpRight, 
  ArrowDownRight, Plus, Sliders, Calendar, Download 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Accounts = () => {
  const { accountsLedger, addTransaction } = useErpStore();
  const [bookFilter, setBookFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New voucher entry form state
  const [newTxn, setNewTxn] = useState({
    type: 'Debit',
    book: 'Expense',
    category: 'Karigar Wages',
    amount: 15000,
    account: 'Labour Outstandings',
    voucherNo: `VOU-EXP-${Date.now().toString().slice(-4)}`,
    description: 'Manual cash wage advance for Karigar workshop sweeps'
  });

  const filteredTxns = useMemo(() => {
    return accountsLedger.filter(t => {
      return bookFilter === 'All' ? true : t.book === bookFilter;
    });
  }, [accountsLedger, bookFilter]);

  // Financial summary sheets
  const sheets = useMemo(() => {
    const cashbookBal = accountsLedger
      .filter(t => t.book === 'Cashbook')
      .reduce((sum, t) => sum + (t.type === 'Credit' ? t.amount : -t.amount), 350000); // 350K initial float

    const bankbookBal = accountsLedger
      .filter(t => t.book === 'Bankbook')
      .reduce((sum, t) => sum + (t.type === 'Credit' ? t.amount : -t.amount), 1850000); // 1.85M initial float

    const totalIncome = accountsLedger
      .filter(t => t.type === 'Credit')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = accountsLedger
      .filter(t => t.type === 'Debit')
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;

    return {
      cashbookBal,
      bankbookBal,
      totalIncome,
      totalExpenses,
      netProfit
    };
  }, [accountsLedger]);

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      ...newTxn
    });
    setIsAddOpen(false);
    toast.success('Bookkeeping Voucher recorded successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Financial Accounting</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Cashbooks, double-entry ledgers, and Profit & Loss reports</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-3 px-5 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5 uppercase tracking-wider"
        >
          <Plus size={16} /> Record Voucher
        </button>
      </div>

      {/* Financial Statement Balances summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/25 bg-black/40">
          <div className="flex justify-between items-start text-xs text-[#C5B396]">
            <span>Cashbook Vault Float</span>
            <HandCoins size={14} className="text-[#D4AF37]" />
          </div>
          <div className="text-xl font-mono font-bold text-white mt-2">₹ {sheets.cashbookBal.toLocaleString()}</div>
          <span className="text-[9px] text-gray-500 mt-2 block">Liquid cash kept in factory safe</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40">
          <div className="flex justify-between items-start text-xs text-[#C5B396]">
            <span>Secured Bank Account Balance</span>
            <Landmark size={14} className="text-[#D4AF37]" />
          </div>
          <div className="text-xl font-mono font-bold text-white mt-2">₹ {sheets.bankbookBal.toLocaleString()}</div>
          <span className="text-[9px] text-gray-500 mt-2 block">Royal HDFC & ICICI Current Accounts</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40">
          <div className="flex justify-between items-start text-xs text-[#C5B396]">
            <span>Income (This Month)</span>
            <ArrowUpRight size={16} className="text-green-400" />
          </div>
          <div className="text-xl font-mono font-bold text-green-400 mt-2">₹ {sheets.totalIncome.toLocaleString()}</div>
          <span className="text-[9px] text-gray-500 mt-2 block">Retail sales deposits & advance layaways</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-red-500/20 bg-black/40">
          <div className="flex justify-between items-start text-xs text-[#C5B396]">
            <span>Expenses / Wages (This Month)</span>
            <ArrowDownRight size={16} className="text-red-400" />
          </div>
          <div className="text-xl font-mono font-bold text-red-400 mt-2">₹ {sheets.totalExpenses.toLocaleString()}</div>
          <span className="text-[9px] text-gray-500 mt-2 block">Karigar labour payouts & sweeps losses</span>
        </div>

      </div>

      {/* Net profit widget */}
      <div className="glass-panel p-5 rounded-2xl border border-[#D4AF37]/20 bg-[#0F0F0F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-[10px]">Consolidated Profit & Loss (This Month)</h3>
          <p className="text-xs text-[#C5B396] mt-1">Computed net financial gains incorporating floor metals recovery adjustments</p>
        </div>
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-xs text-gray-500 font-sans">Net P&L Result:</span>
          <span className={`text-2xl font-bold ${sheets.netProfit >= 0 ? 'text-green-400 animate-pulse' : 'text-red-400'}`}>
            ₹ {sheets.netProfit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Book Tabs filter */}
      <div className="glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['All', 'Cashbook', 'Bankbook', 'Expense'].map(book => (
            <button
              key={book}
              onClick={() => setBookFilter(book)}
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                bookFilter === book 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'text-[#C5B396] hover:bg-white/5 hover:text-white'
              }`}
            >
              {book}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 font-mono">Ledger Entries Count: <strong>{filteredTxns.length}</strong></span>
      </div>

      {/* Voucher entries table */}
      <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden">
        <div className="p-4 border-b border-[#8E7A5A]/20 bg-black/20">
          <h3 className="text-sm font-semibold text-white">General Double-Entry Vouchers Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7A5A]/25 bg-black/60 text-[#C5B396] uppercase tracking-wider font-mono">
                <th className="p-4 font-semibold">Voucher Date</th>
                <th className="p-4 font-semibold">Voucher No</th>
                <th className="p-4 font-semibold">Journal Book</th>
                <th className="p-4 font-semibold">Account Ledger</th>
                <th className="p-4 font-semibold">Sub Category</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold text-center">Type</th>
                <th className="p-4 font-semibold text-right">Transaction Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7A5A]/10">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/5 transition-colors text-white font-sans">
                  <td className="p-4 font-mono">{txn.date}</td>
                  <td className="p-4 font-mono font-bold text-gray-400">{txn.voucherNo}</td>
                  <td className="p-4 text-xs font-mono">{txn.book}</td>
                  <td className="p-4 font-medium">{txn.account}</td>
                  <td className="p-4 text-gray-400">{txn.category}</td>
                  <td className="p-4 text-gray-500 italic max-w-[200px] truncate">{txn.description}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      txn.type === 'Credit' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {txn.type === 'Credit' ? 'Inflow' : 'Outflow'}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-mono font-bold ${txn.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
                    {txn.type === 'Credit' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW TXN VOUCHER DRAWER */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
          
          <div className="relative w-full max-w-[420px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Record Accounting Voucher</h2>
                  <p className="text-xs text-[#C5B396]">Post a double-entry ledger entry</p>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              <form onSubmit={handleCreateVoucher} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Voucher Type</label>
                    <select
                      value={newTxn.type}
                      onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                    >
                      <option value="Debit">Debit (Outflow)</option>
                      <option value="Credit">Credit (Inflow)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Journal Book</label>
                    <select
                      value={newTxn.book}
                      onChange={(e) => setNewTxn({...newTxn, book: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                    >
                      <option value="Cashbook">Cashbook</option>
                      <option value="Bankbook">Bankbook</option>
                      <option value="Expense">Expense Register</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Account Ledger</label>
                    <input
                      type="text"
                      placeholder="e.g. Labour Payouts"
                      value={newTxn.account}
                      onChange={(e) => setNewTxn({...newTxn, account: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Transaction Sub Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Wages"
                      value={newTeamMemberCategory => setNewTxn({...newTxn, category: newTeamMemberCategory})}
                      onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Transaction Amount (₹)</label>
                  <input
                    type="number"
                    value={newTxn.amount}
                    onChange={(e) => setNewTxn({...newTxn, amount: parseFloat(e.target.value) || 0})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm font-mono text-right"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Voucher Description</label>
                  <textarea
                    placeholder="Provide audit reference comments..."
                    value={newTxn.description}
                    onChange={(e) => setNewTxn({...newTxn, description: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none min-h-[60px]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-4"
                >
                  Record Bookkeeping Voucher
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Accounts;

