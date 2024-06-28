import React, { FunctionComponent, useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { mergeCls } from '../../utils/helper';
import { calculateDay } from '../../utils/helper';
import InlineSvg from '../../components/inline-svg';
import SelectFilter from '../../components/form-elements/select-filter';
import {
  setAgentForInput,
  setSelectedAgent,
  setFilterData,
  setSelectedAwaitingJobId
} from '../../reducers/agent';
import { getSchedulerData, getAuthorList } from '../../reducers/scheduler';
import HeadingOne from '../../components/typography/headingOne';
import HeadingFive from '../../components/typography/headingFive';
import DocumentShimmer from '../../components/shimmer/documentShimmer';
import ScheduleListView from '../Views/schedule-job-list-view';
import ScheduleCardView from '../Views/schedule-job-card-view';

const ScheduledJobsContainer: FunctionComponent<any> = (props) => {
  const {
    token,
    agents,
    selectedOrgId,
    filterAgent,
    isListLoading,
    setAgentForInput,
    setSelectedAgent,
    schedulerList,
    selectedTab,
    setFilterData,
    filterData,
    authorsList,
    isSideBarLoading,
    getAuthorList,
    getSchedulerData,
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
      getSchedulerData({});
      getAuthorList({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedOrgId]);

  const handleListViewClick = () => {
    setViewMode('list');
  };

  const handleCardViewClick = () => {
    setViewMode('card');
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
      getSchedulerData({});
    });
  };

  const handleClearFilter = () => {
    setFilterData([]).then(() => {
      getSchedulerData({});
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
            {!filterAgent ? 'Scheduled Jobs' : filterAgent.label}
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
          {schedulerList.length === 0 && (
            <HeadingFive className="text-xs font-medium pt-1 text-center">
              {t('DOCUMENTS_PAGE.NO_SCHEDULE_JOB_HEADING')}
            </HeadingFive>
          )}

          {schedulerList.map((item: any, index: any) => {
            const day = calculateDay(item.date);
            if (viewMode === 'list') {
              return (
                <ScheduleListView
                  key={index}
                  date={item.date}
                  day={day}
                  data={item.rows}
                  setAgentForInputHandler={setAgentForInputHandler}
                />
              );
            } else {
              return (
                <ScheduleCardView
                  key={index}
                  date={item.date}
                  day={day}
                  data={item.rows}
                  setAgentForInputHandler={setAgentForInputHandler}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  selectedOrgId: state.organization.selectedOrgId,
  agents: state.organization.agents,
  schedulerList: state.scheduler.schedulerList,
  filterAgent: state.agent.filterAgent,
  isListLoading: state.agent.isListLoading,
  selectedTab: state.scheduler.selectedTab,
  filterData: state.agent.filterData,
  authorsList: state.scheduler.authorsList,
  isSideBarLoading: state.organization.isSideBarLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  setAgentForInput: (payload: any) => dispatch(setAgentForInput(payload)),
  setSelectedAgent: (payload: any) => dispatch(setSelectedAgent(payload)),
  setFilterData: (payload: any) => dispatch(setFilterData(payload)),
  getAuthorList: (payload: any) => dispatch(getAuthorList(payload)),
  getSchedulerData: (payload: any) => dispatch(getSchedulerData(payload)),
  setSelectedAwaitingJobId: (payload: any) =>
    dispatch(setSelectedAwaitingJobId(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ScheduledJobsContainer));
