import React, { useState, ReactNode } from 'react';
import { mergeCls } from '../../utils/helper';

type TabProps = {
  label: string;
  children: ReactNode;
};

export const Tabs: React.FC<any> = ({ ulClass, tabClass, children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const activateTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <ul
        className={mergeCls([
          ulClass,
          'flex flex-wrap -mb-px text-sm font-medium text-center border-b border-dark-100'
        ])}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;

          const isActive = index === activeTab;
          const tabElement = child as React.ReactElement<TabProps>;

          return (
            <li
              className={`-mb-px mr-1 ml-6 ${
                isActive && 'border-b rounded-t-lg border-dark-900'
              }`}
              key={index}
            >
              <button
                className={`${
                  isActive
                    ? 'font-bold bg-white'
                    : 'font-medium hover:text-gray-700 hover:bg-gray-100'
                } p-3 focus:outline-none text-dark-900`}
                onClick={() => activateTab(index)}
              >
                {tabElement.props.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className={mergeCls([tabClass, 'p-6'])}>
        {React.Children.toArray(children)[activeTab]}
      </div>
    </>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};
