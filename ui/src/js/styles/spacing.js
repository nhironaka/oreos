import { makeStyles } from '@material-ui/core/styles';

export const useSpacingStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '&:not(.column)': {
      '&.fullWidth > *': {
        flex: 1,
        minWidth: 0,
      },
      '&.md': {
        marginLeft: theme.spacing(-0.5),
        marginRight: theme.spacing(-0.5),
        '& > *': {
          marginLeft: theme.spacing(0.5),
          marginRight: theme.spacing(0.5),
        },
      },
    },
    '&.column': {
      flexDirection: 'column',

      '&.md': {
        marginTop: theme.spacing(-0.5),
        marginBottom: theme.spacing(-0.5),
        '& > *': {
          marginTop: theme.spacing(0.5),
          marginBottom: theme.spacing(0.5),
        },
      },
    },
  },
}));
