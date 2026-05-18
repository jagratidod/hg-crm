import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all shadow-lg";
  
  const variants = {
    primary: "bg-hg-accent hover:bg-[#d8b859] text-black shadow-hg-accent/20",
    secondary: "bg-[#2A2621] hover:bg-[#342f29] text-hg-cream border border-hg-dark-gold/30",
    danger: "bg-hg-danger hover:bg-red-600 text-white shadow-hg-danger/20",
    ghost: "bg-transparent hover:bg-white/5 text-hg-gold-beige shadow-none"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
