import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'medium'
}) => {
  const className = ['badge', `badge--${variant}`, `badge--${size}`].join(' ');

  return <span className={className}>{children}</span>;
};
