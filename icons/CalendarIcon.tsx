//@ts-nocheck
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const HomeIcon = ({ active }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <G clipPath="url(#clip0_10463_1486)">
        <Path
          d="M16.273 1.57h-.68V1c0-.55-.45-1-1-1h-.23c-.55 0-1 .45-1 1v.57h-5.39V1c0-.55-.45-1-1-1h-.23c-.55 0-1 .45-1 1v.57h-1.22c-2.3 0-4.17 1.87-4.17 4.17v1.45s-.02.06-.02.09.01.06.02.09v6.35c0 2.3 1.87 4.17 4.17 4.17h11.76c2.3 0 4.17-1.87 4.17-4.17V5.75c0-2.3-1.87-4.17-4.17-4.17l-.01-.01zm-11.76 2h1.22v1.2c0 .55.45 1 1 1h.23c.55 0 1-.45 1-1v-1.2h5.39v1.2c0 .55.45 1 1 1h.23c.55 0 1-.45 1-1v-1.2h.68c1.19 0 2.17.97 2.17 2.17v.54H2.353v-.54c0-1.19.97-2.17 2.17-2.17h-.01zm11.76 12.31H4.513c-1.19 0-2.17-.97-2.17-2.17V8.28h16.09v5.43c0 1.19-.97 2.17-2.17 2.17h.01z"
          fill={active ? '#FFCC33' : '#EEF0F2'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10463_1486">
          <Path
            fill={active ? '#FFCC33' : '#EEF0F2'}
            transform="translate(.333)"
            d="M0 0H20.1V17.88H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HomeIcon;
