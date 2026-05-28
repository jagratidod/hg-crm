import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  Users, Gift, Coins, PhoneCall, Mail, Calendar, 
  MessageSquare, Sparkles, Plus, Landmark, HandCoins 
} from 'lucide-react';
import toast from 'react-hot-toast';

const CRM = () => {
  const { customers, paySchemeInstallment } = useErpStore();
  const [selectedCustId, setSelectedCustId] = useState(customers[0].id);
  const [campaignText, setCampaignText] = useState('Exclusive Akshaya Tritiya Offer: Get 0% making charges on 22K gold bridal necklaces this week at HG Showrooms.');

  const selectedCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustId) || customers[0];
  }, [customers, selectedCustId]);

  const handlePayInstallment = (id) => {
    paySchemeInstallment(id);
  };

  const handleLaunchCampaign = (e) => {
    e.preventDefault();
    toast.success('Promotional Campaign dispatched to WhatsApp Customer contacts successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Jewellery Customer CRM</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Manage Suvarna Gold Savings schemes, loyalty accounts & campaigns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Customer Selector & Scheme installment payment */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-2 max-h-[580px] overflow-y-auto scrollbar-thin">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">Customer Accounts ({customers.length})</span>
          {customers.map((c) => {
            const isSelected = c.id === selectedCustId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCustId(c.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                  isSelected 
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15' 
                    : 'bg-black/40 border-[#8E7A5A]/15 text-[#C5B396] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold truncate max-w-[150px]">{c.name}</div>
                  <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-black' : 'text-gray-500'}`}>{c.mobile}</div>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-black text-[#D4AF37]' : 'bg-black/60 text-[#C5B396]'
                }`}>
                  {c.loyaltyPoints} pts
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Selected Customer scheme ledger & promotional compiler */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Suvarna Gold Scheme Ledger details */}
          <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
            <div className="flex justify-between items-start border-b border-[#8E7A5A]/15 pb-4">
              <div>
                <span className="text-[10px] text-[#C5B396] font-mono uppercase tracking-widest">{selectedCustomer.id}</span>
                <h3 className="text-lg font-light text-white mt-1">{selectedCustomer.name} Profile</h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] px-2 py-0.5 rounded uppercase font-bold">
                  {selectedCustomer.activeGoldScheme}
                </span>
              </div>
            </div>

            {/* Loyalty points counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/35 border border-[#8E7A5A]/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block">Suvarna Monthly Installment</span>
                  <strong className="text-base text-white font-mono mt-1 block">₹{selectedCustomer.schemeAmount.toLocaleString()}</strong>
                </div>
                <Coins className="text-[#D4AF37]" size={20} />
              </div>
              <div className="p-4 rounded-xl bg-black/35 border border-[#8E7A5A]/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block">Loyalty Balance</span>
                  <strong className="text-base text-white font-mono mt-1 block">{selectedCustomer.loyaltyPoints} Points</strong>
                </div>
                <Gift className="text-[#D4AF37]" size={20} />
              </div>
            </div>

            {/* Scheme progress tracker */}
            <div className="p-4 rounded-xl bg-black/35 border border-[#8E7A5A]/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-white">
                <span>Scheme Progress (12 Months Plan)</span>
                <span>{selectedCustomer.schemeInstallmentsPaid} / 12 Months Paid</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-[#161616] rounded-full h-2 relative overflow-hidden">
                <div 
                  className="bg-[#D4AF37] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(selectedCustomer.schemeInstallmentsPaid / 12) * 100}%` }}
                ></div>
              </div>

              {/* Installment checkboxes grids */}
              <div className="grid grid-cols-6 gap-2 pt-2 text-center text-[10px] font-mono font-bold">
                {Array.from({ length: 12 }).map((_, idx) => {
                  const isPaid = idx < selectedCustomer.schemeInstallmentsPaid;
                  return (
                    <div 
                      key={idx} 
                      className={`py-1.5 border rounded-lg ${
                        isPaid 
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#D4AF37]' 
                          : 'border-gray-800 text-gray-600'
                      }`}
                    >
                      M{idx + 1}
                    </div>
                  );
                })}
              </div>

              {selectedCustomer.schemeInstallmentsPaid < 12 && (
                <button
                  onClick={() => handlePayInstallment(selectedCustomer.id)}
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-3 rounded-xl transition-all uppercase tracking-wider mt-4 flex items-center justify-center gap-2"
                >
                  <HandCoins size={14} /> Pay Monthly Scheme Deposit (₹{selectedCustomer.schemeAmount.toLocaleString()})
                </button>
              )}
            </div>

            {/* Purchase History */}
            <div className="space-y-2">
              <span className="text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold">Purchase History Logs</span>
              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {selectedCustomer.purchaseHistory.map((pur) => (
                  <div key={pur.orderId} className="p-3 rounded-xl bg-black border border-[#8E7A5A]/10 flex justify-between items-center text-xs">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white">{pur.item}</div>
                      <div className="text-[9px] font-mono text-gray-500">{pur.orderId} • Date: {pur.date}</div>
                    </div>
                    <span className="font-mono font-bold text-[#D4AF37] shrink-0 ml-4">₹{pur.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CRM Campaign Launcher panel */}
          <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-[#8E7A5A]/15 pb-2">Launch Target Promotional WhatsApp Campaign</h3>
            <form onSubmit={handleLaunchCampaign} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Campaign Message Text</label>
                <textarea
                  value={campaignText}
                  onChange={(e) => setCampaignText(e.target.value)}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none min-h-[80px]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={14} /> Launch WhatsApp Broadcast
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CRM;

