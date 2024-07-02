import React, { FunctionComponent } from 'react';
import Button from '../../components/button';
import HeadingFive from '../../components/typography/headingFive';
import Paragraph from '../../components/typography/paragraph';
import InlineSvg from '../../components/inline-svg';
import { mergeCls } from '../../utils/helper';

interface IProps {
  height?: number;
  title: string;
  subTitle: string;
  successBtnText: string;
  cancelBtnText?: string;
  onClickCancel: () => any;
  onClickSuccess: () => any;
  closeSvg: string;
  className?: string;
}
const ConfirmationModal: FunctionComponent<IProps> = ({
  height,
  title,
  subTitle,
  successBtnText,
  cancelBtnText,
  onClickCancel,
  onClickSuccess,
  closeSvg,
  className
}) => {
  return (
    <div className="fixed top-0 left-0 min-h-screen z-20 w-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div
        className={mergeCls([
          className,
          `shadow-300 h-[${height}px] w-[600px] bg-light-100 text-center rounded-xl z-30`
        ])}
      >
        <div className="border-b flex justify-between p-6 w-full">
          <HeadingFive className="text-base font-bold text-left">
            {title}
          </HeadingFive>
          <InlineSvg
            className={mergeCls(['text-center cursor-pointer'])}
            src={closeSvg}
            width={24}
            height={24}
            onClick={onClickCancel}
          />
        </div>

        <div className="p-6">
          <Paragraph className="pb-6 text-left">{subTitle}</Paragraph>
          <div className="w-full flex justify-between">
            <div className="flex space-x-3 w-full">
              <Button
                type="button"
                className="flex-1 rounded-md text-dark-900 border border-dark-900 p-3 px-5 "
                onClick={onClickCancel}
              >
                {cancelBtnText}
              </Button>
              <Button
                type="button"
                className="flex-1 bg-[#FF4D4D] rounded-md text-white p-3"
                onClick={onClickSuccess}
              >
                {successBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
