import React, { FunctionComponent, useState } from 'react';
import { get, find } from 'lodash';
import Modal from '../Modals/base-modal';
import { mergeCls } from '../../utils/helper';
import CompletedJobList from '../List/completed-job-list';
import {
  renderTitle,
  getModalBody,
  createModalBody
} from '../../utils/helpers';

interface IProps {
  data: any[];
  date: string;
  day: string;
  handleDeleteClick?: any;
  createOptionsArray?: any;
  handleRestore?: any;
  permanentDelete?: any;
  setAgentForInputHandler?: any;
  getJobSuccessResponse?: any;
}

interface ModalBodyIProps {
  outputs: any[];
  inputs: any[];
}

const CompletedJobCardView: FunctionComponent<IProps> = ({
  date,
  data,
  day,
  handleDeleteClick,
  createOptionsArray,
  handleRestore,
  permanentDelete,
  setAgentForInputHandler,
  getJobSuccessResponse
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [isModalLoading, setIsModalHeading] = useState(false);
  const [sourcePage, setSourcePage] = useState('cardView');
  const [modalBody, setModalBody] = useState<ModalBodyIProps>({
    outputs: [],
    inputs: []
  });

  const openModal = (item: any, source: any) => {
    setSourcePage(source);
    if (source === 'agentList') {
      const heading: any = renderTitle(item);
      const body: any = getModalBody(item, source);
      setModalHeading(heading);
      setModalBody(body);
      setModalOpen(true);
    } else {
      setIsModalHeading(true);
      getJobSuccessResponse(item).then((response: any) => {
        const heading: any = renderTitle(response);
        const body: any = getModalBody(response, sourcePage);
        setModalHeading(heading);
        setModalBody(body);
        const outputs = get(response, 'successResp.outputs', []);
        const url = find(outputs, { type: 'url' });
        if (url && source !== 'onlyInput') {
          window.open(url.data, '_blank');
        } else {
          setModalOpen(true);
        }
        setIsModalHeading(false);
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const resubmit = () => {
    setAgentForInputHandler(modalBody);
    closeModal();
  };

  return (
    <div className="flex w-full pb-5">
      <div className="border-b border-gray-300 flex-grow">
        <div className="flex pb-5">
          <div className="w-[92px]">
            <p
              className={`text-xs font-bold ${
                day === 'Today' ? 'text-black' : 'text-gray-600'
              }`}
            >
              {day}
            </p>
            <p
              className={`text-xs font-bold mt-2 ${
                day === 'Today' ? 'text-black' : 'text-gray-600'
              }`}
            >
              {date}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-6 w-[calc(100%-92px)]">
            {data.map((item, index) => (
              <div key={index} className="col-span-1">
                <CompletedJobList
                  key={index}
                  item={item}
                  sourcePage="cardView"
                  className="items-start bg-white border border-gray-300 rounded-xl h-[100px] p-3 hover:bg-[#f3f3f3] cursor-pointer py-3 "
                  listClass="cursor-pointer items-start"
                  contentClass="cursor-pointer"
                  iconContainerClass="mr-1"
                  agentIconClass="ml-0"
                  icon="/assets/svg/Options.svg"
                  iconWidth={24}
                  iconHeight={24}
                  dropDownClass="top-8 right-0 border border-dark-300"
                  options={createOptionsArray(item)}
                  onDropdownSelect={() => handleDeleteClick(item)}
                  handleRestore={() => handleRestore(item)}
                  permanentDelete={() => permanentDelete(item)}
                  openModal={openModal}
                />
              </div>
            ))}
            <Modal
              show={isModalOpen}
              heading={modalHeading}
              className={mergeCls(['xl:w-[1200px] w-full max-h-[95vh]'])}
              bodyClass="output-container"
              body={createModalBody(
                modalBody,
                sourcePage,
                isModalLoading,
                resubmit
              )}
              onCancel={closeModal}
              isModalLoading={isModalLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedJobCardView;
