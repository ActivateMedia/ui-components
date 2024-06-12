import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

interface ArraySelectProps {
  input?: any;
  options?: any;
  className?: string;
  label?: string;
  dataType?: string;
  id?: string;
  meta: {
    touched?: boolean;
    error?: string;
  };
  metaError?: string | undefined;
}

const Select: FunctionComponent<ArraySelectProps> = ({
  className,
  dataType,
  options,
  input,
  id = String(new Date().getTime()),
  meta: { touched, error },
  metaError
}) => {
  return (
    <>
      <div className="relative">
        <select
          {...input}
          id={id}
          datatype={dataType}
          className={mergeCls([
            className,
            'block h-[44px] px-3 w-full text-sm text-gray-500 border bg-light-200 border-gray-300 rounded-md appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
          ])}
        >
          <option className="px-2" value="">
            Select
          </option>
          {options?.map((option: any, index: any) => (
            <option className="px-2" key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {touched && (error || metaError) && (
          <p
            id="filled_error_help"
            className=" absolute mt-1 text-xs text-red-600 dark:text-red-400 font-medium"
          >
            {error || metaError}
          </p>
        )}
      </div>
    </>
  );
};

export default Select;
