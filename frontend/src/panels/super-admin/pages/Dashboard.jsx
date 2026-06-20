import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, CreditCard, Activity, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useSuperAdminStore from '../../../store/superAdminStore';

const data = [
  { name: 'Jan', revenue: 4000, tenants: 24 },
  { name: 'Feb', revenue: 3000, tenants: 28 },
  { name: 'Mar', revenue: 5000, tenants: 35 },
  { name: 'Apr', revenue: 7000, tenants: 42 },
  { name: 'May', revenue: 6000, tenants: 48 },
  { name: 'Jun', revenue: 9000, tenants: 55 },
];

export default function Dashboard() {
  const tenants = useSuperAdminStore(state => state.tenants);
  const users = useSuperAdminStore(state => state.users);
  const plans = useSuperAdminStore(state => state.plans);

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'Active').length;
  const totalUsers = users.length;
  const monthlyRevenue = tenants.reduce((acc, t) => {
    const plan = plans.find(p => p.name === t.plan);
    return acc + (plan ? plan.monthlyPrice : 0);
  }, 0);
  const pendingPayments = 2450;

  const stats = [
    { title: 'Total Tenants', value: totalTenants.toString(), change: '+12%', icon: Building2, trend: 'up' },
    { title: 'Total Users', value: totalUsers.toString(), change: '+5.4%', icon: Users, trend: 'up' },
    { title: 'Monthly Revenue', value: `$${monthlyRevenue}`, change: '+18.2%', icon: CreditCard, trend: 'up' },
    { title: 'Pending Payments', value: `$${pendingPayments}`, change: '-2.4%', icon: Clock, trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Dashboard</h1>
          <p className="text-gray-400">Overview of your SaaS performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5 text-[#D4AF37]">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
            <select className="bg-black/50 border border-white/10 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#D4AF37]">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0F0F', borderColor: '#D4AF3730', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">System Health</h2>
            <Activity className="w-5 h-5 text-[#D4AF37]" />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Server CPU Usage</span>
                <span className="text-white">42%</span>
              </div>
              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-[#D4AF37] rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Memory Usage</span>
                <span className="text-white">68%</span>
              </div>
              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="w-[68%] h-full bg-[#D4AF37] rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Database Storage</span>
                <span className="text-white">85%</span>
              </div>
              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-white font-medium">All systems operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
