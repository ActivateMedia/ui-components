import { ReactNode, FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/* Paragraph interface */
interface ParagraphProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Paragraph component
 * @param {*} props
 * @returns
 */
const Paragraph: FunctionComponent<ParagraphProps> = (props) => {
  const { children, className = 'font-medium text-xl' } = props;
  return <p className={mergeCls([className])}>{children}</p>;
};

export default Paragraph;
