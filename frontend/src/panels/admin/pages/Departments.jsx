import React, { useState, useMemo } from 'react';
import useErpStore, { DEPARTMENTS } from '../../../store/erpStore';
import { Plus, Edit, Trash2, Users, Layers, TrendingUp, Sliders, X, Check, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Departments = () => {
  const { departments, addDepartment, editDepartment, deleteDepartment, users } = useErpStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [selectedDeptUsers, setSelectedDeptUsers] = useState(null);

  // New department form state
  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    progress: 50,
    type: 'Against Weight',
    process: 'Manufacturing',
    autoLoss: 0.1,
    autoProfit: 0,
    calcStock: true
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code) {
      toast.error('Department Name and Short Code are required');
      return;
    }
    addDepartment(newDept);
    setIsAddOpen(false);
    setNewDept({
      name: '',
      code: '',
      progress: 50,
      type: 'Against Weight',
      process: 'Manufacturing',
      autoLoss: 0.1,
      autoProfit: 0,
      calcStock: true
    });
    toast.success('Department created successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingDept.name || !editingDept.code) {
      toast.error('Name and Code are required');
      return;
    }
    editDepartment(editingDept.id, editingDept);
    setEditingDept(null);
    toast.success('Department configurations updated!');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      deleteDepartment(id);
      toast.success('Department deleted.');
    }
  };

  // Get users for selected department in panel
  const getDeptUsers = (deptName) => {
    return users.filter(u => u.department === deptName);
  };

  const handleShowUsers = (dept) => {
    const list = getDeptUsers(dept.name);
    setSelectedDeptUsers({ deptName: dept.name, list });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Jewellery ERP Departments</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Configure Limits, Processes & Margins</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-3 px-5 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5 uppercase tracking-wider"
        >
          <Plus size={16} /> Add Department
        </button>
      </div>

      {/* Main Configurations Table */}
      <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7A5A]/25 bg-black/60 text-[#C5B396] uppercase tracking-wider font-mono">
                <th className="p-4 font-semibold">Stage ID</th>
                <th className="p-4 font-semibold">Department Name</th>
                <th className="p-4 font-semibold">Short Code</th>
                <th className="p-4 font-semibold">Process</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold text-right">Auto Loss %</th>
                <th className="p-4 font-semibold text-right">Auto Profit %</th>
                <th className="p-4 font-semibold text-center">Auto Stock Calc</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7A5A]/10">
              {departments.map((dept, index) => (
                <tr key={dept.id} className="hover:bg-white/5 transition-colors text-white">
                  <td className="p-4 font-mono font-bold text-[#C5B396]">#{dept.id}</td>
                  <td className="p-4 font-semibold">{dept.name}</td>
                  <td className="p-4 font-mono text-[#D4AF37]">{dept.code}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      dept.process === 'Manufacturing' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' :
                      dept.process === 'Melting' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {dept.process}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{dept.type}</td>
                  <td className="p-4 text-right font-mono font-semibold text-red-400">{dept.autoLoss}%</td>
                  <td className="p-4 text-right font-mono font-semibold text-green-400">{dept.autoProfit}%</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block w-4 h-4 rounded-full ${dept.calcStock ? 'text-green-500' : 'text-gray-600'}`}>
                      {dept.calcStock ? '✔' : '✖'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleShowUsers(dept)}
                        title="View Staff"
                        className="p-1.5 rounded bg-black/40 border border-[#8E7A5A]/25 text-[#C5B396] hover:text-[#D4AF37] hover:border-[#D4AF37]"
                      >
                        <Users size={13} />
                      </button>
                      <button 
                        onClick={() => setEditingDept(dept)}
                        title="Edit config"
                        className="p-1.5 rounded bg-black/40 border border-[#8E7A5A]/25 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]"
                      >
                        <Edit size={13} />
                      </button>
                      <button 
                        onClick={() => handleDelete(dept.id, dept.name)}
                        title="Delete Stage"
                        className="p-1.5 rounded bg-black/40 border border-[#8E7A5A]/25 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER FOR ADDING DEPARTMENT */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
          
          <div className="relative w-full max-w-[420px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Create Department</h2>
                  <p className="text-xs text-[#C5B396]">Configure a new jewellery workflow stage</p>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Department Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Laser Engraving Department"
                    value={newDept.name}
                    onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Short Code</label>
                    <input
                      type="text"
                      placeholder="e.g. LSR"
                      value={newDept.code}
                      onChange={(e) => setNewDept({...newDept, code: e.target.value.toUpperCase()})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Process Type</label>
                    <select
                      value={newDept.process}
                      onChange={(e) => setNewDept({...newDept, process: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                    >
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Melting">Melting</option>
                      <option value="Testing">Testing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Auto Loss Limit (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newDept.autoLoss}
                      onChange={(e) => setNewDept({...newDept, autoLoss: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Auto Profit Limit (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newDept.autoProfit}
                      onChange={(e) => setNewDept({...newDept, autoProfit: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase tracking-wider">Auto Weight Type</label>
                  <select
                    value={newDept.type}
                    onChange={(e) => setNewDept({...newDept, type: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-white text-sm outline-none"
                  >
                    <option value="Weight Wise">Weight Wise</option>
                    <option value="Against Weight">Against Weight</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <input
                    type="checkbox"
                    id="calcStock"
                    checked={newDept.calcStock}
                    onChange={(e) => setNewDept({...newDept, calcStock: e.target.checked})}
                    className="accent-[#D4AF37] w-4 h-4 rounded"
                  />
                  <label htmlFor="calcStock" className="text-xs text-[#C5B396] select-none font-medium cursor-pointer">Enable automatic stock calculations</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-6"
                >
                  Create Stage
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DEPARTMENT MODAL */}
      {editingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingDept(null)}></div>
          
          <div className="relative w-full max-w-[460px] bg-[#0F0F0F] border border-[#D4AF37]/35 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-4">
              <h3 className="text-lg font-light text-white">Edit Configurations: {editingDept.name}</h3>
              <button onClick={() => setEditingDept(null)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Short Code</label>
                  <input
                    type="text"
                    value={editingDept.code}
                    onChange={(e) => setEditingDept({...editingDept, code: e.target.value.toUpperCase()})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Process Type</label>
                  <select
                    value={editingDept.process}
                    onChange={(e) => setEditingDept({...editingDept, process: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Melting">Melting</option>
                    <option value="Testing">Testing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Auto Loss (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingDept.autoLoss}
                    onChange={(e) => setEditingDept({...editingDept, autoLoss: parseFloat(e.target.value) || 0})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Auto Profit (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingDept.autoProfit}
                    onChange={(e) => setEditingDept({...editingDept, autoProfit: parseFloat(e.target.value) || 0})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Auto Weight Type</label>
                <select
                  value={editingDept.type}
                  onChange={(e) => setEditingDept({...editingDept, type: e.target.value})}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                >
                  <option value="Weight Wise">Weight Wise</option>
                  <option value="Against Weight">Against Weight</option>
                </select>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="editCalcStock"
                  checked={editingDept.calcStock}
                  onChange={(e) => setEditingDept({...editingDept, calcStock: e.target.checked})}
                  className="accent-[#D4AF37]"
                />
                <label htmlFor="editCalcStock" className="text-xs text-[#C5B396] cursor-pointer">Enable automatic stock calculations</label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest mt-4"
              >
                Save Configurations
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DEPARTMENT USERS PANEL (SLIDE-OUT) */}
      {selectedDeptUsers && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDeptUsers(null)}></div>
          
          <div className="relative w-full max-w-[380px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-light text-white">Department Operators</h3>
                <p className="text-xs text-[#C5B396]">Active in: {selectedDeptUsers.deptName}</p>
              </div>
              <button onClick={() => setSelectedDeptUsers(null)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {selectedDeptUsers.list.length > 0 ? (
                selectedDeptUsers.list.map((u) => (
                  <div key={u.id} className="p-3 rounded-xl bg-black/40 border border-[#8E7A5A]/15 flex items-center gap-3">
                    <img src={u.image} alt={u.name} className="w-10 h-10 rounded-lg object-cover border border-[#8E7A5A]/20" />
                    <div>
                      <div className="text-xs font-semibold text-white">{u.name}</div>
                      <div className="text-[10px] text-[#C5B396]">{u.designation}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">National ID: <strong>{u.nationalId}</strong></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-xs text-gray-500 py-10">No specific users are assigned to this department yet. Go to User Management to assign departments.</div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Departments;

