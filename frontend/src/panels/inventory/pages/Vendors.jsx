import React from 'react';
import { Building2, Mail, Phone, ExternalLink } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const mockVendors = [
  { id: 'V-101', name: 'Global Diamonds Ltd.', type: 'Stones & Gems', status: 'Active', phone: '+91 8888 123456' },
  { id: 'V-102', name: 'Precision Tools Inc.', type: 'Equipment', status: 'Active', phone: '+91 8888 234567' },
  { id: 'V-103', name: 'Sparkle Chemicals', type: 'Consumables', status: 'Inactive', phone: '+91 8888 345678' }
];

const InventoryVendors = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <div>
            <h1 className="text-3xl font-semibold text-hg-gold-light">Vendor Management</h1>
            <p className="text-sm text-hg-gold-beige mt-1">Manage suppliers and purchase orders</p>
         </div>
         <Button>+ Add Vendor</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVendors.map(vendor => (
              <div key={vendor.id} className="glass-panel p-6 rounded-2xl border border-hg-dark-gold/40 hover:border-hg-accent/50 transition-colors bg-[#1A1610]">
                  <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl flex items-center justify-center">
                          <Building2 className="text-hg-gold-light" size={24} />
                      </div>
                      {vendor.status === 'Active' ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Inactive</Badge>}
                  </div>
                  
                  <h3 className="text-lg font-medium text-hg-cream mb-1">{vendor.name}</h3>
                  <p className="text-xs text-hg-accent font-medium mb-4">{vendor.type}</p>
                  
                  <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-hg-gold-beige">
                          <Phone size={14} className="text-hg-dark-gold" /> {vendor.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-hg-gold-beige">
                          <Mail size={14} className="text-hg-dark-gold" /> contact@{vendor.name.toLowerCase().replace(/\s+/g, '')}.com
                      </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-hg-dark-gold/20">
                      <button className="flex-1 text-center bg-[#2A2621] text-hg-cream py-2 rounded-lg text-sm font-medium hover:bg-[#342f29] transition-colors border border-transparent hover:border-hg-dark-gold/50">
                          View History
                      </button>
                      <button className="flex-none px-3 bg-[#2A2621] text-hg-gold-beige py-2 rounded-lg text-sm font-medium hover:text-hg-accent transition-colors border border-transparent hover:border-hg-dark-gold/50">
                          <ExternalLink size={18} />
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default InventoryVendors;
