import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Heading interface */
interface HeadingProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Heading One component
 * @param {*} props
 * @returns
 */
const HeadingOne: FunctionComponent<HeadingProps> = (props) => {
  const { children, className = 'text-xl font-bold' } = props;
  return <h1 className={mergeCls([className])}>{children}</h1>;
};

export default HeadingOne;
