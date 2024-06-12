/* eslint-disable @next/next/no-img-element */
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { mergeCls } from '../../utils/helper';
import InlineSvg from '../inline-svg';
import SelectOption from './select-option';

interface Option {
  label: string;
  value: string;
  color: string;
}

interface SearchInputProps {
  options: Array<Option>;
  className?: string;
  optionClass?: string;
  panelClass?: string;
  color?: string;
  onChange?: (value: any) => void;
  selectedOption?: any;
  setAgentForInput?: any;
}

const SearchInput: FunctionComponent<SearchInputProps> = ({
  options,
  selectedOption,
  panelClass,
  optionClass,
  color = '#111111',
  className = 'w-40 rounded-md font-medium text-sm border-gray-400 justify-between bg-white text-black',
  onChange = () => void 0,
  setAgentForInput = () => void 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen]);

  const handleToggleDropdown = () => {
    if (options.length > 1) {
      setIsOpen(true);
      setSearchInput('');
    }
  };

  const handleOptionSelect = (option: Option) => {
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
    setAgentForInput && setAgentForInput(null);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );

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
            onClick={isOpen ? undefined : handleToggleDropdown}
          >
            <span
              className={`${
                selectedOption?.logo && 'text-base font-bold'
              } items-center line-clamp-1 flex`}
            >
              <InlineSvg
                className={mergeCls([
                  'text-center inline-block',
                  !isOpen && 'mr-3.5'
                ])}
                src={`../../assets/svg/${
                  selectedOption.value === '' || isOpen
                    ? 'plus.svg'
                    : 'ellipse.svg'
                }`}
                width={selectedOption.value === '' ? 20 : 16}
                height={selectedOption.value === '' ? 20 : 16}
                color={selectedOption.color}
              />

              {isOpen ? (
                <input
                  type="text"
                  value={searchInput}
                  ref={inputRef}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-40 bg-transparent border-none focus:ring-0 "
                />
              ) : (
                <span className="max-w-[180px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {selectedOption?.label}
                </span>
              )}
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
                onClick={closeDropdown}
              />
            )}
          </button>
          {isOpen && options.length > 1 && (
            <div className="absolute mt-2 w-full rounded-md shadow-lg z-[100]">
              <SelectOption
                options={filteredOptions}
                onSelect={handleOptionSelect}
                panelClass={`overflow-hidden max-h-60	${panelClass}`}
                optionClass={optionClass}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchInput;
