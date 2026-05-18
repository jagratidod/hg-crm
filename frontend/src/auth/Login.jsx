import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { User, Lock, ArrowRight, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = ({ role }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const [step, setStep] = useState(1); // 1: Identifier (Mobile/User), 2: OTP/Password
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getTitle = () => {
    switch(role) {
      case 'admin': return 'Admin Portal';
      case 'employee': return 'Employee App';
      case 'inventory': return 'Inventory App';
      case 'customer': return 'Customer App';
      default: return 'Login';
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!identifier) {
      toast.error('Please enter your details');
      return;
    }
    setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      // Accept any password for mock
      if (password || role === 'customer') {
        login({ id: 1, name: `Mock ${role}`, identifier }, role);
        toast.success(`Welcome back!`);
        navigate(`/${role}`);
      } else {
        toast.error('Invalid credentials');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col items-center">
        
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-hg-accent opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Logo */}
        <div className="w-24 h-24 mb-6 rounded-2xl bg-[#EAB308] flex items-center justify-center rotate-45 shadow-lg shadow-hg-accent/20">
            <div className="-rotate-45 p-2 w-full h-full flex items-center justify-center">
                <img src="/image.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-white mb-1">Welcome</h1>
          <p className="text-sm text-hg-gold-beige">your {getTitle().toLowerCase()}</p>
        </div>

        <form className="w-full space-y-4" onSubmit={step === 1 ? handleNext : handleLogin}>
          
          {step === 1 ? (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-hg-dark-gold">
                {role === 'customer' || role === 'employee' ? <Smartphone size={20} /> : <User size={20} />}
              </div>
              <input
                type={role === 'customer' || role === 'employee' ? "tel" : "text"}
                placeholder={role === 'customer' || role === 'employee' ? "Mobile Number" : "Username"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-[#2A2621] border border-transparent focus:border-hg-accent rounded-lg py-4 pl-12 pr-4 text-hg-cream placeholder-hg-dark-gold transition-all outline-none"
                autoFocus
              />
            </div>
          ) : (
            <div className="relative animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-hg-dark-gold">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder={role === 'customer' ? "Enter OTP" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2A2621] border border-transparent focus:border-hg-accent rounded-lg py-4 pl-12 pr-4 text-hg-cream placeholder-hg-dark-gold transition-all outline-none"
                autoFocus
              />
            </div>
          )}

          {step === 2 && role !== 'customer' && (
            <div className="flex justify-between items-center text-xs text-hg-gold-beige px-1">
              <button type="button" onClick={() => setStep(1)} className="hover:text-hg-accent transition-colors">
                Back
              </button>
              <button type="button" className="hover:text-hg-accent transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          <div className="pt-4 flex items-center gap-4">
             {role === 'customer' && step === 1 && (
                <button type="button" className="flex-1 bg-[#2A2621] text-hg-gold-beige py-4 rounded-lg font-medium hover:bg-[#342f29] transition-colors">
                    REGISTER
                </button>
             )}
             
             <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 bg-[#FBBF24] hover:bg-[#F59E0B] text-black py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                <>
                  {step === 1 ? 'NEXT' : 'LOGIN'}
                  {step === 1 && <ArrowRight size={18} />}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
