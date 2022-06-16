import { useNavigation } from '@react-navigation/native'
import upperFirst from 'lodash/upperFirst'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import { Icons } from '~/assets'
import { AppRoutes } from '~/navigation'
import { IPostComment } from '~/store/ActualData/entities'

import { Title, Body, Container, SpacedRow } from './Comment.style'

interface Props extends IPostComment {
  onDelete: () => void
}

export const Comment = ({ id, postId, body, name, email, onDelete }: Props) => {
  const { navigate } = useNavigation()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onPress = () => navigate(AppRoutes.EditComment, { commentId: id, postId })

  return (
    <Container onPress={onPress}>
      <Title>{upperFirst(name)}</Title>
      <Body>{upperFirst(body)}</Body>
      <SpacedRow>
        <Body>{email}</Body>
        <TouchableOpacity onPress={onDelete}>
          <Icons.Close />
        </TouchableOpacity>
      </SpacedRow>
    </Container>
  )
}
