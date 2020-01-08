import React from 'react';
import T from 'prop-types';
import MuiTableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/styles';

import _T from 'Services/custom-prop-types';
import Link from '../Link';

const styles = () => ({
  root: {},
});

function getTableCell(column, row) {
  switch (column.type) {
    case 'link':
      return <Link to={row.type.properties.to(row)}>{row[column.id]}</Link>;
    default:
      return row[column.id];
  }
}

function TableCell({ column, row, classes }) {
  return (
    <MuiTableCell align={column.align} classes={{ root: classes.root }}>
      {getTableCell(column, row)}
    </MuiTableCell>
  );
}

TableCell.propTypes = {
  row: T.object,
  column: T.shape({
    id: T.string.isRequired,
    type: T.string,
  }).isRequired,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(TableCell);
