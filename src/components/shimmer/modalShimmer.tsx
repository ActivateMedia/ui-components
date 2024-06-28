import React from 'react';
import Shimmer from './shimmer';

export const HeaderShimmer: React.FC = () => {
  return <Shimmer className="w-[1016px] h-6 rounded-md" />;
};

export const BodyShimmer: React.FC = () => {
  return (
    <div className="relative ">
      <div className="flex ">
        <Shimmer className="w-full h-4 rounded-md mb-3" />
      </div>
      <div className="flex ">
        <Shimmer className="w-full h-4 rounded-md mb-3" />
      </div>
      <div className="flex ">
        <Shimmer className="w-[1016px] h-4 rounded-md mb-3" />
      </div>
    </div>
  );
};
