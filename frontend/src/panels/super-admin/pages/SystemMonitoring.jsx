import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, CloudRain, Cpu } from 'lucide-react';

export default function SystemMonitoring() {
  const metrics = [
    { name: 'App Server Node 1', status: 'Online', cpu: '45%', mem: '2.4GB / 4GB', icon: Server, color: 'text-green-400' },
    { name: 'App Server Node 2', status: 'Online', cpu: '38%', mem: '2.1GB / 4GB', icon: Server, color: 'text-green-400' },
    { name: 'Main Database (PostgreSQL)', status: 'Online', cpu: '62%', mem: '12GB / 16GB', icon: Database, color: 'text-green-400' },
    { name: 'Redis Cache', status: 'Warning', cpu: '89%', mem: '1.9GB / 2GB', icon: Cpu, color: 'text-orange-400' },
    { name: 'Storage Cluster', status: 'Online', cpu: '12%', mem: '450GB / 1TB', icon: CloudRain, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Monitoring</h1>
        <p className="text-gray-400">Real-time health of infrastructure and services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((m, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={m.name}
            className="bg-[#1A1A1A] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-xl text-gray-300">
                  <m.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{m.name}</h3>
                  <span className={`text-xs font-medium flex items-center gap-1 ${m.color}`}>
                    <span className={`w-2 h-2 rounded-full ${m.status === 'Warning' ? 'bg-orange-400' : 'bg-green-400'}`}></span>
                    {m.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>CPU Usage</span>
                  <span>{m.cpu}</span>
                </div>
                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${parseInt(m.cpu) > 80 ? 'bg-orange-400' : 'bg-[#D4AF37]'}`} style={{ width: m.cpu }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Memory</span>
                  <span>{m.mem}</span>
                </div>
                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(parseFloat(m.mem) / parseFloat(m.mem.split('/')[1])) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
