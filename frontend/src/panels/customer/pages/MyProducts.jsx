import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '../../../data/products.json';

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-hg-cream">My Jewellery</h2>
          <button className="bg-hg-accent/20 text-hg-accent p-2 rounded-lg hover:bg-hg-accent hover:text-black transition-colors">
              <Plus size={20} />
          </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="glass-panel p-4 rounded-2xl border border-hg-dark-gold/30 flex gap-4 items-center">
             <div className="w-16 h-16 bg-[#1A1610] rounded-xl flex items-center justify-center text-3xl border border-hg-dark-gold/20 shrink-0 shadow-inner">
                {product.image}
             </div>
             <div className="flex-1">
                <div className="font-medium text-hg-cream text-sm mb-1 line-clamp-1">{product.name}</div>
                <div className="text-xs text-hg-gold-beige mb-1">{product.metalType} • {product.weight}</div>
                <div className="text-[10px] px-2 py-0.5 bg-hg-success/10 text-hg-success border border-hg-success/20 rounded inline-block">
                    Warranty Active
                </div>
             </div>
             <button className="text-hg-gold-beige hover:text-hg-accent transition-colors p-2">
                 <ChevronRight size={20} />
             </button>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-12">
             <div className="text-4xl mb-4 opacity-50">💎</div>
             <p className="text-hg-gold-beige mb-4">No products registered yet</p>
             <button className="bg-[#2A2621] text-hg-cream px-6 py-2 rounded-lg border border-hg-dark-gold/30 hover:border-hg-accent transition-colors">
                 Add First Product
             </button>
          </div>
        )}
      </div>

      <div className="mt-8 glass-panel p-5 rounded-2xl border border-hg-accent/30 bg-hg-accent/5">
         <div className="flex justify-between items-start mb-2">
             <h3 className="font-medium text-hg-gold-light">Need Repair?</h3>
             <span className="text-2xl">🛠️</span>
         </div>
         <p className="text-xs text-hg-gold-beige leading-relaxed mb-4">
             You can easily request a polish or repair for any of your registered products.
         </p>
         <Link to="/customer/request" className="block text-center w-full bg-hg-accent text-black py-2 rounded-lg text-sm font-semibold">
             Book Service
         </Link>
      </div>
    </div>
  );
};

export default MyProducts;
