import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Heading interface */
interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Heading Five component
 * @param {*} props
 * @returns
 */
const HeadingFive: FunctionComponent<HeadingProps> = (props) => {
  const { children, className = 'text-sm font-normal' } = props;
  return <h5 className={mergeCls([className])}>{children}</h5>;
};

export default HeadingFive;
