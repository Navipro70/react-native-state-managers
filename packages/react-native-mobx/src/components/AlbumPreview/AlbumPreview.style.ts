import styled from 'styled-components/native'

import { Span } from '~/components'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  padding: 16px;

  background-color: ${({ theme }) => theme.colors.primaryFirst};
  border-radius: 24px;
`

export const Title = styled(Span).attrs({ numberOfLines: 1 })`
  flex: 1;

  ${({ theme }) => theme.fonts.title7Regular};
  color: ${({ theme }) => theme.colors.white};

  text-align: center;
`

export const DeleteTouch = styled.TouchableOpacity``
