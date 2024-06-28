import React from 'react';
import Shimmer from './shimmer'; // Import the Shimmer component

const SideBarShimmer: React.FC<any> = ({ showCalendarShimmer }) => {
  return (
    <div className="w-[264px] border-r flex flex-col bg-light-200 h-[100vh-52px] sidebar">
      {/* Shimmer for Heading */}
      <div className="flex items-center space-x-4 mt-6 mx-4">
        <Shimmer className="w-12 h-10 rounded-full" />
        <Shimmer className="w-[162px] h-6 rounded" />
        <Shimmer className="w-6 h-5 rounded-full" />
      </div>

      <div className="mx-4  pt-0">
        <Shimmer className="w-full  h-px rounded mb-4 mt-6" />
      </div>

      {/* Conditionally render Calendar Shimmer */}
      {showCalendarShimmer && (
        <>
          <div className="">
            <div className="p-3 mt-2 pt-0">
              {[1, 2, 3].map((_, index) => (
                <div
                  className="flex items-center space-x-4 mt-3 ml-1"
                  key={index}
                >
                  <Shimmer className="w-5 h-5 rounded-full" />
                  <Shimmer className="w-[152px] h-4 rounded" />
                </div>
              ))}
            </div>
            <div className="mx-4  pt-0">
              <Shimmer className="w-full  h-px rounded mb-4 mt-6" />
            </div>
            <div className="flex items-center space-x-4 mx-4">
              <Shimmer className="w-8 h-5 rounded-full" />
              <Shimmer className="w-full h-4 rounded" />
              <Shimmer className="w-8 h-5 rounded-full" />
            </div>
            <div className="mx-4">
              <Shimmer className="w-full h-[184px] rounded mb-4 mt-6" />
            </div>
          </div>

          <div className="mx-4 pt-0">
            <Shimmer className="w-full h-px rounded mb-4 mt-6" />
          </div>

          <div className="mx-4 pt-0">
            <Shimmer className="w-12 h-5 rounded mb-4 mt-6" />
          </div>

          <div className="p-4 mt-2 pt-0">
            {[1, 2, 3, 4].map((_, index) => (
              <div className="flex items-center space-x-4 mt-3" key={index}>
                <Shimmer className="w-7 h-5 rounded-full" />
                <Shimmer className="w-full h-4 rounded" />
                <Shimmer className="w-7 h-5 rounded-full" />
              </div>
            ))}
          </div>
        </>
      )}

      {!showCalendarShimmer && (
        <div className="mx-4">
          <Shimmer className="w-[62px] h-6 rounded mb-4 mt-6" />
        </div>
      )}
    </div>
  );
};

export default SideBarShimmer;
