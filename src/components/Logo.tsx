/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import officialLogoImg from '../assets/images/logo-official.jpg';

export const OFFICIAL_LOGO_SRC = officialLogoImg;

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold' | 'monochrome';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  withWhiteBg?: boolean;
  bgRadius?: number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  withBorder?: boolean;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  rounded = 'xl',
  withWhiteBg = true,
  withBorder = false,
  alt = 'MG Abogados & Consultores'
}) => {
  // Preset dimensions if className doesn't specify
  const sizeClasses: Record<string, string> = {
    xs: 'w-6 h-6',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const roundedClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  const roundedClass = roundedClasses[rounded] || 'rounded-xl';
  const sizeClass = className ? '' : (sizeClasses[size] || 'w-16 h-16');

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none ${
        withWhiteBg ? 'bg-white' : ''
      } ${withBorder ? 'border border-[#C5A880]/60 shadow-sm' : ''} ${roundedClass} ${sizeClass} ${className}`}
      style={{ aspectRatio: '1/1' }}
    >
      <img
        src={OFFICIAL_LOGO_SRC}
        alt={alt}
        className={`w-full h-full object-contain p-0.5 ${roundedClass}`}
        loading="eager"
      />
    </div>
  );
};
