import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  mixins: {
    border: (borderWidth = 0.5, borderColor = blueGrey[100]) => `${borderWidth}px solid ${borderColor}`,
  },
});
