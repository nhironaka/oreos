import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#EDF2F3',
      main: '#0476D0',
      dark: '#003060',
    },
    secondary: {
      light: '#F9F1F0',
      main: '#FADCD9',
      dark: '#F79489',
      contrastText: '#391306',
    },
    border: {
      main: blueGrey[100],
    },
    text: {
      primary: '#666666',
      secondary: '#444',
    },
    action: {
      hover: '#F8F8F8',
    },
  },
  mixins: {
    border: (borderWidth = 0.5, borderColor = blueGrey[100]) => `${borderWidth}px solid ${borderColor}`,
  },
});
