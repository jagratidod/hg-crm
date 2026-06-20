import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Plus, Edit2, UserPlus, Building2 } from 'lucide-react';
import useSuperAdminStore from '../../../store/superAdminStore';
import toast from 'react-hot-toast';

export default function SubscriptionPlans() {
  const { plans, customPlans, tenants, features: globalFeatures, addPlan, editPlan, assignCustomPlan } = useSuperAdminStore();
  
  // Modals state
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  
  // View state
  const [viewMode, setViewMode] = useState('global'); // 'global' | 'custom'
  
  // Forms state
  const [formData, setFormData] = useState({
    id: '', name: '', monthlyPrice: '', yearlyPrice: '', maxUsers: '', maxStorage: '', maxLeads: '', features: []
  });
  const [customFormData, setCustomFormData] = useState({
    tenantId: '', name: 'Custom Plan', monthlyPrice: '', yearlyPrice: '', maxUsers: '', maxStorage: '', maxLeads: '', features: []
  });

  const handleFeatureToggle = (featureName, formState, setFormState) => {
    const isSelected = formState.features.includes(featureName);
    if (isSelected) {
      setFormState({ ...formState, features: formState.features.filter(f => f !== featureName) });
    } else {
      setFormState({ ...formState, features: [...formState.features, featureName] });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error('Plan name is required');
    
    addPlan({
      ...formData,
      features: formData.features,
      missing: [],
      popular: false
    });
    toast.success('Plan created successfully');
    setIsNewPlanModalOpen(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editPlan(formData.id, {
      ...formData,
      features: formData.features
    });
    toast.success('Plan updated successfully');
    setIsEditPlanModalOpen(false);
    resetForm();
  };

  const handleCustomizeSubmit = (e) => {
    e.preventDefault();
    if (!customFormData.tenantId) return toast.error('Please select a tenant');
    assignCustomPlan(customFormData.tenantId, {
      ...customFormData,
      features: customFormData.features
    });
    toast.success('Custom plan assigned to tenant');
    setIsCustomizeModalOpen(false);
    resetCustomForm();
  };

  const openEditModal = (plan) => {
    setFormData({
      ...plan,
      features: plan.features || []
    });
    setIsEditPlanModalOpen(true);
  };

  const openCustomizeModal = (plan) => {
    setCustomFormData({
      tenantId: '',
      name: `${plan.name} (Custom)`,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      maxUsers: plan.maxUsers,
      maxStorage: plan.maxStorage,
      maxLeads: plan.maxLeads,
      features: plan.features || []
    });
    setIsCustomizeModalOpen(true);
  };

  const resetForm = () => setFormData({ id: '', name: '', monthlyPrice: '', yearlyPrice: '', maxUsers: '', maxStorage: '', maxLeads: '', features: [] });
  const resetCustomForm = () => setCustomFormData({ tenantId: '', name: 'Custom Plan', monthlyPrice: '', yearlyPrice: '', maxUsers: '', maxStorage: '', maxLeads: '', features: [] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscription Plans</h1>
          <p className="text-gray-400">Configure global billing plans or assign custom limits to tenants.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex">
            <button 
              onClick={() => setViewMode('global')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'global' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Global Plans
            </button>
            <button 
              onClick={() => setViewMode('custom')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'custom' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Custom Plans
            </button>
          </div>
          {viewMode === 'global' && (
            <button onClick={() => setIsNewPlanModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/20 transition-colors">
              <Plus className="w-4 h-4" />
              New Plan
            </button>
          )}
        </div>
      </div>

      {viewMode === 'global' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-4">
          {plans.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={plan.id}
              className={`relative bg-[#1A1A1A] rounded-3xl border flex flex-col ${
                plan.popular ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="p-8 border-b border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <button onClick={() => openEditModal(plan)} className="text-gray-400 hover:text-[#D4AF37] transition-colors" title="Edit Base Plan">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-white">${plan.monthlyPrice}</span>
                  <span className="text-gray-400 text-sm mb-1">/mo</span>
                </div>
                <p className="text-sm text-gray-400">or ${plan.yearlyPrice} / year</p>
                
                <button onClick={() => openCustomizeModal(plan)} className={`flex items-center justify-center gap-2 w-full mt-6 py-2.5 rounded-xl font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-[#D4AF37] text-black hover:bg-[#AA8A2A]' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}>
                  <UserPlus className="w-4 h-4" />
                  Customize for Tenant
                </button>
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
                  {plan.features.map(feature => (
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
          ))}
        </div>
      ) : (
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden min-h-[400px] mt-6">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black/40 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Tenant</th>
                <th className="px-6 py-4">Custom Plan Name</th>
                <th className="px-6 py-4">Price /mo</th>
                <th className="px-6 py-4">Max Users</th>
                <th className="px-6 py-4">Storage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customPlans.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">No custom plans assigned to any tenants yet.</td>
                </tr>
              ) : customPlans.map((cPlan, idx) => {
                const tenant = tenants.find(t => t.id === cPlan.tenantId);
                return (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={cPlan.id} 
                    className="hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-medium text-white">{tenant?.company || 'Unknown Tenant'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{cPlan.name}</td>
                    <td className="px-6 py-4 font-bold text-white">${cPlan.monthlyPrice}</td>
                    <td className="px-6 py-4">{cPlan.maxUsers}</td>
                    <td className="px-6 py-4">{cPlan.maxStorage}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* --- MODALS --- */}
      <AnimatePresence>
        {/* NEW / EDIT BASE PLAN MODAL */}
        {(isNewPlanModalOpen || isEditPlanModalOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">{isEditPlanModalOpen ? 'Edit Base Plan' : 'Create New Plan'}</h2>
                <button onClick={() => { setIsNewPlanModalOpen(false); setIsEditPlanModalOpen(false); }} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={isEditPlanModalOpen ? handleEditSubmit : handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Plan Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Monthly Price ($)</label>
                    <input type="number" value={formData.monthlyPrice} onChange={e => setFormData({...formData, monthlyPrice: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Yearly Price ($)</label>
                    <input type="number" value={formData.yearlyPrice} onChange={e => setFormData({...formData, yearlyPrice: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Max Users</label>
                    <input type="text" value={formData.maxUsers} onChange={e => setFormData({...formData, maxUsers: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="e.g. 5" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Max Storage</label>
                    <input type="text" value={formData.maxStorage} onChange={e => setFormData({...formData, maxStorage: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="e.g. 10 GB" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Max Leads</label>
                    <input type="text" value={formData.maxLeads} onChange={e => setFormData({...formData, maxLeads: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="e.g. 1000" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Select Included Features</label>
                  <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {globalFeatures.map(f => (
                      <label key={f.id} className="flex items-center gap-2 text-white text-sm cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors border border-white/5">
                        <input 
                          type="checkbox" 
                          checked={formData.features.includes(f.name)}
                          onChange={() => handleFeatureToggle(f.name, formData, setFormData)}
                          className="w-4 h-4 accent-[#D4AF37] bg-black/50 border border-white/20 rounded cursor-pointer"
                        />
                        {f.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="w-full py-2 bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#AA8A2A] transition-colors">
                    {isEditPlanModalOpen ? 'Save Changes' : 'Create Plan'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* CUSTOMIZE FOR TENANT MODAL */}
        {isCustomizeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Customize Plan for Tenant</h2>
                <button onClick={() => setIsCustomizeModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCustomizeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#D4AF37] mb-1">Select Tenant to Assign</label>
                  <select 
                    value={customFormData.tenantId} 
                    onChange={e => setCustomFormData({...customFormData, tenantId: e.target.value})} 
                    className="w-full px-4 py-2 bg-black border border-[#D4AF37]/50 rounded-xl text-white focus:border-[#D4AF37] outline-none" 
                    required
                  >
                    <option value="" disabled>-- Select Tenant --</option>
                    {tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.company} ({t.id})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Custom Plan Name (Internal)</label>
                  <input type="text" value={customFormData.name} onChange={e => setCustomFormData({...customFormData, name: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Custom Monthly ($)</label>
                    <input type="number" value={customFormData.monthlyPrice} onChange={e => setCustomFormData({...customFormData, monthlyPrice: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Custom Yearly ($)</label>
                    <input type="number" value={customFormData.yearlyPrice} onChange={e => setCustomFormData({...customFormData, yearlyPrice: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Users Limit</label>
                    <input type="text" value={customFormData.maxUsers} onChange={e => setCustomFormData({...customFormData, maxUsers: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Storage</label>
                    <input type="text" value={customFormData.maxStorage} onChange={e => setCustomFormData({...customFormData, maxStorage: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Leads Limit</label>
                    <input type="text" value={customFormData.maxLeads} onChange={e => setCustomFormData({...customFormData, maxLeads: e.target.value})} className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl text-white focus:border-[#D4AF37] outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Select Custom Features</label>
                  <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {globalFeatures.map(f => (
                      <label key={f.id} className="flex items-center gap-2 text-white text-sm cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors border border-white/5">
                        <input 
                          type="checkbox" 
                          checked={customFormData.features.includes(f.name)}
                          onChange={() => handleFeatureToggle(f.name, customFormData, setCustomFormData)}
                          className="w-4 h-4 accent-[#D4AF37] bg-black/50 border border-white/20 rounded cursor-pointer"
                        />
                        {f.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA8A2A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
                    Assign Custom Plan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
