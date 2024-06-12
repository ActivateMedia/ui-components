import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

/**
 * Handle radio button
 */
const Toggle: FunctionComponent<any> = ({
  input,
  className,
  dataType,
  meta: { touched, error },
  metaError,
  label = 'True'
}) => {
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          {...input}
          type="checkbox"
          className={mergeCls([className, 'sr-only peer'])}
          datatype={dataType}
        />

        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      </label>
      {touched && (error || metaError) && (
        <p
          id="filled_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium"
        >
          {error || metaError}
        </p>
      )}
    </>
  );
};

export default Toggle;
