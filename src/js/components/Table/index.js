import React from 'react';
import T from 'prop-types';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/styles';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {
    width: 'auto',
  },
});

function Table({ columns, rows, classes }) {
  return (
    <MuiTable classes={{ root: classes.root }} aria-label="data table">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.id} align={column.align}>
              {column.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            {columns.map(column => (
              <TableCell key={column.id} align={column.align}>
                {row[column.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
}

Table.propTypes = {
  rows: T.arrayOf(T.object),
  columns: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
    })
  ).isRequired,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(Table);
