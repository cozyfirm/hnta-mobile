import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={51} height={51} viewBox="0 0 51 51" fill="none">
      <Path
        d="M25.5.5C11.715.5.5 9.473.5 20.5c0 7.27 4.745 13.788 12.5 17.335V50.5l13.35-10.013C39.742 40.13 50.5 31.3 50.5 20.5c0-11.027-11.215-20-25-20zm0 35h-.832L18 40.5v-6.042l-1.602-.618C9.675 31.252 5.5 26.14 5.5 20.5c0-8.273 8.973-15 20-15 11.028 0 20 6.727 20 15s-8.972 15-20 15z"
        fill="#336"
      />
      <Path d="M13 13h25v5H13v-5zm0 10h17.5v5H13v-5z" fill="#336" />
    </Svg>
  );
}

export default SvgComponent;
