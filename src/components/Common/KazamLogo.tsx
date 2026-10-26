import React, { useState } from 'react';
import { KAZAM_INFO } from '../../utils/constants';

interface KazamLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const KazamLogo: React.FC<KazamLogoProps> = ({ className = '', size = 'md' }) => {
  const [imageError, setImageError] = useState(false);

  // Calibrated to fill the header space prominently (matching the requested blue outline)
  const sizeConfig = {
    sm: {
      wrap: 'h-12 w-40',
      scale: 'scale-[1.8]',
    },
    md: {
      // Sized generously to match the user's blue marking in the header
      wrap: 'h-20 sm:h-24 w-56 sm:w-72',
      scale: 'scale-[2.2] sm:scale-[2.4]',
    },
    lg: {
      wrap: 'h-24 sm:h-28 w-64 sm:w-80',
      scale: 'scale-[2.5]',
    },
    xl: {
      wrap: 'h-28 sm:h-32 w-72 sm:w-96',
      scale: 'scale-[2.7]',
    }
  };

  const current = sizeConfig[size];

  return (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <div className={`relative flex items-center justify-center overflow-hidden ${current.wrap} select-none`}>
          <img
            src={KAZAM_INFO.logoUrl}
            alt="KAZAM Casa & Construção"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-contain ${current.scale} transition-transform duration-200 drop-shadow-xs`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-sm">
            K
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
              KAZAM
            </span>
            <span className="text-xs tracking-wider font-bold text-amber-700 uppercase mt-1">
              Casa & Construção
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
