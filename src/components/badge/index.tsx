import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Badge interface */
interface BadgeProps {
  className?: string;
  badgeText: string;
}

/**
 * Badge component
 *
 * @param {*} props
 * @returns
 */
const Index: FunctionComponent<BadgeProps> = ({
  badgeText,
  className = 'bg-red-100 text-red-800 border-red-400'
}) => {
  return (
    <span
      className={mergeCls([
        className,
        'mx-2 text-xs font-medium  px-1.5 py-0.2 rounded border'
      ])}
    >
      {badgeText}
    </span>
  );
};

export default Index;
