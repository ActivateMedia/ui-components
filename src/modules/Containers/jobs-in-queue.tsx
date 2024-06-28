import React, { FunctionComponent, useEffect } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import QueueJobListView from '../Views/queue-job-lis-view';
import {
  getAgentQueue,
  removeAgent,
  permanentRemoveAgentResponse,
  setAgentForInput,
  setSelectedAgent,
  getJobSuccessResponse,
  setSelectedAwaitingJobId
} from '../../reducers/agent';
import QueueShimmer from '../../components/shimmer/queueShimmer';

const JobsInQueueContainer: FunctionComponent<any> = (props) => {
  const {
    token,
    agents,
    selectedOrgId,
    waitingQueue,
    inprogressQueue,
    permanentRemoveAgentResponse,
    setAgentForInput,
    setSelectedAgent,
    isQueueLoading,
    getJobSuccessResponse,
    getAgentQueue,
    setSelectedAwaitingJobId
  } = props;

  useEffect(() => {
    if (token && selectedOrgId) {
      getAgentQueue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedOrgId]);

  const permanentDelete = (item: any) => {
    permanentRemoveAgentResponse({ _id: item._id });
  };

  const setAgentForInputHandler = (value: any) => {
    const agentId = get(
      value,
      'agent.agentId._id',
      get(value, 'agent.agentId', undefined)
    );
    const matchingAgent = agents.find(
      (agent: any) => agentId === get(agent, 'value._id', '')
    );
    setSelectedAwaitingJobId(null);
    setSelectedAgent(matchingAgent);
    setAgentForInput(value);
    window.scrollTo(0, 0);
  };

  const setAwaitingInputJob = (item: any) => {
    setSelectedAwaitingJobId(item._id);
    const agentId = get(item, 'agent.agentId', undefined);
    const matchingAgent = agents.find(
      (agent: any) => agentId === get(agent, 'value._id', '')
    );
    setSelectedAgent(matchingAgent);
    setAgentForInput(item);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="px-6">
        <div className="max-w-[1200px] mx-auto">
          {isQueueLoading && <QueueShimmer />}
          {waitingQueue.length > 0 && (
            <div className="max-w-[1200px] mx-auto mb-3 px-6">
              <QueueJobListView
                title="queue"
                list={waitingQueue}
                removeAgent={permanentDelete}
                setAgentForInputHandler={setAgentForInputHandler}
                getJobSuccessResponse={getJobSuccessResponse}
                handleAwaitingInputJobClick={setAwaitingInputJob}
              />
            </div>
          )}
          {inprogressQueue.length > 0 && (
            <div className="max-w-[1200px] mx-auto mb-3 px-6">
              <QueueJobListView
                title="inprogress"
                list={inprogressQueue}
                removeAgent={permanentDelete}
                setAgentForInputHandler={setAgentForInputHandler}
                getJobSuccessResponse={getJobSuccessResponse}
                handleAwaitingInputJobClick={setAwaitingInputJob}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  selectedOrgId: state.organization.selectedOrgId,
  agents: state.organization.agents,
  waitingQueue: state.agent.waitingQueue,
  inprogressQueue: state.agent.inprogressQueue,
  isQueueLoading: state.agent.isQueueLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  getAgentQueue: () => dispatch(getAgentQueue()),
  removeAgent: (payload: any) => dispatch(removeAgent(payload)),
  permanentRemoveAgentResponse: (payload: any) =>
    dispatch(permanentRemoveAgentResponse(payload)),
  setAgentForInput: (payload: any) => dispatch(setAgentForInput(payload)),
  setSelectedAgent: (payload: any) => dispatch(setSelectedAgent(payload)),
  getJobSuccessResponse: (payload: any) =>
    dispatch(getJobSuccessResponse(payload)),
  setSelectedAwaitingJobId: (payload: any) =>
    dispatch(setSelectedAwaitingJobId(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobsInQueueContainer));
