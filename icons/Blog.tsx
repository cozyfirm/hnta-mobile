import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={51} height={45} viewBox="0 0 51 45" fill="none">
      <Path
        d="M45.188 0H5.812C2.882 0 .5 2.243.5 5v35c0 2.758 2.382 5 5.313 5h39.374c2.93 0 5.313-2.242 5.313-5V5c0-2.757-2.383-5-5.313-5zm0 40H5.812c-.142 0-.24-.04-.282-.04-.018 0-.027.005-.03.02L5.47 5.115C5.488 5.09 5.6 5 5.813 5h39.374c.198.003.306.07.313.02l.03 34.865c-.017.025-.13.115-.343.115z"
        fill="#336"
      />
      <Path
        d="M10.5 10h15v15h-15V10zm0 20v5h30v-5h-30zm20-10h10v5h-10v-5zm0-10h10v5h-10v-5z"
        fill="#336"
      />
    </Svg>
  );
}

export default SvgComponent;
