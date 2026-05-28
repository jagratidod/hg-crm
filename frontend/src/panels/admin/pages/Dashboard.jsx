import React, { useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Gem, TrendingUp, Cpu, Award, Zap, ShieldAlert, 
  Hourglass, ClipboardList, Layers, HardDrive, PackageCheck
} from 'lucide-react';

const Dashboard = () => {
  const { 
    goldRate, silverRate, diamondRate, rateDirection, 
    jobCards, inventory, users, lossLogs, refineryLogs, accountsLedger 
  } = useErpStore();

  // 1. Calculations for upper summary counters
  const counters = useMemo(() => {
    const activeJcs = jobCards.filter(jc => ['Assigned', 'In Progress', 'Rework'].includes(jc.status)).length;
    const pendingJcs = jobCards.filter(jc => jc.status === 'Pending').length;
    const pendingQc = jobCards.filter(jc => jc.status === 'QC Failed' || jc.currentDept === 'Quality Check (QC) Department').length;
    const pendingDispatch = jobCards.filter(jc => jc.status === 'Completed' && jc.currentDept === 'Packing Department').length;

    // Metal stock sums from inventory
    const goldTotal = inventory
      .filter(i => i.category === 'Gold' || i.category === 'Finished Goods')
      .reduce((sum, item) => sum + (item.fineWeight || item.netWeight || 0), 0);
    const silverTotal = inventory
      .filter(i => i.category === 'Silver')
      .reduce((sum, item) => sum + (item.fineWeight || item.netWeight || 0), 0);
    const diamondTotal = inventory
      .filter(i => i.category === 'Diamond')
      .reduce((sum, item) => sum + (item.diamondWeight || 0), 0);

    // Refinery average recovery rate
    const refineryAvgRecovery = refineryLogs.length > 0
      ? (refineryLogs.reduce((sum, log) => sum + (log.actualGoldRecovered / (log.expectedRecovery || 1)), 0) / refineryLogs.length) * 100
      : 99.4;

    return {
      activeJcs,
      pendingJcs,
      goldTotal: Math.round(goldTotal * 100) / 100,
      silverTotal: Math.round(silverTotal * 100) / 100,
      diamondTotal: Math.round(diamondTotal * 100) / 100,
      refineryAvgRecovery: Math.round(refineryAvgRecovery * 10) / 10,
      pendingQc,
      pendingDispatch
    };
  }, [jobCards, inventory, refineryLogs]);

  // 2. Production History Graph Mock data
  const productionHistoryData = [
    { name: 'May 17', casting: 4.2, polished: 3.8, losses: 0.15 },
    { name: 'May 18', casting: 5.8, polished: 4.2, losses: 0.22 },
    { name: 'May 19', casting: 7.1, polished: 5.5, losses: 0.19 },
    { name: 'May 20', casting: 6.4, polished: 6.0, losses: 0.31 },
    { name: 'May 21', casting: 8.5, polished: 6.8, losses: 0.25 },
    { name: 'May 22', casting: 9.2, polished: 7.4, losses: 0.40 },
    { name: 'May 23', casting: 11.0, polished: 8.9, losses: 0.34 }
  ];

  // 3. Department Bottlenecks Calculation
  const bottleneckData = useMemo(() => {
    const deptMap = {};
    jobCards.forEach(jc => {
      deptMap[jc.currentDept] = (deptMap[jc.currentDept] || 0) + 1;
    });
    return Object.keys(deptMap).map(name => ({
      name: name.replace(' Department', ''),
      'Active Jobs': deptMap[name]
    })).slice(0, 5);
  }, [jobCards]);

  // 4. Karigar Efficiency Rating radar/bar data
  const karigarData = [
    { subject: 'Filing Precision', Rajesh: 92, Mansoor: 80, Sunil: 85 },
    { subject: 'Casting Recovery', Rajesh: 98, Mansoor: 75, Sunil: 90 },
    { subject: 'Stone Calibration', Rajesh: 60, Mansoor: 98, Sunil: 70 },
    { subject: 'Wastage Margin', Rajesh: 88, Mansoor: 82, Sunil: 95 },
    { subject: 'Timely Handoffs', Rajesh: 85, Mansoor: 90, Sunil: 80 },
    { subject: 'QC Clear Rate', Rajesh: 90, Mansoor: 92, Sunil: 88 }
  ];

  // 5. General Revenue calculations
  const totalRevenue = useMemo(() => {
    return accountsLedger
      .filter(t => t.type === 'Credit')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [accountsLedger]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Enterprise Analytics</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Live Manufacturing & Operations Dashboard</p>
        </div>
        
        {/* Metal Live Rate Ticker */}
        <div className="flex gap-4 p-4 rounded-2xl glass-panel border border-[#D4AF37]/20 relative overflow-hidden bg-black/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 blur-[40px] rounded-full pointer-events-none z-0"></div>
          <div>
            <div className="text-[10px] text-[#C5B396] tracking-widest uppercase">Live Gold Rate (24K)</div>
            <div className="text-lg font-mono font-bold text-white flex items-baseline gap-1 mt-0.5">
              ₹{goldRate.toLocaleString()}
              <span className={`text-[10px] font-sans ${rateDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {rateDirection === 'up' ? '▲ 1.4%' : '▼ 0.8%'}
              </span>
            </div>
          </div>
          <div className="w-px bg-[#8E7A5A]/30"></div>
          <div>
            <div className="text-[10px] text-[#C5B396] tracking-widest uppercase">Silver Rate (999)</div>
            <div className="text-lg font-mono font-bold text-white flex items-baseline gap-1 mt-0.5">
              ₹{silverRate.toLocaleString()}
              <span className="text-[10px] text-green-500 font-sans">▲ 0.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CounterCard 
          icon={<ClipboardList className="text-[#D4AF37]" size={20} />} 
          title="Active Job Cards" 
          value={counters.activeJcs} 
          subText={`${counters.pendingJcs} Pending Queue`}
        />
        <CounterCard 
          icon={<Gem className="text-[#D4AF37]" size={20} />} 
          title="Fine Gold Stock" 
          value={`${(counters.goldTotal / 1000).toFixed(2)} kg`} 
          subText={`₹ ${(counters.goldTotal * goldRate).toLocaleString('en-IN', { maximumFractionDigits: 0 })} Value`}
        />
        <CounterCard 
          icon={<TrendingUp className="text-[#D4AF37]" size={20} />} 
          title="Diamond Stock" 
          value={`${counters.diamondTotal} cts`} 
          subText={`₹ ${(counters.diamondTotal * diamondRate).toLocaleString('en-IN', { maximumFractionDigits: 0 })} Value`}
        />
        <CounterCard 
          icon={<Cpu className="text-[#D4AF37]" size={20} />} 
          title="Refinery Recovery" 
          value={`${counters.refineryAvgRecovery}%`} 
          subText="Industry Standard: 99.2%"
        />
      </div>

      {/* Small Secondary Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniMetricCard label="Pending QC Reviews" value={counters.pendingQc} alert={counters.pendingQc > 2} />
        <MiniMetricCard label="Pending Dispatch Items" value={counters.pendingDispatch} />
        <MiniMetricCard label="Refined Silver Stock" value={`${(counters.silverTotal / 1000).toFixed(1)} kg`} />
        <MiniMetricCard label="Cumulative Sales Revenue" value={`₹ ${totalRevenue.toLocaleString()}`} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Production Graph (2 cols on large screen) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 flex flex-col bg-black/40">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-light text-white">Daily Production Output</h3>
              <p className="text-xs text-[#C5B396]">Casting volume vs polished yield (Fine gold kg)</p>
            </div>
            <span className="text-[10px] border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded-full font-mono uppercase">WEEKLY AUDIT</span>
          </div>

          <div className="h-80 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCasting" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPolished" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#666" style={{ fontSize: '10px' }} />
                <YAxis stroke="#666" style={{ fontSize: '10px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161616', border: '1px solid #D4AF37', borderRadius: '12px' }}
                  labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" style={{ fontSize: '12px', marginTop: '10px' }} />
                <Area name="Casting Cast" type="monotone" dataKey="casting" stroke="#D4AF37" fillOpacity={1} fill="url(#colorCasting)" />
                <Area name="Polished Gold" type="monotone" dataKey="polished" stroke="#FFFFFF" fillOpacity={1} fill="url(#colorPolished)" />
                <Area name="Metal Losses" type="monotone" dataKey="losses" stroke="#E74C3C" fill="none" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottlenecks Column */}
        <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 flex flex-col bg-black/40">
          <div>
            <h3 className="text-lg font-light text-white">Department Bottlenecks</h3>
            <p className="text-xs text-[#C5B396]">Active Job Card volume distribution</p>
          </div>

          <div className="h-72 w-full mt-6">
            {bottleneckData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bottleneckData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" stroke="#666" style={{ fontSize: '9px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '10px' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#161616', border: '1px solid #D4AF37', borderRadius: '12px' }} />
                  <Bar name="Active Job Cards" dataKey="Active Jobs" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-500">No active jobs in production pipeline</div>
            )}
          </div>
        </div>

      </div>

      {/* Karigar Efficiency & Recent Action Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Karigar Radar */}
        <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40">
          <div>
            <h3 className="text-lg font-light text-white">Karigar Performance Index</h3>
            <p className="text-xs text-[#C5B396]">Analytical breakdown of master craftsman skills</p>
          </div>

          <div className="h-80 w-full mt-6 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={karigarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#888" style={{ fontSize: '9px' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#444" style={{ fontSize: '9px' }} />
                <Radar name="Rajesh Karigar (Caster)" dataKey="Rajesh" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.25} />
                <Radar name="Mansoor Karigar (Setter)" dataKey="Mansoor" stroke="#FFFFFF" fill="#FFFFFF" fillOpacity={0.15} />
                <Legend iconType="circle" style={{ fontSize: '11px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#161616', border: '1px solid #D4AF37', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="glass-panel p-6 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-light text-white">System Activity Logs</h3>
              <p className="text-xs text-[#C5B396]">Real-time operational audit log</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          </div>

          <div className="space-y-4 max-h-[310px] overflow-y-auto pr-1 flex-1 scrollbar-thin">
            {accountsLedger.map((txn, index) => (
              <div key={txn.id + index} className="flex gap-4 items-start p-3.5 rounded-xl bg-black/40 border border-[#8E7A5A]/10 hover:border-[#D4AF37]/20 transition-all">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${txn.type === 'Credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {txn.type === 'Credit' ? <Zap size={14} /> : <ShieldAlert size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-white font-medium truncate">{txn.description}</span>
                    <span className="text-[10px] font-mono text-[#C5B396]">{txn.date}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1.5 text-[10px] text-[#C5B396]">
                    <span>Category: <strong>{txn.category}</strong></span>
                    <span className={`font-mono font-bold ${txn.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {txn.type === 'Credit' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

// Reusable Counter Card
const CounterCard = ({ icon, title, value, subText }) => (
  <div className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 flex gap-4 items-center relative overflow-hidden bg-black/30 group hover:border-[#D4AF37]/45 transition-colors">
    <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/15 text-[#D4AF37] shrink-0 group-hover:scale-105 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <div className="text-[10px] text-[#C5B396] tracking-widest uppercase">{title}</div>
      <div className="text-2xl font-light text-white mt-1 leading-none">{value}</div>
      <div className="text-[10px] text-gray-500 mt-2 font-medium">{subText}</div>
    </div>
  </div>
);

// Reusable Mini Metric Card
const MiniMetricCard = ({ label, value, alert }) => (
  <div className="glass-panel p-4 rounded-xl border border-[#8E7A5A]/10 bg-black/25 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
    <div className="text-[10px] text-[#C5B396] uppercase tracking-wider truncate">{label}</div>
    <div className={`text-lg font-mono font-bold mt-2 flex items-baseline gap-1 ${alert ? 'text-red-400 animate-pulse' : 'text-white'}`}>
      {value}
      {alert && <span className="text-[8px] bg-red-500/25 text-red-500 px-1 rounded uppercase">Check</span>}
    </div>
  </div>
);

export default Dashboard;

