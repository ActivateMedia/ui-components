/* eslint-disable indent */
import React, { FunctionComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, emailValidation } from '../../utils/validation';
import FloatingInput from '../../components/form-elements/floating-input';
import Button from '../../components/button';
import { useTranslation } from 'next-i18next';
import { IInvitationFormProps } from './types';

const InvitationForm: FunctionComponent<IInvitationFormProps> = ({
  invalid,
  onFormSubmit,
  handleSubmit
}) => {
  const { t } = useTranslation('common');

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex items-center mb-6">
        <div className="relative flex-1 z-0 mr-4">
          <p className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            {t('TEAM.MEMBER_NAME')}
          </p>
          <Field
            name="username"
            component={FloatingInput}
            placeholder="John Smith"
            className="border-0 bg-light-200 h-11 w-72 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 "
            validate={[required]}
          />
        </div>
        <div className="relative flex-1 z-0">
          <p className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            {t('TEAM.MEMBER_EMAIL')}
          </p>
          <Field
            name="email"
            component={FloatingInput}
            placeholder="johnsmith@company.com"
            className="border-0 bg-light-200 h-11 w-72  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 "
            validate={[required, emailValidation]}
          />
        </div>
        <div className="flex-none">
          <Button
            type="submit"
            className={`ml-3 text-white px-5 rounded-md mt-7 ${
              invalid ? 'bg-primary-400' : 'bg-primary-900'
            }`}
            disabled={invalid}
          >
            {t('BUTTON.INVITE_BUTTON')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm<any, any, string>({
  form: 'invitationForm', // Unique name for the form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true // This will destroy the form on unmount
})(InvitationForm);
