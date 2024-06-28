import React, { useState, useEffect } from 'react';
import { isEmpty, get } from 'lodash';
import moment from 'moment-timezone';
import { mergeCls } from '../../utils/helper';
import DatePicker from '../../components/datepicker';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  getAgentResponseByGroup,
  getHighlightedDate,
  setFilterAgent,
  setCalendarDate,
  setFilterData
} from '../../reducers/agent';
import { getSchedulerData, setSelectedTab } from '../../reducers/scheduler';
import { updateUserMeta } from '../../reducers/user';
import { setSelectedOrgId } from '../../reducers/organization';
import AgentList from '../List/agent-list';
import { getModalBody } from '../../utils/helpers';
import HeadingThree from '../../components/typography/headingThree';
import SelectInput from '../../components/form-elements/select-input';
import Modal from '../Modals/base-modal';
import SideBarShimmer from '../../components/shimmer/sideBarShimmer';
import MenuItem from '../Menu';
import sideBarTabs from '../../utils/side-menu.json';

const Sidebar = (props: any) => {
  const {
    router,
    token,
    getAgentResponseByGroup,
    orgAgents,
    highlightedDate,
    getHighlightedDate,
    source,
    orgDropdownOptions,
    setFilterAgent,
    filterAgent,
    selectedOrgId,
    updateUserMeta,
    isSideBarLoading,
    getSchedulerData,
    setSelectedTab,
    selectedTab,
    setCalendarDate,
    setFilterData,
    setSelectedOrgId
  } = props;

  const { t } = useTranslation('common');
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalBody, setModalBody] = useState('');

  useEffect(() => {
    const handleFilterAgent = () => {
      if (selectedTab === 'recentlyDeleted') {
        setFilterAgent({ id: null, label: 'Recently deleted' });
      } else if (selectedTab === 'completedJobs') {
        setFilterAgent({ id: null, label: 'Completed Jobs' });
      } else if (selectedTab === 'scheduledJobs') {
        setFilterAgent({ id: null, label: 'Scheduled Jobs' });
      } else {
        setFilterAgent('');
      }
    };
    if (source === 'DASHBOARD' && token && selectedOrgId) {
      handlerCalenderMonthChange();
      handleFilterAgent();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrgId, selectedTab, source]);

  const openModal = (item: any) => {
    const heading: any = get(item, 'name', '');
    const body: any = getModalBody(item, 'agentList');
    setModalHeading(heading);
    setModalBody(body);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let selectedOption;
  const orgId = router.query.id;
  if (token && selectedOrgId && selectedOrgId !== 'individual') {
    selectedOption = orgDropdownOptions.find(
      (profile: any) => profile._id === orgId
    );
  }

  const onChangeHandler = (value: any) => {
    const date = new Date(value);
    date.setHours(23, 59, 59, 999);
    const finalDate = moment(date).format('YYYY-MM-DDTHH:mm:ssZ');
    setCalendarDate(finalDate);

    getAgentResponseByGroup({
      deleted: selectedTab === 'recentlyDeleted' ? true : false
    });
  };

  const handlerCalenderMonthChange = (data: any = {}) => {
    const payload = { ...data };
    if (isEmpty(data)) {
      const startDate = moment().startOf('month').toISOString();
      const endDate = moment().endOf('month').toISOString();
      payload.startDate = startDate;
      payload.endDate = endDate;
    }

    if (selectedTab === 'scheduledJobs') {
      getHighlightedDate({
        ...payload
      });
    } else {
      getHighlightedDate({
        ...payload,
        params: { deleted: selectedTab === 'recentlyDeleted' ? true : false }
      });
    }
  };

  const updateSelectOption = (value: any) => {
    setSelectedOrgId(value._id);
    if (orgId !== value._id) {
      const userMetaData: any = {
        organizationId: value._id
      };
      updateUserMeta(userMetaData);
      router.push(`${value._id}`);
      selectedOption = value;
    }
  };

  const agentClick = (data: any) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    if (filterAgent?.id === data._id) {
      setFilterAgent('');
      if (selectedTab === 'scheduledJobs') {
        getSchedulerData({});
      } else if (selectedTab === 'recentlyDeleted') {
        getAgentResponseByGroup({ deleted: true });
      } else {
        getAgentResponseByGroup({ deleted: false });
      }
    } else {
      if (selectedTab === 'scheduledJobs') {
        setFilterAgent({ id: data._id, label: `${data.name} jobs` });
        getSchedulerData({
          'metaData.agentId': data._id
        });
      } else if (selectedTab === 'recentlyDeleted') {
        setFilterAgent({
          id: data._id,
          label: `Recently deleted ${data.name} jobs`
        });
        getAgentResponseByGroup({
          organizationId: orgId,
          'agent.agentId': data._id,
          deleted: true
        });
      } else {
        setFilterAgent({ id: data._id, label: `${data.name} jobs` });
        getAgentResponseByGroup({
          'agent.agentId': data._id,
          organizationId: orgId,
          deleted: false
        });
      }
    }
  };

  const handleTabSelect = (tab: any) => {
    setSelectedTab(tab);
    setFilterData([]);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-[264px] border-r flex flex-col bg-light-200 h-[100vh-52px] hover:overflow-y-auto overflow-y-hidden overflow-x-hidden sidebar">
      {isSideBarLoading && (
        <SideBarShimmer showCalendarShimmer={source !== 'SETTINGS'} />
      )}
      <div className="mt-6">
        {orgDropdownOptions?.length > 0 && (
          <div className="mb-6 mx-4 w-[216px]">
            <div className="flex mb-6">
              <SelectInput
                options={orgDropdownOptions}
                onChange={updateSelectOption}
                selectedOption={selectedOption}
                className="w-[216px] rounded-md font-small text-sm  justify-between text-black"
                optionClass="hover:bg-gray-100 py-1.5 px-3 items-center"
                panelClass="text-sm bg-white border border-gray-400"
                color="#111111"
              />
            </div>
          </div>
        )}
        <div className="border-t border-gray-300 mx-4 mb-4" />
        {source === 'SETTINGS' && (
          <>
            <MenuItem
              label={t('SIDE_BAR.GENERAL_HEADING')}
              active={true}
              iconSrc="/assets/svg/spritz.svg"
            />
          </>
        )}

        {source === 'DASHBOARD' && (
          <>
            {sideBarTabs.map((tabData) => (
              <MenuItem
                key={tabData.id}
                label={tabData.label}
                active={selectedTab === tabData.id}
                onClick={() => handleTabSelect(tabData.id)}
                iconSrc={tabData.iconSrc}
              />
            ))}
            <div className="border-t border-gray-300 mx-4 mt-4"></div>
          </>
        )}

        {source === 'DASHBOARD' && (
          <div className="mt-6">
            <DatePicker
              onChange={onChangeHandler}
              highlightedDate={highlightedDate}
              getHighlightedDate={handlerCalenderMonthChange}
            />
            {orgAgents.length > 0 && (
              <div className="my-6">
                <HeadingThree className="mx-4 text-base font-bold border-t border-gray-300 pt-6">
                  {t('SIDE_BAR.AGENT_HEADING')}
                </HeadingThree>
                <div id="step-2" />
                <div className="flex flex-wrap mt-3">
                  {orgAgents &&
                    orgAgents.map((item: any, index: any) => (
                      <AgentList
                        key={index}
                        item={item}
                        className={mergeCls([
                          'items-center justify-between hover:bg-dark-100 py-2 px-4 rounded-none',
                          filterAgent?.id === item._id && 'bg-dark-100'
                        ])}
                        listClass="cursor-pointer items-center"
                        contentClass="flex h-full items-center cursor-pointer w-[156px]"
                        agentIconClass="pr-3"
                        icon="/assets/svg/info.svg"
                        iconWidth={20}
                        iconHeight={20}
                        onDropdownSelect={() => agentClick(item)}
                        openModal={openModal}
                      />
                    ))}
                  <Modal
                    show={isModalOpen}
                    heading={modalHeading}
                    className={mergeCls(['w-[600px]'])}
                    bodyClass="max-h-[95vh] p-6 border-t border-gray-200"
                    body={modalBody}
                    onCancel={closeModal}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  highlightedDate: state.agent.highlightedDate,
  token: state.auth.token,
  orgAgents: state.organization.orgAgents,
  orgDropdownOptions: state.organization.orgDropdownOptions,
  selectedOrgId: state.organization.selectedOrgId,
  filterAgent: state.agent.filterAgent,
  isSideBarLoading: state.organization.isSideBarLoading,
  selectedTab: state.scheduler.selectedTab
});

const mapDispatchToProps = (dispatch: any) => ({
  getAgentResponseByGroup: (payload: any) =>
    dispatch(getAgentResponseByGroup(payload)),
  getHighlightedDate: (payload: any) => dispatch(getHighlightedDate(payload)),
  updateUserMeta: (payload: any) => dispatch(updateUserMeta(payload)),
  setFilterAgent: (payload: any) => dispatch(setFilterAgent(payload)),
  getSchedulerData: (payload: any) => dispatch(getSchedulerData(payload)),
  setSelectedTab: (payload: any) => dispatch(setSelectedTab(payload)),
  setSelectedOrgId: (payload: any) => dispatch(setSelectedOrgId(payload)),
  setFilterData: (payload: any) => dispatch(setFilterData(payload)),
  setCalendarDate: (payload: any) => dispatch(setCalendarDate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
