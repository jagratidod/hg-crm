import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, Zap, LayoutTemplate, MessageSquare, PieChart, Megaphone, Bot } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

const icons = {
  LayoutTemplate,
  Zap,
  MessageSquare,
  PieChart,
  Megaphone,
  Bot
};

export default function FeatureManagement() {
  const { features, toggleFeature } = useSuperAdminStore();

  const handleToggle = (id, name) => {
    toggleFeature(id);
    const feature = features.find(f => f.id === id);
    if (!feature.enabled) {
      toast.success(`${name} Enabled Globally`);
    } else {
      toast(`${name} Disabled`, { icon: '⚠️' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Feature Management</h1>
          <p className="text-gray-400">Enable or disable system-wide modules and features.</p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-[#D4AF37]" />
          Global Toggles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = icons[feature.icon];
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={feature.id}
                className={`p-5 rounded-2xl border transition-all ${
                  feature.enabled ? 'border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37]/5 to-transparent' : 'border-white/10 bg-black/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${feature.enabled ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white/5 text-gray-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => handleToggle(feature.id, feature.name)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      feature.enabled ? 'bg-[#D4AF37]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      feature.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">{feature.name}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
