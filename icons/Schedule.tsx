import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={45} height={51} viewBox="0 0 45 51" fill="none">
      <Path
        d="M10 23h5v5h-5v-5zm0 10h5v5h-5v-5zm10-10h5v5h-5v-5zm0 10h5v5h-5v-5zm10-10h5v5h-5v-5zm0 10h5v5h-5v-5z"
        fill="#336"
      />
      <Path
        d="M5 50.5h35c2.758 0 5-2.242 5-5v-35c0-2.758-2.242-5-5-5h-5v-5h-5v5H15v-5h-5v5H5c-2.757 0-5 2.242-5 5v35c0 2.758 2.243 5 5 5zm35-35l.002 30H5v-30h35z"
        fill="#336"
      />
    </Svg>
  );
}

export default SvgComponent;
