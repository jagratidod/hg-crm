import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1F1B14] border border-hg-dark-gold/50 rounded-2xl w-full max-w-md shadow-2xl shadow-hg-accent/10 relative">
        <div className="flex justify-between items-center p-4 border-b border-hg-dark-gold/30">
          <h3 className="text-lg font-medium text-hg-cream">{title}</h3>
          <button onClick={onClose} className="text-hg-gold-beige hover:text-hg-danger transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
