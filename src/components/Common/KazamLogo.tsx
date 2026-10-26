import React, { useState } from 'react';
import { KAZAM_INFO } from '../../utils/constants';

interface KazamLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const KazamLogo: React.FC<KazamLogoProps> = ({ className = '', size = 'md' }) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!imageError ? (
        <img
          src={KAZAM_INFO.logoUrl}
          alt="KAZAM Materiais de Construção"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${sizeClasses[size]} w-auto object-contain max-w-[200px]`}
        />
      ) : null}

      {/* Fallback or Complementary Brandmark if image fails or while loading */}
      {imageError && (
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-sm border border-amber-400">
            K
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold tracking-tight text-white leading-none">
              KAZAM
            </span>
            <span className="text-[10px] tracking-wider font-semibold text-amber-400 uppercase mt-0.5">
              Materiais de Construção
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
