/* eslint-disable @typescript-eslint/member-delimiter-style */
import React, { FunctionComponent, useState } from 'react';
import { get, find } from 'lodash';
import { mergeCls } from '../../utils/helper';
import {
  renderTitle,
  getModalBody,
  createModalBody
} from '../../utils/helpers';
import InlineSvg from '../../components/inline-svg';
import Modal from '../Modals/base-modal';
import CompletedJobList from '../List/completed-job-list';
import { getCreatorInfo } from '../../utils/helper';
import HeadingOne from '../../components/typography/headingOne';

interface ModalBodyIProps {
  outputs: any[];
  inputs: any[];
}

interface IProps {
  list: any[];
  title: string;
  removeAgent: (payload: any) => any;
  setAgentForInputHandler: (payload: any) => any;
  getJobSuccessResponse: (payload: any) => any;
  handleAwaitingInputJobClick: (item: any) => void;
}

const QueueJobListView: FunctionComponent<IProps> = ({
  list,
  title,
  removeAgent,
  setAgentForInputHandler,
  getJobSuccessResponse,
  handleAwaitingInputJobClick
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [isModalLoading, setIsModalHeading] = useState(false);
  const [modalBody, setModalBody] = useState<ModalBodyIProps>({
    outputs: [],
    inputs: []
  });
  const handleDeleteClick = (item: any) => {
    removeAgent({ _id: item._id });
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Function to get the title
  const getTitle = (type: string) => {
    switch (type) {
      case 'queue':
        return 'Queued';
      default:
        return 'In progress';
    }
  };

  const openModal = (item: any, sourcePage: any) => {
    if (sourcePage === 'agentList') {
      const heading: any = renderTitle(item);
      const body: any = getModalBody(item, sourcePage);
      setModalHeading(heading);
      setModalBody(body);
    } else {
      setIsModalHeading(true);
      getJobSuccessResponse(item).then((response: any) => {
        const heading: any = renderTitle(response);
        const body: any = getModalBody(response, sourcePage);
        setModalHeading(heading);
        setModalBody(body);
        setIsModalHeading(false);
      });
    }

    setModalOpen(true);
  };

  const resubmit = () => {
    setAgentForInputHandler(modalBody);
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // Function to create the options passed to the dropdown
  const createOptionsArray = (item: any) => {
    const optionsArray = [
      {
        label: 'View input',
        value: 'viewInput',
        icon: '/assets/svg/info.svg'
      },
      {
        label: 'Delete',
        value: 'QueueDelete',
        icon: '/assets/svg/trash.svg'
      },

      { type: 'divider' },
      { type: 'footer', label: getCreatorInfo(item, 'created') }
    ];
    const outputs = get(item, 'successResp.outputs', []);
    const url = find(outputs, { type: 'url' });
    if (url) {
      optionsArray.unshift({
        label: 'Open in Google Docs',
        value: 'openLink',
        icon: '/assets/svg/arrowTop.svg'
      });
    }

    return optionsArray;
  };

  const checkForUrl = (item: any) => {
    const outputs = get(item, 'successResp.outputs', []);
    const url = find(outputs, { type: 'url' });
    if (url) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div
        className="flex w-full space-x-4 cursor-pointer"
        onClick={handleClick}
      >
        <HeadingOne className="text-sm font-semibold pb-4">
          {getTitle(title) + ' (' + list.length + ')'}
        </HeadingOne>
        <InlineSvg
          className={mergeCls([
            isOpen ? '' : '-rotate-90',
            'text-center inline-block ml-1'
          ])}
          src="/assets/svg/arrow.svg"
          width={18}
          height={18}
        />
      </div>
      {isOpen && (
        <div className="flex flex-wrap">
          {list.map((item: any, index: number) => (
            <div key={String(index)} className="flex group w-full ">
              <div className="w-full">
                <CompletedJobList
                  key={index}
                  item={item}
                  sourcePage="queueList"
                  className="items-center hover:bg-dark-100 px-4 py-2"
                  listClass="items-center cursor-pointer"
                  contentClass={`flex h-full items-center ${
                    checkForUrl(item) && 'cursor-pointer'
                  }`}
                  icon="/assets/svg/Options.svg"
                  agentIconClass={`${
                    title === 'inprogress' ? 'pb-4' : 'items-center'
                  }`}
                  iconWidth={20}
                  iconHeight={20}
                  onDropdownSelect={() => handleDeleteClick(item)}
                  dropDownClass="top-[28px] right-0 border border-dark-300"
                  options={createOptionsArray(item)}
                  openModal={openModal}
                  handleAwaitingInputJobClick={(item: any) =>
                    handleAwaitingInputJobClick(item)
                  }
                />
              </div>
            </div>
          ))}
          <Modal
            show={isModalOpen}
            heading={modalHeading}
            className={mergeCls(['xl:w-[1200px] w-full h-[91vh]'])}
            bodyClass="output-container"
            body={createModalBody(modalBody, 'queue', isModalLoading, resubmit)}
            onCancel={closeModal}
            isModalLoading={isModalLoading}
          />
        </div>
      )}
    </>
  );
};

export default QueueJobListView;
