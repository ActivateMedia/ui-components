import { FunctionComponent, useState } from 'react';
import { includes } from 'lodash';
import Datetime from 'react-datetime';
import { mergeCls } from '../../utils/helper';
import moment, { Moment } from 'moment-timezone';

/* Button interface */
interface ButtonPros {
  onChange?: (data: any) => void;
  highlightedDate?: any;
  getHighlightedDate?: (data: any) => void;
}

/**
 * Date picker component
 * @param {*} props
 * @returns
 */
const Index: FunctionComponent<ButtonPros> = (props) => {
  const { onChange, highlightedDate, getHighlightedDate } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [storeMonth, setMonth] = useState(new Date().getMonth());

  const onChangeHandler = (currentDate: any) => {
    setSelectedDate(currentDate);
    onChange && onChange(currentDate);
  };

  const renderDay = (props: any, currentDate: any, selectedDate: any) => {
    const isSame = currentDate.isSame(selectedDate, 'day');
    const isEnable =
      includes(highlightedDate, currentDate.format('YYYY-MM-DD')) ||
      currentDate.isSame(moment(), 'day');
    return (
      <td
        {...props}
        onClick={() => {
          if (isEnable) {
            onChangeHandler(currentDate.toDate());
          }
        }}
        className={mergeCls([
          'text-sm p-[5px] rounded-full',
          isSame && 'bg-primary-900 text-white',
          isEnable
            ? 'hover:bg-primary-900 hover:text-white'
            : 'text-dark-400 !cursor-not-allowed'
        ])}
      >
        {currentDate.date()}
      </td>
    );
  };

  const handleArrowClick = (count: number, type: string, action: string) => {
    if (type === 'months') {
      let currentMonth = storeMonth;
      if (action === 'back') {
        currentMonth -= count;
      } else {
        currentMonth += count;
      }
      setMonth(currentMonth);

      const date = moment(new Date().setMonth(currentMonth));
      const selectedDate: Moment = moment(date);

      if (selectedDate.isSameOrBefore(moment(), 'day')) {
        const startDate = selectedDate.startOf('month').toISOString();
        const endDate = selectedDate.endOf('month').toISOString();
        getHighlightedDate && getHighlightedDate({ startDate, endDate });
      }
    }
  };

  return (
    <Datetime
      className="w-full mx-4 text-sm"
      input={false}
      timeFormat={false}
      renderDay={renderDay}
      value={selectedDate}
      onNavigateBack={(count: any, type: string) =>
        handleArrowClick(count, type, 'back')
      }
      onNavigateForward={(count: any, type: string) =>
        handleArrowClick(count, type, 'forward')
      }
    />
  );
};

Index.defaultProps = {
  onChange: () => void 0
};

export default Index;
