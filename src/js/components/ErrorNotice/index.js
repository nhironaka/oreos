import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import _T from 'Services/custom-prop-types';
import Typography from '../Typography';
import Card from '../Card';

const styles = () => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

const ErrorNotice = ({ errorText, classes, ...rest }) => (
  <Card classes={{ root: classes.root }} noBorder>
    <Typography {...rest}>
      Unable to fetch data
      {errorText && (
        <>
          {' due to '}
          <Typography color="error">{errorText}</Typography>
        </>
      )}
      .
    </Typography>
  </Card>
);

ErrorNotice.propTypes = {
  errorText: T.string.isRequired,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(ErrorNotice);
