import React from 'react';
import T from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';

import { selectUser } from '../../selectors/auth';
import Spotify from '../../components/Logos/Spotify';
import Google from '../../components/Logos/Google';
import Card from '../../components/Card';
import Button from '../../components/Button';

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  buttonGroup: {
    color: theme.palette.common.white,
  },
  card: {
    right: 0,
  },
}));
const ACCOUNTS = [
  {
    'aria-label': 'Log into Spotify',
    href: 'http://localhost:9000/auth/spotify',
    type: 'account',
    label: (
      <>
        Log into Spotify
        <Spotify />
      </>
    ),
    id: 'spotify',
  },
  {
    'aria-label': 'Log into Google Photos',
    href: 'http://localhost:9000/auth/google',
    type: 'account',
    id: 'google',
    label: (
      <>
        Log into Google Photos
        <Google />
      </>
    ),
  },
];

function Profile({ user }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>{get(user, 'display_name', '')}</Card>
      {ACCOUNTS.map((label, ...rest) => (
        <Card>
          <Button
            color="inherit"
            variant="text"
            component="a"
            target="_blank"
            {...rest}
          >
            {label}
          </Button>
        </Card>
      ))}
    </div>
  );
}

Profile.propTypes = {
  user: T.shape({
    display_name: T.string,
  }).isRequired,
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Profile);
