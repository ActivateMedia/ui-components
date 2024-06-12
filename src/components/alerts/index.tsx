import { FunctionComponent } from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  message: string;
}

const Alert: FunctionComponent<AlertProps> = ({ type, message }) => {
  const alertClasses = {
    success: 'bg-green-500 text-center w-[216px]',
    warning: 'bg-yellow-500 text-center w-[216px]',
    error: 'bg-red-500 text-center w-[216px]'
  };

  return (
    <div className={`p-4 text-white ${alertClasses[type]}`}>{message}</div>
  );
};

export default Alert;
