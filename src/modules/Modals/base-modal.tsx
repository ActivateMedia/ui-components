import React, { FunctionComponent } from 'react';
import HeadingThree from '../../components/typography/headingThree';
import InlineSvg from '../../components/inline-svg';
import { mergeCls } from '../../utils/helper';
import Modal from '@restart/ui/Modal';
import { HeaderShimmer } from '../../components/shimmer/modalShimmer';

interface IProps {
  heading: any;
  body: any;
  className?: any;
  bodyClass?: any;
  show: boolean;
  isModalLoading?: any;
  onCancel: () => any;
  closeSvg: string;
}

const BaseModal: FunctionComponent<IProps> = ({
  heading,
  body,
  className,
  bodyClass,
  show,
  isModalLoading,
  onCancel,
  closeSvg
}) => {
  return (
    <Modal
      show={show}
      aria-labelledby="modal-1-label"
      onHide={onCancel}
      renderBackdrop={(props) => (
        <div {...props} className="fixed inset-0 bg-black/30 z-[300]" />
      )}
      className="fixed z-[301] top-0 left-0 right-0 w-full"
      onEscapeKeyDown={onCancel}
    >
      <div className="relative w-full min-h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 px-8">
        <div
          className={mergeCls([
            className,
            'relative bg-white shadow-lg rounded-lg overflow-y-auto '
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6">
            {isModalLoading ? (
              <HeaderShimmer />
            ) : (
              <HeadingThree className="text-base font-bold">
                {heading}
              </HeadingThree>
            )}

            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onCancel}
            >
              <InlineSvg
                className={mergeCls(['cursor-pointer'])}
                src={closeSvg}
                width={22}
                height={22}
              />
            </button>
          </div>

          <div className={mergeCls([bodyClass])}>{body}</div>
        </div>
      </div>
    </Modal>
  );
};

export default BaseModal;
