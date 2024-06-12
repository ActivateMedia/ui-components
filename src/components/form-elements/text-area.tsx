import { FunctionComponent } from 'react';
import { mergeCls } from '../../utils/helper';
import HeadingFive from '../typography/headingFive';

interface ITextarea {
  id?: string;
  input?: any;
  row?: number;
  className?: string;
  placeholder?: string;
  label?: string;
  dataType?: string;
  cols?: number;
  meta: {
    touched?: boolean;
    error?: string;
  };
  metaError?: string | undefined;
}

const Textarea: FunctionComponent<any> = ({
  input,
  label,
  dataType,
  cols,
  meta: { touched, error },
  metaError,
  row = 3,
  id = String(new Date().getTime()),
  className = 'bg-light-900 p-2',
  placeholder = 'Enter text'
}) => {
  return (
    <div className="w-full text-left">
      {label && <HeadingFive className="mb-2 mt-px">{label}</HeadingFive>}
      <textarea
        {...input}
        className={mergeCls([
          className,
          'peer text-sm block min-h-[auto] w-full leading-[1.6] outline-none border-gray-300 border rounded-lg p-3'
        ])}
        id={id}
        rows={row}
        cols={cols}
        placeholder={placeholder}
        datatype={dataType}
      ></textarea>
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

export default Textarea;
