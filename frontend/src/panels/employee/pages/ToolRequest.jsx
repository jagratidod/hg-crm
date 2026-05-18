import React, { useState } from 'react';
import { Search, Package, Plus } from 'lucide-react';
import Button from '../../../components/ui/Button';

// Mock available tools
const availableTools = [
  { id: 'TL-001', name: 'Professional Polishing Machine', category: 'Machine' },
  { id: 'TL-005', name: 'Ultrasonic Cleaner', category: 'Machine' },
  { id: 'TL-008', name: 'Ring Sizer Kit', category: 'Kit' },
];

const ToolRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedTools, setRequestedTools] = useState([]);

  const handleRequest = (tool) => {
    if (!requestedTools.find(t => t.id === tool.id)) {
      setRequestedTools([...requestedTools, tool]);
    }
  };

  const removeRequest = (toolId) => {
    setRequestedTools(requestedTools.filter(t => t.id !== toolId));
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-medium text-hg-cream">Tool Requisition</h2>
            <p className="text-sm text-hg-gold-beige">Request tools from main inventory</p>
          </div>
      </div>

      <div className="relative mb-6">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-hg-gold-beige" size={18} />
         <input 
           type="text" 
           placeholder="Search tools..." 
           className="w-full bg-[#2A2621] border border-hg-dark-gold/30 rounded-xl py-4 pl-12 pr-4 text-hg-cream focus:border-hg-accent outline-none"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium text-hg-gold-light">Available Tools</h3>
        {availableTools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(tool => (
           <div key={tool.id} className="glass-panel p-4 rounded-xl border border-hg-dark-gold/30 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#1A1610] rounded-lg flex items-center justify-center border border-hg-dark-gold/20">
                    <Package size={18} className="text-hg-gold-beige" />
                 </div>
                 <div>
                    <div className="font-medium text-hg-cream text-sm mb-0.5">{tool.name}</div>
                    <div className="text-xs text-hg-gold-beige">{tool.id} • {tool.category}</div>
                 </div>
              </div>
              <button 
                onClick={() => handleRequest(tool)}
                className="w-8 h-8 rounded-full bg-hg-accent/20 text-hg-accent flex items-center justify-center hover:bg-hg-accent hover:text-black transition-colors"
                disabled={requestedTools.find(t => t.id === tool.id)}
              >
                 <Plus size={16} />
              </button>
           </div>
        ))}
      </div>

      {requestedTools.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-hg-accent/50 bg-[#1A1610]">
           <h3 className="font-medium text-hg-cream mb-4">Cart ({requestedTools.length})</h3>
           <div className="space-y-3 mb-6">
             {requestedTools.map(tool => (
               <div key={`req-${tool.id}`} className="flex justify-between items-center text-sm border-b border-hg-dark-gold/20 pb-2">
                  <span className="text-hg-gold-light">{tool.name}</span>
                  <button onClick={() => removeRequest(tool.id)} className="text-hg-danger text-xs hover:underline">Remove</button>
               </div>
             ))}
           </div>
           <Button className="w-full py-3">Submit Request to Inventory</Button>
        </div>
      )}
    </div>
  );
};

export default ToolRequest;
