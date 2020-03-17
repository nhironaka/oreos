import React from 'react';
import T from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../../constants/theme';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    '& > svg': {
      display: 'block',
    },
  },
});

export default function Spotify({ width, height, classes }) {
  const ref = React.useRef();
  const baseClasses = useStyles({ classes });

  return (
    <div className={baseClasses.root} ref={ref}>
      <svg
        id="Layer_1"
        xmlns="Spotify"
        x="0px"
        y="0px"
        viewBox="0 0 76.2 76.2"
        width={width}
        height={height}
      >
        <g>
          <path
            fill={theme.palette.common.white}
            d={
              'M38.1,0C17,0,0,17.1,0,38.1c0,21.1,17.1,38.1,38.1,38.1c21.1,0,38.1-17.1,38.1-38.1C76.2,17,59.1,0,38.1,0M55.6,55\
            c-0.7,1.1-2.1,1.5-3.3,0.8c-9-5.5-20.2-6.7-33.5-3.7c-1.3,0.3-2.6-0.5-2.8-1.8c-0.3-1.3,0.5-2.6,1.8-2.8\
            c14.5-3.3,27-1.9,37,4.2C55.9,52.4,56.3,53.8,55.6,55 M60.2,44.6c-0.9,1.4-2.7,1.8-4.1,1c-10.2-6.3-25.9-8.1-38-4.4\
            c-1.6,0.5-3.2-0.4-3.7-2s0.4-3.2,2-3.7c13.8-4.2,31.1-2.2,42.8,5.1C60.7,41.4,61.1,43.2,60.2,44.6 M60.6,33.8\
            c-12.3-7.3-32.6-8-44.3-4.4c-1.9,0.6-3.9-0.5-4.4-2.4c-0.6-1.9,0.5-3.9,2.4-4.4c13.5-4.1,35.9-3.3,50,5.1c1.7,1,2.3,3.2,1.2,4.9\
            C64.5,34.2,62.3,34.8,60.6,33.8'
            }
          />
        </g>
      </svg>
    </div>
  );
}

Spotify.defaultProps = {
  classes: {},
  width: null,
  height: null,
};

Spotify.propTypes = {
  classes: T.object,
  width: T.number,
  height: T.number,
};
