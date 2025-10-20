//@ts-nocheck
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const MessagesIcon = ({ active }) => {
  return (
    <Svg
      width={24}
      height={24}
      fill={active ? '#FFCC33' : '#EEF0F2'}
      viewBox="0 0 24 24"
    >
      <G
        clipPath="url(#clip0_10463_1433)"
        fill={active ? '#FFCC33' : '#EEF0F2'}
      >
        <Path d="M15.56 0H4.04C1.81 0 0 1.81 0 4.04v7.81c0 2.23 1.81 4.04 4.04 4.04h11.52c2.23 0 4.04-1.81 4.04-4.04V4.04C19.6 1.81 17.79 0 15.56 0zM4.04 1.87h11.52c1.2 0 2.17.97 2.17 2.17v7.81c0 1.2-.97 2.17-2.17 2.17H4.04c-1.2 0-2.17-.97-2.17-2.17V4.04c0-1.2.97-2.17 2.17-2.17z" />
        <Path d="M7.04 8.22c.69.69 1.61 1.07 2.58 1.07s1.89-.38 2.58-1.07l2.78-2.78c.36-.36.36-.96 0-1.32a.924.924 0 00-1.32 0L10.88 6.9c-.69.69-1.83.69-2.52 0L5.69 4.23a.924.924 0 00-1.32 0c-.36.36-.36.96 0 1.32l2.67 2.67z" />
      </G>
      <Defs>
        <ClipPath id="clip0_10463_1433">
          <Path fill={active ? '#FFCC33' : '#EEF0F2'} d="M0 0H19.59V15.89H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default MessagesIcon;
