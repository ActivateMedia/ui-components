/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

interface IDropdown {
  id?: string;
  label: string;
  className: string;
  input: any;
  options: Array<any>;
}

const DropDown: FunctionComponent<IDropdown> = ({
  input,
  options,
  label,
  id = String(new Date().getTime()),
  className = 'w-40 rounded-md font-medium text-sm border-gray-400 justify-between bg-white text-black'
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <select {...input} id={id} className={mergeCls([className])}>
        {options.map((option: any, index: any) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
