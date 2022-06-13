import { observer } from 'mobx-react-lite'
import React, { useEffect, useLayoutEffect } from 'react'
import { ListRenderItem } from 'react-native'

import { LoadingView } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, AppScreenProps } from '~/navigation'
import { IAlbumPhoto } from '~/store/ActualData/entities'

import { AlbumPhoto, List } from './AlbumPhotosScreen.style'

type Props = AppScreenProps<AppRoutes.AlbumPhotos>

export const AlbumPhotosScreen = observer(({ navigation, route }: Props) => {
  const { actualStore } = useStore()

  const { id } = route.params
  const album = actualStore.getAlbumById(id)!
  const albumTitle = album.data.title

  const renderItem: ListRenderItem<IAlbumPhoto> = ({ item, index }) => {
    const isLast = (index + 1) % 4 === 0

    return <AlbumPhoto isLast={isLast} source={{ uri: item.thumbnailUrl }} />
  }

  useLayoutEffect(() => {
    navigation.setOptions({ title: albumTitle })
  }, [albumTitle])

  useEffect(() => {
    void album.loadPhotos()
  }, [])

  if (album.isLoading) return <LoadingView />

  return <List data={album.photos.slice()} numColumns={4} renderItem={renderItem} />
})
