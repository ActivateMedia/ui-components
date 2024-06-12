import React from 'react';
import { mergeCls } from '../../utils/helper';

interface DaySelectorProps {
  letter: string;
  className?: string;
  selected: boolean;
  onClick: () => void;
}

const Index: React.FunctionComponent<DaySelectorProps> = ({
  letter,
  className,
  selected,
  onClick
}) => {
  return (
    <div
      className={mergeCls([
        className,
        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer',
        selected ? 'bg-indigo-500 text-white' : 'text-dark-400 bg-light-200'
      ])}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

export default Index;
