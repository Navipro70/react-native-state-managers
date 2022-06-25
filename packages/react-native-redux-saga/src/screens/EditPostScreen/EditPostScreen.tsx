import { observer } from 'mobx-react-lite'
import React from 'react'

import { PostForm } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, AppScreenProps } from '~/navigation'

import { Container } from './EditPostScreen.style'

type Props = AppScreenProps<AppRoutes.EditPost>

export const EditPostScreen = observer(({ navigation, route }: Props) => {
  const { actualStore } = useStore()

  const { id } = route.params
  const post = actualStore.getPostById(id)!

  const onSubmit = async (value: { title: string; text: string }) => {
    await post.updatePost({ title: value.title, body: value.text })
    navigation.goBack()
  }

  return (
    <Container>
      <PostForm
        initialValues={{ title: post.data.title, text: post.data.body }}
        isSubmitting={post.isEditing}
        onSubmit={onSubmit}
      />
    </Container>
  )
})
