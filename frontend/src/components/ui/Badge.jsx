import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = "px-2.5 py-0.5 rounded text-xs font-medium border";
  
  const variants = {
    default: "bg-[#2A2621] text-hg-gold-beige border-hg-dark-gold/30",
    success: "bg-hg-success/10 text-hg-success border-hg-success/20",
    warning: "bg-hg-accent/10 text-hg-accent border-hg-accent/20",
    danger: "bg-hg-danger/10 text-hg-danger border-hg-danger/20",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
