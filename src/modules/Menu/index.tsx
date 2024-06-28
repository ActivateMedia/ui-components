import React, { FunctionComponent } from 'react';

import InlineSvg from '../../components/inline-svg';
import HeadingThree from '../../components/typography/headingThree';

interface IProps {
  label: string;
  active?: string;
  onClick: () => void;
  iconSrc: any;
}
const MenuItem: FunctionComponent<IProps> = ({
  label,
  active,
  onClick,
  iconSrc
}) => {
  return (
    <div className="cursor-pointer mb-1" onClick={onClick}>
      <div
        className={`py-2 flex hover:bg-dark-100 border-l-4  hover:border-l-[#5379FF] ${
          active && 'bg-dark-100  border-l-[#5379FF]'
        }`}
      >
        <InlineSvg
          className="text-center mx-3"
          src={iconSrc}
          width={20}
          height={20}
          color="ffffff"
        />
        <HeadingThree
          className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}
        >
          {label}
        </HeadingThree>
      </div>
    </div>
  );
};

export default MenuItem;
