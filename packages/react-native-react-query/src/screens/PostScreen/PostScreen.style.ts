import { FlatList } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import { Span } from '~/components'

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 24 + getBottomSpace(),
    paddingHorizontal: 16,
  },
  ItemSeparatorComponent: styled.View`
    height: 12px;
  `,
})`` as unknown as typeof FlatList

export const HeaderWrapper = styled.View``

export const Title = styled(Span).attrs({
  numberOfLines: 1,
})`
  margin-bottom: 16px;
  margin-top: 16px;

  text-align: center;
  ${({ theme }) => theme.fonts.title5Regular}
  color: ${({ theme }) => theme.colors.white};
`
