import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Heading interface */
interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Heading Six component
 * @param {*} props
 * @returns
 */
const HeadingSix: FunctionComponent<HeadingProps> = (props) => {
  const { children, className = 'text-xs font-thin' } = props;
  return <h6 className={mergeCls([className])}>{children}</h6>;
};

export default HeadingSix;
