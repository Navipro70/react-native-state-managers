import upperFirst from 'lodash/upperFirst'
import React from 'react'

import { IAlbum } from '~/store/ActualData/entities'

import { Container, Title } from './AlbumPreview.style'

interface Props extends IAlbum {
  onPress: () => void
}

export const AlbumsPreview = ({ title, onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <Title>{upperFirst(title)}</Title>
    </Container>
  )
}
