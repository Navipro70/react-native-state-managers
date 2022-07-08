import { useNavigation } from '@react-navigation/native'
import { upperFirst } from 'lodash'
import React from 'react'

import { Icons } from '~/assets'
import { AppRoutes } from '~/navigation'
import { IPost } from '~/store/ActualData/entities'

import { Row } from '../primitives'

import {
  Avatar,
  Body,
  InteractionTouch,
  Container,
  SpacedRow,
  Title,
  UserWrapper,
} from './Post.style'

const PREVIEW = 'https://picsum.photos/200/300'

interface Props extends IPost {
  onPress?: () => void
  onDelete: () => void
}

export const Post = ({ id, title, userId, body, onPress, onDelete }: Props) => {
  const { navigate } = useNavigation()

  const onShowComments = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    navigate(AppRoutes.EditPost, { id })
  }

  return (
    <Container onPress={onPress}>
      <Title>{upperFirst(title)}</Title>
      <Body>{upperFirst(body)}</Body>
      <SpacedRow>
        <UserWrapper>
          <Avatar source={{ uri: PREVIEW }} />
          <Body>{userId}</Body>
        </UserWrapper>
        <Row>
          <InteractionTouch onPress={onShowComments}>
            <Icons.Comment />
          </InteractionTouch>
          {onDelete && (
            <InteractionTouch onPress={onDelete}>
              <Icons.Close />
            </InteractionTouch>
          )}
        </Row>
      </SpacedRow>
    </Container>
  )
}
