import styled from 'styled-components/native'

import { Span } from '~/components'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  padding: 16px;

  background-color: ${({ theme }) => theme.colors.primaryFirst};
  border-radius: 24px;
`

export const ColumnsSpace = styled.View`
  flex: 1;
`

export const UserPhoto = styled.Image`
  margin-right: 12px;

  height: 40px;
  width: 40px;

  border-radius: 20px;
`

export const Title = styled(Span).attrs({ numberOfLines: 1 })`
  ${({ theme }) => theme.fonts.title7Regular};
  color: ${({ theme }) => theme.colors.white};
`

export const Subtitle = styled(Span).attrs({ numberOfLines: 1 })`
  ${({ theme }) => theme.fonts.title8Regular};
  color: ${({ theme }) => theme.colors.white};
`
export const DeleteTouch = styled.TouchableOpacity`
  margin-left: 12px;
`
