import upperFirst from 'lodash/upperFirst'
import React from 'react'

import { Icons } from '~/assets'
import { IAlbum } from '~/store/ActualData/entities'

import { Container, DeleteTouch, Title } from './AlbumPreview.style'

interface Props extends IAlbum {
  onPress: () => void
  onDelete: () => void
}

export const AlbumsPreview = ({ title, onPress, onDelete }: Props) => {
  return (
    <Container onPress={onPress}>
      <Title>{upperFirst(title)}</Title>
      <DeleteTouch onPress={onDelete}>
        <Icons.Close />
      </DeleteTouch>
    </Container>
  )
}
