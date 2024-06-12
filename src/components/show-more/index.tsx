import { useState, FunctionComponent } from 'react';
import InlineSvg from '../inline-svg';
import Button from '../button';
import { mergeCls } from '../../utils/helper';

interface ShowMoreProps {
  items?: any;
  itemsLeft?: number;
  className?: string;
  color?: string;
  toggleShowMore?: any;
  initialItemsToShow?: any;
  label?: any;
}

const Index: FunctionComponent<ShowMoreProps> = ({
  color,
  className = '',
  toggleShowMore,
  itemsLeft
}) => {
  const [showMore, setShowMore] = useState(false);

  function handleButtonClick() {
    const newValue = !showMore;
    setShowMore(newValue);
    toggleShowMore(newValue);
  }

  return (
    <Button
      type="button"
      className={mergeCls([className])}
      onClick={handleButtonClick}
    >
      {showMore
        ? `Show Less`
        : itemsLeft === 1
          ? `Show ${itemsLeft} more CV`
          : `Show ${itemsLeft} more CVs`}
      <InlineSvg
        className={mergeCls([
          'ml-2',
          showMore ? 'rotate-180' : '',
          'text-center'
        ])}
        src="../../assets/svg/arrowIcon.svg"
        width={12}
        height={12}
        color={color}
      />
    </Button>
  );
};

export default Index;
