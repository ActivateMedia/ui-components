import React, { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';

interface ITextInput {
  id?: string;
  label?: string;
  className?: string;
  labelClass?: string;
  input?: any;
  disabled?: boolean;
  leftIconClass?: string;
  rightIconClass?: string;
  rightIcon?: string | null;
  leftIcon?: string | null;
  placeholder?: string;
  meta: {
    touched?: boolean;
    error?: string;
  };
}

const TextInput: FunctionComponent<ITextInput> = ({
  input,
  className = 'border border-black rounded-md p-2 mb-5',
  leftIconClass,
  rightIconClass,
  rightIcon,
  leftIcon,
  label,
  meta: { touched, error },
  disabled = false,
  id = String(new Date().getTime()),
  placeholder = 'Enter text'
}) => {
  return (
    <>
      {label && (
        <label
          className="mb-3 mt-px inline-block pl-[0.15rem] text-base font-bold"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="relative flex w-full flex-nowrap items-stretch">
        {leftIcon && (
          <span
            className={mergeCls([
              leftIconClass,
              'flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200'
            ])}
          >
            {leftIcon}
          </span>
        )}
        <input
          {...input}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={mergeCls([
            className,
            disabled && 'cursor-not-allowed',
            'p-2 peer block min-h-[auto] w-full leading-[1.6] outline-none border rounded-lg border-gray-300'
          ])}
          aria-label="Username"
          aria-describedby="addon-wrapping"
          id={id}
        />
        {rightIcon && (
          <span
            className={mergeCls([
              rightIconClass,
              'flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200'
            ])}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {touched && error && (
        <p
          id="filled_error_help"
          className=" absolute mt-1 text-xs text-red-600 dark:text-red-400 font-medium"
        >
          {error}
        </p>
      )}
    </>
  );
};

export default TextInput;
