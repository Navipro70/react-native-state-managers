import styled from 'styled-components/native'

import { Row, Span } from '../primitives'

export const Container = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
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

export const SpacedRow = styled(Row)`
  justify-content: space-between;
  align-items: center;

  margin-top: 12px;
`
