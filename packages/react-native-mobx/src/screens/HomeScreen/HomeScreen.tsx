import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ListRenderItem } from 'react-native'

import { LoadingView, Post } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, TabRoutes, TabScreenProps } from '~/navigation'
import { IPost } from '~/store/ActualData/entities'

import { List } from './HomeScreen.style'

type Props = TabScreenProps<TabRoutes.Home>

export const HomeScreen = observer(({ navigation }: Props) => {
  const {
    postsStore: { isLoading, postsData, loadPosts },
  } = useStore()

  const renderItem: ListRenderItem<IPost> = ({ item }) => {
    const onOpenPost = () => navigation.navigate(AppRoutes.Post, { id: item.id })

    return <Post onPress={onOpenPost} {...item} />
  }

  useEffect(() => {
    void loadPosts()
  }, [])

  if (isLoading) {
    return <LoadingView safeTop />
  }

  return (
    <List<IPost>
      data={postsData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  )
})
