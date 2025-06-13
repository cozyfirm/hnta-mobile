//@ts-nocheck
import Svg, { Path } from 'react-native-svg';

const NotificationsIcon = ({ active }) => {
  return (
    <Svg
      width={24}
      height={24}
      fill={active ? '#FFCC33' : '#EEF0F2'}
      viewBox="0 0 24 24"
    >
      <Path d="M19 2H5c-.55 0-1 .45-1 1v4H2v2h2v2H2v2h2v2H2v2h2v4c0 .55.45 1 1 1h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h8v16H6V4zm13 16h-3V4h3v16z" />
    </Svg>
  );
};

export default NotificationsIcon;
