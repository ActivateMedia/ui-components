import React from 'react';
import Calendar, {
  CalendarProps as ReactCalendarProps,
  TileArgs,
} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export type CustomCalendarProps = ReactCalendarProps & {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  tileClassName?: ReactCalendarProps['tileClassName'];
  tileContent?: ReactCalendarProps['tileContent'];
  dayFormat?: (locale: string | undefined, date: Date) => string;
  dayStyle?: (date: Date, view: string) => React.CSSProperties;
  todayClassName?: string;
};

const defaultDayFormat = (locale: string | undefined, date: Date) =>
  date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0);

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  containerClassName,
  containerStyle,
  tileClassName,
  tileContent,
  dayFormat,
  dayStyle,
  todayClassName = 'bg-blue-500 text-white',
  ...rest
}) => {
  // Use one-letter format if client does not specify dayFormat
  const formatShortWeekday = dayFormat
    ? (locale: string | undefined, date: Date) => dayFormat(locale, date)
    : defaultDayFormat;

  const today = new Date();

  // Custom tileClassName to support todayClassName and hover/active/cursor
  const customTileClassName = (props: TileArgs): string => {
    let classes =
      'hover:bg-blue-100 active:bg-blue-200 cursor-pointer transition-colors';
    if (
      props.date.getDate() === today.getDate() &&
      props.date.getMonth() === today.getMonth() &&
      props.date.getFullYear() === today.getFullYear()
    ) {
      classes += ` ${todayClassName}`;
    }
    if (typeof tileClassName === 'function') {
      classes += ' ' + tileClassName(props);
    }
    return classes.trim();
  };

  // Compose tileContent to apply dayStyle if provided
  const composedTileContent = (props: TileArgs) => {
    const { date, view } = props;
    const style = dayStyle ? dayStyle(date, view) : undefined;
    let userContent: React.ReactNode = undefined;

    if (typeof tileContent === 'function') {
      userContent = tileContent(props);
    }

    return (
      <div style={style} className="w-full h-full">
        {userContent ?? null}
      </div>
    );
  };

  // Only use custom functions if needed
  const tileClassNameToUse =
    typeof tileClassName === 'function' || dayStyle || todayClassName
      ? customTileClassName
      : undefined;

  const tileContentToUse =
    dayStyle || typeof tileContent === 'function'
      ? composedTileContent
      : undefined;

  return (
    <div className={containerClassName} style={containerStyle}>
      <Calendar
        {...rest}
        tileClassName={tileClassNameToUse}
        tileContent={tileContentToUse}
        formatShortWeekday={formatShortWeekday}
      />
    </div>
  );
};

export default CustomCalendar;