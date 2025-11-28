import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md'
}) => {
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <div className={`bg-white dark:bg-dark-50 rounded-lg shadow-md dark:shadow-none border border-gray-200 dark:border-dark-100 ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};
