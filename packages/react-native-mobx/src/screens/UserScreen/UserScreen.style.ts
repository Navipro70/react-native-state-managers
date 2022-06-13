import { FlatList } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import { Row, Span } from '~/components'

export const CenteredRow = styled(Row)`
  align-items: center;
`

export const Avatar = styled.Image`
  margin-right: 24px;

  width: 80px;
  height: 80px;

  border-radius: 60px;
`

export const Title = styled(Span)`
  margin-bottom: 4px;

  ${({ theme }) => theme.fonts.title5Regular}
`

export const HeaderWrapper = styled.View`
  margin-bottom: 16px;
`

export const InfoContainer = styled.View`
  margin: 16px 0;
`

export const InfoTitle = styled(Span)`
  margin: 4px 0;

  ${({ theme }) => theme.fonts.title6Regular}
`

export const SubTitle = styled(Span)`
  ${({ theme }) => theme.fonts.title8Regular}
  color: ${({ theme }) => theme.colors.textGray}
`

export const InfoSubTitle = styled(Span)`
  margin-top: 2px;

  ${({ theme }) => theme.fonts.title8Regular}
  color: ${({ theme }) => theme.colors.textGray}
`

export const List = styled.FlatList.attrs({
  scrollIndicatorInsets: { right: 1 },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20 + getBottomSpace(),
    paddingHorizontal: 16,
  },
  ItemSeparatorComponent: styled.View`
    height: 12px;
  `,
})`` as unknown as typeof FlatList
