import React from 'react';
import { get } from 'lodash';
import * as cheerio from 'cheerio';
import { marked } from 'marked';
import { Tabs, Tab } from '../components/tabs/index';
import Button from '../components/button';
import { BodyShimmer } from '../components/shimmer/modalShimmer';
marked.use({
  gfm: true,
  breaks: true
});

export const renderTitle = (item: any) => {
  if (!item) return '';
  if (item.status === 'failed') {
    const failedResp = get(
      item,
      'failedResp.reason',
      'Error: Failed to execute the agent response.'
    );

    const $ = cheerio.load(
      `${
        typeof failedResp === 'object'
          ? 'Error: Failed to execute the agent response.'
          : failedResp
      }`
    );

    return (
      <span className="relative group break-all  ">
        <span className="text-red-600 line-clamp-4 ">
          {getListTitle(item, 'completedJobs')}
        </span>
        <span className="absolute bottom-5 left-0 group-hover:overflow-x-auto max-w-[600px] bg-light-200 rounded-lg shadow-lg  p-3 text-xs text-black opacity-0 scale-0 transform origin-top-left transition-all group-hover:opacity-100 group-hover:scale-100 z-[100] whitespace-nowrap">
          {$.text()}
        </span>
      </span>
    );
  }

  return (
    <span className="line-clamp-4 break-all">
      {getListTitle(item, 'completedJobs')}
    </span>
  );
};

export const getListTitle = (item: any, sourcePage: any) => {
  let input = get(item, 'inputs[0]', {});
  if (sourcePage === 'scheduleJobs') {
    input = get(item, 'metaData.inputs[0]', {});
  }
  const title = get(item, 'successResp.title');
  if (title) {
    return title;
  }

  switch (input.type) {
    case 'url':
    case 'longText':
    case 'shortText': {
      let urlData = get(input, 'data');
      if (typeof urlData !== 'string') {
        urlData = JSON.stringify(urlData);
      }
      const truncatedData =
        urlData && urlData.length > 128
          ? urlData.substring(0, 128) + '...'
          : urlData;
      return truncatedData;
    }
    case 'file': {
      let fileName = get(input, 'data');
      if (typeof fileName !== 'string') {
        fileName = JSON.stringify(fileName);
      }
      const disPlayFileNames =
        typeof fileName === 'string'
          ? fileName.split('/').slice(4).join('/')
          : fileName;
      return disPlayFileNames;
    }
    default: {
      let inputData = get(input, 'data');
      if (typeof inputData !== 'string') {
        inputData = JSON.stringify(inputData);
      }

      const documentTitle =
        inputData ||
        `${get(
          item,
          'agent.name',
          get(item, 'metaData.agentId.name')
        )} Document`;
      return documentTitle;
    }
  }
};

export const getModalHtml = (item: any) => {
  const response = get(item, 'successResp.outputs', []);
  const inputs = get(item, 'inputs', []);
  const agent = get(item, 'agent', {});
  const jobHasMultipleAgent = get(item, 'jobHasMultipleAgent', false);
  return {
    outputs: response,
    inputs: inputs,
    agent: agent,
    jobHasMultipleAgent
  };
};

/**
 * This method is responsible for get modal body
 *
 * @param {any} item - job item
 * @param {string} sourcePage - source page
 * @returns {JSX.Element} - return modal body
 */
export const getModalBody = (item: any, sourcePage: any) => {
  switch (sourcePage) {
    case 'agentList': {
      return (
        <div
          className="text-sm break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: get(item, 'description', '')
          }}
        />
      );
    }
    case 'listView':
    case 'cardView':
    case 'queueList':
    case 'onlyInput': {
      return getModalHtml(item);
    }
    default: {
      return '';
    }
  }
};

/**
 * This method is responsible for get schedule modal body
 *
 * @param {*} item - schedule item
 * @returns {JSX.Element} - return schedule modal body
 */
export const getScheduleModalHtml = (item: any) => {
  const inputs = get(item, 'metaData.inputs', []);
  const agent = get(item, 'metaData.agentId', {});
  return {
    inputs: inputs,
    agent: agent
  };
};

/**
 * This method is responsible for get content data
 *
 * @param {*} content - agent content
 * @returns {string} - return content data
 */
export const contentData = (content: any) => {
  switch (content.type) {
    case 'array-multiSelect':
    case 'checkbox':
      return content.data?.join(', ');
    case 'boolean':
      return content.data ? 'True' : 'False';
    case 'file':
      return get(content, 'metaData.displayName', get(content, 'data', ''));
    default: {
      let title = get(content, 'data');
      if (typeof title === 'object') {
        title = JSON.stringify(title);
      }
      return title;
    }
  }
};

export const getHtml = (content: any, index: number) => {
  switch (content.type) {
    case 'markdown': {
      const markText = content?.data || '';
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{
            __html: marked.parse(markText)
          }}
        />
      );
    }
    case 'list': {
      const $ = cheerio.load(content?.data?.join(''));
      return (
        <div
          key={index}
          className="text-sm break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: $.html()
          }}
        />
      );
    }
    default: {
      const $ = cheerio.load(content?.data);
      return (
        <div
          key={index}
          className="text-sm break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: $.html()
          }}
        />
      );
    }
  }
};

/**
 * This method is responsible for get output body
 *
 * @param {*} outputs - agent outputs
 * @returns {JSX.Element} - return output body
 */
export const getOutputBody = (outputs: any) => {
  if (outputs.length > 0) {
    return outputs.map((content: any, index: any) => {
      return getHtml(content, index);
    });
  }
  return (
    <span className="text-sm break-words whitespace-pre-line text-red-700">
      The agent provided response without output
    </span>
  );
};

/**
 * This method is responsible for get input body
 *
 * @param {*} inputs - agent inputs
 * @param {fn} resubmit - resubmit function
 * @returns {JSX.Element} - return input body
 */
export const getInputBody = (inputs: any, resubmit?: any) => {
  return (
    <>
      {inputs.map((content: any, index: any) => (
        <div className="mb-6" key={index}>
          <p className="block text-sm font-bold pb-2">{content.name}</p>
          <p className="block text-sm font-medium">{contentData(content)}</p>
          <div className="flex items-end mb-6"></div>
        </div>
      ))}
      {resubmit && (
        <div className="absolute bottom-6 right-6 flex justify-end">
          <Button
            type="submit"
            className="bg-primary-900 h-11 text-white disabled:opacity-50 px-5 rounded-md"
            onClick={resubmit}
          >
            Resubmit
          </Button>
        </div>
      )}
    </>
  );
};

/**
 * This method is responsible for create modal body
 *
 * @param {*} modalBody - modal body
 * @param {string} sourcePage - source page
 * @param {boolean} isModalLoading - is modal loading
 * @param {fn} resubmit - resubmit function
 * @returns {JSX.Element} - return modal body
 */
export const createModalBody = (
  modalBody: any,
  sourcePage: string,
  isModalLoading?: any,
  resubmit?: any
) => {
  switch (sourcePage) {
    case 'cardView':
    case 'listView': {
      const { outputs, inputs, jobHasMultipleAgent } = modalBody;
      return (
        <Tabs
          ulClass="max-w-[1200px] h-full bg-white"
          tabClass="h-[calc(90vh-117px)] overflow-y-auto mb-1 rounded-b-lg"
        >
          <Tab label="Job output">
            {isModalLoading ? (
              <BodyShimmer />
            ) : jobHasMultipleAgent ? (
              getInputBody(outputs)
            ) : (
              getOutputBody(outputs)
            )}
          </Tab>
          <Tab label="Job input">
            {isModalLoading ? <BodyShimmer /> : getInputBody(inputs, resubmit)}
          </Tab>
        </Tabs>
      );
    }
    case 'queue':
    case 'SchedulerList':
    case 'SchedulerCard':
    case 'onlyInput': {
      const { inputs } = modalBody;
      return (
        <div className="p-6 border-t border-gray-200 h-[calc(90vh-96px)] rounded-b-lg">
          {isModalLoading ? (
            <BodyShimmer />
          ) : (
            getInputBody(inputs, sourcePage === 'onlyInput' ? resubmit : null)
          )}
        </div>
      );
    }
    default: {
      return '';
    }
  }
};
