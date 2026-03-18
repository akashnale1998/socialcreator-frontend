import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export const Card = ({ children, className, glass = true, hover = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        glass ? 'glass-card' : 'bg-white/5 border border-white/10',
        hover && 'hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
