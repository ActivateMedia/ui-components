import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Heading interface */
interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Heading Three component
 * @param {*} props
 * @returns
 */
const HeadingThree: FunctionComponent<HeadingProps> = (props) => {
  const { children, className } = props;
  return <h3 className={mergeCls([className])}>{children}</h3>;
};

export default HeadingThree;
