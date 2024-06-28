import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { get, find, includes } from 'lodash';
import { mergeCls } from '../../utils/helper';
import { renderTitle, getListTitle } from '../../utils/helpers';
import InlineSvg from '../../components/inline-svg';
import ConfirmModal from '../Modals/confirmation-modal';
import SelectOption from '../../components/form-elements/select-option';
import { setRemoveItemIds, retry, renameJob } from '../../reducers/agent';
import Modal from '../Modals/base-modal';
import RenameForm from '../ReduxForms/renameJob-form';

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
  dropDownClass?: string;
  sourcePage: string;
  removeItemIds: any;
  onDropdownSelect: () => void;
  openModal: (item: any, source: any) => void;
  setRemoveItemIds: (payload: any) => void;
  retry: (payload: any) => void;
  handleRestore?: () => void;
  permanentDelete?: () => void;
  renameJob: (payload: any) => any;
  handleAwaitingInputJobClick?: (item: any) => void;
}

const CompletedJobList: FunctionComponent<IProps> = ({
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
  sourcePage,
  removeItemIds,
  onDropdownSelect,
  handleRestore,
  permanentDelete,
  openModal,
  retry,
  renameJob,
  handleAwaitingInputJobClick
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteBtnView, setDeleteBtnView] = useState('');
  const [isRenameJob, setIsRenameJob] = useState(null);
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

  const extractList = () => {
    const outputs = get(item, 'successResp.outputs', []);
    const url = find(outputs, { type: 'url' });
    if (url) {
      return {
        type: 'url',
        value: url?.data,
        title: getListTitle(item, 'completedJobs')
      };
    }
    const text = find(get(item, 'successResp.outputs', []), { type: 'text' });
    return {
      type: 'text',
      value: text?.data,
      title: getListTitle(item, 'completedJobs')
    };
  };

  const getStatusWarning = () => {
    const failedResp = get(
      item,
      'failedResp.reason',
      'Error: Failed to execute the agent response.'
    );

    switch (sourcePage) {
      case 'listView':
      case 'cardView': {
        if (item.status === 'failed') {
          return (
            <span className="absolute bottom-5 text-left overflow-x-auto max-w-[600px] whitespace-nowrap scale-0 transition-all bg-light-200 rounded-lg shadow-lg z-[100] p-3 text-xs text-black group-hover:scale-100">
              {typeof failedResp === 'object'
                ? 'Error: Failed to execute the agent response.'
                : failedResp}
            </span>
          );
        }
        return '';
      }
      default: {
        return '';
      }
    }
  };

  const getAgentColor = () => {
    switch (sourcePage) {
      case 'agentList': {
        return get(item, 'color', '#000000');
      }
      default: {
        return get(item, 'agent.color', '#000000');
      }
    }
  };

  const getAgentIcon = () => {
    switch (sourcePage) {
      case 'queueList': {
        return (
          <div className={mergeCls([agentIconClass, 'cursor-pointer pr-3'])}>
            {item?.status === 'waiting' || item?.status === 'awaitingInput' ? (
              <InlineSvg
                className={mergeCls(['text-center'])}
                src={
                  item.status === 'waiting'
                    ? '/assets/svg/clock.svg'
                    : '/assets/svg/input-required.svg'
                }
                width={20}
                height={20}
                color={getAgentColor()}
              />
            ) : (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke={getAgentColor()}
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill={getAgentColor()}
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </div>
        );
      }
      case 'agentList': {
        return (
          <div className={mergeCls([agentIconClass, 'cursor-pointer'])}>
            {item.status === 'busy' || item.status === 'inprogress' ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke={getAgentColor()}
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill={getAgentColor()}
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <InlineSvg
                className={mergeCls(['text-center'])}
                src={`/assets/svg/ellipse.svg`}
                width={20}
                height={20}
                color={getAgentColor()}
              />
            )}
          </div>
        );
      }
      default: {
        if (item.status === 'failed') {
          return (
            <div
              className={mergeCls([
                agentIconClass,
                'pr-3 cursor-pointer group relative'
              ])}
            >
              {getStatusWarning()}
              <InlineSvg
                className={mergeCls(['text-center'])}
                src="/assets/svg/Failed.svg"
                width={20}
                height={20}
                color={getAgentColor()}
              />
            </div>
          );
        }
        return (
          <div className={mergeCls([agentIconClass, 'pr-3 cursor-pointer'])}>
            <InlineSvg
              className={mergeCls(['text-center'])}
              src={`/assets/svg/ellipse.svg`}
              width={20}
              height={20}
              color={getAgentColor()}
            />
          </div>
        );
      }
    }
  };

  const listClickHandler = () => {
    const { type, value } = extractList();
    if (sourcePage === 'agentList') {
      onDropdownSelect();
    } else if (item.status === 'awaitingInput') {
      handleAwaitingInputJobClick && handleAwaitingInputJobClick(item);
    } else if (item.status !== 'failed') {
      switch (type) {
        case 'url': {
          window.open(value.trim(), '_blank');
          break;
        }
        case 'text': {
          openModal && openModal(item, sourcePage);
        }
      }
    }
  };

  const handleModalClick = (value: string) => {
    switch (value) {
      case 'retry': {
        retry({ id: item._id });
        break;
      }
      case 'Delete': {
        setRemoveItemIds(removeItemIds.push(item._id));
        onDropdownSelect();
        break;
      }
      case 'restore': {
        setRemoveItemIds(removeItemIds.push(item._id));
        handleRestore && handleRestore();
        break;
      }
      case 'permenentlyDelete': {
        setDeleteBtnView(value);
        break;
      }
      case 'QueueDelete': {
        setDeleteBtnView(value);
        break;
      }
      case 'openLink': {
        listClickHandler();
        break;
      }
      case 'viewInput': {
        openModal(item, 'onlyInput');
        break;
      }
      case 'renameJob': {
        const title = getListTitle(item, sourcePage);
        setIsRenameJob(title);
      }
    }
  };

  const iconClickHandler = () => {
    if (options.length > 1) {
      setDropdownOpen(!isDropdownOpen);
    } else {
      handleModalClick(options[0].value);
      openModal && openModal(item, sourcePage);
    }
  };

  const onDropdownSelectHandler = (option: any) => {
    handleModalClick(option.value);
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteIconClick = () => {
    setRemoveItemIds(removeItemIds.push(item._id));
    if (isDeleteBtnView === 'QueueDelete') {
      onDropdownSelect();
    } else {
      permanentDelete && permanentDelete();
    }
    setDeleteBtnView('');
  };

  const handleChange = (e: any) => {
    setIsRenameJob(e.target.value);
  };

  const updateTitle = () => {
    renameJob({ _id: item._id, title: isRenameJob }).then(() => {
      cancelModal();
    });
  };

  const renameBody = () => {
    return (
      <RenameForm
        onFormSubmit={updateTitle}
        cancelModal={cancelModal}
        isRenameJob={isRenameJob}
        handleChange={handleChange}
      />
    );
  };

  const cancelModal = () => {
    setIsRenameJob(null);
  };

  const getStatus = () => {
    const status = get(item, 'status', '');
    if (
      sourcePage === 'queueList' &&
      status !== 'waiting' &&
      status !== 'failed' &&
      status !== 'completed'
    ) {
      return get(item, 'successResp.info', item?.status) === 'inprogress'
        ? 'In progress'
        : get(item, 'successResp.info', item?.status);
    }
    return null;
  };

  return (
    <>
      <div
        className={mergeCls([
          className,
          'flex w-full rounded-full',
          includes(removeItemIds, item?._id) && 'opacity-20',
          isDropdownOpen && 'bg-dark-100'
        ])}
      >
        <div
          className={mergeCls([listClass, 'flex h-full w-[calc(100%-40px)]'])}
          onClick={listClickHandler}
        >
          {getAgentIcon()}
          <div className={mergeCls(['w-[calc(100%-50px)] flex-col h-full'])}>
            <p
              className={mergeCls([
                contentClass,
                'text-xs font-medium text-black whitespace-normal leading-5'
              ])}
            >
              {renderTitle(item)}
            </p>
            <p className="text-gray-500 text-xs mt-2"> {getStatus()}</p>
          </div>
        </div>
        <div
          ref={dropdownRef}
          id={`dropdown-${item?._id}`}
          className={mergeCls([
            iconContainerClass,
            'flex justify-center items-center rounded-full relative hover:bg-dark-200 p-1',
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
          onClickSuccess={handleDeleteIconClick}
          onClickCancel={() => setDeleteBtnView('')}
        />
      )}

      {isRenameJob !== null && isRenameJob !== undefined && (
        <Modal
          show={isRenameJob !== null && isRenameJob !== undefined}
          heading="Rename job"
          className={mergeCls(['xl:w-[600px] w-full '])}
          bodyClass=""
          body={renameBody()}
          onCancel={cancelModal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  removeItemIds: state.agent.removeItemIds
});

const mapDispatchToProps = (dispatch: any) => ({
  setRemoveItemIds: (payload: any) => dispatch(setRemoveItemIds(payload)),
  retry: (payload: any) => dispatch(retry(payload)),
  renameJob: (payload: any) => dispatch(renameJob(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedJobList);
