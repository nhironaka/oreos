import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { login as loginAction } from '../../actions/auth';
import { useSpacingStyles } from '../../styles/spacing';
import Header from './header';
import Profile from '../Profile';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function Container() {
  const classes = useStyles();
  const spacingClasses = useSpacingStyles();
  return (
    <div className={classNames(classes.root, spacingClasses.root, 'column')}>
      <Header />
      <Profile />
    </div>
  );
}

const mapDispatchToProps = {
  login: loginAction,
};

export default connect(null, mapDispatchToProps)(Container);
