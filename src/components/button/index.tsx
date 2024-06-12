import { ReactNode, FunctionComponent } from 'react';
import InlineSvg from '../inline-svg';
import { mergeCls } from '../../utils/helper';

/* Button interface */
interface ButtonProps {
  id?: string;
  type: 'button' | 'submit' | 'reset';
  children?: ReactNode | ReactNode[];
  className?: string;
  onClick?: any;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  iconColor?: string;
}

/**
 * Button component
 *
 * @param {*} props
 * @returns
 */
const Index: FunctionComponent<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  iconColor,
  type = 'button',
  disabled = false,
  className = 'px-1 py-1 text-center',
  id = `id-${Math.random()}-${Math.random()}`,
  onClick = () => void 0
}) => {
  return (
    <button
      id={id}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={mergeCls([
        className,
        disabled && 'cursor-not-allowed',
        'h-11 text-sm py-2.5 '
      ])}
    >
      {leftIcon && (
        <InlineSvg
          className={mergeCls(['text-center ', children !== null && 'mr-4'])}
          src={`../../assets/svg/${leftIcon}`}
          width={20}
          height={20}
          color="ffffff"
        />
      )}

      {children}
      {rightIcon && (
        <InlineSvg
          className={mergeCls(['text-center ', children !== null && 'ml-4'])}
          src={`../../assets/svg/${rightIcon}`}
          width={16}
          height={16}
          color={iconColor}
        />
      )}
    </button>
  );
};

export default Index;
