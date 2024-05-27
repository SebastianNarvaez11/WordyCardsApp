import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';

export const WcPrimaryShadowIcon = (props: any) => (
  <View
    style={{
      width: props.size || 288,
      height: props.size || 289,
    }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={'100%'}
      height={'100%'}
      viewBox="0 0 288 289"
      fill="none"
      {...props}>
      <G filter="url(#a)">
        <Rect
          width={216}
          height={216}
          x={55.203}
          fill="#6461DB"
          rx={40}
          transform="rotate(9.649 55.203 0)"
        />
        <Path
          fill="#fff"
          d="M99.144 167.344c-1.907 0-3.41-.367-4.51-1.1-1.1-.734-1.907-1.577-2.42-2.53a50.813 50.813 0 0 1-.88-1.98l-20.68-59.95c-.954-3.08-1.1-5.354-.44-6.82.66-1.54 2.566-2.824 5.72-3.85 2.053-.66 3.703-.954 4.95-.88 1.32.073 2.383.586 3.19 1.54.88.953 1.65 2.456 2.31 4.51l13.75 40.81 11.55-40.26c.22-.734.55-1.577.99-2.53.513-.954 1.32-1.797 2.42-2.53 1.1-.734 2.64-1.1 4.62-1.1 2.273 0 3.96.403 5.06 1.21 1.173.806 1.98 1.686 2.42 2.64.44.953.77 1.686.99 2.2l11.66 40.59 13.64-40.92c.66-2.054 1.393-3.557 2.2-4.51.88-1.027 1.98-1.614 3.3-1.76 1.393-.147 3.116.146 5.17.88 2.2.806 3.74 1.65 4.62 2.53.88.88 1.32 1.98 1.32 3.3.073 1.246-.184 2.896-.77 4.95l-20.68 59.95c-.147.44-.477 1.136-.99 2.09-.44.88-1.21 1.686-2.31 2.42-1.027.733-2.567 1.1-4.62 1.1-1.98 0-3.557-.44-4.73-1.32-1.174-.88-2.017-1.797-2.53-2.75-.44-1.027-.734-1.724-.88-2.09l-12.65-41.03-12.65 41.03c-.074.366-.367 1.063-.88 2.09-.514 1.026-1.357 1.98-2.53 2.86-1.1.806-2.677 1.21-4.73 1.21Zm95.5.66c-3.227 0-6.527-.587-9.9-1.76-3.3-1.247-6.38-3.044-9.24-5.39-2.787-2.42-5.023-5.354-6.71-8.8-1.687-3.52-2.53-7.554-2.53-12.1 0-4.547.843-8.544 2.53-11.99 1.687-3.447 3.923-6.344 6.71-8.69 2.787-2.347 5.83-4.107 9.13-5.28 3.373-1.247 6.637-1.87 9.79-1.87 2.713 0 5.133.33 7.26.99 2.2.586 4.033 1.32 5.5 2.2 1.54.88 2.64 1.65 3.3 2.31a32.872 32.872 0 0 1 3.3 2.86c.953.953 1.393 2.2 1.32 3.74-.073.806-.33 1.65-.77 2.53-.44.806-.99 1.65-1.65 2.53-2.2 3.08-4.4 4.473-6.6 4.18-1.1-.22-2.127-.587-3.08-1.1l-2.64-1.54a11.437 11.437 0 0 0-2.64-1.43c-.953-.367-2.053-.55-3.3-.55-2.127 0-4.033.476-5.72 1.43-1.687.953-3.043 2.273-4.07 3.96-.953 1.686-1.43 3.63-1.43 5.83 0 2.126.477 4.033 1.43 5.72 1.027 1.686 2.347 3.043 3.96 4.07 1.687.953 3.557 1.43 5.61 1.43 1.247 0 2.31-.147 3.19-.44.953-.294 1.76-.624 2.42-.99.66-.44 1.173-.77 1.54-.99.88-.587 1.723-1.1 2.53-1.54.807-.514 1.65-.77 2.53-.77 1.027 0 2.09.403 3.19 1.21 1.1.733 2.31 1.943 3.63 3.63 1.173 1.54 1.833 2.97 1.98 4.29.22 1.32-.073 2.566-.88 3.74-.807 1.173-2.053 2.31-3.74 3.41-.587.513-1.65 1.173-3.19 1.98-1.467.806-3.3 1.54-5.5 2.2-2.127.66-4.547.99-7.26.99Z"
        />
      </G>
      <Defs></Defs>
    </Svg>
  </View>
);
