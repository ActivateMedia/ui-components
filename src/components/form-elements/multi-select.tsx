import { FunctionComponent, useState, useEffect, useRef } from 'react';
import InlineSvg from '../inline-svg';
import { mergeCls } from '../../utils/helper';

interface IProps {
  input?: any;
  options?: any;
  className?: string;
  dataType?: string;
  multiple?: string;
  id?: string;
  meta: {
    touched?: boolean;
    error?: string;
  };
  metaError?: string | undefined;
}

const MultiSelect: FunctionComponent<IProps> = ({
  className,
  dataType,
  options,
  input,
  meta: { touched, error },
  metaError,
  id = String(new Date().getTime())
}) => {
  const ddRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>([]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const dropdown = ddRef.current;
    if (
      dropdown &&
      !dropdown.contains(target) &&
      !target.closest('.dd-container')
    ) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleTouched = () => {
    input.onBlur();
    setIsOpen(!isOpen);
  };

  const handleChange = (value: any) => {
    let values = selected;
    if (values.includes(value)) {
      values = values.filter((item: any) => item !== value);
    } else {
      values = [...values, value];
    }
    setSelected(values);
    input.onChange(values);
  };

  const removeItem = (value: any) => {
    const values = selected.filter((item: any) => item !== value);
    setSelected(values);
    input.onChange(values);
  };

  const getSelectedOptions = () => {
    if (selected.length === 0) {
      return <span className="text-sm">Select</span>;
    } else if (selected.length > 0) {
      return selected.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="dd-container bg-dark-100 w-auto flex items-center gap-3 py-1 px-2 rounded cursor-default"
          >
            <span className="text-sm">{item}</span>
            <InlineSvg
              className={mergeCls(['text-center inline-block cursor-pointer'])}
              src="../..../../assets/svg/close.svg"
              width={10}
              height={10}
              onClick={() => removeItem(item)}
            />
          </div>
        );
      });
    }
  };

  return (
    <>
      <div id={id} datatype={dataType} className="relative" ref={ddRef}>
        <div
          role="button"
          onClick={handleTouched}
          className={mergeCls(
            className,
            'h-[44px] px-3 w-full flex justify-between items-center border bg-light-200 border-gray-300 rounded-md'
          )}
        >
          <div className="flex items-center [&>*:not(:last-child)]:mr-2">
            {getSelectedOptions()}
          </div>
          <InlineSvg
            className={mergeCls([
              isOpen ? 'rotate-180' : '',
              'text-center inline-block'
            ])}
            src="../../assets/svg/arrow.svg"
            width={18}
            height={18}
          />
        </div>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <ul className="p-3 overflow-auto rounded-md shadow-md max-h-60 flex flex-wrap [&>*:not(:last-child)]:mb-2">
              {options.map((option: any, index: number) => (
                <li
                  key={`key-${String(index)}`}
                  className={mergeCls(
                    'select-none relative flex w-full',
                    option.type === 'divider' && '!py-0'
                  )}
                >
                  <label
                    htmlFor={`checkbox-${index}`}
                    className="flex w-full cursor-pointer justify-between"
                    onClick={() => handleChange(option.value)}
                  >
                    <div className="">
                      <span className="text-sm">{option.name}</span>
                    </div>
                    <div
                      className={mergeCls(
                        selected.includes(option.value)
                          ? 'bg-blue-500'
                          : 'bg-white border border-gray-600 dark:border-gray-600 dark:bg-gray-700',
                        ' relative w-4 h-4 text-sm rounded cursor-pointer'
                      )}
                    >
                      {selected.includes(option.value) && (
                        <svg
                          className="dd-container absolute inset-0 w-full h-full text-light-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {touched && (error || metaError) && (
        <p
          id="filled_error_help"
          className=" absolute mt-1 text-xs text-red-600 dark:text-red-400 font-medium"
        >
          {error || metaError}
        </p>
      )}
    </>
  );
};

export default MultiSelect;
