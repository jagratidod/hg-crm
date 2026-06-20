import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

export default function Subscription() {
  const { plans, customPlans, tenants } = useSuperAdminStore();
  
  // Mocking the currently logged in tenant to Acme Corp (T-1001) for demo purposes
  const currentTenantId = 'T-1001'; 
  const currentTenant = tenants.find(t => t.id === currentTenantId);
  
  // Determine the current plan object
  let activePlan = null;
  if (currentTenant?.plan === 'Custom') {
    activePlan = customPlans.find(cp => cp.tenantId === currentTenantId);
  } else {
    activePlan = plans.find(p => p.name === currentTenant?.plan);
  }

  const handleUpgrade = (planName) => {
    toast.success(`Request sent to upgrade to ${planName}. Our sales team will contact you soon!`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">My Subscription</h1>
        <p className="text-gray-400">Manage your current plan and explore available upgrades.</p>
      </div>

      {/* CURRENT PLAN BANNER */}
      {activePlan && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#D4AF37]/20 to-black border border-[#D4AF37]/40 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-[#D4AF37]/20 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-1">Current Active Plan</p>
              <h2 className="text-3xl font-black text-white">{activePlan.name} {currentTenant?.plan === 'Custom' ? '(Bespoke)' : ''}</h2>
              <div className="flex gap-4 mt-2 text-sm text-gray-300">
                <span>Max Users: <strong className="text-white">{activePlan.maxUsers}</strong></span>
                <span>Storage: <strong className="text-white">{activePlan.maxStorage}</strong></span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">Billing Cycle</p>
            <p className="text-xl font-bold text-white">${activePlan.monthlyPrice} / month</p>
            <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-lg uppercase tracking-wider">
              Active
            </span>
          </div>
        </motion.div>
      )}

      {/* AVAILABLE PLANS */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const isCurrent = currentTenant?.plan === plan.name && currentTenant?.plan !== 'Custom';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={plan.id}
                className={`relative bg-[#1A1A1A] rounded-3xl border flex flex-col ${
                  plan.popular ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-white/10'
                } ${isCurrent ? 'ring-2 ring-white/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-extrabold text-white">${plan.monthlyPrice}</span>
                    <span className="text-gray-400 text-sm mb-1">/mo</span>
                  </div>
                  <p className="text-sm text-gray-400">or ${plan.yearlyPrice} / year</p>
                  
                  {isCurrent ? (
                    <button disabled className="w-full mt-6 py-2.5 rounded-xl font-semibold bg-white/10 text-white cursor-not-allowed">
                      Current Plan
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleUpgrade(plan.name)} 
                      className={`w-full mt-6 py-2.5 rounded-xl font-semibold transition-colors ${
                        plan.popular 
                          ? 'bg-[#D4AF37] text-black hover:bg-[#AA8A2A]' 
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      Upgrade to {plan.name}
                    </button>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Max Users</span>
                      <span className="font-semibold text-white">{plan.maxUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Storage Limit</span>
                      <span className="font-semibold text-white">{plan.maxStorage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lead Limit</span>
                      <span className="font-semibold text-white">{plan.maxLeads}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-sm font-semibold text-white mb-4">Features Included:</p>
                    {plan.features?.map(feature => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.missing?.map(feature => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                        <X className="w-4 h-4 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
