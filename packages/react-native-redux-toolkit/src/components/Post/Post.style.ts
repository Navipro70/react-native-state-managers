import styled from 'styled-components/native'

import { Row, Span } from '../primitives'

export const Container = styled.TouchableOpacity.attrs(({ onPress }) => ({
  activeOpacity: onPress ? 0.7 : 1,
}))`
  padding: 20px;

  background-color: ${({ theme }) => theme.colors.primaryFirst};
  border-radius: 24px;
`

export const Title = styled(Span).attrs({
  numberOfLines: 1,
})`
  margin: 0 20px;
  margin-bottom: 12px;

  text-align: center;
  ${({ theme }) => theme.fonts.title8Regular}
  color: ${({ theme }) => theme.colors.white};
`

export const Body = styled(Span)`
  color: ${({ theme }) => theme.colors.white};
`

export const InteractionTouch = styled.TouchableOpacity`
  margin-left: 12px;
`

export const SpacedRow = styled(Row)`
  margin-top: 12px;

  align-items: center;
  justify-content: space-between;
`

export const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;

  margin-right: 8px;

  border-radius: 20px;
`
