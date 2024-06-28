import classNames from 'classnames';
import { get, includes, isEmpty, map, find } from 'lodash';
import moment, { MomentInput } from 'moment-timezone';

/**
 * Merge classes and return
 *
 * @param {Array} classes - Class names
 * @returns {string} - Class names joined by space
 */
export const mergeCls = (...classes: any): string => {
  return classNames(...classes);
};

/**
 * Translates string in Capitalize
 *
 * @param {string} str - Normal string
 * @returns {string} - Capitalize string
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatDate = (dateStr: any, format: string) => {
  const date = moment(dateStr);
  return date.format(format);
};
/**
 * This method is responsible to get local time
 *
 * @param {date} date - date
 * @returns {object} - localDate
 */
export const getLocalTime = (date: any) => {
  // Get the local timezone
  const localTimezone = moment.tz.guess();

  // Set the default timezone to the local timezone
  moment.tz.setDefault(localTimezone);

  // Convert date to local timezone
  const localDate = moment(date).clone().tz(localTimezone);

  return localDate;
};
/**
 * Validate email
 *
 * @param {string} email - email
 * @returns {boolean} - true/false
 */
export const isValidEmail = (email: string) => {
  if (!email) return false;

  const emailParts = email.split('@');
  if (emailParts.length !== 2) return false;

  const account = emailParts[0];
  const address = emailParts[1];
  if (account.length > 64) return false;
  else if (address.length > 255) return false;

  const domainParts = address.split('.');
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  ) {
    return false;
  }

  // const noOfPlush = email.split('+');
  // if (process.env.NODE_ENV !== 'development' && noOfPlush.length > 0)
  //   return false;

  // if (process.env.NODE_ENV !== 'development' && !isWhiteListDomain(address))
  //   return false;

  const tester =
    // eslint-disable-next-line no-useless-escape
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  return tester.test(email);
};

export const calculateDay = (dateStr: any) => {
  const date = moment(dateStr);
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  const tomorrow = moment().add(1, 'day');
  if (date.isSame(today, 'day')) {
    return 'Today';
  } else if (date.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else if (date.isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  } else {
    return date.format('dddd');
  }
};

export const getCreatorInfo = (item: any, source: any) => {
  if (!item) return '';
  const userName = get(item, 'creator.username');
  let name = get(item, 'creator.email', '').split('@')[0];
  if (userName) {
    name = userName.split(' ')[0];
  }
  if (!name) {
    name = 'Spritz Partner';
  }

  switch (source) {
    case 'schedule': {
      return `Job scheduled by ${capitalize(name)} for ${moment(
        item.lastRunAt
      ).format('DD/MM/YYYY')} at ${moment(item.lastRunAt).format('HH:mm:ss')}`;
    }
    default: {
      return `Job ${source ? source : 'created'} by ${capitalize(
        name
      )} on ${moment(item.createdAt).format('DD/MM/YYYY')} at ${moment(
        item.createdAt
      ).format('HH:mm:ss')}`;
    }
  }
};
