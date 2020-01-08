import ERRORS from './constants';

const TIME_MASK = /^((([0-9]+:)?[0-5]?[0-9]:)?[0-5]?)?[0-9]$/;

export default (type, input, options = {}) => {
  switch (type) {
    case 'time':
      return getMaskedTime(input, options);
    case 'date':
      return getMaskedDate(input, options);
    default:
      return input;
  }
};

function getMaskedDate(input) {
  let [, month, day = '', year = ''] =
    input.match(/^(0?[1-9]|1[012])[-/.]?(0?[1-9]|[12][0-9]|3[01])?[-/.]?(\d{1,4})?$/) || [];

  if (!month) {
    return {
      error: input && ERRORS.DATE,
    };
  }
  day = day && parseInt(day, 10);
  if (month !== '1' && month.length === 1) {
    month = `0${month}`;
  } else if (month === '1' && day < 3) {
    month = `${month}${day}`;
    day = '';
  }
  if (day && day > 3 && day < 10) {
    day = `0${day}`;
  }
  if (year.length === 1 && /^0|1/.test(year)) {
    year = `20${year}`;
  }
  if (year.length > 1 && !/^19|20/.test(year)) {
    return {
      error: input && ERRORS.DATE,
    };
  }
  return {
    maskedValue: `${month}${month.length === 2 ? '/' : ''}${day}${day.toString().length === 2 ? '/' : ''}${year}`,
  };
}

function getMaskedTime(input, options) {
  if (/[^0-9:]/g.test(input)) {
    return {
      error: input && ERRORS.TIME,
    };
  }
  if (input.length === 1) {
    return {
      maskedValue: `00:0${input}`,
      valid: true,
    };
  }
  const [match, hours = '', minutes, seconds, trailing] = input.match(/^(?:(\d?\d):)?(?:(\d?\d):)(\d?\d)(\d)?$/) || [];
  if (!match) {
    return {
      error: !TIME_MASK.test(input) && ERRORS.TIME,
      maskedValue: input,
    };
  }
  let [h1 = '', h2 = ''] = hours.split('');
  let [m1, m2] = minutes.split('');
  let [s1, s2] = seconds.split('');
  let min = options.autoConvert && input.length === 3 && input.indexOf(':') === -1 && parseInt(input, 10);

  if (trailing) {
    h1 = h2 === '0' ? '' : h2;
    h2 = h1 === '' && m1 === '0' ? '' : m1;
    m1 = m2 || '0';
    m2 = s1;
    s1 = s2;
    s2 = trailing;
    h1 = h2 && h2 !== '0' && !h1 ? '0' : h1;
  } else if (min > 59) {
    const hours = Math.floor(min / 60);
    min = min - 60 * hours;
    h1 = Math.floor(hours / 10);
    h2 = (hours - h1 * 10).toString();
    h1 = h1 || '';
    m1 = Math.floor(min / 10);
    m2 = (min - m1 * 10).toString();
    m1 = m1 || '';
    s2 = '0';
    s1 = '0';
  } else if (TIME_MASK.test(input)) {
    if (h1 && !m1) {
      m1 = h1;
      h1 = '';
    }
    if (h2 && !m2) {
      m2 = h2;
      h2 = '';
    }
    if (input.length === 1) {
      s1 = '0';
    }
    if (s1 || s2) {
      m1 = m1 || '0';
      m2 = m2 || '0';
    }
  } else {
    return {
      maskedValue: input,
    };
  }
  const maskedValue = `${h1}${h2}${h2 ? ':' : ''}${m1}${m2}${m2 ? ':' : ''}${s1}${s2 || ''}`;
  const valid = /^(\d+:)?\d\d:[0-5]\d$/.test(maskedValue);

  return {
    valid,
    error: /^(\d+:)?\d\d:\d\d$/.test(maskedValue) && !valid ? ERRORS.TIME : '',
    maskedValue,
  };
}
