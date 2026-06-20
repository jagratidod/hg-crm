import React, { useState, useMemo } from 'react';
import useErpStore from '../../../store/erpStore';
import { 
  Plus, Search, Filter, Printer, Download, Trash2, 
  RotateCcw, Sliders, CheckSquare, Square, Package, Tag, Layers, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getLabel = (val) => {
    const opt = options.find(o => typeof o === 'object' ? o.value === val : o === val);
    return opt ? (typeof opt === 'object' ? opt.label : opt) : val;
  };

  return (
    <div className="relative w-full" onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
    }} tabIndex={-1}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#161616] border transition-colors flex justify-between items-center rounded-xl py-2.5 px-3 text-white text-sm cursor-pointer min-w-[140px] ${isOpen ? 'border-[#D4AF37]' : 'border-[#8E7A5A]/30 hover:border-[#D4AF37]/50'}`}
      >
        <span className="truncate">{getLabel(value)}</span>
        <ChevronDown size={14} className={`shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#161616] border border-[#D4AF37]/40 rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50 py-1 max-h-60 overflow-y-auto scrollbar-thin">
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <div
                key={optVal}
                onMouseDown={(e) => { e.preventDefault(); onChange(optVal); setIsOpen(false); }}
                className={`py-2.5 px-4 text-sm cursor-pointer transition-colors ${
                  optVal === value 
                    ? 'bg-[#D4AF37] text-black font-semibold' 
                    : 'text-white hover:bg-[#D4AF37]/15 hover:text-[#D4AF37]'
                }`}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Inventory = () => {
  const { inventory, addInventoryItem, deleteInventoryItem, goldRate } = useErpStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state for new raw or finished item
  const [newItem, setNewItem] = useState({
    category: 'Gold',
    status: 'In Stock',
    name: '22K Gold Cast Bullion',
    sku: 'GLD-22K-BULLION',
    barcode: `BAR-G${Date.now().toString().slice(-4)}`,
    rfid: `RFID-G${Date.now().toString().slice(-4)}`,
    grossWeight: 50.0,
    netWeight: 48.0,
    fineWeight: 44.0,
    purity: 0.916,
    karat: 22,
    stoneWeight: 0,
    diamondWeight: 0,
    makingCharges: 120,
    wastage: 3.5,
  });

  // Filter vault products
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.barcode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'All' ? true : item.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [inventory, searchQuery, categoryFilter, statusFilter]);

  const handleCreateItem = (e) => {
    e.preventDefault();
    addInventoryItem(newItem);
    setIsAddOpen(false);
    toast.success('Successfully added product to inventory vault!');
  };

  const handleDeleteItem = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} from inventory vaults?`)) {
      deleteInventoryItem(id);
      toast.success('Item deleted.');
    }
  };

  const handleExportCSV = () => {
    // Generate simulated CSV text download trigger
    const headers = 'ID,Category,Name,SKU,Barcode,RFID,Gross Wt,Net Wt,Fine Wt,Purity,Price\n';
    const rows = filteredInventory.map(i => 
      `"${i.id}","${i.category}","${i.name}","${i.sku}","${i.barcode}","${i.rfid}",${i.grossWeight},${i.netWeight},${i.fineWeight},${i.purity},${i.finalPrice}`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `HG_ERP_Inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Inventory spreadsheet exported successfully!');
  };

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredInventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredInventory.map(i => i.id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Vault Inventory</h1>
          <p className="text-xs text-[#C5B396] tracking-wider uppercase mt-1">Real-time metal weights & gemstones inventory vault</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-black hover:bg-white/5 border border-[#8E7A5A]/35 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Download size={14} /> Export CSV Sheet
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold text-xs py-3 px-5 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Plus size={16} /> Add Material
          </button>
        </div>
      </div>

      {/* Advanced filters */}
      <div className="relative z-20 glass-panel p-4 rounded-xl border border-[#8E7A5A]/20 bg-black/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Category Tabs */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none flex-shrink-0">
          {['All', 'Gold', 'Silver', 'Diamond', 'Stone', 'Finished Goods'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                categoryFilter === cat 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'text-[#C5B396] hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex w-full md:w-auto gap-3 items-center flex-1 justify-end flex-wrap md:flex-nowrap">
          {/* Status Dropdown */}
          <div className="w-full md:w-44 flex-shrink-0">
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={['All', 'In Stock', 'Out of Stock', 'Low Stock', 'Reserved', 'Damaged']}
            />
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search SKU, Barcode, Material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161616] border border-[#8E7A5A]/20 focus:border-[#D4AF37] rounded-xl py-2 px-11 text-white text-xs outline-none"
            />
          </div>
        </div>

      </div>

      {/* Heavy-duty Inventory Grid */}
      <div className="glass-panel rounded-2xl border border-[#8E7A5A]/20 bg-black/40 overflow-hidden">
        <div className="overflow-x-auto max-h-[460px] scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse relative">
            <thead>
              <tr className="border-b border-[#8E7A5A]/25 bg-black/80 text-[#C5B396] uppercase tracking-wider font-mono sticky top-0 z-10">
                <th className="p-4 font-semibold text-center w-10">
                  <button onClick={toggleSelectAll} className="text-[#C5B396] hover:text-[#D4AF37]">
                    {selectedItems.length === filteredInventory.length ? <CheckSquare size={16} /> : <Square size={16} />}
                  </button>
                </th>
                <th className="p-4 font-semibold">SKU / Item</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Barcode / RFID</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-right">Gross Wt</th>
                <th className="p-4 font-semibold text-right">Fine Wt</th>
                <th className="p-4 font-semibold text-right">Purity / Karat</th>
                <th className="p-4 font-semibold text-right">M. Charges / Wastage</th>
                <th className="p-4 font-semibold text-right">Assayed Valuation</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7A5A]/10">
              {filteredInventory.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <tr key={item.id} className={`hover:bg-white/5 transition-colors text-white font-sans ${isSelected ? 'bg-[#D4AF37]/5' : ''}`}>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleSelectItem(item.id)} className="text-[#C5B396] hover:text-[#D4AF37]">
                        {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-[#8E7A5A]/15 shrink-0" />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-[9px] font-mono text-[#C5B396]">{item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 bg-black/60 border border-[#8E7A5A]/20 text-[9px] font-bold rounded-full ${
                        item.status === 'In Stock' ? 'text-green-400' :
                        item.status === 'Low Stock' ? 'text-yellow-400' :
                        item.status === 'Reserved' ? 'text-blue-400' :
                        item.status === 'Damaged' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[10px] space-y-0.5 text-gray-400">
                      <div className="flex items-center gap-1"><Tag size={10} className="text-[#D4AF37]" /> {item.barcode}</div>
                      <div className="flex items-center gap-1"><Layers size={10} className="text-gray-500" /> {item.rfid}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-black/60 border border-[#8E7A5A]/20 text-[9px] font-bold rounded-full text-[#C5B396]">{item.category}</span>
                    </td>
                    <td className="p-4 text-right font-mono font-medium">{item.grossWeight > 0 ? `${item.grossWeight.toFixed(2)} g` : '—'}</td>
                    <td className="p-4 text-right font-mono font-semibold text-[#D4AF37]">
                      {item.fineWeight > 0 ? `${item.fineWeight.toFixed(2)} g` : item.diamondWeight > 0 ? `${item.diamondWeight} cts (D)` : '—'}
                    </td>
                    <td className="p-4 text-right font-mono text-gray-400">
                      <div>{(item.purity * 100).toFixed(1)}% Pure</div>
                      {item.karat > 0 && <div className="text-[9px] text-[#C5B396]">{item.karat} Karat Gold</div>}
                    </td>
                    <td className="p-4 text-right font-mono text-gray-500">
                      {item.makingCharges > 0 && <div>₹{item.makingCharges}/g</div>}
                      {item.wastage > 0 && <div>+{item.wastage}% wastage</div>}
                      {item.makingCharges === 0 && item.wastage === 0 && <div>—</div>}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-green-400">₹{item.finalPrice.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-1.5 rounded bg-black/40 border border-[#8E7A5A]/20 text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-500">The raw material vaults are empty matching filter selection.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW MATERIAL DRAWER */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
          
          <div className="relative w-full max-w-[420px] h-full bg-[#0F0F0F] border-l border-[#D4AF37]/35 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b border-[#8E7A5A]/25 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Add Vault Material</h2>
                  <p className="text-xs text-[#C5B396]">Lock raw metal or gemstones into storage</p>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-white font-sans text-lg">&times;</button>
              </div>

              <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                    >
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Stone">Stone</option>
                      <option value="Finished Goods">Finished Goods</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Availability Status</label>
                    <select
                      value={newItem.status}
                      onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Item Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#C5B396] uppercase">SKU Reference</label>
                  <input
                    type="text"
                    value={newItem.sku}
                    onChange={(e) => setNewItem({...newItem, sku: e.target.value.toUpperCase()})}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Gross Weight (g)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.grossWeight}
                      onChange={(e) => setNewItem({...newItem, grossWeight: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Fine Weight (g)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.fineWeight}
                      onChange={(e) => setNewItem({...newItem, fineWeight: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Purity (e.g. 0.916)</label>
                    <input
                      type="number"
                      step="0.001"
                      max="1.0"
                      value={newItem.purity}
                      onChange={(e) => setNewItem({...newItem, purity: parseFloat(e.target.value) || 1.0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Gold Karat</label>
                    <input
                      type="number"
                      value={newItem.karat}
                      onChange={(e) => setNewItem({...newItem, karat: parseInt(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Making Charges (₹/g)</label>
                    <input
                      type="number"
                      value={newItem.makingCharges}
                      onChange={(e) => setNewItem({...newItem, makingCharges: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[#C5B396] uppercase">Wastage Margin (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newItem.wastage}
                      onChange={(e) => setNewItem({...newItem, wastage: parseFloat(e.target.value) || 0})}
                      className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest mt-4"
                >
                  Save Material to Vaults
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;

