import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={38}
      height={45}
      viewBox="0 0 38 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19 44.999l-1.307-1.12C15.891 42.368.158 28.781.158 18.842.158 8.437 8.594 0 19 0c10.406 0 18.842 8.436 18.842 18.842 0 9.939-15.733 23.527-17.527 25.043L19 44.999zm0-40.924c-8.152.01-14.758 6.616-14.768 14.768 0 6.244 9.68 16.218 14.768 20.784 5.088-4.568 14.768-14.548 14.768-20.784C33.758 10.69 27.152 4.084 19 4.075z"
        fill="#336"
      />
      <Path
        d="M19 26.312a7.469 7.469 0 110-14.938 7.469 7.469 0 010 14.938zm0-11.204a3.734 3.734 0 100 7.47 3.734 3.734 0 000-7.47z"
        fill="#336"
      />
    </Svg>
  );
}

export default SvgComponent;
