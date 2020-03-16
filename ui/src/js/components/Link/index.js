import React from 'react';
import T from 'prop-types';
import RouterLink from 'react-router-dom/Link';
import Button from '../Button';

export default function Link({ to, ...rest }) {
  return <Button variant="text" component={RouterLink} to={to} {...rest} />;
}

Link.propTypes = {
  to: T.oneOfType([T.string, T.object, T.func]).isRequired,
};
