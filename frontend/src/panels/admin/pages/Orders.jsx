import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  ClipboardCheck, Sparkles, Receipt, Calculator, 
  Landmark, CreditCard, ChevronRight, UserPlus 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Orders = () => {
  const { addJobCard, goldRate, customers } = useErpStore();
  const [selectedCustId, setSelectedCustId] = useState(customers[0].id);

  // Order state form
  const [orderForm, setOrderForm] = useState({
    productName: 'Imperial Ruby & Diamond Tiara',
    designNo: 'DES-TR-909',
    grossWeight: 85.50,
    stoneWeight: 12.40,
    diamondWeight: 4.80,
    purity: 0.916,
    karat: 22,
    makingCharges: 450,
    wastage: 5.0,
    deposit: 150000,
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    stones: 'Burmese Rubies: 12.4ct, Round Cut Diamonds: 4.8ct',
    notes: 'Premium heirloom tiara commission order'
  });

  const selectedCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustId) || customers[0];
  }, [customers, selectedCustId]);

  // Comprehensive metal calculations
  const calcs = useMemo(() => {
    const netWeight = Math.max(0, orderForm.grossWeight - orderForm.stoneWeight);
    const fineWeight = netWeight * orderForm.purity;
    
    // Gold metal valuation
    const goldValue = fineWeight * goldRate;
    
    // Add wastage multiplier
    const wastageWeight = netWeight * (orderForm.wastage / 100);
    const wastageValue = wastageWeight * goldRate;
    
    // Making charges
    const makingValue = orderForm.makingCharges * netWeight;
    
    // Gemstones & Diamonds cost estimation
    const gemsValue = (orderForm.stoneWeight * 5000) + (orderForm.diamondWeight * 65000);
    
    const subtotal = goldValue + wastageValue + makingValue + gemsValue;
    const gstValue = subtotal * 0.03; // Standard 3% GST on Gold Jewelry in India
    const finalPrice = subtotal + gstValue;
    const balanceDue = finalPrice - orderForm.deposit;

    return {
      netWeight: Math.round(netWeight * 100) / 100,
      fineWeight: Math.round(fineWeight * 100) / 100,
      goldValue: Math.round(goldValue),
      wastageWeight: Math.round(wastageWeight * 100) / 100,
      wastageValue: Math.round(wastageValue),
      makingValue: Math.round(makingValue),
      gemsValue: Math.round(gemsValue),
      subtotal: Math.round(subtotal),
      gstValue: Math.round(gstValue),
      finalPrice: Math.round(finalPrice),
      balanceDue: Math.round(balanceDue)
    };
  }, [orderForm, goldRate]);

  const handleCreateOrder = (e) => {
    e.preventDefault();
    
    // Generate simulated Manufacturing Order & Job Card
    addJobCard({
      designNo: orderForm.designNo,
      productName: `${selectedCustomer.name} - ${orderForm.productName}`,
      grossWeight: orderForm.grossWeight,
      netWeight: calcs.netWeight,
      stoneWeight: orderForm.stoneWeight,
      diamondWeight: orderForm.diamondWeight,
      stones: orderForm.stones,
      dueDate: orderForm.dueDate,
      priority: 'High',
      notes: `${orderForm.notes} | Customer: ${selectedCustomer.name}`
    });

    toast.success('Manufacturing order booked and Job Card created in queue!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Manufacturing Order Planner</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Book bespoke customer designs with automatic metal calculators</p>
      </div>

      <form onSubmit={handleCreateOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Form Fields */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-5">
          
          <h3 className="text-base font-semibold text-white border-b border-[#8E7A5A]/15 pb-2">Order & Customer Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Select CRM Customer</label>
              <select
                value={selectedCustId}
                onChange={(e) => setSelectedCustId(e.target.value)}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.mobile})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Product Name</label>
              <input
                type="text"
                value={orderForm.productName}
                onChange={(e) => setOrderForm({...orderForm, productName: e.target.value})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Design SKU Code</label>
              <input
                type="text"
                value={orderForm.designNo}
                onChange={(e) => setOrderForm({...orderForm, designNo: e.target.value})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Purity Rating (%)</label>
              <input
                type="number"
                step="0.001"
                max="1.0"
                value={orderForm.purity}
                onChange={(e) => setOrderForm({...orderForm, purity: parseFloat(e.target.value) || 0.916})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Target Due Date</label>
              <input
                type="date"
                value={orderForm.dueDate}
                onChange={(e) => setOrderForm({...orderForm, dueDate: e.target.value})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono"
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Gross Weight (g)</label>
              <input
                type="number"
                step="0.01"
                value={orderForm.grossWeight}
                onChange={(e) => setOrderForm({...orderForm, grossWeight: parseFloat(e.target.value) || 0})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono text-right"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Stone Weight (g)</label>
              <input
                type="number"
                step="0.01"
                value={orderForm.stoneWeight}
                onChange={(e) => setOrderForm({...orderForm, stoneWeight: parseFloat(e.target.value) || 0})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono text-right"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Diamonds (cts)</label>
              <input
                type="number"
                step="0.01"
                value={orderForm.diamondWeight}
                onChange={(e) => setOrderForm({...orderForm, diamondWeight: parseFloat(e.target.value) || 0})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono text-right"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Wastage %</label>
              <input
                type="number"
                step="0.1"
                value={orderForm.wastage}
                onChange={(e) => setOrderForm({...orderForm, wastage: parseFloat(e.target.value) || 0})}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono text-right"
              />
            </div>

          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Allocated Gems Specifications</label>
            <input
              type="text"
              placeholder="e.g. Natural Oval Emeralds: 6pcs 1.2ct, Solitaires: 2pcs 0.5ct"
              value={orderForm.stones}
              onChange={(e) => setOrderForm({...orderForm, stones: e.target.value})}
              className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
            />
          </div>

        </div>

        {/* Right Col: Metal Calculation Sheet & POS Deposit details */}
        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/35 bg-[#0F0F0F] flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-[#8E7A5A]/15 pb-2 flex items-center gap-1.5">
              <Calculator className="text-[#D4AF37]" size={18} /> Metal Valuation Sheet
            </h3>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-gray-500">
                <span>Net Gold Weight:</span>
                <span className="text-white">{calcs.netWeight} g</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Fine Metal Equiv:</span>
                <span className="text-[#D4AF37] font-bold">{calcs.fineWeight} g</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Gold Value:</span>
                <span className="text-white">₹{calcs.goldValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Wastage ({orderForm.wastage}%):</span>
                <span className="text-white">₹{calcs.wastageValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Labour Making Charges:</span>
                <span className="text-white">₹{calcs.makingValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Gems & Solitaires:</span>
                <span className="text-white">₹{calcs.gemsValue.toLocaleString()}</span>
              </div>
              <div className="h-px bg-[#8E7A5A]/20 my-2"></div>
              <div className="flex justify-between text-white font-bold">
                <span>Subtotal:</span>
                <span>₹{calcs.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>GST (3%):</span>
                <span>₹{calcs.gstValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#D4AF37] font-bold text-sm border-t border-[#D4AF37]/20 pt-2">
                <span>Gross Value:</span>
                <span>₹{calcs.finalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Layaway / Deposit issues */}
            <div className="space-y-2 pt-2 border-t border-[#8E7A5A]/15">
              <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider block">Bespoke Advanced Deposit</label>
              <div className="relative">
                <input
                  type="number"
                  value={orderForm.deposit}
                  onChange={(e) => setOrderForm({...orderForm, deposit: parseFloat(e.target.value) || 0})}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white font-mono text-right pr-12 outline-none text-xs"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5B396] text-[10px]">INR</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-red-400 mt-2 font-semibold">
                <span>Balance Due at Handoff:</span>
                <span>₹{calcs.balanceDue.toLocaleString()}</span>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-6"
          >
            Confirm & Issue Job Card
          </button>

        </div>

      </form>

    </div>
  );
};

export default Orders;

