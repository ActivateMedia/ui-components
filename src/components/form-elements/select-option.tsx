import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';
import InlineSvg from '../inline-svg';

interface Option {
  label?: string;
  value?: string;
  color?: string;
  name?: string;
  logo?: string;
  type?: string;
  icon?: string;
}

interface SelectOptionProps {
  options: Array<Option>;
  panelClass?: string;
  optionClass?: string;
  onSelect?: (value: any) => void;
}

const SelectOption: FunctionComponent<SelectOptionProps> = ({
  options,
  onSelect,
  panelClass = 'text-sm bg-white',
  optionClass = 'hover:bg-gray-100 p-3'
}) => {
  const handleOptionSelect = (option: any) => {
    onSelect && onSelect(option);
  };

  return (
    <ul
      className={mergeCls(
        panelClass,
        'py-1.5 overflow-auto rounded-md shadow-md flex flex-wrap'
      )}
    >
      {options.map((option, index) => (
        <li
          key={index}
          className={mergeCls(
            optionClass,
            'cursor-pointer select-none relative flex w-full',
            option.type === 'divider' && '!py-0'
          )}
          onClick={() => handleOptionSelect(option)}
        >
          {option.icon && (
            <div className="flex items-start">
              <InlineSvg
                className={mergeCls(['text-center mr-3 inline-block'])}
                src={option.icon}
                width={20}
                height={20}
              />
            </div>
          )}
          {option.color && (
            <div className="flex items-start pt-1">
              <InlineSvg
                className={mergeCls(['text-center mr-3.5 inline-block'])}
                src={`../../assets/svg/${
                  option.value === '' ? 'plus.svg' : 'ellipse.svg'
                }`}
                width={16}
                height={16}
                color={option.color}
              />
            </div>
          )}
          {option.logo && (
            <div
              className="w-5 h-5 mr-2 "
              style={{
                backgroundImage: `url(${option.logo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
              }}
            />
          )}
          {!option.type && (
            <div className="flex items-start">{option.label}</div>
          )}
          {option.type === 'divider' && <hr className="w-full" />}
          {option.type === 'footer' && (
            <div
              className="text-xs text-dark-600"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {option.label}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SelectOption;
