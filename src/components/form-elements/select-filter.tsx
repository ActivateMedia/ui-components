import { FunctionComponent, useEffect, useState, useRef } from 'react';
import { mergeCls } from '../../utils/helper';
import { get } from 'lodash';
import InlineSvg from '../inline-svg';
import Button from '../button';

interface SelectFilterProps {
  options: any[];
  className?: string;
  optionClass?: string;
  panelClass?: string;
  defaultOption?: string;
  selectedFilter: any;
  buttonClass: any;
  setSelectedFilter: (value: any) => void;
  setClassName: (value: any) => void;
  applyFilter: (value: any) => void;
}

const SelectFilter: FunctionComponent<SelectFilterProps> = ({
  options,
  panelClass,
  optionClass,
  defaultOption,
  selectedFilter,
  buttonClass,
  setClassName,
  setSelectedFilter,
  applyFilter = () => void 0,
  className = 'w-40 rounded-md font-medium text-sm border-gray-400 justify-between bg-white text-black'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetTriggered, setResetTriggered] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    if (resetTriggered) {
      apply();
      setResetTriggered(false);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [resetTriggered, isOpen, filterRef]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (filterRef.current && !filterRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: any) => {
    const updatedFilter = [...selectedFilter];
    const index = updatedFilter.findIndex(
      (item: any) => item?.type === defaultOption
    );
    if (index !== -1) {
      const valuesIndex = updatedFilter[index]?.values.indexOf(option.value);
      if (valuesIndex !== -1) {
        updatedFilter[index]?.values.splice(valuesIndex, 1);
        if (get(updatedFilter[index], 'values.length', 0) === 0) {
          updatedFilter.splice(index, 1);
        }
      } else {
        updatedFilter[index]?.values.push(option.value);
      }
    } else {
      updatedFilter.push({ type: defaultOption, values: [option.value] });
    }
    setSelectedFilter(updatedFilter);
  };

  const filterIndex = selectedFilter?.findIndex(
    (item: any) => item?.type === defaultOption
  );

  const UpdateButtonClass = () => {
    const conditionMatches =
      selectedFilter[filterIndex]?.type === defaultOption &&
      selectedFilter[filterIndex]?.values.length > 0;
    setClassName((prevButtonClass: any) => {
      if (conditionMatches && !prevButtonClass.includes(defaultOption)) {
        return [...prevButtonClass, defaultOption];
      } else if (!conditionMatches && prevButtonClass.includes(defaultOption)) {
        return prevButtonClass.filter((item: any) => item !== defaultOption);
      } else {
        return prevButtonClass;
      }
    });
  };

  const apply = () => {
    applyFilter(selectedFilter);
    UpdateButtonClass();
    setIsOpen(false);
  };

  const handleReset = () => {
    const updatedFilter = [...selectedFilter];
    updatedFilter.splice(filterIndex, 1);
    setSelectedFilter(updatedFilter);
    setResetTriggered(true);
  };

  return (
    <div className="relative" ref={filterRef} id={`filter-${defaultOption}`}>
      <button
        type="button"
        className={mergeCls(
          className,
          'z-10 rounded-md text-left flex items-center capitalize',
          buttonClass.includes(defaultOption) &&
            'border-primary-900 text-primary-900'
        )}
        onClick={handleToggleDropdown}
      >
        <span className="items-center line-clamp-1 flex">{defaultOption}</span>
        <InlineSvg
          className={mergeCls([
            isOpen ? 'rotate-180' : '',
            'text-center inline-block'
          ])}
          src="../../assets/svg/arrow.svg"
          width={18}
          height={18}
        />
      </button>
      {isOpen && options.length > 0 && (
        <div className="absolute mt-2 w-[235px] rounded-md shadow-lg z-50">
          <ul
            className={mergeCls(
              panelClass,
              'w-full overflow-auto rounded-md shadow-md flex flex-wrap list-none pt-3'
            )}
          >
            <li
              className={mergeCls(
                optionClass,
                !selectedFilter[filterIndex]?.values.length &&
                  'border-b border-dark-100 border-solid pb-3',
                'select-none relative flex w-full font-bold'
              )}
            >
              {`Filter by ${defaultOption}`}
            </li>

            {selectedFilter[filterIndex]?.type === defaultOption &&
              selectedFilter[filterIndex]?.values.length > 0 && (
                <li
                  className={mergeCls(
                    optionClass,
                    'hover:bg-gray-100 cursor-pointer relative flex w-full font-bold text-primary-900 pb-3 border-b border-dark-100 border-solid'
                  )}
                  onClick={handleReset}
                >
                  Reset filter
                </li>
              )}
            {options.map((option: any, index: any) => (
              <li
                key={index}
                className={mergeCls(
                  optionClass,
                  ' hover:bg-gray-100 cursor-pointer select-none relative flex w-full justify-between'
                )}
                onClick={() => handleOptionSelect(option)}
              >
                <span className="max-w-[20ch] overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {option.label}
                </span>
                {selectedFilter[filterIndex]?.type === defaultOption &&
                  selectedFilter[filterIndex]?.values.includes(option.value) >
                    0 && (
                    <InlineSvg
                      className={mergeCls(['text-center inline-block'])}
                      width={20}
                      src="../../assets/svg/tick.svg"
                      height={20}
                    />
                  )}
              </li>
            ))}
            <hr className=" border-gray-300 pt-3 max-w-[1200px] mx-auto" />
            <li
              className={mergeCls(
                optionClass,
                'cursor-pointer select-none flex w-full justify-between sticky bottom-0 bg-white border-t border-dark-100 border-solid'
              )}
            >
              <div className="flex space-x-3 w-full  py-3">
                <Button
                  type="button"
                  className="w-[99.5px] rounded-md font-medium text-black border border-dark-900 py-3 px-6 flex items-center"
                  onClick={handleToggleDropdown}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-[99.5px] bg-primary-900 hover:bg-primary-90 font-medium text-white disabled:opacity-50 px-6 py-3 rounded-md"
                  onClick={apply}
                >
                  Apply
                </Button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectFilter;
