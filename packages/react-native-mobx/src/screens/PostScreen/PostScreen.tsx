import { isEmpty } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { LayoutAnimation, ListRenderItem } from 'react-native'

import { Post, Comment, LoadingView } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, AppScreenProps } from '~/navigation'
import { IPostComment } from '~/store/ActualData/entities'

import { List, HeaderWrapper, Title } from './PostScreen.style'

type Props = AppScreenProps<AppRoutes.Post>

export const PostScreen = observer(({ navigation, route }: Props) => {
  const { actualStore, postsStore } = useStore()

  const { id } = route.params
  const post = actualStore.getPostById(id)!

  const onDeletePost = () => {
    navigation.goBack()

    const timeout = setTimeout(() => {
      postsStore.deletePost(id)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, 700)

    return () => clearTimeout(timeout)
  }

  const renderItem: ListRenderItem<IPostComment> = ({ item }) => {
    const onDelete = () => {
      post.deleteComment(item.id)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    return <Comment {...item} onDelete={onDelete} />
  }

  useEffect(() => {
    if (isEmpty(post.comments)) void post.loadComments()
  }, [])

  return (
    <List
      ListEmptyComponent={post.isLoading ? <LoadingView /> : null}
      ListHeaderComponent={
        <HeaderWrapper>
          <Post onDelete={onDeletePost} {...post.data} />
          <Title>Comments</Title>
        </HeaderWrapper>
      }
      data={post.comments}
      renderItem={renderItem}
    />
  )
})
