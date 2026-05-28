import React, { useState, useMemo } from 'react';
import useErpStore, { DEPARTMENTS } from '../../../store/erpStore';
import { 
  Users, Plus, Search, Filter, Trash2, 
  Landmark, UserCheck, ShieldAlert, Award, FileText, Calendar 
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const { users, addUser } = useErpStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // New employee form state
  const [newEmp, setNewEmp] = useState({
    firstName: 'Haresh',
    lastName: 'Solanki',
    mobileNumber: '+91 90123 45678',
    nationalId: 'AID-1029-3847',
    tradeNumber: 'TRD-GST-99',
    mailId: 'haresh.s@luxurygold.com',
    dateOfBirth: '1988-08-12',
    specialDay: '2012-05-18', // Anniversary
    department: 'Filing Department',
    designation: 'Master Filer',
    salaryType: 'Contract',
    address: '401 Jewel Colony, Surat, Gujarat',
    zipCode: '395003',
    bankDetails: 'HDFC Bank - Acc: 501004312891, IFSC: HDFC0000182'
  });

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            u.designation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'All' ? true : u.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [users, searchQuery, deptFilter]);

  const handleCreateEmp = (e) => {
    e.preventDefault();
    addUser({
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      ...newEmp
    });
    setIsAddOpen(false);
    toast.success('New Karigar profile registered in directory!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Staff & Craftsmen Directory</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Manage designer, polisher, and master karigar profiles, payroll & documentation</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-3 px-5 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5 uppercase tracking-wider"
        >
          <Plus size={16} /> Register Staff
        </button>
      </div>

      {/* Filters bar */}
      <div className="glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="flex gap-2 items-center">
          <span className="text-xs text-[#C5B396] font-mono">Stage Filter:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[#161616] border border-[#8E7A5A]/20 rounded-lg py-2 px-3 text-white text-xs outline-none"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.slice(0, 15).map(d => (
              <option key={d.id} value={d.name}>{d.name.replace(' Department', '')}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search Craftsmen Name, Designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161616] border border-[#8E7A5A]/20 focus:border-[#D4AF37] rounded-xl py-2 px-11 text-white text-xs outline-none"
          />
        </div>

      </div>

      {/* Grid listing card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <div 
            key={user.id} 
            onClick={() => setSelectedUser(user)}
            className="glass-panel p-5 rounded-2xl border border-[#8E7A5A]/20 bg-black/40 hover:border-[#D4AF37]/45 transition-all text-center relative overflow-hidden group cursor-pointer"
          >
            {/* Hover card border accent */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <img 
              src={user.image} 
              alt={user.name} 
              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#8E7A5A]/35 shadow-lg group-hover:scale-105 transition-transform" 
            />

            <h3 className="text-sm font-semibold text-white mt-4">{user.name}</h3>
            <p className="text-[10px] text-[#C5B396] font-mono mt-0.5 uppercase tracking-wider">{user.designation}</p>
            
            <div className="mt-4 pt-3 border-t border-[#8E7A5A]/10 text-[10px] text-gray-500">
              Department: <strong>{user.department.replace(' Department', '')}</strong>
            </div>

            <div className="flex justify-between items-center mt-3 text-[10px] bg-black/40 p-2 rounded-lg border border-[#8E7A5A]/10">
              <span className="text-[#C5B396] font-mono">Wages: {user.salaryType}</span>
              <span className="font-mono text-green-400 font-bold">{user.activeJobsCount} Active Jobs</span>
            </div>
          </div>
        ))}
      </div>

      {/* USER DETAIL DRAWERS VIEW */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedUser(null)}></div>
          
          <div className="relative w-full max-w-[450px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin">
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4">
                <div className="flex items-center gap-3">
                  <img src={selectedUser.image} alt={selectedUser.name} className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30" />
                  <div>
                    <h2 className="text-base font-semibold text-white">{selectedUser.name}</h2>
                    <p className="text-[10px] text-[#C5B396] font-mono tracking-wider uppercase">{selectedUser.designation}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              {/* Advanced info lists */}
              <div className="space-y-4 text-xs">
                
                <div className="p-4 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-2">
                  <h3 className="font-semibold text-white uppercase text-[10px] border-b border-[#8E7A5A]/15 pb-1">Primary Credentials</h3>
                  <div className="grid grid-cols-2 gap-2 text-[#C5B396]">
                    <div>Mobile: <strong className="text-white font-mono">{selectedUser.mobileNumber}</strong></div>
                    <div>Mail ID: <strong className="text-white">{selectedUser.mailId}</strong></div>
                    <div>National ID: <strong className="text-white font-mono">{selectedUser.nationalId}</strong></div>
                    <div>Trade Code: <strong className="text-white font-mono">{selectedUser.tradeNumber}</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-2">
                  <h3 className="font-semibold text-white uppercase text-[10px] border-b border-[#8E7A5A]/15 pb-1">Date Reminders</h3>
                  <div className="grid grid-cols-2 gap-2 text-[#C5B396]">
                    <div>Date Of Birth: <strong className="text-white font-mono">{selectedUser.dateOfBirth}</strong></div>
                    <div>Wedding Anniversary: <strong className="text-white font-mono">{selectedUser.specialDay || '—'}</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-2">
                  <h3 className="font-semibold text-white uppercase text-[10px] border-b border-[#8E7A5A]/15 pb-1">Address & Bank Specifications</h3>
                  <div className="space-y-2 text-[#C5B396]">
                    <div>Address: <strong className="text-white">{selectedUser.address}</strong></div>
                    <div className="pt-2 border-t border-[#8E7A5A]/10">Bank Details: <strong className="text-white font-mono block mt-1">{selectedUser.bankDetails}</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-[#8E7A5A]/10 space-y-2">
                  <h3 className="font-semibold text-white uppercase text-[10px] border-b border-[#8E7A5A]/15 pb-1 flex items-center gap-1"><FileText size={12} className="text-[#D4AF37]" /> Uploaded Verification Documents</h3>
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                    <div className="p-2 border border-gray-800 rounded bg-[#161616] text-[#C5B396] hover:border-[#D4AF37]/35 cursor-pointer">Verification_ID.pdf</div>
                    <div className="p-2 border border-gray-800 rounded bg-[#161616] text-[#C5B396] hover:border-[#D4AF37]/35 cursor-pointer">Labour_Contract.pdf</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-[#8E7A5A]/25">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full bg-[#161616] border border-gray-800 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Close Profile Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW EMPLOYEE REGISTER DRAWER */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
          
          <div className="relative w-full max-w-[440px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Register Staff Profile</h2>
                  <p className="text-xs text-[#C5B396]">Lock credentials and specs into payroll directory</p>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              <form onSubmit={handleCreateEmp} className="space-y-4 text-[10px] uppercase font-semibold text-[#C5B396]">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={newEmp.firstName}
                      onChange={(e) => setNewEmp({...newEmp, firstName: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-sans uppercase"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={newEmp.lastName}
                      onChange={(e) => setNewEmp({...newEmp, lastName: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-sans uppercase"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      value={newEmp.mobileNumber}
                      onChange={(e) => setNewEmp({...newEmp, mobileNumber: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label>National ID Number</label>
                    <input
                      type="text"
                      value={newEmp.nationalId}
                      onChange={(e) => setNewEmp({...newEmp, nationalId: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label>Department</label>
                    <select
                      value={newEmp.department}
                      onChange={(e) => setNewEmp({...newEmp, department: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-sans"
                    >
                      {DEPARTMENTS.slice(0, 15).map(d => (
                        <option key={d.id} value={d.name}>{d.name.replace(' Department', '')}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label>Designation Title</label>
                    <input
                      type="text"
                      value={newEmp.designation}
                      onChange={(e) => setNewEmp({...newEmp, designation: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-sans"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label>Bank Specifications Details</label>
                  <input
                    type="text"
                    value={newEmp.bankDetails}
                    onChange={(e) => setNewEmp({...newEmp, bankDetails: e.target.value})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2 px-3 text-white text-xs outline-none font-sans"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-4"
                >
                  Authorize Staff Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;

