import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { useSpacingStyles } from '../../styles/spacing';

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 0,
    '& > li': {
      listStyleType: 'none',
    },
  },
});

export default function UnorderedList({ options, render, spacing }) {
  const classes = useStyles();
  const spacingClasses = useSpacingStyles();

  return (
    <ul
      className={classNames(
        classes.root,
        spacingClasses.root,
        spacing,
        'column'
      )}
    >
      {options.map(render)}
    </ul>
  );
}

UnorderedList.defaultProps = {
  spacing: '',
  render: item => <li key={item.id || item}>{item.label || item}</li>,
};

UnorderedList.propTypes = {
  options: T.arrayOf(
    T.oneOfType([
      T.node,
      T.shape({
        id: T.string,
        label: T.node,
      }),
    ])
  ).isRequired,
  spacing: T.oneOf(['', 'md']),
  render: T.func,
};
