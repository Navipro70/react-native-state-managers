import { FlatList } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import { SCREEN_WIDTH } from '~/constants'

const PADDING_HORIZONTAL = 16
const GAP = 12

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20 + getBottomSpace(),
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  scrollIndicatorInsets: { right: 1 },
  ItemSeparatorComponent: styled.View`
    height: ${GAP}px;
  `,
})`` as unknown as typeof FlatList

const PHOTO_SIZE = SCREEN_WIDTH / 4 - PADDING_HORIZONTAL / 2 + GAP / 4

export const AlbumPhoto = styled.Image<{ isLast: boolean }>`
  margin-right: ${({ isLast }) => (isLast ? 0 : GAP)}px;
  width: ${PHOTO_SIZE - GAP}px;
  height: ${PHOTO_SIZE - GAP}px;
`
