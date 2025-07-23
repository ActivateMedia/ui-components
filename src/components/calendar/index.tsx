import React from 'react';
import Calendar, { CalendarProps as ReactCalendarProps } from 'react-calendar';
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
  todayClassName = "bg-blue-500 text-white",
  ...rest
}) => {
  // Use one-letter format if client does not specify dayFormat
  const formatShortWeekday = dayFormat
    ? (locale: string | undefined, date: Date) => dayFormat(locale, date)
    : defaultDayFormat;

  // Custom tileClassName to support todayClassName and hover/active/cursor
  const today = new Date();
  const customTileClassName = (props: Parameters<Exclude<ReactCalendarProps['tileClassName'], undefined>>[0]) => {
    let classes = "hover:bg-blue-100 active:bg-blue-200 cursor-pointer transition-colors";
    if (
      props.date.getDate() === today.getDate() &&
      props.date.getMonth() === today.getMonth() &&
      props.date.getFullYear() === today.getFullYear()
    ) {
      classes += ` ${todayClassName}`;
    }
    if (typeof tileClassName === "function") {
      classes += " " + tileClassName(props);
    }
    return classes.trim();
  };

  // Compose tileContent to apply dayStyle if provided
  const composedTileContent = (props: Parameters<Exclude<ReactCalendarProps['tileContent'], undefined>>[0]) => {
    const { date, view } = props;
    const style = dayStyle ? dayStyle(date, view) : undefined;
    let userContent: React.ReactNode = undefined;
    if (typeof tileContent === 'function') {
      userContent = tileContent(props);
    }
    return (
      <div style={style} className="w-full h-full">
        {userContent !== undefined ? userContent : null}
      </div>
    );
  };

  // Only use custom functions if needed
  const tileClassNameToUse = (dayStyle || typeof tileClassName === 'function') ? customTileClassName : undefined;
  const tileContentToUse = dayStyle ? composedTileContent : (typeof tileContent === 'function' ? tileContent : undefined);

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