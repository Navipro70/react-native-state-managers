import { FlatList } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingTop: getStatusBarHeight() + 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  ItemSeparatorComponent: styled.View`
    height: 12px;
  `,
})`` as unknown as typeof FlatList
