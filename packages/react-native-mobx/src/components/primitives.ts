import { Keyboard } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

import { FontNames } from '~/constants'

export const Flex = styled.View`
  flex: 1;
`

export const SafeAreaFlex = styled(SafeAreaView)`
  flex: 1;
`

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`

export const Row = styled.View`
  flex-direction: row;
`

export const Span = styled.Text`
  color: ${({ theme }) => theme.colors.textFirst};
  ${({ theme }) => theme.fonts.bodyRegular}
`

export const AnimatedSpan = styled(Animated.Text)<{
  color?: string
}>`
  color: ${({ theme }) => theme.colors.textFirst};
  ${({ theme }) => theme.fonts.bodyRegular}
`

export const I = styled.Text`
  font-style: italic;
`

export const StyledSafeAreaProvider = styled(SafeAreaProvider)`
  background-color: ${({ theme }) => theme.colors.backgroundFirst};
`

export const fonts = {
  title5Regular: css`
    font-family: ${FontNames.FredokaRegular};
    font-size: 24px;
    line-height: 32px;
  `,

  title6Regular: css`
    font-family: ${FontNames.FredokaRegular};
    font-size: 22px;
    line-height: 30px;
  `,

  title7Regular: css`
    font-family: ${FontNames.FredokaRegular};
    font-size: 20px;
    line-height: 28px;
  `,

  title8Regular: css`
    font-family: ${FontNames.FredokaRegular};
    font-size: 18px;
    line-height: 24px;
  `,

  bodyRegular: css`
    font-family: ${FontNames.FredokaRegular};
    font-size: 16px;
    line-height: 20px;
  `,
}

export const DissmisableView = styled.View.attrs({ onTouchStart: Keyboard.dismiss })``
