import styled from 'styled-components/native'

export const StyledTextInput = styled.TextInput<{ isSelected: boolean }>`
  padding: 8px 12px;

  border-width: 2px;
  border-color: ${({ theme, isSelected }) =>
    theme.colors[isSelected ? 'primaryFirst' : 'iconsSecond']};
  border-radius: 16px;

  ${({ theme }) => theme.fonts.bodyRegular};
  color: ${({ theme }) => theme.colors.iconsSecond};
`
