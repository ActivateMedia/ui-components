import React, { FunctionComponent, useState } from 'react';
import { get, find } from 'lodash';
import { mergeCls } from '../../utils/helper';
import Modal from '../Modals/base-modal';
import CompletedJobList from '../List/completed-job-list';
import {
  renderTitle,
  getModalBody,
  createModalBody
} from '../../utils/helpers';

interface IProps {
  data?: any[];
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
  agent: any;
}

const CompletedJobListView: FunctionComponent<IProps> = ({
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
  const [sourcePage, setSourcePage] = useState('listView');
  const [modalBody, setModalBody] = useState<ModalBodyIProps>({
    outputs: [],
    inputs: [],
    agent: {}
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
        const body: any = getModalBody(response, source);

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
          <div className="w-[114px] ">
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
          <div className="flex flex-wrap w-[calc(100%-114px)]">
            {data?.map((item: any, index: number) => (
              <CompletedJobList
                key={index}
                item={item}
                sourcePage="listView"
                className="items-center hover:bg-dark-100 px-4 py-2"
                listClass="items-center cursor-pointer"
                contentClass="flex h-full items-center cursor-pointer"
                icon="/assets/svg/Options.svg"
                iconWidth={20}
                iconHeight={20}
                dropDownClass="top-[28px] right-0 border border-dark-300"
                options={createOptionsArray(item)}
                onDropdownSelect={() => handleDeleteClick(item)}
                handleRestore={() => handleRestore(item)}
                permanentDelete={() => permanentDelete(item)}
                openModal={openModal}
              />
            ))}

            <Modal
              show={isModalOpen}
              heading={modalHeading}
              className={mergeCls(['xl:w-[1200px] w-full h-[91vh]'])}
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

export default CompletedJobListView;
