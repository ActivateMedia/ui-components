import classNames from 'classnames';

/**
 * Merge classes and return
 *
 * @param {Array} classes - Class names
 * @returns {string} - Class names joined by space
 */
export const mergeCls = (...classes: any): string => {
  return classNames(...classes);
};
