import React from 'react';
import { useApp } from '../../context/AppContext';

interface MagetanLogoProps {
  className?: string;
  size?: number;
}

export const MagetanLogo: React.FC<MagetanLogoProps> = ({ className = 'w-10 h-10', size }) => {
  let customLogoUrl: string | null = null;
  try {
    const context = useApp();
    customLogoUrl = context?.customLogoUrl || null;
  } catch {
    // If used outside provider or initial render
  }

  if (customLogoUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`} style={size ? { width: size, height: size } : undefined}>
        <img
          src={customLogoUrl}
          alt="Logo Aplikasi"
          className="w-full h-full object-contain max-h-full drop-shadow-sm rounded"
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`} style={size ? { width: size, height: size } : undefined}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Outer Shield Frame - Gold / Yellow */}
        <path
          d="M100 10 L185 45 C185 140 160 200 100 230 C40 200 15 140 15 45 Z"
          fill="#EAB308"
          stroke="#CA8A04"
          strokeWidth="6"
        />

        {/* Inner Shield Body - Deep Emerald / Forest Green */}
        <path
          d="M100 18 L175 50 C175 135 152 190 100 220 C48 190 25 135 25 50 Z"
          fill="#065F46"
          stroke="#047857"
          strokeWidth="4"
        />

        {/* Top Banner Ribbon - Red and White */}
        <path
          d="M35 55 Q100 40 165 55 L160 70 Q100 55 40 70 Z"
          fill="#DC2626"
        />
        <path
          d="M40 70 Q100 55 160 70 L155 85 Q100 70 45 85 Z"
          fill="#FFFFFF"
        />

        {/* Mount Lawu Silhouette - Blue / White Peak */}
        <polygon
          points="100,75 145,150 55,150"
          fill="#1E3A8A"
        />
        <polygon
          points="100,75 115,100 85,100"
          fill="#FFFFFF"
        />

        {/* Rice & Cotton Sprigs */}
        <path
          d="M45 100 C 40 120, 50 155, 80 165 C 65 155, 55 135, 55 105 Z"
          fill="#FACC15"
        />
        <path
          d="M155 100 C 160 120, 150 155, 120 165 C 135 155, 145 135, 145 105 Z"
          fill="#F8FAFC"
        />

        {/* Golden Star at Top */}
        <polygon
          points="100,25 104,36 116,36 106,43 110,54 100,47 90,54 94,43 84,36 96,36"
          fill="#FACC15"
          stroke="#EAB308"
          strokeWidth="1"
        />

        {/* Water Waves */}
        <path
          d="M50 150 Q75 160 100 150 Q125 140 150 150 L145 175 Q125 165 100 175 Q75 185 55 175 Z"
          fill="#38BDF8"
        />
        <path
          d="M60 170 Q80 178 100 170 Q120 162 140 170 L135 188 Q118 180 100 188 Q82 196 65 188 Z"
          fill="#0284C7"
        />

        {/* Text Ribbon - "MAGETAN" */}
        <rect x="42" y="192" width="116" height="20" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
        <text
          x="100"
          y="206"
          fill="#854D0E"
          fontSize="11"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="sans-serif"
          letterSpacing="1"
        >
          MAGETAN
        </text>
      </svg>
    </div>
  );
};
