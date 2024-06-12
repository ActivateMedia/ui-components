import { FunctionComponent } from 'react';
import InlineSvg from '../inline-svg';

/* Button interface */
interface LogoProps {
  svg: string;
  clickHandler?: () => void;
}

/**
 * Logo component
 *
 * @param {*} props
 * @returns
 */
const Index: FunctionComponent<LogoProps> = ({
  svg,
  clickHandler = () => void 0
}) => {
  return (
    <div className="flex">
      <button onClick={clickHandler} className="flex">
        <InlineSvg src={svg} width={120} height={28} />
      </button>
    </div>
  );
};

export default Index;
