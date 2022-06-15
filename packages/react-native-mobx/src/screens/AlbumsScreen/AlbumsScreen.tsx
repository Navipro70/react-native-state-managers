import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ListRenderItem } from 'react-native'

import { LoadingView, AlbumsPreview } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, TabRoutes, TabScreenProps } from '~/navigation'
import { IAlbum } from '~/store/ActualData/entities'

import { List } from './AlbumsScreen.style'

type Props = TabScreenProps<TabRoutes.Albums>

export const AlbumsScreen = observer(({ navigation }: Props) => {
  const {
    albumsStore: { albumsData, isLoading, loadAlbums, deleteAlbum },
  } = useStore()

  const renderItem: ListRenderItem<IAlbum> = ({ item }) => {
    const onPress = () => navigation.navigate(AppRoutes.AlbumPhotos, { id: item.id })
    const onDelete = () => deleteAlbum(item.id)

    return <AlbumsPreview {...item} onDelete={onDelete} onPress={onPress} />
  }

  useEffect(() => {
    void loadAlbums()
  }, [])

  if (isLoading) return <LoadingView />

  return <List data={albumsData} renderItem={renderItem} />
})
