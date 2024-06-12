import { FunctionComponent } from 'react';

interface ICheckbox {
  id?: string;
  label: string;
  input: any;
  dataType: any;
  dataGroup: any;
}

/**
 * Handle radio button
 */
const Checkbox: FunctionComponent<ICheckbox> = ({
  input,
  label,
  dataType,
  dataGroup,
  id = String(new Date().getTime())
}) => {
  return (
    <div className="flex items-center">
      <input
        {...input}
        className="relative w-4 h-4 text-sm text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        datatype={dataType}
        data-group={dataGroup}
        type="checkbox"
        id={id}
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
