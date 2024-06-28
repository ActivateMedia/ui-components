import React, { FunctionComponent, useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { mergeCls } from '../../utils/helper';
import { calculateDay, formatDate } from '../../utils/helper';
import InlineSvg from '../../components/inline-svg';
import ListView from '../Views/completed-job-list-view';
import CardView from '../Views/completed-job-card-view';
import SelectFilter from '../../components/form-elements/select-filter';
import {
  removeAgent,
  permanentRemoveAgentResponse,
  restoreAgentResponse,
  setAgentForInput,
  setSelectedAgent,
  getJobSuccessResponse,
  getAgentResponseByGroup,
  setFilterData,
  getAuthorList,
  setSelectedAwaitingJobId
} from '../../reducers/agent';
import HeadingOne from '../../components/typography/headingOne';
import HeadingFive from '../../components/typography/headingFive';
import DocumentShimmer from '../../components/shimmer/documentShimmer';
import InfiniteScroll from '../../components/infinite-scroll';

const DeletedJobsContainer: FunctionComponent<any> = (props) => {
  const {
    token,
    agents,
    agentData,
    selectedOrgId,
    removeAgent,
    filterAgent,
    permanentRemoveAgentResponse,
    restoreAgentResponse,
    isListLoading,
    setAgentForInput,
    setSelectedAgent,
    selectedTab,
    getJobSuccessResponse,
    getAgentResponseByGroup,
    setFilterData,
    filterData,
    authorsList,
    isSideBarLoading,
    hasNextPage,
    getAuthorList,
    setSelectedAwaitingJobId
  } = props;
  const { t } = useTranslation('common');
  const [viewMode, setViewMode] = useState('list');
  const [selectedFilter, setSelectedFilter] = useState<any[]>([]);
  const [buttonClass, setClassName] = useState([]);

  useEffect(() => {
    if (filterData.length === 0) {
      setSelectedFilter([]);
      setClassName([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  useEffect(() => {
    if (token && selectedOrgId) {
      getAgentResponseByGroup({ deleted: true });
      getAuthorList({ deleted: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedOrgId]);

  const fetchData = () => {
    getAgentResponseByGroup({ deleted: true }, false);
  };

  const handleListViewClick = () => {
    setViewMode('list');
  };

  const handleCardViewClick = () => {
    setViewMode('card');
  };

  const handleDeleteClick = (item: any) => {
    removeAgent({ _id: item._id });
  };

  const handleRestore = (item: any) => {
    restoreAgentResponse({ _id: item._id });
  };

  const permanentDelete = (item: any) => {
    permanentRemoveAgentResponse({ _id: item._id });
  };

  // Function to create the options passed to the dropdown
  const createOptionsArray = (item: any) => {
    const status = get(item, 'status', '');

    const optionsArray = [];
    if (status === 'failed') {
      optionsArray.push({
        label: 'Retry',
        value: 'retry',
        icon: '/assets/svg/restore.svg'
      });
    }
    if (status === 'completed') {
      optionsArray.push({
        label: 'Rename job',
        value: 'renameJob',
        icon: '/assets/svg/pen.svg'
      });
    }
    optionsArray.push(
      {
        label: 'Restore',
        value: 'restore',
        icon: '/assets/svg/restore.svg'
      },
      {
        label: 'Permanently Delete',
        value: 'permenentlyDelete',
        icon: '/assets/svg/trash.svg'
      }
    );
    return optionsArray;
  };

  const setAgentForInputHandler = (value: any) => {
    const matchingAgent = agents.find(
      (agent: any) =>
        get(agent, 'value._id', '') ===
        get(value, 'agent.agentId._id', undefined)
    );
    setSelectedAwaitingJobId(null);
    setSelectedAgent(matchingAgent);
    setAgentForInput(value);
    window.scrollTo(0, 0);
  };

  const applyFilter = (values: any) => {
    setFilterData(values).then(() => {
      getAgentResponseByGroup({ deleted: true });
    });
  };

  const handleClearFilter = () => {
    setFilterData([]).then(() => {
      getAgentResponseByGroup({ deleted: true });
    });
    setClassName([]);
    setSelectedFilter([]);
  };

  return (
    <>
      <div className="bg-light-300 px-6 min-h-[calc(100vh-241px)]">
        {(isListLoading || isSideBarLoading) && (
          <DocumentShimmer tab={selectedTab} />
        )}
        <hr className=" border-gray-300 pt-3 max-w-[1200px] mx-auto" />
        <div className="flex justify-between items-center pb-8 max-w-[1200px] mx-auto px-6">
          <HeadingOne className="text-base font-bold">
            {!filterAgent ? 'Recently deleted' : filterAgent.label}
          </HeadingOne>
          <div className="flex">
            <div className="flex space-x-3 mr-6">
              {filterData.length > 0 && (
                <button
                  type="button"
                  className="border-none z-10 rounded-md text-left flex items-center font-semibold text-sm text-primary-900"
                  onClick={handleClearFilter}
                >
                  Clear filters
                  <InlineSvg
                    className="text-center inline-block ml-1"
                    color="#5379FF"
                    src="/assets/svg/closeSmall.svg"
                    width={20}
                    height={20}
                  />
                </button>
              )}
              <SelectFilter
                key="completion"
                options={[
                  {
                    value: 'completed',
                    label: 'Complete'
                  },
                  { value: 'failed', label: 'Failed' }
                ]}
                defaultOption="completion"
                className="w-36 font-semibold px-2 h-11 rounded-md font-small text-sm border border-gray-400 justify-between bg-white text-black"
                optionClass="items-center px-3 py-3"
                panelClass="text-sm bg-white border border-gray-400"
                applyFilter={applyFilter}
                selectedFilter={selectedFilter}
                buttonClass={buttonClass}
                setSelectedFilter={setSelectedFilter}
                setClassName={setClassName}
              />

              {authorsList && authorsList.length > 0 && (
                <SelectFilter
                  key="author"
                  options={authorsList}
                  defaultOption="author"
                  applyFilter={applyFilter}
                  className="w-36 font-semibold px-2 h-11 rounded-md font-small text-sm border border-gray-400 justify-between bg-white text-black"
                  optionClass="items-center px-3 py-3"
                  panelClass="text-sm bg-white border border-dark-100 max-h-72"
                  selectedFilter={selectedFilter}
                  buttonClass={buttonClass}
                  setSelectedFilter={setSelectedFilter}
                  setClassName={setClassName}
                />
              )}
            </div>
            <div className="border-l border-dark-100 h-11"></div>
            <div className="flex items-center justify-center">
              <div className="flex space-x-5 ml-6 h-8">
                <div className="hover:bg-dark-200 rounded-full p-1 flex items-center justify-center">
                  <InlineSvg
                    className={mergeCls(['cursor-pointer'])}
                    src={`/assets/svg/List.svg`}
                    width={22}
                    height={22}
                    color={viewMode === 'list' ? '#111111' : '#A8A29E'}
                    onClick={handleListViewClick}
                  />
                </div>
                <div className="hover:bg-dark-200 rounded-full p-1 flex items-center justify-center">
                  <InlineSvg
                    className={mergeCls(['cursor-pointer'])}
                    src={`/assets/svg/Cards.svg`}
                    width={22}
                    height={22}
                    color={viewMode === 'card' ? '#111111' : '#A8A29E'}
                    onClick={handleCardViewClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`max-w-[1200px] mx-auto px-6 `}>
          {agentData.length === 0 && (
            <HeadingFive className="text-xs font-medium pt-1 text-center">
              {t('DOCUMENTS_PAGE.NO_DELETED_JOB_HEADING')}
            </HeadingFive>
          )}
          {agentData.length > 0 && (
            <InfiniteScroll
              fetchData={fetchData}
              hasMore={hasNextPage}
              loader={<p className="text-center">Loading...</p>}
              endMessage={null}
            >
              {agentData.map((item: any, index: any) => {
                const formattedDate = formatDate(item.date, `Do MMM`);
                const day = calculateDay(item.date);
                if (viewMode === 'list') {
                  return (
                    <ListView
                      key={index}
                      date={formattedDate}
                      day={day}
                      data={item.rows}
                      handleDeleteClick={(item: any) => handleDeleteClick(item)}
                      handleRestore={(item: any) => handleRestore(item)}
                      permanentDelete={(item: any) => permanentDelete(item)}
                      createOptionsArray={(item: any) =>
                        createOptionsArray(item)
                      }
                      setAgentForInputHandler={setAgentForInputHandler}
                      getJobSuccessResponse={getJobSuccessResponse}
                    />
                  );
                } else {
                  return (
                    <CardView
                      key={item.date}
                      date={formattedDate}
                      day={day}
                      data={item.rows}
                      handleDeleteClick={(item: any) => handleDeleteClick(item)}
                      handleRestore={(item: any) => handleRestore(item)}
                      permanentDelete={(item: any) => permanentDelete(item)}
                      createOptionsArray={(item: any) =>
                        createOptionsArray(item)
                      }
                      setAgentForInputHandler={setAgentForInputHandler}
                      getJobSuccessResponse={getJobSuccessResponse}
                    />
                  );
                }
              })}
            </InfiniteScroll>
          )}
        </div>

        {agentData.length > 0 && (
          <HeadingFive className="text-xs font-medium pt-1 text-center">
            {t('DOCUMENTS_PAGE.DELETE_INFO')}
          </HeadingFive>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  selectedOrgId: state.organization.selectedOrgId,
  agents: state.organization.agents,
  agentData: state.agent.agentData,
  hasNextPage: state.agent.hasNextPage,
  filterAgent: state.agent.filterAgent,
  isListLoading: state.agent.isListLoading,
  selectedTab: state.scheduler.selectedTab,
  selectedFilter: state.agent.selectedFilter,
  filterData: state.agent.filterData,
  authorsList: state.agent.authorsList,
  isSideBarLoading: state.organization.isSideBarLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  removeAgent: (payload: any) => dispatch(removeAgent(payload)),
  permanentRemoveAgentResponse: (payload: any) =>
    dispatch(permanentRemoveAgentResponse(payload)),
  restoreAgentResponse: (payload: any) =>
    dispatch(restoreAgentResponse(payload)),
  setAgentForInput: (payload: any) => dispatch(setAgentForInput(payload)),
  setSelectedAgent: (payload: any) => dispatch(setSelectedAgent(payload)),
  getJobSuccessResponse: (payload: any) =>
    dispatch(getJobSuccessResponse(payload)),
  getAgentResponseByGroup: (payload: any, isLoading: boolean) =>
    dispatch(getAgentResponseByGroup(payload, isLoading)),
  setFilterData: (payload: any) => dispatch(setFilterData(payload)),
  getAuthorList: (payload: any) => dispatch(getAuthorList(payload)),
  setSelectedAwaitingJobId: (payload: any) =>
    dispatch(setSelectedAwaitingJobId(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeletedJobsContainer));
