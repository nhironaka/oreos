import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { selectUser } from '../../selectors/user';
import Auth from '../Auth';
import Container from '../Container';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    width: '100%',
    height: '100%',
  },
}));

function Main({ user }) {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path="/(login|sign-up)">
          <Auth />
        </Route>
        {user.id && (
          <>
            <Route exact path="/container" render={() => <Container />} />
          </>
        )}
        <Route path="/">
          <Redirect to={user.id ? '/container' : '/login'} />
        </Route>
      </Switch>
    </main>
  );
}

Main.propTypes = {
  user: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Main);
