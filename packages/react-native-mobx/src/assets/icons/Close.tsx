import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

export const Close = (props: SvgProps) => {
  const { colors } = useTheme()

  return (
    <Svg color={colors.white} fill="none" height={24} width={24} {...props}>
      <Path
        clipRule="evenodd"
        d="M4.722 4.722a1.1 1.1 0 0 1 1.556 0L12 10.444l5.722-5.722a1.1 1.1 0 1 1 1.556 1.556L13.556 12l5.722 5.722a1.1 1.1 0 1 1-1.556 1.556L12 13.556l-5.722 5.722a1.1 1.1 0 1 1-1.556-1.556L10.444 12 4.722 6.278a1.1 1.1 0 0 1 0-1.556Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  )
}
