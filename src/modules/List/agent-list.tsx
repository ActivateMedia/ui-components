import React, { FunctionComponent, ReactNode } from 'react';
import { get } from 'lodash';
import { mergeCls } from '../../utils/helper';
import InlineSvg from '../../components/inline-svg';

interface IProps {
  item: any;
  className: string;
  listClass: string;
  iconWidth: number;
  iconHeight: number;
  contentClass: string;
  agentIconClass?: string;
  iconContainerClass?: string;
  icon: string;
  onDropdownSelect: () => void;
  openModal: (item: any) => void;
  getAgentIcon: () => ReactNode;
  iconClickHandler: () => void;
}

const AgentList: FunctionComponent<IProps> = ({
  item,
  className,
  listClass,
  iconWidth,
  iconHeight,
  contentClass,
  agentIconClass,
  iconContainerClass,
  icon,
  openModal,
  onDropdownSelect,
  getAgentIcon,
  iconClickHandler
}) => {
  return (
    <>
      <div className={mergeCls([className, 'flex w-full rounded-full'])}>
        <div
          className={mergeCls([listClass, 'flex h-full w-[calc(100%-40px)]'])}
          onClick={onDropdownSelect}
        >
          {getAgentIcon()}
          <div className={mergeCls(['w-[calc(100%-50px)] flex-col h-full'])}>
            <p
              className={mergeCls([
                contentClass,
                'text-xs font-medium text-black whitespace-normal leading-5'
              ])}
            >
              <span>{item.name}</span>
            </p>
          </div>
        </div>
        <div
          id={`dropdown-${item._id}`}
          className={mergeCls([
            iconContainerClass,
            'flex justify-center items-center rounded-full relative hover:bg-dark-200 p-1'
          ])}
        >
          <InlineSvg
            className={mergeCls(['text-center cursor-pointer'])}
            src={icon}
            width={iconWidth}
            height={iconHeight}
            onClick={iconClickHandler}
          />
        </div>
      </div>
    </>
  );
};

export default AgentList;
