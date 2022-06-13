import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ListRenderItem } from 'react-native'

import { Post, Comment, LoadingView } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, AppScreenProps } from '~/navigation'
import { IPostComment } from '~/store/ActualData/entities'

import { List, HeaderWrapper, Title } from './PostScreen.style'

type Props = AppScreenProps<AppRoutes.Post>

export const PostScreen = observer(({ route }: Props) => {
  const { actualStore } = useStore()

  const { id } = route.params
  const post = actualStore.getPostById(id)!

  const renderItem: ListRenderItem<IPostComment> = ({ item }) => <Comment {...item} />

  useEffect(() => {
    void post.loadComments()
  }, [])

  return (
    <List
      ListEmptyComponent={post.isLoading ? <LoadingView /> : null}
      ListHeaderComponent={
        <HeaderWrapper>
          <Post {...post.data} />
          <Title>Comments</Title>
        </HeaderWrapper>
      }
      data={post.comments}
      renderItem={renderItem}
    />
  )
})
