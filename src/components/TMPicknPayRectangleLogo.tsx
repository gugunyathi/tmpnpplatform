import React from 'react';

export interface TMPicknPayRectangleLogoProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

export const TMPicknPayRectangleLogo: React.FC<TMPicknPayRectangleLogoProps> = ({
  className = '',
  height = 42,
  width,
  alt = 'TM Pick n Pay',
}) => {
  const style: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
  };

  return (
    <div
      className={`bg-white rounded-lg p-1 shadow-sm inline-flex items-center justify-center select-none flex-shrink-0 overflow-hidden ${className}`}
      style={style}
      title={alt}
    >
      <img
        src="/tm-pick-n-pay-rectangle.svg"
        alt={alt}
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
