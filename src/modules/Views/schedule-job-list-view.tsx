import React, { FunctionComponent, useState } from 'react';
import ScheduleJobList from '../List/schedule-job-list';
import Modal from '../Modals/base-modal';
import { mergeCls, getCreatorInfo, formatDate } from '../../utils/helper';
import {
  getListTitle,
  getScheduleModalHtml,
  createModalBody
} from '../../utils/helpers';

interface IProps {
  data?: any;
  date: string;
  day: string;
  setAgentForInputHandler?: any;
  isModalLoading?: any;
}

interface ModalBodyIProps {
  inputs: any[];
  agent: any;
}

const ScheduleListView: FunctionComponent<IProps> = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalBody, setModalBody] = useState<ModalBodyIProps>({
    inputs: [],
    agent: {}
  });
  const { date, data, day } = props;

  const openModal = (item: any) => {
    const heading: any = getListTitle(item, 'scheduleJobs');
    const body: any = getScheduleModalHtml(item);
    setModalHeading(heading);
    setModalBody(body);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const scheduleOptions = (item: any) => {
    return [
      {
        label: 'View input',
        value: 'viewInput',
        icon: '/assets/svg/info.svg'
      },
      {
        label: 'Delete occurance',
        value: 'Delete_occurance',
        icon: '/assets/svg/trash.svg'
      },
      {
        label: 'Delete series',
        value: 'Delete_series',
        icon: '/assets/svg/trash.svg'
      },
      { type: 'divider' },
      {
        type: 'footer',
        label: getCreatorInfo(item, 'schedule')
      }
    ];
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
              {formatDate(date, `Do MMM`)}
            </p>
          </div>
          <div className="flex flex-wrap w-[calc(100%-114px)]">
            {data?.map((item: any, index: number) => (
              <ScheduleJobList
                key={index}
                item={item}
                date={date}
                className="items-center hover:bg-dark-100 px-4 py-2"
                listClass="items-center"
                contentClass="flex h-full items-center"
                icon="/assets/svg/Options.svg"
                iconWidth={20}
                iconHeight={20}
                dropDownClass="top-[28px] right-0 border border-dark-300"
                options={scheduleOptions(item)}
                openModal={openModal}
              />
            ))}
            <Modal
              show={isModalOpen}
              heading={modalHeading}
              className={mergeCls(['xl:w-[1200px] w-full h-[91vh]'])}
              bodyClass="output-container"
              body={createModalBody(modalBody, 'SchedulerList')}
              onCancel={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleListView;
