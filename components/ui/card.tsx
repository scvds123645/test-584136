import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-slate-100 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};