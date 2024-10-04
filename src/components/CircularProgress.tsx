import React from 'react';

interface CircularProgressProps {
  value: number;
  label: string;
  size?: 'small' | 'large';
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, label, size = 'large' }) => {
  const sizeClass = size === 'small' ? 'w-16 h-16' : 'w-24 h-24';
  const fontSizeClass = size === 'small' ? 'text-xs' : 'text-sm';
  const labelFontSizeClass = size === 'small' ? 'text-xs' : 'text-base';

  return (
    <div className="flex flex-col items-center space-y-1 border-white border justify-center p-4 border-4">
      <div className={`relative ${sizeClass}`}>
        <svg className={`${sizeClass} transform -rotate-90`} viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            className="text-gray-400"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray="4, 2" // Dashed stroke
          />
          {/* Progress Circle */}
          <path
            className="text-white"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={`${value * 100}, 100`}
            strokeLinecap="round"
          />
        </svg>
        {/* Value inside the circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-semibold text-white ${fontSizeClass}`}>
            {(value * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      <div className={`text-white font-semibold ${labelFontSizeClass}`}>{label}</div>
    </div>
  );
};

export default CircularProgress;