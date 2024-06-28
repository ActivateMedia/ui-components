import { FunctionComponent, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../components/form-elements/text-input';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { OtpProps, IOtpValues, IOtpProps } from './types';

const OtpForm: FunctionComponent<IOtpProps> = ({
  isSending,
  handleSubmit,
  formSubmitHandler,
  onClickResend
}) => {
  const { t } = useTranslation('common');
  const [otpValue, setOtpValue] = useState(undefined);

  const handleOtpChange = (event: any) => {
    setOtpValue(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="mb-5">
          <Field
            component={TextInput}
            name="otp"
            type="number"
            placeholder={t('OTP_FORM.OTP_PLACEHOLDER')}
            className="rounded-md p-2"
            value={otpValue}
            onChange={handleOtpChange}
          />
        </div>
        <div className="md:flex md:justify-between">
          <Button
            disabled={isSending || !otpValue}
            type="submit"
            className="rounded-md bg-primary-900 text-white uppercase leading-normal md:w-1/2 w-full text-sm font-bold my-2 md:mr-2 disabled:opacity-50 px-5"
          >
            {isSending
              ? t('OTP_FORM.OTP_VERIFYING')
              : t('OTP_FORM.SUBMIT_BUTTON')}
          </Button>
          <Button
            onClick={onClickResend}
            disabled={isSending}
            type="button"
            className="bg-gray-50 px-5 rounded-md text-black border border-slate-950  uppercase leading-normal text-xs font-bold md:w-1/2 w-full my-2 md:ml-2"
          >
            {t('OTP_FORM.RESEND_BUTTON')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm<IOtpValues, OtpProps>({
  form: 'otpForm',
  destroyOnUnmount: true, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(OtpForm);
