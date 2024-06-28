/* eslint-disable indent */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { toast } from 'react-toastify';
import { reset } from 'redux-form';
import {
  callAgent,
  submitAwaitingJob,
  setSelectedAwaitingJobId
} from '../../reducers/agent';
import { setScheduler } from '../../reducers/scheduler';
import AgentDynamicForm from '../ReduxForms/agent-dynamic-form';
import SearchInput from '../../components/form-elements/search-input';
import { setAgentForInput, setSelectedAgent } from '../../reducers/agent';
import QueueShimmer from '../../components/shimmer/queueShimmer';

interface IProps {
  token: any;
  router: any;
  agents: any;
  callAgent: any;
  setScheduler: (item: any) => void;
  isQueueLoading: any;
  resetForm: (item: any) => void;
  selectAgentInputs: any;
  setAgentForInput: (item: any) => void;
  setSelectedAgent: any;
  selectedAgent: any;
  submitAwaitingJob: (item: any) => void;
  selectedAwaitingJobId: any;
  setSelectedAwaitingJobId: (item: any) => void;
}

const AgentContainer: FunctionComponent<IProps> = ({
  token,
  router,
  agents,
  callAgent,
  setScheduler,
  isQueueLoading,
  resetForm,
  selectAgentInputs,
  setAgentForInput,
  setSelectedAgent,
  selectedAgent,
  submitAwaitingJob,
  selectedAwaitingJobId,
  setSelectedAwaitingJobId
}) => {
  const orgId = router.query.id;
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    if (
      !get(selectedAgent, 'value', false) &&
      get(router, 'query.agentId', false)
    ) {
      const urlAgent = agents.find(
        (item: any) => item.value._id === router.query.agentId
      );
      setAgent(urlAgent?.value);
      setSelectedAgent(urlAgent);
    } else {
      const matchingAgent: any = agents.find(
        (agent: any) =>
          get(agent, 'value._id', '') ===
          get(selectAgentInputs, 'agent.agentId', undefined)
      );
      if (matchingAgent) {
        setAgent(matchingAgent?.value);
      } else if (agents.length === 1) {
        setAgent(get(agents, '[0].value'));
      } else {
        setAgent(null);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, agents]);

  useEffect(() => {
    if (selectedAgent && selectedAgent.value) {
      setAgent(selectedAgent.value);
    }
  }, [selectedAgent]);

  const agentFormSubmit = (values: any) => {
    if (isEmpty(selectedAgent)) {
      toast.error('You have not selected any agent. Please select agent!');
      return false;
    }
    /* Call API */
    const payload: any = {
      inputs: values,
      agentId: get(agent, '_id')
    };
    if (orgId && orgId !== 'dashboard') {
      payload.organizationId = orgId;
    }

    if (agents.length > 1) {
      setAgent(null);
      setSelectedAgent(null);
      window.history.pushState(`dashboard/${orgId}`, 'dashboard', `${orgId}`);
    }
    resetForm('dynamicAgentForm');
    setAgentForInput({});
    if (selectedAwaitingJobId) {
      submitAwaitingJob({ inputs: values });
    } else {
      callAgent(payload);
    }
  };

  const schedulerFormSubmit = (schedulerFormValues: any) => {
    if (isEmpty(selectedAgent)) {
      toast.error('You have not selected any agent. Please select agent!');
      return false;
    }

    /* Call API */
    if (agents.length > 1) {
      setAgent(null);
      setSelectedAgent(null);
      window.history.pushState(`dashboard/${orgId}`, 'dashboard', `${orgId}`);
    }
    setAgentForInput({});
    resetForm('dynamicAgentForm');
    resetForm('schedulerForm');
    setScheduler({
      ...get(schedulerFormValues, 'values', {}),
      metaData: {
        inputs: get(schedulerFormValues, 'inputs', []),
        agentId: get(agent, '_id'),
        organizationId: orgId
      }
    });
  };

  const onSelectChange = (option: any) => {
    const agentId = get(option, 'value._id', '');
    window.history.pushState(
      `dashboard/${orgId}`,
      'dashboard',
      `${orgId}?agentId=${agentId}`
    );
    setSelectedAwaitingJobId(null);
    setSelectedAgent(null);
    resetForm('dynamicAgentForm');
    setAgentForInput({});
    setAgent(option.value);
    setSelectedAgent(option);
  };

  return (
    <>
      <div className="px-6">
        <div className="max-w-[1200px] mx-auto">
          {isQueueLoading && <QueueShimmer />}
          <div className="flex p-6">
            <div className="flex h-11" id="step-3">
              <SearchInput
                options={agents}
                selectedOption={
                  selectedAgent || {
                    value: '',
                    label: 'Select an agent',
                    color: '#0C0F13'
                  }
                }
                className="w-72 px-2 h-11 rounded-md font-small text-sm border border-gray-400 justify-between bg-white text-black"
                optionClass="hover:bg-gray-100 py-1.5 px-3 items-start"
                panelClass="text-sm bg-white border border-gray-400 w-[400px] max-h-[540px] overflow-y-auto"
                color="#111111"
                onChange={onSelectChange}
              />
            </div>
            {agent && (
              <AgentDynamicForm
                token={token}
                formElements={get(selectedAgent, 'inputs', [])}
                onFormSubmit={agentFormSubmit}
                setSchedulerSubmit={schedulerFormSubmit}
                selectInputs={selectAgentInputs}
                resetForm={resetForm}
                selectedAwaitingJobId={selectedAwaitingJobId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  agents: state.organization.agents,
  isQueueLoading: state.agent.isQueueLoading,
  selectedAgent: state.agent.selectedAgent,
  selectAgentInputs: state.agent.selectAgentInputs,
  selectedAwaitingJobId: state.agent.selectedAwaitingJobId
});

const mapDispatchToProps = (dispatch: any) => ({
  resetForm: (formName: string) => dispatch(reset(formName)),
  callAgent: (payload: any) => dispatch(callAgent(payload)),
  setScheduler: (payload: any) => dispatch(setScheduler(payload)),
  setAgentForInput: (payload: any) => dispatch(setAgentForInput(payload)),
  setSelectedAgent: (payload: any) => dispatch(setSelectedAgent(payload)),
  submitAwaitingJob: (payload: any) => dispatch(submitAwaitingJob(payload)),
  setSelectedAwaitingJobId: (payload: any) =>
    dispatch(setSelectedAwaitingJobId(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AgentContainer));
