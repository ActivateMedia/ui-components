import { FunctionComponent, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { required, emailValidation } from '../../utils/validation';
import TextInput from '../../components/form-elements/text-input';
import Button from '../../components/button';
import { SignInProps, ISignInValues, ISignInProps } from './types';

const SignInForm: FunctionComponent<ISignInProps> = ({
  invalid,
  router,
  isSending,
  handleSubmit,
  formSubmitHandler,
  initialize
}) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    const { invitedBy } = router.query;
    if (invitedBy) {
      initialize({ email: invitedBy });
    }
  }, [router, initialize]);

  const onFormSubmit = (values: any) => {
    formSubmitHandler(values);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mb-5">
        <Field
          component={TextInput}
          name="email"
          type="text"
          placeholder={t('SIGN_IN_FORM.EMAIL_PLACEHOLDER')}
          className="rounded-md p-2"
          validate={[required, emailValidation]}
        />
      </div>

      <Button
        disabled={isSending || invalid}
        type="submit"
        className="rounded-md bg-primary-900 text-white uppercase leading-normal w-full text-sm font-bold disabled:opacity-50 px-5"
      >
        {isSending ? t('SIGN_IN_FORM.LOADING') : t('SIGN_IN_FORM.LOGIN_BUTTON')}
      </Button>
    </form>
  );
};

export default reduxForm<ISignInValues, SignInProps>({
  form: 'signIn',
  destroyOnUnmount: true, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(SignInForm);
