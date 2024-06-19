import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

interface BoxShadowProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

const BoxShadow: FunctionComponent<BoxShadowProps> = ({
  className = 'shadow-100 h-60 w-1/2',
  children
}) => {
  return <div className={mergeCls([className])}>{children}</div>;
};

export default BoxShadow;
