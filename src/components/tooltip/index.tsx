import { ReactNode, FunctionComponent } from 'react';

interface TooltipProps {
  className?: string;
  title?: string;
  children: ReactNode | ReactNode[];
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  className,
  title = 'lorem Ipsum'
}) => {
  return (
    <div className="relative ">
      <button
        type="button"
        className={className}
        data-te-toggle="tooltip"
        data-te-html="true"
        data-te-ripple-init
        data-te-ripple-color="light"
        title={title}
      >
        {children}
      </button>
    </div>
  );
};

export default Tooltip;
