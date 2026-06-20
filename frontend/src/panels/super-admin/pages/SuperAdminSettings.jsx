import React, { useState } from 'react';
import { Shield, Key, Bell, Database, Globe, Server, Save, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SuperAdminSettings() {
  const [activeTab, setActiveTab] = useState('security');

  const tabs = [
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'database', label: 'Database Config', icon: Database },
    { id: 'api', label: 'API & Integrations', icon: Globe },
    { id: 'notifications', label: 'Alerts', icon: Bell },
  ];

  const handleSave = () => {
    toast.success('Settings saved securely.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">System Settings</h1>
          <p className="text-sm text-gray-400 mt-1">Manage core platform configurations and security</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#AA8A2A] text-black px-4 py-2 rounded-lg font-semibold transition-colors">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-[#161616] border border-[#D4AF37]/20 rounded-2xl p-6 shadow-xl">
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <Lock size={20} className="text-[#D4AF37]" /> Root Authentication
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Require 2FA for Super Admins</label>
                      <select className="w-full bg-black border border-gray-800 rounded-lg py-2.5 px-4 text-white outline-none focus:border-[#D4AF37]">
                        <option>Always Require</option>
                        <option>Optional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Session Timeout (Minutes)</label>
                      <input type="number" defaultValue={30} className="w-full bg-black border border-gray-800 rounded-lg py-2.5 px-4 text-white outline-none focus:border-[#D4AF37]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <Server size={20} className="text-[#D4AF37]" /> Database Clusters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Active Cluster URI</label>
                      <input type="password" defaultValue="mongodb+srv://admin:*******@cluster.mongodb.net" className="w-full bg-black border border-gray-800 rounded-lg py-2.5 px-4 text-white outline-none focus:border-[#D4AF37] font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Daily Backup Time (UTC)</label>
                      <input type="time" defaultValue="02:00" className="w-full bg-black border border-gray-800 rounded-lg py-2.5 px-4 text-white outline-none focus:border-[#D4AF37]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {(activeTab === 'api' || activeTab === 'notifications') && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                  <Key size={32} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Module Under Construction</h3>
                <p className="text-sm text-gray-400 max-w-sm">This settings module is currently being upgraded for enhanced security.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
