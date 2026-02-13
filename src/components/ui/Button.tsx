'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'font-semibold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-body';

  const variants = {
    primary: 'bg-[#c71f2d] text-[#f4f4f4] border border-[#f4f4f4]/30 hover:bg-[#b61b28] active:translate-y-[2px] shadow-[0_5px_0_0_rgba(244,244,244,0.25)] active:shadow-[0_3px_0_0_rgba(244,244,244,0.25)]',
    secondary: 'bg-[#f4f4f4] text-[#292928] border border-[#292928]/30 hover:border-[#292928]/55 active:translate-y-[2px]',
    ghost: 'bg-transparent text-[#f4f4f4]/80 hover:bg-white/10 hover:text-[#f4f4f4] active:translate-y-[2px]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
