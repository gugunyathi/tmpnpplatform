import React from 'react';

interface TMPicknPaySquareLogoProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

export const TMPicknPaySquareLogo: React.FC<TMPicknPaySquareLogoProps> = ({
  className = '',
  size = 42,
  alt = 'TM Pick n Pay',
}) => {
  const dimensionStyle = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  };

  return (
    <div
      className={`bg-white rounded-lg p-0.5 shadow-sm inline-flex items-center justify-center select-none flex-shrink-0 overflow-hidden ${className}`}
      style={dimensionStyle}
      title="TM Pick n Pay"
    >
      <img
        src="/tm-pick-n-pay-logo.svg"
        alt={alt}
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
