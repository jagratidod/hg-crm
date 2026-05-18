import React, { useState, useEffect } from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { Search, Filter, MoreVertical, Eye } from 'lucide-react';

// Import mock data directly for now
import servicesData from '../../../data/services.json';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // In real app, this would be an API call
    setServices(servicesData);
  }, []);

  const handleAssign = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const confirmAssign = () => {
    // Mock update
    setServices(prev => prev.map(s => 
      s.id === selectedService.id ? { ...s, status: 'Assigned', assignedTo: 3 } : s
    ));
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending': return <Badge variant="warning">Pending</Badge>;
      case 'Assigned': return <Badge variant="default">Assigned</Badge>;
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-hg-gold-light">Service Requests</h1>
         <Button>Export Data</Button>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/50 overflow-hidden">
         <div className="p-4 border-b border-hg-dark-gold/30 flex justify-between items-center bg-[#1A1610]">
             <div className="relative w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" />
                 <input 
                   type="text" 
                   placeholder="Search requests..." 
                   className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-2 pl-10 pr-4 text-sm text-hg-cream placeholder-hg-gold-beige focus:border-hg-accent outline-none transition-colors"
                 />
             </div>
             <button className="flex items-center gap-2 text-hg-gold-beige hover:text-hg-cream text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                 <Filter size={16} /> Filter
             </button>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                 <thead className="bg-[#1A1610] text-hg-gold-beige border-b border-hg-dark-gold/30">
                     <tr>
                         <th className="px-6 py-4 font-medium">Request ID</th>
                         <th className="px-6 py-4 font-medium">Type</th>
                         <th className="px-6 py-4 font-medium">Date</th>
                         <th className="px-6 py-4 font-medium">Priority</th>
                         <th className="px-6 py-4 font-medium">Status</th>
                         <th className="px-6 py-4 font-medium text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-hg-dark-gold/20">
                     {services.map((service) => (
                         <tr key={service.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-hg-cream">{service.id}</td>
                             <td className="px-6 py-4 text-hg-gold-light">{service.type}</td>
                             <td className="px-6 py-4 text-hg-gold-beige">{new Date(service.createdAt).toLocaleDateString()}</td>
                             <td className="px-6 py-4">
                               <span className={`flex items-center gap-1.5 ${service.priority === 'High' ? 'text-hg-danger' : 'text-hg-gold-beige'}`}>
                                 <span className={`w-1.5 h-1.5 rounded-full ${service.priority === 'High' ? 'bg-hg-danger' : 'bg-hg-gold-beige'}`}></span>
                                 {service.priority}
                               </span>
                             </td>
                             <td className="px-6 py-4">{getStatusBadge(service.status)}</td>
                             <td className="px-6 py-4 text-right space-x-2">
                                 {service.status === 'Pending' && (
                                    <Button variant="ghost" className="text-hg-accent hover:text-hg-cream hover:bg-hg-accent/20 px-3 py-1 text-xs" onClick={() => handleAssign(service)}>Assign</Button>
                                 )}
                                 <button className="text-hg-gold-beige hover:text-hg-cream transition-colors p-1 rounded hover:bg-white/5">
                                     <Eye size={16} />
                                 </button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>

      {/* Assignment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign Technician">
          <div className="space-y-4">
              <p className="text-sm text-hg-gold-beige">
                  Assigning technician for <strong>{selectedService?.id}</strong> ({selectedService?.type})
              </p>
              
              <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-hg-cream">Select Employee</label>
                  <select className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-lg py-3 px-4 text-hg-cream focus:border-hg-accent outline-none">
                      <option value="3">Technician Amit (Available)</option>
                      <option value="4">Technician Suresh (Busy)</option>
                  </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={confirmAssign}>Confirm Assignment</Button>
              </div>
          </div>
      </Modal>
    </div>
  );
};

export default AdminServices;
