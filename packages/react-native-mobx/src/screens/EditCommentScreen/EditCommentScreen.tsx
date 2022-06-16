import { observer } from 'mobx-react-lite'
import React from 'react'

import { PostForm } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, AppScreenProps } from '~/navigation'

import { Container } from './EditCommentScreen.style'

type Props = AppScreenProps<AppRoutes.EditComment>

export const EditCommentScreen = observer(({ navigation, route }: Props) => {
  const { actualStore } = useStore()
  const { postId, commentId } = route.params

  const post = actualStore.getPostById(postId)!
  const comment = post.commentById(commentId)!

  const onSubmit = async (value: { title: string; text: string }) => {
    await post.updateComment({
      id: commentId,
      name: value.title,
      body: value.text,
    })
    navigation.goBack()
  }

  return (
    <Container>
      <PostForm
        initialValues={{ title: comment?.name, text: comment?.body }}
        isSubmitting={post.isEditingComment}
        onSubmit={onSubmit}
      />
    </Container>
  )
})
