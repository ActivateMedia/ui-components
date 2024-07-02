import React from 'react';
import Shimmer from './shimmer';

const QueueShimmer: React.FC = () => {
  return (
    <div className="fixed w-full h-full mx-auto z-50 bg-white">
      <div className="flex p-6">
        <Shimmer className="w-[269px] h-11 rounded-md" />
      </div>
      <Shimmer className="h-px rounded-md" />
    </div>
  );
};

export default QueueShimmer;
