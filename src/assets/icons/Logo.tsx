import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Logo = (props: SvgProps) => (
  <Svg width={39} height={43} fill='none' {...props}>
    <Path
      fill='#0080FF'
      d='M.508 11.851V5.485S.163.094 7.046.02C12.37-.036 20.988.038 24.62.075A9.502 9.502 0 0 1 29.4 1.361c2.208 1.32 3.253 2.67.43 7.89l-.107.141L13.868 35.48a16.093 16.093 0 0 1-6.76 6.121C3.967 43.114.551 43.49.551 37.931c0-.475-.04-13.813-.04-15.118L.507 11.85Z'
    />
    <Path
      fill='#00F'
      d='m28.619 42.099-3.755-.012s-3.196.169-3.186-3.5c.008-2.824.119-7.39.17-9.337.013-.926.3-1.827.821-2.592.805-1.148 2.258-2.098 4.53.192l9.533 9.333s3.563 3.733.556 5.615a3.86 3.86 0 0 1-2.203.552l-6.466-.251Z'
    />
  </Svg>
);
