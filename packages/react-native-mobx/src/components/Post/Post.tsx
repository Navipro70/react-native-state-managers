import { upperFirst } from 'lodash'
import React from 'react'
import { Alert } from 'react-native'

import { Icons } from '~/assets'
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

export const Post = ({ title, userId, body, onPress, onDelete }: Props) => {
  const onShowComments = () => {
    Alert.alert('Show comments', 'Show post comments')
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
