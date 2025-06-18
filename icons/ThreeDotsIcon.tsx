//@ts-nocheck
import Svg, { Path } from 'react-native-svg';

const ThreeDotsIcon = () => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M1.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#336"
      />
    </Svg>
  );
};

export default ThreeDotsIcon;
