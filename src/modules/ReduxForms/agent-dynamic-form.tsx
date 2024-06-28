/* eslint-disable indent */
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { get, find, isEmpty, includes, pickBy, size } from 'lodash';
import { customValidation, reValidate } from '../../utils/validation';
import FloatingInput from '../../components/form-elements/floating-input';
import Toggle from '../../components/form-elements/toggle';
import Textarea from '../../components/form-elements/text-area';
import Button from '../../components/button';
import MultiSelect from '../../components/form-elements/multi-select';
import Select from '../../components/form-elements/select';
import Checkbox from '../../components/form-elements/check-box';
import RadioButton from '../../components/form-elements/radio-button';
import Modal from '../Modals/base-modal';
import UppyUploader from '../Uploader';
import SchedulerForm from '../ReduxForms/scheduler-form';
import { IAgentDynamicFormProps } from './types';
import { mergeCls } from '../../utils/helper';

const AgentDynamicForm: FunctionComponent<IAgentDynamicFormProps> = ({
  formElements,
  selectInputs,
  initialize,
  resetForm,
  onFormSubmit,
  handleSubmit,
  setSchedulerSubmit,
  selectedAwaitingJobId
}) => {
  const [isModal, setIsModal] = useState(false);
  const [errorsText, setErrorsText] = useState<any>({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [uploadedFilesClickList, setUploadedFilesClickList] = useState<any>([]);
  const [isSchedulerOpen, setSchedulerModalOpen] = useState(false);
  const [checkboxError, setCheckboxError] = useState<any>([]);

  useEffect(() => {
    const inputs = get(selectInputs, 'inputs', []);
    const fields: any = {};
    if (inputs.length > 0) {
      for (const item of inputs) {
        if (item.type === 'checkbox') {
          get(item, 'data', []).forEach((ele: any) => {
            fields[`${ele}|${item.type}|${item.name}`] = true;
          });
        } else {
          fields[`${item.name}|${item.type}`] = item.data;
        }
      }
      initialize(fields);
    } else {
      initialize({});
      resetForm('dynamicAgentForm');
    }
    const errors = customValidation(fields, formElements);
    setErrorsText(errors);
  }, [formElements, initialize, selectInputs, resetForm]);

  const convertInputValues = (values: any) => {
    if (!isEmpty(errorsText)) {
      return false;
    }

    const inputs: any = [];
    const nameMap: any = new Map();
    for (const item in values) {
      const nameType = item.split('|');
      if (includes(nameType, 'checkbox')) {
        if (values[item]) {
          const name = nameType[2];
          if (!nameMap.has(name)) {
            nameMap.set(name, {
              name,
              type: nameType[1],
              data: [nameType[0]]
            });
          } else {
            const oldData = nameMap.get(name);
            oldData.data.push(nameType[0]);
            nameMap.set(name, oldData);
          }
        }
      } else {
        inputs.push({
          name: nameType[0],
          type: nameType[1],
          data: values[item]
        });
      }
    }

    if (uploadedFiles.length >= 1) {
      uploadedFiles.map((items: any) =>
        inputs.push({
          name: items.name,
          type: 'file',
          data: items.data,
          metaData: { displayName: items.displayName }
        })
      );
    }

    // Convert the map values to an array
    for (const value of nameMap.values()) {
      inputs.push(value);
    }

    return inputs;
  };

  const onFormSubmitHandler = (values: any) => {
    const inputs = convertInputValues(values);

    if (!inputs) {
      return false;
    }
    onFormSubmit(inputs);
    setSelectedFileName('');
    setUploadedFiles([]);
    setUploadedFilesClickList([]);
  };

  const onChangeHandler = (ele: any) => {
    let value;
    const name = ele.target.name;
    const type = ele.target.type;
    if (type === 'checkbox') {
      value = ele.target.checked;
    } else {
      value = ele.target.value;
    }
    const [, checkboxType] = name.split('|');
    let newErrors: any = {};
    const error = reValidate(value, name, formElements);
    if (!error) {
      newErrors = pickBy(errorsText, (value, key) => {
        if (checkboxType === 'checkbox') {
          const group = ele.target.getAttribute('data-group');
          const removeError = checkboxError.filter(
            (item: any) => item !== group
          );
          setCheckboxError(removeError);
          return key !== group;
        } else {
          return key !== name;
        }
      });
      setErrorsText(newErrors);
    } else {
      newErrors = { ...errorsText };
      if (checkboxType === 'checkbox') {
        const group = ele.target.getAttribute('data-group');
        setCheckboxError([...checkboxError, group]);
        newErrors[group] = error;
      } else {
        newErrors[name] = error;
      }

      setErrorsText(newErrors);
    }
  };

  const onChangeMultiSelectHandler = (value: any, name: string) => {
    const [val] = value;
    const error = reValidate(val, name, formElements);
    if (!error) {
      const newErrors = pickBy(errorsText, (value, key) => {
        return key !== name;
      });
      setErrorsText(newErrors);
    } else {
      const newErrors = { ...errorsText };
      newErrors[name] = error;
      setErrorsText(newErrors);
    }
  };

  const handleUppyUpload = (fileKey: string, fileData: any) => {
    const existingFileIndex = uploadedFiles.findIndex(
      (file: any) => file.name === fileKey
    );

    const newInputValue: any = {
      name: fileKey,
      type: 'file',
      data: fileData.uploadURL,
      displayName: fileData.fileName
    };
    if (existingFileIndex !== -1) {
      // File with the same name exists, update it
      setUploadedFiles((prevData: any) => {
        const updatedFiles = [...prevData];
        updatedFiles[existingFileIndex] = newInputValue;
        return updatedFiles;
      });
    } else {
      // File with the same name doesn't exist, add a new entry
      setUploadedFiles((prevData: any) => [...prevData, newInputValue]);
    }

    const newErrors = pickBy(errorsText, (value, key) => {
      return key !== `${fileKey}|file`;
    });
    setErrorsText(newErrors);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const getUploadBtnLabel = (key: any) => {
    const inputs = get(selectInputs, 'inputs', []);
    const fileData = inputs.find((item: any) => item.name === key.name);
    if (fileData?.data || fileData?.metaData) {
      return get(fileData, 'metaData.displayName', get(fileData, 'data'));
    } else {
      if (uploadedFiles.length > 0) {
        const item = find(uploadedFiles, { name: key.name });
        if (item && !isEmpty(item)) {
          return get(item, 'displayName', 'Click to upload file');
        }
      }
    }

    return 'Click to upload file';
  };

  const isFileFieldValid = (key: any) => {
    if (uploadedFilesClickList.length > 0) {
      const item = find(uploadedFiles, { name: key });
      if (includes(uploadedFilesClickList, key) && !item) {
        return false;
      }
      if (get(errorsText, `${key}|file`)) {
        return false;
      }
    }
    return true;
  };

  const setTypeOfInput = (type: string) => {
    switch (type) {
      case 'shortText':
      case 'url':
        return 'text';
      case 'integer':
      case 'float':
        return 'number';
      default:
        return type;
    }
  };

  const openSchedulerModal = () => {
    setSchedulerModalOpen(!isSchedulerOpen);
  };

  const onSchedulerSubmit = (formValues: any, schedulerValues: any) => {
    openSchedulerModal();

    const inputs = convertInputValues(formValues);
    setSchedulerSubmit({ inputs, values: schedulerValues });
  };

  return (
    <>
      <form
        className="flex w-full"
        onSubmit={handleSubmit(onFormSubmitHandler)}
      >
        <div className="flex-grow ml-3 mr-3">
          {formElements.length > 0 ? (
            <div
              id="inputFieldContainer"
              className="[&>*:not(:last-child)]:mb-8"
            >
              {formElements.map((item: any, i: number) => {
                if (
                  [
                    'shortText',
                    'url',
                    'integer',
                    'float',
                    'date',
                    'time',
                    'datetime-local',
                    'email',
                    'password'
                  ].includes(item.type)
                ) {
                  return (
                    <div className="text-left" key={`input-field-${String(i)}`}>
                      <Field
                        id={`input-${item.type}-${String(i)}`}
                        name={`${item.name}|${item.type}`}
                        component={FloatingInput}
                        type={setTypeOfInput(item.type)}
                        label={
                          item.validation?.required
                            ? `${item.label} *`
                            : item.label
                        }
                        step={item.type === 'integer' ? 1 : 'any'}
                        metaError={get(errorsText, `${item.name}|${item.type}`)}
                        onChange={onChangeHandler}
                        className="w-full bg-transparent pl-0 h-11 text-base text-gray-600 border-0 border-b border-gray-300"
                      />
                    </div>
                  );
                } else if (item.type === 'boolean') {
                  return (
                    <div className="text-left" key={`input-field-${String(i)}`}>
                      <div className="mb-3">
                        <p className="hover:cursor-pointer text-sm font-bold">
                          {item.validation?.required
                            ? `${item.label} *`
                            : item.label}
                        </p>
                      </div>
                      <Field
                        id={`input-boolean-${String(i)}`}
                        name={`${item.name}|${item.type}`}
                        component={Toggle}
                        label="True"
                        type="checkbox"
                        metaError={get(errorsText, `${item.name}|${item.type}`)}
                        onChange={onChangeHandler}
                        className="w-full h-11 text-sm text-gray-600 border-0 border-b border-gray-300"
                      />
                    </div>
                  );
                } else if (item.type === 'longText') {
                  return (
                    <div key={`input-field-${String(i)}`}>
                      <Field
                        name={`${item.name}|${item.type}`}
                        component={Textarea}
                        id={`input-longText-${String(i)}`}
                        placeholder={
                          item.validation?.required
                            ? `${item.label} *`
                            : item.label
                        }
                        row={4}
                        cols={50}
                        metaError={get(errorsText, `${item.name}|${item.type}`)}
                        onChange={onChangeHandler}
                      />
                    </div>
                  );
                } else if (item.type === 'array-singleSelect') {
                  return (
                    <div key={`input-${item.name}-${String(i)}`}>
                      <div className="mb-3">
                        <p className="hover:cursor-pointer text-sm font-bold">
                          {item.validation?.required
                            ? `${item.label} *`
                            : item.label}
                        </p>
                      </div>
                      <Field
                        name={`${item.name}|${item.type}`}
                        component={Select}
                        id={`input-${item.type}-${String(i)}`}
                        options={item.options}
                        multiple={item.type === 'array-multiSelect'}
                        metaError={get(errorsText, `${item.name}|${item.type}`)}
                        onChange={onChangeHandler}
                      />
                    </div>
                  );
                } else if (item.type === 'array-multiSelect') {
                  return (
                    <div key={`input-${item.name}-${String(i)}`}>
                      <div className="mb-3">
                        <p className="hover:cursor-pointer text-sm font-bold">
                          {item.validation?.required
                            ? `${item.label} *`
                            : item.label}
                        </p>
                      </div>
                      <Field
                        name={`${item.name}|${item.type}`}
                        component={MultiSelect}
                        id={`input-${item.type}-${String(i)}`}
                        options={item.options}
                        metaError={get(errorsText, `${item.name}|${item.type}`)}
                        onChange={(val: any) =>
                          onChangeMultiSelectHandler(
                            val,
                            `${item.name}|${item.type}`
                          )
                        }
                      />
                    </div>
                  );
                } else if (item.type === 'radio') {
                  return (
                    <div
                      className="inline-block [&>*:not(:last-child)]:mb-3"
                      key={`input-field-${String(i)}`}
                    >
                      <div className="">
                        <p className="hover:cursor-pointer text-sm font-bold">
                          {item.validation?.required
                            ? `${item.label} *`
                            : item.label}
                        </p>
                      </div>

                      {item.options?.map((option: any, index: any) => (
                        <Field
                          key={index}
                          name={`${item.name}|${item.type}`}
                          component={RadioButton}
                          type="radio"
                          value={option.value}
                          label={option.name}
                          id={`input-radio-${String(i)}-${String(index)}`}
                          metaError={get(
                            errorsText,
                            `${item.name}|${item.type}`
                          )}
                          onChange={onChangeHandler}
                        />
                      ))}
                    </div>
                  );
                } else if (item.type === 'checkbox') {
                  return (
                    <div
                      className="inline-block w-full [&>*:not(:last-child)]:mb-3"
                      key={`input-${item.name}-${String(i)}`}
                    >
                      <div>
                        <p className="hover:cursor-pointer text-sm font-bold">
                          {item.validation?.required
                            ? `${item.label} *`
                            : item.label}
                        </p>
                      </div>
                      {item.options?.map((option: any, index: any) => (
                        <Field
                          id={`input-checkbox-${String(i)}-${String(index)}`}
                          key={index}
                          component={Checkbox}
                          label={option.name}
                          dataGroup={`${item.name}|${item.type}`}
                          name={`${option.value}|${item.type}|${item.name}`}
                          type="checkbox"
                          className=""
                          metaError={get(
                            errorsText,
                            `${option.value}|${item.type}|${item.name}`
                          )}
                          onChange={onChangeHandler}
                        />
                      ))}
                      {checkboxError.includes(`${item.name}|${item.type}`) && (
                        <p
                          id="filled_error_help"
                          className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium"
                        >
                          {get(item, 'validation.error', 'File is required')}
                        </p>
                      )}
                    </div>
                  );
                } else if (item.type === 'file') {
                  return (
                    <div
                      className="inline-block w-full [&>*:not(:last-child)]:mb-3"
                      key={`input-${item.name}-${String(i)}`}
                    >
                      <div>
                        <p className="hover:cursor-pointer text-sm font-bold">
                          {item.validation?.required
                            ? `${item.label} *`
                            : item.label}
                        </p>
                      </div>
                      <div
                        className="text-left"
                        key={`input-field-${String(i)}`}
                      >
                        <Button
                          key={i}
                          type="button"
                          className="bg-light-300 h-11 text-sm text-black border-dark-300 border border-dashed w-full p-3 text-left rounded-md"
                          onClick={() => {
                            toggleModal();
                            setSelectedFileName(item.name);
                            setUploadedFilesClickList((prevItem: any) => [
                              ...prevItem,
                              item.name
                            ]);
                          }}
                        >
                          {getUploadBtnLabel(item)}
                        </Button>
                        {!isFileFieldValid(item.name) && (
                          <p
                            id="filled_error_help"
                            className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium"
                          >
                            {get(item, 'validation.error', 'File is required')}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className="flex items-center h-full bg-dark-100 p-2 rounded-md">
              <p className="">The agent does not have any inputs!</p>
            </div>
          )}

          <Modal
            show={isModal}
            heading="Upload File"
            bodyClass="border-t border-gray-200"
            body={
              <UppyUploader
                onComplete={toggleModal}
                fileKey={selectedFileName}
                handleUppyUpload={handleUppyUpload}
              />
            }
            onCancel={toggleModal}
          />
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            className={mergeCls(
              'mx-auto bg-primary-900 hover:bg-primary-90 text-white disabled:opacity-50 px-6 py-3',
              selectedAwaitingJobId ? 'rounded-md' : 'rounded-l-md'
            )}
            disabled={size(errorsText) > 0}
          >
            {selectedAwaitingJobId ? 'Continue' : 'Queue'}
          </Button>
          {!selectedAwaitingJobId && (
            <Button
              type="button"
              leftIcon="Calendar.svg"
              onClick={openSchedulerModal}
              className="mx-auto bg-primary-900 hover:bg-primary-90 text-white disabled:opacity-50 p-3 ml-px rounded-r-md"
              disabled={size(errorsText) > 0}
            >
              {null}
            </Button>
          )}
        </div>
      </form>
      <Modal
        show={isSchedulerOpen}
        heading="Schedule job"
        bodyClass="border-t border-gray-200 overflow-y-auto max-h-[calc(90vh-49px)]"
        body={
          <SchedulerForm
            onCancel={openSchedulerModal}
            onSchedulerSubmit={onSchedulerSubmit}
          />
        }
        onCancel={openSchedulerModal}
      />
    </>
  );
};

export default reduxForm<any, any, string>({
  form: 'dynamicAgentForm', // Unique name for the form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true // This will destroy the form on unmount
  // validate: (values, props) => customValidation(values, props.formElements)
})(AgentDynamicForm);
