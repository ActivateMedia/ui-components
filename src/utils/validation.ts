import { get, find } from 'lodash';
import { isValidEmail } from './helper';

export const required = (value: any) =>
  value ? undefined : 'This field is required';

export const emailValidation = (value: any) => {
  if (isValidEmail(value)) {
    return undefined;
  }
  return 'Invalid email address';
};

export const customValidation = (values: any, formElements: any) => {
  const errors: any = {};

  for (const field of formElements) {
    const validation = get(field, 'validation', {});
    let value = values[`${field.name}|${field.type}`];
    if (typeof value === 'string' && value) {
      value = value.trim();
    }

    const isRequired = validation.required || false;
    if (isRequired && !value) {
      errors[`${field.name}|${field.type}`] = get(
        validation,
        'error',
        'This field is required'
      );
    }

    const regexPattern = get(validation, 'regex', false);
    if (regexPattern) {
      try {
        const regex = new RegExp(regexPattern);
        if (!regex.test(value)) {
          errors[`${field.name}|${field.type}`] = get(
            validation,
            'error',
            'Invalid value'
          );
        }
      } catch (e) {
        errors[`${field.name}|${field.type}`] = 'Invalid regex';
      }
    }
  }
  return errors;
};

export const reValidate = (value: any, name: any, formElements: any) => {
  if (!name) return false;
  const fieldName = name.split('|');
  const [, checkboxType] = name.split('|');
  let field;
  if (checkboxType === 'checkbox') {
    field = find(formElements, { name: fieldName[2] });
  } else {
    field = find(formElements, { name: fieldName[0] });
  }
  if (field && field.validation) {
    const isRequired = get(field, 'validation.required', false);
    if (checkboxType === 'checkbox') {
      const parts = name.split('|');
      const group = `${parts[parts.length - 1]}|${checkboxType}`;
      const checkboxesInGroup = document.querySelectorAll(
        `[data-group="${group}"]`
      );
      const anyCheckboxChecked = Array.from(checkboxesInGroup).some(
        (checkbox) => (checkbox as HTMLInputElement).checked
      );
      if (isRequired && !anyCheckboxChecked && !value) {
        return get(field, 'validation.error', 'This field is required');
      }
    } else {
      if (isRequired && !value) {
        return get(field, 'validation.error', 'This field is required');
      }
    }

    const regexPattern = get(field, 'validation.regex', false);
    if (regexPattern) {
      try {
        const regex = new RegExp(regexPattern);
        if (!regex.test(value)) {
          return get(field, 'validation.error', 'Invalid field value');
        }
      } catch (e) {
        return get(field, 'validation.error', 'Invalid regex');
      }
    }
  }
  return false;
};
