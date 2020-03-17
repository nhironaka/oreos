import React from 'react';
import T from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default function Loading({ classes }) {
  const baseClasses = useStyles({ classes });
  return (
    <div className={baseClasses.root}>
      <LinearProgress />
    </div>
  );
}

Loading.defaultProps = {
  classes: {},
};

Loading.propTypes = {
  classes: T.object,
};
