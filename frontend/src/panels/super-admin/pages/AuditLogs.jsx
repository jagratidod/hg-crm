import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';

export default function AuditLogs() {
  const { logs } = useSuperAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">System Audit Logs</h1>
          <p className="text-gray-400">Track all system events and user actions.</p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-black/40 text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8">No logs available</td></tr>
            ) : logs.map((log, idx) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={log.id} 
                className="hover:bg-white/5"
              >
                <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {log.time}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warning' ? 'text-orange-400' : 'text-white'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4">{log.tenant}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-500">{log.ip}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
