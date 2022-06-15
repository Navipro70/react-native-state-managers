import upperFirst from 'lodash/upperFirst'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import { Icons } from '~/assets'
import { IPostComment } from '~/store/ActualData/entities'

import { Title, Body, Container, SpacedRow } from './Comment.style'

interface Props extends IPostComment {
  onDelete: () => void
}

export const Comment = ({ body, name, email, onDelete }: Props) => (
  <Container>
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
