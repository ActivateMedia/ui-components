import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

interface IFloatingInput {
  id?: string;
  input?: any;
  type?: string;
  step?: any;
  className?: string;
  label?: string;
  dataType?: string;
  initialValue?: any;
  meta: {
    touched?: boolean;
    error?: string;
  };
  metaError?: string | undefined;
  min?: number;
  placeholder: string | undefined;
}

const FloatingInput: FunctionComponent<IFloatingInput> = ({
  input,
  className = 'w-full h-10 text-base text-gray-600 border-0 border-b border-gray-300',
  label,
  dataType,
  meta: { touched, error },
  metaError,
  min,
  placeholder = ' ',
  type = 'text',
  step = 'any',
  id = String(new Date().getTime())
}) => {
  return (
    <>
      <div className="relative">
        <input
          {...input}
          type={type}
          className={mergeCls([
            className,
            'text-sm block py-2.5 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          ])}
          placeholder={placeholder}
          maxLength={255}
          step={step}
          datatype={dataType}
          id={id}
          min={min}
        />

        {touched && (error || metaError) && (
          <p
            id="filled_error_help"
            className=" absolute mt-1 text-xs text-red-600 dark:text-red-400 font-medium"
          >
            {error || metaError}
          </p>
        )}
        {label && (
          <label
            htmlFor={id}
            className="absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default FloatingInput;
