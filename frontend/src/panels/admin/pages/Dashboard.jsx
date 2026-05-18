import React from 'react';
import { Users, ClipboardList, Wrench, PackageSearch, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Dashboard</h1>
         <button className="bg-hg-accent text-black px-4 py-2 rounded-lg font-medium shadow-lg shadow-hg-accent/20">Generate Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard title="Total Customers" value="1,248" trend="+12%" icon={Users} color="text-hg-gold-light" />
         <StatCard title="Active Services" value="45" trend="+5%" icon={ClipboardList} color="text-hg-accent" />
         <StatCard title="Tools In Use" value="18" trend="-2%" icon={Wrench} color="text-hg-success" />
         <StatCard title="Low Stock Items" value="4" trend="+1%" icon={PackageSearch} color="text-hg-danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-hg-dark-gold/50">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-medium text-hg-cream">Revenue Overview</h2>
             <select className="bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg px-3 py-1 text-sm outline-none focus:border-hg-accent text-hg-gold-beige">
               <option>This Month</option>
               <option>Last Month</option>
             </select>
           </div>
           {/* Mock Chart Area */}
           <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-hg-dark-gold/30 relative">
              <div className="absolute left-0 bottom-4 w-full border-t border-hg-dark-gold/20 border-dashed"></div>
              <div className="absolute left-0 bottom-32 w-full border-t border-hg-dark-gold/20 border-dashed"></div>
              
              <div className="w-12 bg-hg-gold-beige/20 h-[40%] rounded-t-sm z-10 hover:bg-hg-accent transition-colors relative group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 text-hg-accent">12k</div>
              </div>
              <div className="w-12 bg-hg-gold-beige/20 h-[60%] rounded-t-sm z-10 hover:bg-hg-accent transition-colors relative group"></div>
              <div className="w-12 bg-hg-gold-beige/20 h-[45%] rounded-t-sm z-10 hover:bg-hg-accent transition-colors relative group"></div>
              <div className="w-12 bg-hg-gold-beige/20 h-[80%] rounded-t-sm z-10 hover:bg-hg-accent transition-colors relative group"></div>
              <div className="w-12 bg-hg-accent h-[95%] rounded-t-sm z-10 relative group shadow-[0_0_15px_rgba(201,168,76,0.3)]"></div>
              <div className="w-12 bg-hg-gold-beige/20 h-[50%] rounded-t-sm z-10 hover:bg-hg-accent transition-colors relative group"></div>
           </div>
           <div className="flex justify-between px-4 mt-2 text-xs text-hg-gold-beige">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
           </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/50">
           <h2 className="text-xl font-medium text-hg-cream mb-6">Recent Activities</h2>
           <div className="space-y-6">
             <ActivityItem text="New repair request #REQ-092" time="10 mins ago" status="pending" />
             <ActivityItem text="Tool 'Polisher A' issued to Amit" time="1 hour ago" status="action" />
             <ActivityItem text="Service #REQ-088 completed" time="2 hours ago" status="success" />
             <ActivityItem text="Low stock alert: Cleaning Solution" time="5 hours ago" status="alert" />
             <ActivityItem text="New customer registered" time="1 day ago" status="normal" />
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
  <div className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/50 flex items-start justify-between group hover:border-hg-accent/50 transition-colors">
    <div>
      <div className="text-hg-gold-beige text-sm mb-2">{title}</div>
      <div className="text-3xl font-light text-white mb-2">{value}</div>
      <div className={`text-xs flex items-center gap-1 ${trend.startsWith('+') ? 'text-hg-success' : 'text-hg-danger'}`}>
        <TrendingUp size={12} className={trend.startsWith('-') ? 'rotate-180' : ''} />
        {trend} from last month
      </div>
    </div>
    <div className={`w-12 h-12 rounded-xl bg-[#2A2621] flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={24} strokeWidth={1.5} />
    </div>
  </div>
);

const ActivityItem = ({ text, time, status }) => {
  let indicator = "bg-hg-gold-beige";
  if (status === 'success') indicator = "bg-hg-success";
  if (status === 'alert') indicator = "bg-hg-danger";
  if (status === 'pending') indicator = "bg-hg-accent animate-pulse";
  if (status === 'action') indicator = "bg-hg-gold-light";

  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1.5 w-2 h-2 rounded-full shrink-0 relative">
         <div className={`absolute inset-0 rounded-full ${indicator}`}></div>
         {status === 'pending' && <div className="absolute inset-0 rounded-full bg-hg-accent animate-ping opacity-50"></div>}
      </div>
      <div>
        <p className="text-sm text-hg-cream">{text}</p>
        <p className="text-xs text-hg-gold-beige mt-1">{time}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
