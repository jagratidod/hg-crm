import React, { useState } from 'react';
import useErpStore, { BRANCHES, ROLES } from '../../../store/erpStore';
import { 
  Building, User, Shield, Bell, Coins, Settings, Save, 
  MapPin, CheckCircle2, Sliders, ToggleLeft, ToggleRight, Sparkles,
  AlertCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const { 
    goldRate, silverRate, branch, switchBranch, notifications, addNotification 
  } = useErpStore();

  // Tab State
  const [activeTab, setActiveTab] = useState('Company Profile');

  // Company Profile form states
  const [companyDetails, setCompanyDetails] = useState({
    name: 'HG Enterprises Private Limited',
    gst: '27AADCH1234E1Z9',
    pan: 'AADCH1234E',
    address: '12th Floor, Diamond Enclave, BKC, Mumbai, Maharashtra - 400051',
    website: 'www.hg-enterprises.com',
    supportMail: 'support@hg-enterprises.com'
  });

  // Base metal prices override states
  const [customGold, setCustomGold] = useState(goldRate);
  const [customSilver, setCustomSilver] = useState(silverRate);
  const [livePricesSimulated, setLivePricesSimulated] = useState(true);

  // App Toggles
  const [appToggles, setAppToggles] = useState({
    autoAssign: true,
    otpRequirement: true,
    huidEnforce: true,
    auditLogsEnabled: true
  });

  // Save Settings handler
  const handleSaveCompany = (e) => {
    e.preventDefault();
    toast.success('Company profile updated successfully!', {
      style: {
        background: '#0F0F0F',
        color: '#FFFFFF',
        border: '1px solid #D4AF37',
      }
    });
    addNotification('System Settings Updated', 'General company profile parameters updated.', 'success');
  };

  // Metal Price Override handler
  const handleOverridePrices = (e) => {
    e.preventDefault();
    
    // Dynamically update Zustand store state values in real-time!
    useErpStore.setState({
      goldRate: parseFloat(customGold) || 7520,
      silverRate: parseFloat(customSilver) || 85.50
    });

    toast.success(`Base metal rates override success! Gold: ₹${customGold}/g`, {
      icon: '💰',
      style: {
        background: '#0F0F0F',
        color: '#D4AF37',
        border: '1px solid #D4AF37',
      }
    });

    addNotification(
      'Metal Rates Manually Overridden',
      `Gold: ₹${customGold}/g, Silver: ₹${customSilver}/g base price locked in ERP.`,
      'info'
    );
  };

  const toggleSwitch = (key) => {
    setAppToggles(prev => {
      const next = { ...prev, [key]: !prev[key] };
      toast.success(`${key.replace(/([A-Z])/g, ' $1')} toggled ${next[key] ? 'ON' : 'OFF'}`);
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#8E7A5A]/10 pb-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">System Settings</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Configure company profiles, metal rates, and authorization boundaries</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] border border-[#D4AF37]/35 text-[#D4AF37] px-3.5 py-1.5 rounded-full font-mono uppercase bg-black/40">
            Active Office: {branch}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Settings Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2 text-left">
          <span className="text-[10px] text-[#C5B396] tracking-wider font-semibold uppercase block mb-3 pl-1">Configuration Panels</span>
          {[
            { name: 'Company Profile', icon: Building },
            { name: 'Metal Pricing Control', icon: Coins },
            { name: 'Workflow Settings', icon: Sliders },
            { name: 'Roles & Security', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full text-left py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-3 border ${
                  isActive 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15' 
                    : 'text-[#C5B396] border-[#8E7A5A]/15 bg-black/20 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Workspace */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 text-left min-h-[480px]">
          
          {/* TAB 1: Company Profile settings */}
          {activeTab === 'Company Profile' && (
            <div className="space-y-6">
              <div className="border-b border-[#8E7A5A]/15 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-white">Company Information</h3>
                  <p className="text-[10px] text-gray-500">Corporate tax registries and registered manufacturing address</p>
                </div>
                <Building className="text-[#D4AF37]" size={20} />
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Registered Company Name</label>
                    <input
                      type="text"
                      value={companyDetails.name}
                      onChange={(e) => setCompanyDetails({...companyDetails, name: e.target.value})}
                      className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Corporate GSTIN</label>
                    <input
                      type="text"
                      value={companyDetails.gst}
                      onChange={(e) => setCompanyDetails({...companyDetails, gst: e.target.value})}
                      className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Company PAN Ref</label>
                    <input
                      type="text"
                      value={companyDetails.pan}
                      onChange={(e) => setCompanyDetails({...companyDetails, pan: e.target.value})}
                      className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Corporate Website</label>
                    <input
                      type="text"
                      value={companyDetails.website}
                      onChange={(e) => setCompanyDetails({...companyDetails, website: e.target.value})}
                      className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Registered Address</label>
                  <textarea
                    rows="3"
                    value={companyDetails.address}
                    onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
                    className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-xs outline-none"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-[#8E7A5A]/15 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-bold text-xs py-3 px-6 rounded-xl transition-all shadow flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <Save size={14} /> Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Metal Pricing Control */}
          {activeTab === 'Metal Pricing Control' && (
            <div className="space-y-6">
              <div className="border-b border-[#8E7A5A]/15 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-white">Metal Base Pricing Control</h3>
                  <p className="text-[10px] text-gray-500">Override base gold/silver rates dynamically in the global ERP database</p>
                </div>
                <Coins className="text-[#D4AF37]" size={20} />
              </div>

              <form onSubmit={handleOverridePrices} className="space-y-6">
                
                {/* Simulated Tickers Toggle */}
                <div className="flex items-center justify-between p-4 bg-black/40 border border-[#8E7A5A]/15 rounded-xl">
                  <div>
                    <span className="font-semibold text-white block text-xs uppercase tracking-wider">Live Prices Simulation Feed</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">Fluctuates market rates automatically every 5 seconds</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLivePricesSimulated(!livePricesSimulated);
                      toast.success(`Live price ticks simulation toggled ${!livePricesSimulated ? 'ON' : 'OFF'}`);
                    }}
                    className="text-[#D4AF37]"
                  >
                    {livePricesSimulated ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-gray-500" />}
                  </button>
                </div>

                {/* Price Entry Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Gold price entry */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider block">Gold Rate 24K (₹ per gram)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={customGold}
                        onChange={(e) => setCustomGold(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 pl-8 pr-4 text-white text-sm outline-none font-mono text-right"
                        required
                      />
                    </div>
                    <span className="text-[9px] text-gray-500 block">Current Database Rate: <strong>₹{goldRate.toLocaleString()}/g</strong></span>
                  </div>

                  {/* Silver price entry */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider block">Silver Rate 999 (₹ per gram)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={customSilver}
                        onChange={(e) => setCustomSilver(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#121212] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 pl-8 pr-4 text-white text-sm outline-none font-mono text-right"
                        required
                      />
                    </div>
                    <span className="text-[9px] text-gray-500 block">Current Database Rate: <strong>₹{silverRate.toLocaleString()}/g</strong></span>
                  </div>

                </div>

                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-xl text-xs text-[#C5B396] leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="text-[#D4AF37] shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-white block">Real-time Pricing Cascades</strong>
                    <span className="text-[10px] mt-0.5 block">Saving these overrides will instantly update your Active Inventory Valuations, Bespoke Customer Quotations, and top-right navigation pricing boards!</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#8E7A5A]/15 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-bold text-xs py-3 px-6 rounded-xl transition-all shadow flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <Save size={14} /> Override Prices Now
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 3: Workflow Settings */}
          {activeTab === 'Workflow Settings' && (
            <div className="space-y-6">
              <div className="border-b border-[#8E7A5A]/15 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-white">Application Workflows</h3>
                  <p className="text-[10px] text-gray-500">Configure floor automations, security protocols, and auditing tolerances</p>
                </div>
                <Sliders className="text-[#D4AF37]" size={20} />
              </div>

              <div className="space-y-4">
                
                {/* Auto Assign Jobs */}
                <div className="flex items-center justify-between p-4 bg-black/35 border border-[#8E7A5A]/10 rounded-xl hover:border-[#D4AF37]/20 transition-all">
                  <div>
                    <span className="font-semibold text-white block text-xs uppercase tracking-wider">Auto-Assign Job Cards</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">Automatically routes newly created Job Cards to available department Karigars.</span>
                  </div>
                  <button onClick={() => toggleSwitch('autoAssign')} className="text-[#D4AF37]">
                    {appToggles.autoAssign ? <ToggleRight size={34} /> : <ToggleLeft size={34} className="text-gray-600" />}
                  </button>
                </div>

                {/* Require OTP */}
                <div className="flex items-center justify-between p-4 bg-black/35 border border-[#8E7A5A]/10 rounded-xl hover:border-[#D4AF37]/20 transition-all">
                  <div>
                    <span className="font-semibold text-white block text-xs uppercase tracking-wider">Require OTP Verification for Layaways</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">Forces cashiers to enter customer OTP code (1234) before saving custom orders.</span>
                  </div>
                  <button onClick={() => toggleSwitch('otpRequirement')} className="text-[#D4AF37]">
                    {appToggles.otpRequirement ? <ToggleRight size={34} /> : <ToggleLeft size={34} className="text-gray-600" />}
                  </button>
                </div>

                {/* Hallmark Enforcement */}
                <div className="flex items-center justify-between p-4 bg-black/35 border border-[#8E7A5A]/10 rounded-xl hover:border-[#D4AF37]/20 transition-all">
                  <div>
                    <span className="font-semibold text-white block text-xs uppercase tracking-wider">Enforce HUID Hallmark Registration</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">Prevents packaging and shipping items that do not possess a registered Hallmark laser HUID code.</span>
                  </div>
                  <button onClick={() => toggleSwitch('huidEnforce')} className="text-[#D4AF37]">
                    {appToggles.huidEnforce ? <ToggleRight size={34} /> : <ToggleLeft size={34} className="text-gray-600" />}
                  </button>
                </div>

                {/* Audit Logs */}
                <div className="flex items-center justify-between p-4 bg-black/35 border border-[#8E7A5A]/10 rounded-xl hover:border-[#D4AF37]/20 transition-all">
                  <div>
                    <span className="font-semibold text-white block text-xs uppercase tracking-wider">Write Real-Time Transaction logs</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">Generates automated audit journals in P&L cashbooks for all manufacturing scrap adjustments.</span>
                  </div>
                  <button onClick={() => toggleSwitch('auditLogsEnabled')} className="text-[#D4AF37]">
                    {appToggles.auditLogsEnabled ? <ToggleRight size={34} /> : <ToggleLeft size={34} className="text-gray-600" />}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Roles & Security */}
          {activeTab === 'Roles & Security' && (
            <div className="space-y-6">
              <div className="border-b border-[#8E7A5A]/15 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-white">Roles & Permissions Matrix</h3>
                  <p className="text-[10px] text-gray-500">Inspect active security parameters assigned to each employee group</p>
                </div>
                <Shield className="text-[#D4AF37]" size={20} />
              </div>

              {/* Roles matrix info list */}
              <div className="space-y-4">
                <span className="text-[9px] text-[#C5B396] uppercase tracking-wider block font-bold">Standard Role Matrix Status:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { role: 'Super Admin', desc: 'Full core database access & metal rate overrides overrides', active: true },
                    { role: 'Production Manager', desc: 'Authorise department route changes & log scrap overrides', active: true },
                    { role: 'Department Manager', desc: 'Floor queue schedules & shift worklogs registers', active: true },
                    { role: 'QC Staff', desc: 'Prongs checklists parameters & pass/rework loops gates', active: true },
                    { role: 'Inventory Manager', desc: 'Bullion vault controls & RFID scanner verification', active: true },
                    { role: 'Accountant', desc: 'Double-entry general vouchers posting & balance sheets sheets', active: true }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-[#8E7A5A]/15 hover:border-[#D4AF37]/25 transition-all text-left flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={12} />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-white block">{item.role}</strong>
                        <span className="text-[10px] text-gray-500 mt-1 block leading-normal">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminSettings;
