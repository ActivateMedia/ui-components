/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { mergeCls } from '../../utils/helper';
import { getListTitle } from '../../utils/helpers';
import InlineSvg from '../../components/inline-svg';
import ConfirmModal from '../Modals/confirmation-modal';
import SelectOption from '../../components/form-elements/select-option';
import { removeScheduleJob, deleteSeries } from '../../reducers/scheduler';

interface IProps {
  item: any;
  className: string;
  listClass: string;
  iconWidth: number;
  iconHeight: number;
  contentClass: string;
  agentIconClass?: string;
  iconContainerClass?: string;
  icon: string;
  options: any[];
  dropDownClass: string;
  openModal: (item: any) => void;
  removeScheduleJob: (payload: any, date: any) => void;
  deleteSeries: (payload: any) => void;
  date: any;
}

const ScheduleJobList: FunctionComponent<IProps> = ({
  item,
  className,
  listClass,
  iconWidth,
  iconHeight,
  contentClass,
  agentIconClass,
  iconContainerClass,
  icon,
  options,
  dropDownClass,
  openModal,
  removeScheduleJob,
  deleteSeries,
  date
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteBtnView, setDeleteBtnView] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, dropdownRef]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setDropdownOpen(false);
    }
  };

  const handleDropDownClick = (value: string) => {
    switch (value) {
      case 'Delete_occurance': {
        removeScheduleJob(item, date);
        break;
      }
      case 'Delete_series': {
        setDeleteBtnView(true);
        break;
      }
      case 'viewInput': {
        openModal(item);
      }
    }
  };

  const iconClickHandler = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onDropdownSelectHandler = (option: any) => {
    handleDropDownClick(option.value);
    setDropdownOpen(!isDropdownOpen);
  };

  const deleteScheduleSeries = () => {
    deleteSeries(item._id);
    setDeleteBtnView(false);
  };

  return (
    <>
      <div
        className={mergeCls([
          className,
          'flex w-full rounded-full',
          isDropdownOpen && 'bg-dark-100'
        ])}
      >
        <div
          className={mergeCls([listClass, 'flex h-full w-[calc(100%-40px)]'])}
        >
          <div className={mergeCls([agentIconClass, 'cursor-pointer pr-3'])}>
            <InlineSvg
              className={mergeCls(['text-center'])}
              src={`/assets/svg/ellipse.svg`}
              width={20}
              height={20}
              color={get(item, 'metaData.agentId.color', '#000000')}
            />
          </div>
          <div className={mergeCls(['w-[calc(100%-50px)] flex-col h-full'])}>
            <p
              className={mergeCls([
                contentClass,
                'text-xs font-medium text-black whitespace-normal leading-5 line-clamp-4'
              ])}
            >
              {getListTitle(item, 'scheduleJobs')}
            </p>
          </div>
        </div>
        <div
          ref={dropdownRef}
          id={`dropdown-${item._id}`}
          className={mergeCls([
            iconContainerClass,
            'flex justify-center items-center rounded-full relative hover:bg-dark-200',
            isDropdownOpen && 'bg-dark-200'
          ])}
        >
          <InlineSvg
            className={mergeCls(['text-center cursor-pointer'])}
            src={icon}
            width={iconWidth}
            height={iconHeight}
            onClick={iconClickHandler}
          />

          {isDropdownOpen && (
            <div
              className={mergeCls([
                dropDownClass,
                'absolute bg-white rounded-md shadow-lg w-[200px] z-20'
              ])}
            >
              <SelectOption
                onSelect={onDropdownSelectHandler}
                options={options}
              />
            </div>
          )}
        </div>
      </div>
      {isDeleteBtnView && (
        <ConfirmModal
          title="Delete document"
          subTitle="Are you sure you want to delete this document?"
          successBtnText="Delete"
          cancelBtnText="Cancel"
          onClickSuccess={deleteScheduleSeries}
          onClickCancel={() => setDeleteBtnView(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  removeItemIds: state.agent.removeItemIds
});

const mapDispatchToProps = (dispatch: any) => ({
  removeScheduleJob: (payload: any, date: any) =>
    dispatch(removeScheduleJob(payload, date)),
  deleteSeries: (payload: any) => dispatch(deleteSeries(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleJobList);
