import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Heading interface */
interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Heading Two component
 * @param {*} props
 * @returns
 */
const HeadingTwo: FunctionComponent<HeadingProps> = (props) => {
  const { children, className } = props;
  return <h2 className={mergeCls([className])}>{children}</h2>;
};

export default HeadingTwo;
