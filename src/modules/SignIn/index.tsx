/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { setInvitationInfo } from '../../reducers/user';
import { startLoginWithOtp, verifyOtp } from '../../reducers/auth';
import SignInForm from '../ReduxForms/signin-form';
import OtpForm from '../ReduxForms/otp-form';
import TextInput from '../../components/form-elements/text-input';
// import SocialLogin from './social-login';
import Brand from '../../components/brand/index';
import HeadingFive from '../../components/typography/HeadingFive';
import Paragraph from '../../components/typography/paragraph';

const SignIn = (props: any) => {
  const {
    startLoginWithOtp,
    verifyOtp,
    token,
    router,
    email,
    user,
    setInvitationInfo
  } = props;
  const [isSending, setIsSending] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { t } = useTranslation('common');

  /* Check token is exist or not */
  useEffect(() => {
    if (token) {
      const organizationId = get(
        user,
        'userMeta.organizationId',
        process.env.DefaultOrganisation
      );
      router.push(`/dashboard/${organizationId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Send otp on given email
   * @param values
   */
  const signInFormHandler = (values: any) => {
    setIsSending(true);
    const obj = {
      email: values.email.toLowerCase().trim()
    };

    /* Handle user login otp */
    startLoginWithOtp(obj).then((response: any) => {
      if (!response) {
        setIsOtpSent(false);
      } else {
        setIsOtpSent(true);
      }
      setIsSending(false);
    });
  };

  /**
   * Verify user given otp
   * @param values
   */
  const otpFormHandler = (values: any) => {
    setIsSending(true);

    /* Verify otp */
    const { invite, org } = router.query;
    if (invite && org) {
      setInvitationInfo({ orgId: org, invitationId: invite });
    }
    verifyOtp(values.otp).then(async (response: any) => {
      if (!response) {
        setIsSending(false);
      }
    });
  };

  const onClickResendHandler = () => {
    setIsOtpSent(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="bg-white sm:shadow-300 rounded-lg p-6 sm:max-w-xs w-full">
        <div className="flex items-center justify-center my-7">
          <Brand />
        </div>

        <div className="text-center mb-4 text-gray-600">
          <HeadingFive className="mb-2 text-gray-600">Welcome</HeadingFive>
          <Paragraph className="mb-5">
            {t('SIGN_IN_PAGE.SOCIAL_LOGIN_HEADING')}
          </Paragraph>
        </div>

        {!isOtpSent && (
          <SignInForm
            isSending={isSending}
            formSubmitHandler={signInFormHandler}
            router={router}
          />
        )}
        {isOtpSent && (
          <>
            <div>
              <TextInput
                placeholder={email}
                disabled={true}
                className="border border-black rounded-md p-2 mb-5"
              />
              <Paragraph className="mb-3 text-gray-600">
                {t('SIGN_IN_PAGE.CONFIRMATION_TEXT')}
              </Paragraph>
            </div>
            <div>
              <OtpForm
                isSending={isSending}
                formSubmitHandler={otpFormHandler}
                onClickResend={onClickResendHandler}
              />
            </div>
          </>
        )}
        {/* <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <Paragraph className="mx-4 mb-0 text-center font-semibold dark:text-white">
            Or
          </Paragraph>
        </div>
        <SocialLogin action="login" /> */}
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  email: state.auth.email,
  token: state.auth.token,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => ({
  startLoginWithOtp: (payload: any) => dispatch(startLoginWithOtp(payload)),
  verifyOtp: (payload: any) => dispatch(verifyOtp(payload)),
  setInvitationInfo: (payload: any) => dispatch(setInvitationInfo(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
