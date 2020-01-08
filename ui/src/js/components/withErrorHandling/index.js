import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { handleError, setError } from '../../reducers/errors';
import { selectError } from '../../selectors/errors';
import ErrorNotice from '../ErrorNotice';

export default (Component, dispatches = {}, states, topic) => {
  class HOC extends React.PureComponent {
    componentWillUnmount() {
      this.props.setError('', topic);
    }

    render() {
      const { error, ...rest } = this.props;

      if (error) {
        return <ErrorNotice errorText={error} />;
      }
      return <Component {...rest} />;
    }
  }
  HOC.defaultProps = {
    error: '',
  };

  HOC.propTypes = {
    error: T.string,
    setError: T.func.isRequired,
  };

  const mapStateToProps = createStructuredSelector({ ...states, error: selectError(topic) });
  const mapDispatchToProps = Object.entries(dispatches).reduce(
    (res, [key, func]) => {
      res[key] = handleError(func, topic);
      return res;
    },
    {
      setError,
    }
  );

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};
