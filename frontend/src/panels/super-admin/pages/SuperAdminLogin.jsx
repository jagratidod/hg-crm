import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useErpStore from '../../../store/erpStore';
import { Shield, KeyRound, Lock, Server, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const SuperAdminLogin = () => {
  const login = useErpStore((state) => state.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || password.length < 4) {
      toast.error('Valid email and password required (min 4 chars).');
      return;
    }
    
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Accept for simulation
      if (email && password.length >= 4) {
        login(
          { id: `SA-${Date.now().toString().slice(-3)}`, name: 'System Administrator', identifier: email },
          'Super Admin',
          'Global'
        );
        toast.success('Root Access Granted: Welcome Super Admin');
        navigate('/super-admin');
      } else {
        toast.error('Access Denied. Invalid Credentials.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F0F0F] relative overflow-hidden select-none">
      
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-[460px] glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col items-center z-10 border border-[#8E7A5A]/20 bg-[#0A0A0A]/60 backdrop-blur-xl">
        
        {/* Fine gold frame accents */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        {/* Logo */}
        <div className="w-20 h-20 mb-6 rounded-2xl border border-[#D4AF37]/30 bg-black flex items-center justify-center rotate-45 shadow-lg shadow-[#D4AF37]/10 animate-pulse">
          <div className="-rotate-45 flex flex-col items-center">
            <span className="text-[#D4AF37] text-2xl font-serif font-bold tracking-tight">HG</span>
            <span className="text-white text-[8px] tracking-widest font-sans uppercase">ERP</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-white tracking-wide">HG ENTERPRISES</h1>
          <p className="text-xs text-[#C5B396] tracking-widest uppercase mt-1">Super Admin Override</p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleLoginSubmit}>
            <div className="space-y-2 relative">
                <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <Mail size={14} className="text-[#D4AF37]" /> Admin Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><Mail size={16} /></span>
                  <input
                    type="email"
                    placeholder="admin@hg.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-white text-sm outline-none transition-all"
                    required
                    autoFocus
                  />
                </div>
            </div>

            <div className="space-y-2 relative">
                <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <Shield size={14} className="text-[#D4AF37]" /> Root Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><KeyRound size={16} /></span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-white text-sm outline-none transition-all"
                    required
                  />
                </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] active:scale-[0.98] disabled:opacity-60 text-black font-semibold py-4 rounded-xl shadow-lg shadow-[#D4AF37]/15 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                <>
                  <Lock size={16} /> Authenticate
                </>
              )}
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#8E7A5A]/20 w-full text-center">
            <p className="text-[10px] text-[#C5B396]/60 font-mono uppercase tracking-widest">
              Unrestricted Area • Activity Monitored
            </p>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminLogin;
