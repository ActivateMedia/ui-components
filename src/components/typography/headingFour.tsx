import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Heading interface */
interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Heading Four component
 * @param {*} props
 * @returns
 */
const HeadingFour: FunctionComponent<HeadingProps> = (props) => {
  const { children, className } = props;
  return <h4 className={mergeCls([className])}>{children}</h4>;
};

export default HeadingFour;
