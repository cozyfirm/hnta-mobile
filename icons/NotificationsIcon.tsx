//@ts-nocheck
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const NotificationsIcon = ({ active }) => {
  return (
    <Svg
      width={24}
      height={24}
      fill={active ? '#FFCC33' : '#EEF0F2'}
      viewBox="0 0 24 24"
    >
      <G
        clipPath="url(#clip0_10463_1408)"
        fill={active ? '#FFCC33' : '#EEF0F2'}
      >
        <Path d="M13.357 0h-7.38a5.315 5.315 0 00-5.31 5.31v11.787c0 .492.401.894.894.894h11.787a5.315 5.315 0 005.31-5.31V5.31A5.315 5.315 0 0013.348 0h.01zm0 16.212H2.464V5.31a3.524 3.524 0 013.522-3.522h7.371A3.524 3.524 0 0116.88 5.31v7.371a3.524 3.524 0 01-3.522 3.522v.009z" />
        <Path d="M13.658 6.35H5.247a.896.896 0 00-.894.894c0 .492.401.894.894.894h8.402a.896.896 0 00.894-.894.896.896 0 00-.894-.894h.01zM11.551 10.327H5.548a.896.896 0 00-.894.894c0 .493.402.894.894.894h6.003a.896.896 0 00.894-.894.896.896 0 00-.894-.894z" />
      </G>
      <Defs>
        <ClipPath id="clip0_10463_1408">
          <Path
            fill={active ? '#FFCC33' : '#EEF0F2'}
            transform="translate(.667)"
            d="M0 0H18V18H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default NotificationsIcon;
