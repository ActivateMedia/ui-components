/* eslint-disable indent */
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { getLocalTime } from '../../utils/helper';
import FloatingInput from '../../components/form-elements/floating-input';
import DropDown from '../../components/form-elements/drop-down';
import Button from '../../components/button';
import RadioButton from '../../components/form-elements/radio-button';
import DaySelector from '../../components/daySelector';
import { ISchedulerFormProps } from './types';

const Scheduler: FunctionComponent<ISchedulerFormProps> = ({
  schedulerFormValue,
  dynamicAgentFormValues,
  initialize,
  onCancel,
  handleSubmit,
  onSchedulerSubmit
}) => {
  const weekArray = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const currentDate = moment();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [repeatEvery, setRepeatEvery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(
    currentDate.clone().format('YYYY-MM-DD')
  );

  useEffect(() => {
    const roundedMinutes = 5 * Math.ceil(currentDate.clone().minutes() / 5);
    initialize({
      repeatInterval: 1,
      occurrence: 1,
      endType: 'never',
      repeatType: 'day',
      startDate: currentDate.format('YYYY-MM-DD'),
      endDate: currentDate.format('YYYY-MM-DD'),
      hours:
        roundedMinutes >= 60 ? currentDate.hours() + 1 : currentDate.hours(),
      minutes: roundedMinutes >= 60 ? 0 : roundedMinutes
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDaySelection = (dayIndex: number) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(dayIndex)) {
        return prevSelectedDays.filter(
          (selectedDay) => selectedDay !== dayIndex
        );
      } else {
        return [...prevSelectedDays, dayIndex];
      }
    });
  };

  const onChangeHandler = (ele: any) => {
    const value = ele.target.value;
    setRepeatEvery(value);
  };

  const onFormSubmit = (values: any) => {
    if (!values) {
      return;
    }
    if (values?.repeatType === 'week') {
      values.repeatWeeks = selectedDays;
    }
    const { hours, minutes, ...updatedValues } = values;
    const localDateStartDate = getLocalTime(
      moment(values.startDate + ' ' + `${hours}:${minutes}:00`).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    );
    updatedValues.startDate = localDateStartDate;
    onSchedulerSubmit(dynamicAgentFormValues, updatedValues);
  };

  const handleDateChange = (date: string) => {
    if (date) {
      setSelectedDate(date);
      initialize({
        ...schedulerFormValue,
        endDate: moment(date).format('YYYY-MM-DD')
      });
    }
  };

  const renderHourOptions = () => {
    const startHour = moment(selectedDate).isSame(currentDate, 'day')
      ? currentDate.hours()
      : 0;
    return Array.from(
      { length: 24 - startHour },
      (_, index) => startHour + index
    );
  };

  return (
    <form className="flex w-full" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col p-6 overflow-y-auto">
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <p className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Starts On
            </p>
            <Field
              name="startDate"
              component={FloatingInput}
              id="date"
              type="date"
              placeholder="Select date"
              className="border-0 bg-light-200 h-11 w-72 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 "
              min={currentDate.format('YYYY-MM-DD')}
              onChange={(e: any) => handleDateChange(e?.target?.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Time
            </p>
            <div className="flex items-center">
              <Field
                name="hours"
                component={DropDown}
                id={'hours'}
                options={renderHourOptions()}
                className="w-[136px] px-2 h-11 bg-light-200 rounded-md font-small text-sm border-0 justify-between text-black"
                optionclassName="hover:bg-gray-100 py-1.5 px-3 items-center"
                panelclassName="text-sm bg-white border border-gray-400"
              />
              <span className="px-1"> : </span>
              <Field
                name="minutes"
                component={DropDown}
                id={'minutes'}
                options={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
                className="w-[136px] px-2 h-11 bg-light-200 rounded-md font-small text-sm border-0 justify-between text-black"
                optionclassName="hover:bg-gray-100 py-1.5 px-3 items-center"
                panelclassName="text-sm bg-white border border-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <p className="block mt-6 mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Repeat every
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex space-x-3">
            <Field
              name="repeatInterval"
              component={FloatingInput}
              type="number"
              defaultValue={1}
              id="repeat"
              className="border-0 w-72 h-11 bg-light-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
              min={1}
            />
            <Field
              name="repeatType"
              component={DropDown}
              id={'repeatEvery'}
              options={['day', 'week', 'month']}
              className="w-72 px-2 h-11 bg-light-200 border-0 rounded-md font-small text-sm justify-between text-black"
              optionclassName="hover:bg-gray-100 py-1.5 px-3 items-center"
              panelclassName="text-sm bg-white border border-gray-400"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        {repeatEvery === 'week' && (
          <>
            <p className="block mt-6 mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Day
            </p>
            <div className="flex space-x-1">
              {weekArray.map((item: any, index: any) => (
                <DaySelector
                  key={index}
                  letter={item}
                  selected={selectedDays.includes(index + 1)} // Check if the day is selected
                  onClick={() => toggleDaySelection(index + 1)}
                />
              ))}
            </div>
          </>
        )}

        <p className="block mt-6 mb-2 text-sm font-bold text-gray-900 dark:text-white">
          Ends
        </p>
        <div className="space-y-6">
          <div className="flex h-10">
            <Field
              name="endType"
              component={RadioButton}
              labelClass="w-16"
              type="radio"
              value="never"
              label="Never"
            />
          </div>
          <div className="flex h-10">
            <Field
              name="endType"
              component={RadioButton}
              labelClass="w-16"
              type="radio"
              value="on"
              label="On"
            />

            <Field
              name="endDate"
              component={FloatingInput}
              id="date"
              type="date"
              placeholder="Select date"
              className="border-0 w-72 h-11 bg-light-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 "
              min={moment(selectedDate).format('YYYY-MM-DD')}
            />
          </div>
          <div className="flex h-10 items-center">
            <Field
              name="endType"
              component={RadioButton}
              labelClass="w-16"
              type="radio"
              value="after"
              label="After"
            />
            <Field
              name="occurrence"
              component={FloatingInput}
              id="occurances"
              type="number"
              className="border-0 w-72 h-11 bg-light-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 "
              min={1}
            />
            <p className="ml-2 text-sm text-gray-900 dark:text-white ">
              occurrences
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-6">
          <Button
            type="button"
            className="rounded-md text-black border border-dark-900 py-3 px-6 flex items-center"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className=" bg-primary-900 text-white disabled:opacity-50 px-6 py-3 rounded-md"
          >
            Schedule
          </Button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state: any) => {
  const dynamicAgentFormValues = getFormValues('dynamicAgentForm')(state);
  const schedulerFormValue = getFormValues('schedulerForm')(state);
  return {
    dynamicAgentFormValues,
    schedulerFormValue
  };
};

export default connect(mapStateToProps)(
  reduxForm<any, any, string>({
    form: 'schedulerForm', // Unique name for the form
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true // This will destroy the form on unmount
    // validate: (values, props) => customValidation(values, props.formElements)
  })(Scheduler)
);
