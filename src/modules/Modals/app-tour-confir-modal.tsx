import React, { FunctionComponent } from 'react';
import Button from '../../components/button';
import HeadingFive from '../../components/typography/headingFive';
import Paragraph from '../../components/typography/paragraph';
import InlineSvg from '../../components/inline-svg';
import { mergeCls } from '../../utils/helper';

interface IProps {
  onClickCancel: () => any;
  onClickSuccess: () => any;
  modalTilte: string;
  modalDescription: string;
  modalInstructionText?: string;
  CancelBtnText: string;
  SuccessBtnText: string;
  closeSvg: string;
  className?: any;
}
const AppTourConfirmModal: FunctionComponent<IProps> = ({
  onClickCancel,
  onClickSuccess,
  modalTilte,
  modalDescription,
  modalInstructionText,
  CancelBtnText,
  SuccessBtnText,
  closeSvg,
  className
}) => {
  return (
    <div className="fixed top-0 left-0 min-h-screen z-20 w-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div
        className={mergeCls([
          className,
          `shadow-300 h-[268px] w-[600px] bg-light-100 text-center rounded-xl z-30`
        ])}
      >
        <div className="border-b flex justify-between p-6 w-full">
          <HeadingFive className="text-base font-bold text-left">
            {modalTilte}
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
          <Paragraph className="pb-5 text-left text-sm">
            {modalDescription}
          </Paragraph>
          <Paragraph className="pb-6 text-left text-sm">
            {modalInstructionText}
          </Paragraph>
          <div className="w-full flex justify-between">
            <div className="flex space-x-3 w-full">
              <Button
                type="button"
                className="flex-1 rounded-md text-dark-900 border border-dark-900 p-3 px-5 "
                onClick={onClickCancel}
              >
                {CancelBtnText}
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primary-900 rounded-md text-white p-3"
                onClick={onClickSuccess}
              >
                {SuccessBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppTourConfirmModal;
