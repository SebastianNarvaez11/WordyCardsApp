import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const WcWhiteIcon = (props: any) => (
  <View
    style={{
      width: props.size || 172,
      height: props.size || 92,
    }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={'100%'}
      height={'100%'}
      viewBox="0 0 172 92"
      fill="none"
      {...props}>
      <Path
        fill="#fff"
        d="M35.736 90.896c-2.219 0-3.968-.427-5.248-1.28-1.28-.853-2.219-1.835-2.816-2.944a58.01 58.01 0 0 1-1.024-2.304L2.584 14.608c-1.11-3.584-1.28-6.23-.512-7.936.768-1.792 2.987-3.285 6.656-4.48 2.39-.768 4.31-1.11 5.76-1.024 1.536.085 2.773.683 3.712 1.792 1.024 1.11 1.92 2.859 2.688 5.248l16 47.488 13.44-46.848c.256-.853.64-1.835 1.152-2.944.597-1.11 1.536-2.09 2.816-2.944 1.28-.853 3.072-1.28 5.376-1.28 2.645 0 4.608.47 5.888 1.408 1.365.939 2.304 1.963 2.816 3.072.512 1.11.896 1.963 1.152 2.56l13.568 47.232L98.968 8.336c.768-2.39 1.621-4.139 2.56-5.248 1.024-1.195 2.304-1.877 3.84-2.048 1.621-.17 3.627.17 6.016 1.024 2.56.939 4.352 1.92 5.376 2.944s1.536 2.304 1.536 3.84c.085 1.45-.213 3.37-.896 5.76l-24.064 69.76c-.17.512-.555 1.323-1.152 2.432-.512 1.024-1.408 1.963-2.688 2.816-1.195.853-2.987 1.28-5.376 1.28-2.304 0-4.139-.512-5.504-1.536-1.365-1.024-2.347-2.09-2.944-3.2a132.44 132.44 0 0 1-1.024-2.432l-14.72-47.744-14.72 47.744c-.085.427-.427 1.237-1.024 2.432-.597 1.195-1.579 2.304-2.944 3.328-1.28.939-3.115 1.408-5.504 1.408Zm111.128.768c-3.755 0-7.595-.683-11.52-2.048-3.84-1.45-7.424-3.541-10.752-6.272-3.243-2.816-5.845-6.23-7.808-10.24-1.963-4.096-2.944-8.79-2.944-14.08 0-5.29.981-9.941 2.944-13.952 1.963-4.01 4.565-7.381 7.808-10.112 3.243-2.73 6.784-4.779 10.624-6.144 3.925-1.45 7.723-2.176 11.392-2.176 3.157 0 5.973.384 8.448 1.152 2.56.683 4.693 1.536 6.4 2.56 1.792 1.024 3.072 1.92 3.84 2.688a38.413 38.413 0 0 1 3.84 3.328c1.109 1.11 1.621 2.56 1.536 4.352-.085.939-.384 1.92-.896 2.944a24.517 24.517 0 0 1-1.92 2.944c-2.56 3.584-5.12 5.205-7.68 4.864a12.81 12.81 0 0 1-3.584-1.28L153.52 48.4a13.35 13.35 0 0 0-3.072-1.664c-1.109-.427-2.389-.64-3.84-.64-2.475 0-4.693.555-6.656 1.664-1.963 1.11-3.541 2.645-4.736 4.608-1.109 1.963-1.664 4.224-1.664 6.784 0 2.475.555 4.693 1.664 6.656 1.195 1.963 2.731 3.541 4.608 4.736 1.963 1.11 4.139 1.664 6.528 1.664 1.451 0 2.688-.17 3.712-.512 1.109-.341 2.048-.725 2.816-1.152a47.8 47.8 0 0 1 1.792-1.152 38.936 38.936 0 0 1 2.944-1.792c.939-.597 1.92-.896 2.944-.896 1.195 0 2.432.47 3.712 1.408 1.28.853 2.688 2.261 4.224 4.224 1.365 1.792 2.133 3.456 2.304 4.992.256 1.536-.085 2.987-1.024 4.352-.939 1.365-2.389 2.688-4.352 3.968-.683.597-1.92 1.365-3.712 2.304-1.707.939-3.84 1.792-6.4 2.56-2.475.768-5.291 1.152-8.448 1.152Z"
      />
    </Svg>
  </View>
);
