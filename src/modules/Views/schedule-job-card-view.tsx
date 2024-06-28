import React, { FunctionComponent, useState } from 'react';
import Modal from '../Modals/base-modal';
import { mergeCls, getCreatorInfo, formatDate } from '../../utils/helper';
import {
  getListTitle,
  getScheduleModalHtml,
  createModalBody
} from '../../utils/helpers';
import ScheduleJobList from '../List/schedule-job-list';

interface IProps {
  data: any;
  date: string;
  day: string;
  createOptionsArray?: any;
  setAgentForInputHandler?: any;
}
interface ModalBodyIProps {
  outputs: any[];
  inputs: any[];
}

const ScheduleCardView: FunctionComponent<IProps> = ({ date, data, day }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalBody, setModalBody] = useState<ModalBodyIProps>({
    outputs: [],
    inputs: []
  });

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
              {formatDate(date, `Do MMM`)}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-6 w-[calc(100%-92px)]">
            {data?.map((item: any, index: number) => (
              <ScheduleJobList
                key={index}
                item={item}
                date={date}
                className="items-start bg-white border border-gray-300 rounded-xl h-[100px] p-3 hover:bg-[#f3f3f3] cursor-pointer py-3 "
                listClass="cursor-pointer items-start"
                contentClass="cursor-pointer break-all"
                iconContainerClass="mr-1"
                agentIconClass="ml-0 mt-1.5"
                icon="/assets/svg/Options.svg"
                iconWidth={20}
                iconHeight={20}
                dropDownClass="top-8 right-0 border border-dark-300"
                options={scheduleOptions(item)}
                openModal={openModal}
              />
            ))}
            <Modal
              show={isModalOpen}
              heading={modalHeading}
              className={mergeCls(['xl:w-[1200px] w-full max-h-[95vh]'])}
              bodyClass="output-container"
              body={createModalBody(modalBody, 'SchedulerCard')}
              onCancel={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCardView;
