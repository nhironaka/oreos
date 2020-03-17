import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { selectUser, selectLoading } from '../../selectors/auth';
import { init as initAction } from '../../actions/auth';
import Loading from '../../components/Loading';
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

function Main({ user, loading, init }) {
  const classes = useStyles();
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    init();
  }, []);
  /* eslint-enable */

  return loading ? <Loading classes={{ root: classes.root }} /> : (
    <main className={classes.root}>
      <Switch>
        <Route exact path="/(login|signup)">
          <Auth user={user} />
        </Route>
        <Route exact path="/container">
          <Container />
        </Route>
        <Route path="/">
          {user.id ? <Redirect to="/container" /> : <Auth />}
        </Route>
      </Switch>
    </main>
  );
}

Main.propTypes = {
  user: T.object.isRequired,
  loading: T.bool.isRequired,
  init: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  loading: selectLoading,
});

const mapDispatchToProps = {
  init: initAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
