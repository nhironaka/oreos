import ERRORS from './constants';

export default (type, input) => {
  if (!input) {
    return;
  }
  switch (type) {
    case 'alphanumeric':
      return alphaNumeric(input);
    case 'time':
      return time(input);
    case 'float':
      return float(input);
    default:
      return input;
  }
};

function alphaNumeric(input) {
  if (!/^(\w|-|_)*$/.test(input)) {
    return ERRORS.ALPHANUMERIC;
  }
}

function time(input) {
  if (!/((([0-9]+:)?[0-5]?[0-9]:)?[0-5]?)?[0-9]/.test(input)) {
    return ERRORS.TIME;
  }
}

function float(input) {
  if (input && !/^\d+\.\d+$/.test(input)) {
    return ERRORS.INVALID;
  }
}
