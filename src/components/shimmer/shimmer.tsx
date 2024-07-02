import React from 'react';
interface ShimmerProps {
  className: string;
}
const Shimmer: React.FC<ShimmerProps> = ({ className }) => {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
};

export default Shimmer;
