import { InjectedFormProps } from 'redux-form';

/* Start: Sign-in props interface */
export interface SignInProps {
  formSubmitHandler: (arg: any) => any;
  isSending: boolean;
  router: any;
}

export interface ISignInValues {
  email: string;
}

export type ISignInProps = SignInProps &
  InjectedFormProps<ISignInValues, SignInProps>;

/* End: Sign-in props interface */

/* Start: Opt props interface */
export interface OtpProps {
  formSubmitHandler: (arg: any) => any;
  isSending: boolean;
  onClickResend?: () => void;
}

export interface IOtpValues {
  email: string;
}

export type IOtpProps = OtpProps & InjectedFormProps<IOtpValues, OtpProps>;
/* End: Opt props interface */

export interface InputValue {
  name: string;
  type: string;
  data: any;
}

export interface AgentFormProps {
  formElements: any;
  agentDdOnchange: (value: any) => void;
  agentFormSubmit: (input: any) => false | undefined;
  agents: any;
  resetFormValues: any;
  invalid: boolean;
}

export type CombinedProps = AgentFormProps &
  InjectedFormProps<FormData, AgentFormProps, string>;

export interface ISchedulerFormProps {
  dynamicAgentFormValues: any;
  schedulerFormValue: any;
  initialize: (values: any) => void;
  onCancel: () => void;
  handleSubmit: (values: any) => any;
  onSchedulerSubmit: (dynamicAgentFormValues: any, values: any) => void;
}

export interface IRenameFormProps {
  isRenameJob: string;
  handleSubmit: (values: any) => any;
  initialize: (values: any) => any;
  onFormSubmit: (values: any) => any;
  cancelModal: () => void;
  handleChange: (event: any) => void;
}

export interface IInvitationFormProps {
  invalid: boolean;
  onFormSubmit: (values: any) => any;
  handleSubmit: (values: any) => any;
}

export interface IAgentDynamicFormProps {
  formElements: any[];
  selectInputs: any;
  agent: any;
  orgId: any;
  selectedAwaitingJobId: any;
  initialize: (payload: any) => any;
  setSchedulerSubmit: (payload: any) => any;
  resetForm: (payload: any) => any;
  handleSubmit: (payload: any) => any;
  onFormSubmit: (payload: any) => any;
}
