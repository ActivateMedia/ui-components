import React from 'react';
import Shimmer from './shimmer';

const DocumentShimmer: React.FC<any> = (props: any) => {
  const { tab } = props;
  return (
    <div className="fixed w-[calc(100%-310px)] mx-auto z-50 bg-light-300 mt-3">
      <div className="px-8">
        <div className="max-w-[1150px] mx-auto bg-light-300">
          <div className="flex justify-between items-center">
            <div className="flex">
              <Shimmer className="w-[130px] h-6 rounded-md mb-4" />
            </div>
            <div className="flex items-center space-x-3 mr-3 mb-4">
              <div className="flex items-center space-x-3 mr-10">
                {tab && tab !== 'scheduledJobs' && (
                  <Shimmer className="w-[144px] h-10 rounded-md mt-2" />
                )}

                <Shimmer className="w-[144px] h-10 rounded-md mt-2" />
              </div>
              <Shimmer className="w-6 h-6 rounded-full mt-2" />
              <Shimmer className=" w-6 h-6 rounded-full mt-2" />
            </div>
          </div>
          <div className="flex">
            <div className="">
              <Shimmer className="w-[68px] h-4 rounded-md mt-3" />
              <Shimmer className="w-[68px] h-4 rounded-md mt-3 " />
            </div>
            <div className="w-[1200px]">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div className="flex items-center space-x-4 p-3" key={index}>
                  <>
                    <Shimmer className="w-5 h-5 rounded-full" />
                    <Shimmer className="w-full h-4 rounded-md" />
                    <Shimmer className="w-5 h-4 rounded-full " />
                  </>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-4">
            <Shimmer className="w-full h-px rounded mb-4 mt-6" />
          </div>
          <div className="flex">
            <div className="">
              <Shimmer className="w-[68px] h-4 rounded-md mt-3" />
              <Shimmer className="w-[68px] h-4 rounded-md mt-3 " />
            </div>
            <div className="w-[1200px]">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div className="flex items-center space-x-4 p-3" key={index}>
                  <>
                    <Shimmer className="w-5 h-5 rounded-full" />
                    <Shimmer className="w-full h-4 rounded-md" />
                    <Shimmer className="w-5 h-4 rounded-full " />
                  </>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-4">
            <Shimmer className="w-full h-px rounded mb-4 mt-6" />
          </div>
          <div className="flex">
            <div className="">
              <Shimmer className="w-[68px] h-4 rounded-md mt-3" />
              <Shimmer className="w-[68px] h-4 rounded-md mt-3 " />
            </div>
            <div className="w-[1200px]">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div className="flex items-center space-x-4 p-3" key={index}>
                  <>
                    <Shimmer className="w-5 h-5 rounded-full" />
                    <Shimmer className="w-full h-4 rounded-md" />
                    <Shimmer className="w-5 h-4 rounded-full " />
                  </>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-4">
            <Shimmer className="w-full h-px rounded mb-4 mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentShimmer;
