import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { mergeCls } from '../../utils/helper';
import InlineSvg from '../inline-svg';
import SelectOption from './select-option';

interface Option {
  label: string;
  value: string;
  color: string;
}

interface SelectInputProps {
  options: Array<Option>;
  className?: string;
  optionClass?: string;
  panelClass?: string;
  color?: string;
  selectedOption?: any;
  setAgentForInput?: any;
  onChange?: (value: any) => void;
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
  options,
  selectedOption,
  panelClass,
  optionClass,
  color = '#111111',
  onChange = () => void 0,
  setAgentForInput = () => void 0,
  className = 'w-40 rounded-md font-medium text-sm border-gray-400 justify-between bg-white text-black'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
    setAgentForInput && setAgentForInput(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {selectedOption && (
        <>
          <button
            type="button"
            className={mergeCls(
              className,
              'z-10 rounded-md text-left flex items-center',
              options.length === 1 && 'cursor-default'
            )}
            onClick={handleToggleDropdown}
          >
            <span
              className={`${
                selectedOption?.logo && 'text-base font-bold'
              } items-center line-clamp-1 flex`}
            >
              {selectedOption?.logo && (
                <div
                  className="mr-2 inline-block"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img
                    alt={selectedOption.value}
                    src={selectedOption.logo}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              )}
              {selectedOption?.label}
            </span>
            {options.length > 1 && (
              <InlineSvg
                className={mergeCls([
                  isOpen ? 'rotate-180' : '',
                  'text-center inline-block'
                ])}
                src="../../assets/svg/arrow.svg"
                width={18}
                height={18}
                color={color}
              />
            )}
          </button>
          {isOpen && options.length > 1 && (
            <div className="absolute mt-2 w-full rounded-md shadow-lg z-[100]">
              <SelectOption
                options={options}
                onSelect={handleOptionSelect}
                panelClass={`overflow-hidden	${panelClass}`}
                optionClass={optionClass}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectInput;
