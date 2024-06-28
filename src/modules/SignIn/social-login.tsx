import auth0 from 'auth0-js';
import { FunctionComponent } from 'react';
import Button from '../../components/button';

/**
 * Social login
 * @param {*} props
 * @returns
 */
interface IProps {
  action?: any;
  socialLoginHandler: (item: string) => void;
}

const SocialLogin: FunctionComponent<IProps> = ({
  action,
  socialLoginHandler
}) => {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        className="rounded-md text-black border border-slate-950 flex items-center w-full px-5"
        onClick={() => socialLoginHandler('google-oauth2')}
        leftIcon="google.svg"
      >
        Continue with Google
      </Button>

      <Button
        type="button"
        className="rounded-md text-black border border-slate-950 flex items-center w-full px-5"
        onClick={() => socialLoginHandler('linkedin')}
        leftIcon="linkedin.svg"
      >
        Continue with LinkedIn
      </Button>
    </div>
  );
};

export default SocialLogin;
