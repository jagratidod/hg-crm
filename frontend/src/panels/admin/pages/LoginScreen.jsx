import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useErpStore, { ROLES, BRANCHES } from '../../../store/erpStore';
import { Shield, Lock, User, KeyRound, Smartphone, Landmark, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginScreen = () => {
  const login = useErpStore((state) => state.login);
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Role & Branch, 2: Login Details (Password/OTP), 3: Forgot Password, 4: OTP Verification
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (loginMethod === 'otp') {
      if (!mobile) {
        toast.error('Please enter your mobile number');
        return;
      }
      setStep(4); // Move to OTP entry
      setCountdown(30);
      toast.success('OTP sent to ' + mobile + ' (Use code: 1234)');
    } else {
      if (!username) {
        toast.error('Please enter your username');
        return;
      }
      setStep(2); // Move to password entry
    }
  };

  const handleSendOTP = () => {
    setCountdown(30);
    toast.success('OTP resent to ' + mobile + ' (Code: 1234)');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isPasswordValid = loginMethod === 'password' && password.length >= 4;
      const isOtpValid = loginMethod === 'otp' && otpCode === '1234';

      // Accept password length >= 4 or OTP 1234 for simulation
      if (isPasswordValid || isOtpValid) {
        const displayName = loginMethod === 'password' ? username : `Craftsman +91 ${mobile.slice(-4)}`;
        login({ id: `USR-${Date.now().toString().slice(-3)}`, name: displayName, identifier: username || mobile }, selectedRole, selectedBranch);
        toast.success(`Welcome to HG CRM ERP: logged in as ${selectedRole}`);
        navigate('/admin');
      } else {
        toast.error('Invalid credentials. (Hint: password must be >= 4 chars, OTP is 1234)');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F0F0F] relative overflow-hidden select-none">
      
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-[460px] glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col items-center z-10">
        
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
          <p className="text-xs text-[#C5B396] tracking-widest uppercase mt-1">Luxury Jewellery Manufacturing ERP</p>
        </div>

        {/* Back navigation buttons */}
        {step > 1 && (
          <button 
            onClick={() => setStep(step === 4 ? 1 : step - 1)} 
            className="self-start text-xs text-[#C5B396] hover:text-[#D4AF37] mb-4 transition-colors flex items-center gap-1"
          >
            ← Back
          </button>
        )}

        {/* STEP 1: SELECT ROLE & BRANCH */}
        {step === 1 && (
          <form className="w-full space-y-5" onSubmit={handleNextStep}>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5">
                <Landmark size={14} className="text-[#D4AF37]" /> Active Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5">
                <Shield size={14} className="text-[#D4AF37]" /> System Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Login Method Toggle */}
            <div className="flex gap-4 p-1 rounded-xl bg-[#161616] border border-[#8E7A5A]/20">
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className={`flex-1 text-center py-2 text-xs rounded-lg transition-colors font-medium ${loginMethod === 'password' ? 'bg-[#D4AF37] text-black' : 'text-[#C5B396] hover:text-white'}`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 text-center py-2 text-xs rounded-lg transition-colors font-medium ${loginMethod === 'otp' ? 'bg-[#D4AF37] text-black' : 'text-[#C5B396] hover:text-white'}`}
              >
                OTP Verification
              </button>
            </div>

            {/* Credential Inputs */}
            {loginMethod === 'password' ? (
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5">
                  <User size={14} className="text-[#D4AF37]" /> Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><User size={16} /></span>
                  <input
                    type="text"
                    placeholder="Enter employee ID or username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5">
                  <Smartphone size={14} className="text-[#D4AF37]" /> Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><Smartphone size={16} /></span>
                  <input
                    type="tel"
                    placeholder="Enter mobile linked with UID"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] active:scale-[0.98] text-black font-semibold py-4 rounded-xl shadow-lg shadow-[#D4AF37]/15 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              Continue Securely
            </button>
          </form>
        )}

        {/* STEP 2: PASSWORD ENTRY */}
        {step === 2 && (
          <form className="w-full space-y-5" onSubmit={handleLoginSubmit}>
            <div className="text-center mb-2">
              <span className="text-xs text-[#C5B396]">Logging into <strong>{selectedBranch}</strong> as <strong>{selectedRole}</strong></span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#C5B396] tracking-wider uppercase flex items-center gap-1.5">
                  <Lock size={14} className="text-[#D4AF37]" /> Password
                </label>
                <button type="button" onClick={() => setStep(3)} className="text-[10px] text-[#D4AF37] hover:underline">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><KeyRound size={16} /></span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-white text-sm outline-none transition-all"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] disabled:opacity-60 text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                'Verify & Enter'
              )}
            </button>

            <div className="text-center text-[10px] text-[#C5B396]/60">
              For testing, any password {">= 4"} characters works.
            </div>
          </form>
        )}

        {/* STEP 3: FORGOT PASSWORD */}
        {step === 3 && (
          <div className="w-full space-y-5">
            <div className="text-center">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Reset Password Request</h2>
              <p className="text-xs text-[#C5B396]">Enter your registered username or official Email ID. A secure link will be dispatched for credentials recovery.</p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Username or official email address"
                className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 text-white text-sm outline-none transition-all"
                required
              />
            </div>

            <button
              onClick={() => {
                toast.success('Recovery link sent successfully to registered address!');
                setStep(2);
              }}
              className="w-full bg-[#D4AF37] text-black font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest font-sans transition-colors"
            >
              Send Reset Code
            </button>
          </div>
        )}

        {/* STEP 4: OTP CODE INPUT */}
        {step === 4 && (
          <form className="w-full space-y-5" onSubmit={handleLoginSubmit}>
            <div className="text-center">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-1">OTP Verification</h2>
              <p className="text-xs text-[#C5B396]">A 4-digit code was sent to your phone ending in {mobile.slice(-4)}</p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7A5A]"><Lock size={16} /></span>
                <input
                  type="text"
                  placeholder="Enter 1234"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-[#161616] border border-[#8E7A5A]/30 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-white tracking-widest text-center text-lg outline-none transition-all font-mono"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#C59F2D] disabled:opacity-60 text-black font-semibold py-4 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                'Verify OTP'
              )}
            </button>

            <div className="flex justify-between items-center text-[11px] text-[#C5B396] px-1">
              <span>Code expires in: <strong>{countdown}s</strong></span>
              {countdown === 0 ? (
                <button type="button" onClick={handleSendOTP} className="text-[#D4AF37] font-semibold hover:underline">
                  Resend OTP
                </button>
              ) : (
                <span className="opacity-50">Resend (wait {countdown}s)</span>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default LoginScreen;

