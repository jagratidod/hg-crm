import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  Receipt, ShoppingCart, Tag, Plus, Trash2, 
  Landmark, Smartphone, Split, MessageSquare, Printer, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

const POSBilling = () => {
  const { inventory, goldRate, checkoutPOSSale } = useErpStore();
  const [cart, setCart] = useState([]);
  const [barcodeSearch, setBarcodeSearch] = useState('');
  
  // Payment checkout configurations
  const [payMethod, setPayMethod] = useState('UPI');
  const [cashReceived, setCashReceived] = useState('');
  const [goldExchangeWeight, setGoldExchangeWeight] = useState('0');
  const [goldExchangePurity, setGoldExchangePurity] = useState('0.916'); // default 22K exchange
  
  const [isReceiptOpen, setIsReceiptOpen] = useState(null);

  // Filter finished items ready for sales
  const sellableItems = useMemo(() => {
    return inventory.filter(i => i.category === 'Finished Goods');
  }, [inventory]);

  const handleBarcodeSearchSubmit = (e) => {
    e.preventDefault();
    if (!barcodeSearch) return;

    // Search barcode exact or prefix
    const found = sellableItems.find(item => 
      item.barcode.toLowerCase().includes(barcodeSearch.toLowerCase()) ||
      item.sku.toLowerCase().includes(barcodeSearch.toLowerCase())
    );

    if (found) {
      if (cart.find(i => i.id === found.id)) {
        toast.error('Item is already added to sales cart!');
      } else {
        setCart([...cart, found]);
        toast.success(`Added ${found.name} to cart!`);
      }
      setBarcodeSearch('');
    } else {
      toast.error('No finished jewellery matching barcode found');
    }
  };

  const handleAddToCartDirect = (item) => {
    if (cart.find(i => i.id === item.id)) {
      toast.error('Item already in cart');
      return;
    }
    setCart([...cart, item]);
    toast.success(`Added ${item.name}`);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculations
  const checkoutTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.finalPrice, 0);
    
    // Gold scrap exchange offset discount
    const exchangeFineWeight = parseFloat(goldExchangeWeight) * parseFloat(goldExchangePurity);
    const exchangeValue = Math.round(exchangeFineWeight * goldRate);
    
    const taxable = Math.max(0, subtotal - exchangeValue);
    const tax = Math.round(taxable * 0.03); // 3% GST
    const total = taxable + tax;

    return {
      subtotal,
      exchangeValue,
      taxable,
      tax,
      total
    };
  }, [cart, goldExchangeWeight, goldExchangePurity, goldRate]);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your billing cart is empty');
      return;
    }

    checkoutPOSSale(cart, { method: payMethod, total: checkoutTotals.total }, parseFloat(goldExchangeWeight), parseFloat(goldExchangePurity));
    
    // Open receipt layout
    setIsReceiptOpen({
      cart: [...cart],
      totals: { ...checkoutTotals },
      payment: payMethod,
      date: new Date().toISOString().split('T')[0],
      invoiceNo: `INV-2026-${Math.round(Math.random()*9000 + 1000)}`
    });

    setCart([]);
    setGoldExchangeWeight('0');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">POS Billing Desk</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Multi-checkout splits, metal exchange credits, and custom thermal invoicing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Barcode Scanner & Inventory selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Barcode Simulator input */}
          <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40">
            <h3 className="text-xs font-semibold text-[#C5B396] uppercase tracking-wider mb-3">Barcode / RFID Laser Scanner</h3>
            <form onSubmit={handleBarcodeSearchSubmit} className="flex gap-3">
              <input
                type="text"
                placeholder="Scan item barcode (e.g. BAR-FG001, BAR-FG002)..."
                value={barcodeSearch}
                onChange={(e) => setBarcodeSearch(e.target.value)}
                className="flex-1 bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs px-5 rounded-xl transition-all"
              >
                Scan Item
              </button>
            </form>
          </div>

          {/* Quick-add inventory grid */}
          <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40">
            <h3 className="text-sm font-semibold text-white border-b border-[#8E7A5A]/15 pb-2 mb-4">Finished Jewellery Showcases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {sellableItems.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl bg-black border border-[#8E7A5A]/10 hover:border-[#D4AF37]/35 transition-all flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-[#8E7A5A]/20" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">Barcode: {item.barcode}</div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-mono font-bold text-green-400">₹{item.finalPrice.toLocaleString()}</span>
                      <button
                        onClick={() => handleAddToCartDirect(item)}
                        className="p-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: POS Billing checkout Cart summary */}
        <div className="glass-panel p-6 rounded-2xl border border-[#D4AF37]/35 bg-[#0F0F0F] flex flex-col justify-between min-h-[580px] space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-[#8E7A5A]/15 pb-2 flex items-center gap-2">
              <ShoppingCart className="text-[#D4AF37]" size={18} /> Active Sales Cart ({cart.length})
            </h3>

            {/* Cart Stream */}
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
              {cart.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-black border border-[#8E7A5A]/10 flex justify-between items-center text-xs">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white truncate">{item.name}</div>
                    <div className="text-[9px] text-[#C5B396] font-mono">Valuation: ₹{item.finalPrice.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 p-1 shrink-0 ml-2"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-500 font-mono">Sales cart is empty. Scan barcodes to build invoices.</div>
              )}
            </div>

            {/* Gold Scrap Exchange Discounts Calculator */}
            <div className="p-3.5 rounded-xl bg-black border border-[#8E7A5A]/15 space-y-3">
              <span className="text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold block">Old Gold Scrap Exchange</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 block">Scrap Weight (g)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={goldExchangeWeight}
                    onChange={(e) => setGoldExchangeWeight(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/20 rounded-lg p-2 text-white font-mono text-right"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 block">Assayed Purity</label>
                  <select
                    value={goldExchangePurity}
                    onChange={(e) => setGoldExchangePurity(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/20 rounded-lg p-2 text-white font-mono"
                  >
                    <option value="0.999">24K (99.9%)</option>
                    <option value="0.916">22K (91.6%)</option>
                    <option value="0.750">18K (75.0%)</option>
                    <option value="0.585">14K (58.5%)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Settlement splits methods */}
            <div className="space-y-2">
              <span className="text-[10px] text-[#C5B396] uppercase tracking-wider font-semibold block">Settlement Split Method</span>
              <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold font-mono text-center">
                {['Cash', 'UPI', 'Split'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayMethod(method)}
                    className={`py-2 border rounded-lg transition-colors ${
                      payMethod === method 
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' 
                        : 'border-[#8E7A5A]/20 text-[#C5B396] hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 font-mono text-xs border-t border-[#8E7A5A]/15 pt-3">
              <div className="flex justify-between text-gray-500">
                <span>Showroom Subtotal:</span>
                <span className="text-white">₹{checkoutTotals.subtotal.toLocaleString()}</span>
              </div>
              {checkoutTotals.exchangeValue > 0 && (
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Gold Exchange Offset:</span>
                  <span>- ₹{checkoutTotals.exchangeValue.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Taxable Amount:</span>
                <span className="text-white">₹{checkoutTotals.taxable.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>GST (3%):</span>
                <span className="text-white">₹{checkoutTotals.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#D4AF37] font-bold text-sm border-t border-[#D4AF37]/25 pt-2">
                <span>Total Payable:</span>
                <span>₹{checkoutTotals.total.toLocaleString()}</span>
              </div>
            </div>

          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-6"
          >
            Authorize Payment & Print Invoice
          </button>

        </div>

      </div>

      {/* THERMAL PRINT RECEIPT LAYOUT */}
      {isReceiptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-[340px] bg-white text-black p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Close Print */}
            <button 
              onClick={() => setIsReceiptOpen(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold font-sans text-lg"
            >
              &times;
            </button>

            {/* Thermal Slip */}
            <div className="border border-dashed border-gray-400 p-4 font-mono text-[10px] space-y-4">
              
              <div className="text-center space-y-1 pb-3 border-b border-dashed border-gray-300">
                <h4 className="font-black text-sm uppercase">HG ENTERPRISES</h4>
                <p className="text-[8px] uppercase">Royal Showrooms & Manufacturing Hub</p>
                <p className="text-[8px]">Date: {isReceiptOpen.date} • {isReceiptOpen.invoiceNo}</p>
              </div>

              {/* Items List */}
              <div className="space-y-2 py-2 border-b border-dashed border-gray-300">
                {isReceiptOpen.cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate max-w-[180px]">{item.name}</span>
                    <span className="font-bold">₹{item.finalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1 py-1 border-b border-dashed border-gray-300 text-right">
                <div className="flex justify-between">
                  <span>Gross Sales:</span>
                  <span>₹{isReceiptOpen.totals.subtotal.toLocaleString()}</span>
                </div>
                {isReceiptOpen.totals.exchangeValue > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>Gold Exchange Credit:</span>
                    <span>-₹{isReceiptOpen.totals.exchangeValue.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxable:</span>
                  <span>₹{isReceiptOpen.totals.taxable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST+SGST (3%):</span>
                  <span>₹{isReceiptOpen.totals.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-dashed border-black pt-1">
                  <span>Grand Total:</span>
                  <span>₹{isReceiptOpen.totals.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center text-[8px] space-y-2 pt-2">
                <p>Settlement Method: <strong>{isReceiptOpen.payment}</strong></p>
                <p className="font-bold">THANK YOU FOR CHOOSING ROYAL ELEGANCE</p>
              </div>

              {/* WhatsApp invoice trigger */}
              <button 
                onClick={() => {
                  toast.success('Simulated Invoice dispatched to WhatsApp customer contact successfully!');
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2 mt-4 rounded-lg flex items-center justify-center gap-1.5 uppercase font-sans tracking-wide text-[9px] border-none"
              >
                <MessageSquare size={12} /> WhatsApp Receipt
              </button>

              <button 
                onClick={() => window.print()}
                className="w-full bg-black text-white hover:bg-gray-800 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 uppercase font-sans tracking-wide text-[9px] border-none"
              >
                <Printer size={12} /> Thermal Print
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default POSBilling;

