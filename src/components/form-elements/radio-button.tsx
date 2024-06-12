import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

interface IRadioButton {
  id?: string;
  label: string;
  className: string;
  labelClass: string;
  input: any;
  dataType: any;
  meta: {
    touched?: boolean;
    error?: string;
  };
  metaError?: string | undefined;
}

/**
 * Handle radio button
 */
const RadioButton: FunctionComponent<IRadioButton> = ({
  input,
  className,
  label,
  dataType,
  labelClass,
  meta: { touched, error },
  metaError,
  id = String(new Date().getTime())
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className={mergeCls([
          labelClass,
          'flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer'
        ])}
      >
        <input
          {...input}
          id={id}
          type="radio"
          datatype={dataType}
          className={mergeCls([
            className,
            'w-4 h-4 mr-2 text-sm text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer'
          ])}
        />
        {label}
      </label>
      {touched && (error || metaError) && (
        <p
          id="filled_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium"
        >
          {error || metaError}
        </p>
      )}
    </div>
  );
};

export default RadioButton;
