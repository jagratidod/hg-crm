import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { Package, ShieldAlert, Award, FileText, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Dispatch = () => {
  const { jobCards, updateJobCardStatus } = useErpStore();
  const [selectedJcId, setSelectedJcId] = useState(null);
  
  // Packing form state
  const [boxSize, setBoxSize] = useState('Premium Velvet Box');
  const [courierName, setCourierName] = useState('Royal Safe Express');
  const [trackingNo, setTrackingNo] = useState('');
  const [shippingLabelOpen, setShippingLabelOpen] = useState(null);

  // Dispatch queue includes Hallmarked or Completed job cards ready for packing
  const dispatchQueue = useMemo(() => {
    return jobCards.filter(jc => 
      (jc.status === 'Hallmarked' || jc.status === 'Completed' || jc.currentDept === 'Packing Department') &&
      jc.status !== 'Packed' && jc.status !== 'Dispatched'
    );
  }, [jobCards]);

  const selectedJc = useMemo(() => {
    return jobCards.find(j => j.id === selectedJcId) || (dispatchQueue.length > 0 ? dispatchQueue[0] : null);
  }, [jobCards, selectedJcId, dispatchQueue]);

  const handleGenerateLabel = () => {
    if (!selectedJc) return;
    const generatedTracking = `TRK-${Math.random().toString().substring(2, 10).toUpperCase()}`;
    setTrackingNo(generatedTracking);
    toast.success('Secure Shipping Courier tracking ID generated!');
  };

  const handleShipment = (e) => {
    e.preventDefault();
    if (!selectedJc || !trackingNo) {
      toast.error('Generate the shipment tracking ID first');
      return;
    }

    updateJobCardStatus(selectedJc.id, 'Dispatched');
    setShippingLabelOpen({
      jcId: selectedJc.id,
      productName: selectedJc.productName,
      designNo: selectedJc.designNo,
      weight: selectedJc.grossWeight,
      box: boxSize,
      carrier: courierName,
      tracking: trackingNo,
      date: new Date().toISOString().split('T')[0]
    });
    
    setSelectedJcId(null);
    setTrackingNo('');
    toast.success(`Shipment Dispatched! Courier booked with tracking ID: ${trackingNo}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-white tracking-wide">Packing & Dispatch</h1>
        <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Book secure courier logistics, select velvet cases, and trigger shipping tags</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Dispatch queue */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-2 max-h-[580px] overflow-y-auto scrollbar-thin">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">Shipping Queue ({dispatchQueue.length})</span>
          {dispatchQueue.map((c) => {
            const isSelected = selectedJc && c.id === selectedJc.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedJcId(c.id);
                  setTrackingNo('');
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                  isSelected 
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15' 
                    : 'bg-black/40 border-[#8E7A5A]/15 text-[#C5B396] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold truncate max-w-[150px]">{c.productName}</div>
                  <div className={`text-[9px] font-mono mt-1 ${isSelected ? 'text-black/85' : 'text-gray-500'}`}>{c.id} • Wt: {c.grossWeight.toFixed(2)}g</div>
                </div>
                <span className="text-[8px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded uppercase font-bold shrink-0">READY</span>
              </button>
            );
          })}

          {dispatchQueue.length === 0 && (
            <div className="text-center text-xs text-gray-500 py-10">Shipping Queue is clean. No jobs pending packing.</div>
          )}
        </div>

        {/* Right Side: Shipping Form details */}
        {selectedJc ? (
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 space-y-6">
            
            <div className="flex justify-between items-start border-b border-[#8E7A5A]/15 pb-4">
              <div>
                <span className="text-[10px] text-[#C5B396] font-mono uppercase tracking-widest">{selectedJc.id}</span>
                <h3 className="text-lg font-light text-white mt-1">{selectedJc.productName}</h3>
                <span className="text-[9px] text-gray-500 font-mono mt-1 block">Weight verified: {selectedJc.grossWeight.toFixed(2)} g</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded uppercase font-bold">Hallmark Done</span>
                <p className="text-[9px] text-gray-500 mt-1 font-mono">HUID Checked</p>
              </div>
            </div>

            {/* Packaging form details */}
            <form onSubmit={handleShipment} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Luxury Packaging Case</label>
                  <select
                    value={boxSize}
                    onChange={(e) => setBoxSize(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                  >
                    <option value="Premium Velvet Box">Premium Velvet Box</option>
                    <option value="Royal Leatherette Case">Royal Leatherette Case</option>
                    <option value="Standard Showroom Packing">Standard Showroom Packing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Secured Armored Carrier</label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                  >
                    <option value="Royal Safe Express">Royal Safe Express (Armored)</option>
                    <option value="Blue Dart Security Cargo">Blue Dart Security Cargo</option>
                    <option value="DHL Luxury Logistics">DHL Luxury Logistics</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider block">Logistics Courier Tracking Number</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><Truck size={16} /></span>
                    <input
                      type="text"
                      placeholder="e.g. TRK-98012A"
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value.toUpperCase())}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 pl-11 pr-4 text-white font-mono text-xs outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateLabel}
                    className="bg-[#161616] border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold text-xs px-5 rounded-xl transition-all"
                  >
                    Generate Tracking ID
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-1.5 mt-4"
              >
                <Package size={14} /> Pack Item & Authorize Shipping Handoff
              </button>
            </form>

          </div>
        ) : (
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-8 glass-panel border border-[#8E7A5A]/20 bg-black/40">
            <Package className="text-gray-600 mb-2" size={36} />
            <p className="text-sm text-gray-500 font-medium">Logistics dispatch desk is clean</p>
            <p className="text-xs text-gray-700 mt-1">Select an active hallmark-passed item in the left queue to pack and dispatch shipments.</p>
          </div>
        )}

      </div>

      {/* DISPATCH SHIPPING LABEL PRINT VIEW */}
      {shippingLabelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-[380px] bg-white text-black p-6 rounded-2xl shadow-2xl">
            
            {/* Close Print */}
            <button 
              onClick={() => setShippingLabelOpen(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold font-sans text-lg"
            >
              &times;
            </button>

            {/* Tag block */}
            <div className="border-4 border-black p-4 font-mono text-[10px] space-y-4">
              <div className="text-center pb-2 border-b border-black">
                <span className="text-xs font-black block tracking-tighter">SECURE HIGH-VALUE LOGISTICS</span>
                <span className="text-[8px] tracking-widest text-gray-500 block">HG ENTERPRISES VAULT SHIPMENT</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>JOB REFERENCE: <strong>{shippingLabelOpen.jcId}</strong></div>
                <div>DESIGN SKU: <strong>{shippingLabelOpen.designNo}</strong></div>
                <div>SECURE CASE: <strong>{shippingLabelOpen.box}</strong></div>
                <div>SHIPMENT WEIGHT: <strong>{shippingLabelOpen.weight.toFixed(2)} g</strong></div>
                <div>CARRIER BOOKED: <strong>{shippingLabelOpen.carrier}</strong></div>
              </div>

              {/* Carrier barcode bars */}
              <div className="flex flex-col items-center py-2 bg-gray-100 border border-black rounded">
                <div className="flex gap-[2px] items-stretch h-8 w-48 bg-black p-0.5">
                  <div className="bg-white w-[2px]"></div><div className="bg-white w-[3px]"></div>
                  <div className="bg-white w-[1px]"></div><div className="bg-white w-[4px]"></div>
                  <div className="bg-white w-[2px]"></div><div className="bg-white w-[2px]"></div>
                  <div className="bg-white w-[3px]"></div><div className="bg-white w-[1px]"></div>
                </div>
                <span className="text-[8px] font-bold mt-1">TRACKING: {shippingLabelOpen.tracking}</span>
              </div>

              <div className="text-center text-[8px] border-t border-black pt-2 text-gray-500">
                DATE BOOKED: {shippingLabelOpen.date} • DO NOT DEPOSIT IN PUBLIC DROPBOXES
              </div>

              <button 
                onClick={() => window.print()}
                className="w-full bg-black text-white hover:bg-gray-800 font-bold py-2 rounded-lg text-[9px] uppercase tracking-wider font-sans border-none"
              >
                Print Shipping Tag
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dispatch;

