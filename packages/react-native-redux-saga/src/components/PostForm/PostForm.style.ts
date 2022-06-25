import styled from 'styled-components/native'

import { Input } from '../Input'
import { Span } from '../primitives'

export const SubTitle = styled(Span)`
  ${({ theme }) => theme.fonts.title8Regular}
  color: ${({ theme }) => theme.colors.textGray}
`

export const Label = styled(SubTitle)`
  margin-top: 12px;
  margin-bottom: 8px;
`

export const FieldsWrapper = styled.View``

export const MultilineInput = styled(Input).attrs({ multiline: true })`
  height: 100px;

  margin-bottom: 12px;
`
