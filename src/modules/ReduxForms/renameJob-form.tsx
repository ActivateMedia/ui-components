import { FunctionComponent, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../components/form-elements/text-input';
import Button from '../../components/button';
import { IRenameFormProps } from './types';

const RenameForm: FunctionComponent<IRenameFormProps> = ({
  isRenameJob,
  handleSubmit,
  initialize,
  onFormSubmit,
  cancelModal,
  handleChange
}) => {
  useEffect(() => {
    initialize({ jobName: isRenameJob });
  }, [initialize, isRenameJob]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="border-t border-gray-200 p-6">
        <p className="text-sm font-semibold mb-2">Job Name</p>

        <div className="flex w-full mb-6">
          <Field
            component={TextInput}
            name="jobName"
            type="text"
            placeholder="Job Name"
            className="w-full border-none p-3 text-sm bg-light-200 rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            className="mr-3 bg-gray-50 rounded-md text-black border border-dark-900 px-6 py-3 flex items-center"
            onClick={cancelModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-900 h-11 text-white disabled:opacity-50 px-6 py-3 rounded-md"
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm<any, any, string>({
  form: 'renameJobForm',
  destroyOnUnmount: true, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(RenameForm);
